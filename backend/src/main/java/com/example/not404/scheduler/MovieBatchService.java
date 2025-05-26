package com.example.not404.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.not404.repository.CommonMapper;
import com.example.not404.repository.MovieMapper;
import com.example.not404.scheduler.dto.TMDBCreditDto;
import com.example.not404.scheduler.dto.TMDBDiscoverIdListDto;
import com.example.not404.scheduler.dto.TMDBGenreDto;
import com.example.not404.scheduler.dto.TMDBMovieDetailDto;
import com.example.not404.scheduler.dto.TMDBVideoDto;
import com.example.not404.scheduler.dto.insert.InsertCreatorDto;
import com.example.not404.scheduler.dto.insert.InsertGenreDto;
import com.example.not404.scheduler.dto.insert.InsertMovieDto;
import com.example.not404.scheduler.dto.response.TMDBCreditResponseDto;

import jakarta.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieBatchService {

    private final TMDBClient tmdbClient;
    private final MovieMapper movieMapper;
    private final CommonMapper commonMapper;

    private static final String GENRE_TPCD = "GENRE_TPCD";
    private static final String GENRE_UNKNOWN = "GENRE_UNKNOWN";
    private static final String CREATOR_UNKNOWN = "CREATOR_UNKNOWN";

    /**
     * 메인 배치 진입점
     */
    @Transactional
    public void updateMovies() {
        log.info("==== TMDB 영화 배치 시작 ====");

        // 0. 공통코드(장르) 선처리 ---------------------------------------------------------
        int genreCommonId = ensureCommonAndGetId(GENRE_TPCD);
        syncGenresWithCommonCode(genreCommonId);

        // 1. TMDB 최신 영화 ID 목록 -------------------------------------------------------
        List<TMDBDiscoverIdListDto> tmdbIds = tmdbClient.getMovieIdList(10);
        for (TMDBDiscoverIdListDto idDto : tmdbIds) {
            processSingleMovie(idDto.getId());
        }

        log.info("==== TMDB 영화 배치 완료 ====");
    }

    /**
     * COMMON / COMMON_CODE 테이블에 GENRE_TPCD 기본 행을 보장하고 ID 반환
     */
    private int ensureCommonAndGetId(String commonCode) {
        if (!commonMapper.existsCommon(commonCode)) {
            commonMapper.insertCommon(commonCode); // useGeneratedKeys
        }
        return commonMapper.selectCommonId(commonCode);
    }

    /**
     * TMDB 장르 -> COMMON_CODE & GENRE 테이블 동기화
     */
    private void syncGenresWithCommonCode(int commonId) {
        List<TMDBGenreDto> tmdbGenres = tmdbClient.getGenreList();

        // COMMON_CODE & GENRE 테이블 모두 체크
        for (TMDBGenreDto g : tmdbGenres) {
            String value = String.valueOf(g.getId());
            String name  = g.getName();

            if (!commonMapper.existsCommonValue(value)) {
                commonMapper.insertCommonCode(commonId, name, value);
                log.info("✅ COMMON_CODE 추가: [{}] {}", value, name);
            }
            if (!movieMapper.existsGenre(value)) {
                movieMapper.batchInsertGenre(InsertGenreDto.fromTMDB(g));
                log.info("✅ GENRE 추가: [{}] {}", value, name);
            }
        }
    }

    /**
     * 개별 영화 처리
     */
    private void processSingleMovie(int movieId) {
        // 영화 상세 조회 & 중복 체크
        TMDBMovieDetailDto detail = tmdbClient.getMovieDetailById(movieId);
        if (detail == null || movieMapper.existsMovie(detail.getId())) return;

        // 감독·배우·비디오 --------------------------------------------------------------
        TMDBCreditResponseDto credits = tmdbClient.getCreditByMovieId(movieId);
        List<TMDBCreditDto> directors = credits.getCrew().stream()
                .filter(c -> "Director".equalsIgnoreCase(c.getJob()))
                .toList();
        List<TMDBCreditDto> actors = credits.getCast().stream()
                .filter(c -> "Acting".equalsIgnoreCase(c.getKnown_for_department()))
                .limit(5)
                .toList();
        insertCreatorsIfNeeded(directors);
        insertCreatorsIfNeeded(actors);

        List<TMDBVideoDto> videos = tmdbClient.getVideoListByMovieId(movieId);
        String teaser = videos.stream()
                .filter(v -> "Teaser".equalsIgnoreCase(v.getType()))
                .findFirst()
                .or(() -> videos.stream().findFirst())
                .map(v -> "https://www.youtube.com/embed/" + v.getKey())
                .orElse(null);

        // 장르 코드 ---------------------------------------------------------------
        List<String> genreCodes = detail.getGenres().stream()
                .map(g -> String.valueOf(g.getId()))
                .limit(3)
                .toList();
        String genreA = getFromList(genreCodes, 0, GENRE_UNKNOWN);
        if (GENRE_UNKNOWN.equals(genreA) || !movieMapper.existsGenre(genreA)) {
            log.warn("⚠️ 영화 {} 저장 스킵: 유효한 장르 없음", detail.getTitle());
            return;
        }

        // 영화 DTO ----------------------------------------------------------------
        InsertMovieDto movieDto = InsertMovieDto.builder()
            .movieCode(detail.getId())
            .genreCodeA(genreA)
            .genreCodeB(getFromList(genreCodes, 1, null))
            .genreCodeC(getFromList(genreCodes, 2, null))
            .movieName(detail.getTitle() != null ? detail.getTitle() : "제목없음")
            .directCodeA(getIdFromList(directors, 0, CREATOR_UNKNOWN))
            .directCodeB(getIdFromList(directors, 1, null))
            .actorCodeA(getIdFromList(actors, 0, CREATOR_UNKNOWN))
            .actorCodeB(getIdFromList(actors, 1, null))
            .actorCodeC(getIdFromList(actors, 2, null))
            .actorCodeD(getIdFromList(actors, 3, null))
            .actorCodeE(getIdFromList(actors, 4, null))
            .synopsis(detail.getOverview() != null ? detail.getOverview() : "정보없음")
            .runtime(detail.getRuntime() != null ? detail.getRuntime() : 0)
            .ratingTpcd(detail.getAdult() ? "1" : "2")
            .movieRelease(parseDate(detail.getRelease_date()))
            .teaser(teaser)
            .poster("https://image.tmdb.org/t/p/w500" + detail.getPoster_path())
            .background("https://image.tmdb.org/t/p/w1280" + detail.getBackdrop_path())
            .sales(0)
            .build();

        movieMapper.batchInsertMovie(movieDto);

        log.info("🎬 저장 완료: {} | 개봉 {} | 장르 {}", detail.getTitle(), detail.getRelease_date(),
            detail.getGenres().stream().map(TMDBGenreDto::getName).collect(Collectors.joining(", ")));
    }

    /**
     * CREATOR 중복 검사 후 일괄 INSERT
     */
    private void insertCreatorsIfNeeded(List<TMDBCreditDto> people) {
        for (TMDBCreditDto p : people) {
            String code = String.valueOf(p.getId());
            if (!movieMapper.existsCreator(code)) {
                movieMapper.batchInsertCreator(InsertCreatorDto.builder()
                    .creatorCode(code)
                    .creatorName(p.getName())
                    .gender(String.valueOf(p.getGender()))
                    .build());
            }
        }
    }

    // ------------------ 유틸 ------------------
    private String getFromList(List<String> list, int idx, String def) {
        return (list != null && list.size() > idx && list.get(idx) != null) ? list.get(idx) : def;
    }

    private String getIdFromList(List<TMDBCreditDto> list, int idx, String def) {
        return (list != null && list.size() > idx && list.get(idx) != null) ? String.valueOf(list.get(idx).getId()) : def;
    }

    private LocalDate parseDate(String dateStr) {
        try {
            return (dateStr != null && !dateStr.isBlank()) ? LocalDate.parse(dateStr) : null;
        } catch (Exception e) {
            log.warn("⚠️ 날짜 파싱 실패: {}", dateStr);
            return null;
        }
    }
}
