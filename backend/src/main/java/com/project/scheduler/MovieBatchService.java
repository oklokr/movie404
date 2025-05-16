package com.project.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.repository.MovieMapper;
import com.project.scheduler.dto.TMDBCreditDto;
import com.project.scheduler.dto.TMDBDiscoverIdListDto;
import com.project.scheduler.dto.TMDBGenreDto;
import com.project.scheduler.dto.TMDBMovieDetailDto;
import com.project.scheduler.dto.TMDBVideoDto;
import com.project.scheduler.dto.insert.InsertCreatorDto;
import com.project.scheduler.dto.insert.InsertGenreDto;
import com.project.scheduler.dto.insert.InsertMovieDto;
import com.project.scheduler.dto.response.TMDBCreditResponseDto;

import jakarta.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieBatchService {

    private final TMDBClient tmdbClient;
    private final MovieMapper movieMapper;

    private static final String GENRE_UNKNOWN = "GENRE_UNKNOWN";
    private static final String CREATOR_UNKNOWN = "CREATOR_UNKNOWN";


    @Transactional
    public void updateMovies() {
        log.info("==== 배치 시작 ====");

        // 1. 장르 Fetch 및 삽입
        List<TMDBGenreDto> tmdbGenres = tmdbClient.getGenreList();
        List<InsertGenreDto> insertGenres = tmdbGenres.stream()
            .map(InsertGenreDto::fromTMDB)
            .filter(genre -> !movieMapper.existsGenre(genre.getGenreCode()))
            .toList();
        insertGenres.forEach(movieMapper::batchInsertGenre);

        // 2. 영화 ID 목록 가져오기
        List<TMDBDiscoverIdListDto> movieIdList = tmdbClient.getMovieIdList(10);
        for (TMDBDiscoverIdListDto movieIdDto : movieIdList) {
            int movieId = movieIdDto.getId();

            // 2-1. 영화 상세 정보 조회
            TMDBMovieDetailDto movieDetail = tmdbClient.getMovieDetailById(movieId);
            if (movieDetail == null || movieMapper.existsMovie(movieDetail.getId())) continue;

            // 2-2. 출연진/감독 정보 조회
            TMDBCreditResponseDto creditResponseDto = tmdbClient.getCreditByMovieId(movieId);
            List<TMDBCreditDto> crewList = creditResponseDto.getCrew();
            List<TMDBCreditDto> castList = creditResponseDto.getCast();
            List<TMDBCreditDto> directors = crewList.stream()
                .filter(c -> "Director".equalsIgnoreCase(c.getJob()))
                .toList();
            List<TMDBCreditDto> topActors = castList.stream()
                .filter(c -> "Acting".equalsIgnoreCase(c.getKnown_for_department()))
                .limit(5)
                .toList();

            // 2-3. 비디오 정보 조회
            List<TMDBVideoDto> videoList = tmdbClient.getVideoListByMovieId(movieId);
            String teaser = videoList.stream()
                .filter(v -> "Teaser".equalsIgnoreCase(v.getType()))
                .findFirst()
                .or(() -> videoList.stream().findFirst())  // Teaser 없으면 첫 번째 영상 가져오기
                .map(v -> "https://www.youtube.com/watch?v=" + v.getKey())
                .orElse(null);

            // 2-4. 감독 및 배우를 CREATOR로 삽입 (중복 방지)
            Set<String> creatorCodes = new HashSet<>();
            for (TMDBCreditDto director : directors) {
                String creatorCode = String.valueOf(director.getId());
                if (!movieMapper.existsCreator(creatorCode)) {
                    movieMapper.batchInsertCreator(InsertCreatorDto.builder()
                        .creatorCode(creatorCode)
                        .creatorName(director.getName())
                        .gender(String.valueOf(director.getGender()))
                        .build());
                }
                creatorCodes.add(creatorCode);
            }
            for (TMDBCreditDto actor : topActors) {
                String creatorCode = String.valueOf(actor.getId());
                if (!movieMapper.existsCreator(creatorCode)) {
                    movieMapper.batchInsertCreator(InsertCreatorDto.builder()
                        .creatorCode(creatorCode)
                        .creatorName(actor.getName())
                        .gender(String.valueOf(actor.getGender()))
                        .build());
                }
                creatorCodes.add(creatorCode);
            }

            // 2-5. 장르 코드 최대 3개 추출
            List<String> genreCodes = movieDetail.getGenres().stream()
                .map(g -> String.valueOf(g.getId()))
                .limit(3)
                .toList();

            // 2-6. 영화 Insert DTO 생성
            InsertMovieDto movieDto = InsertMovieDto.builder()
                .movieCode(movieDetail.getId())
                .genreCodeA(getFromList(genreCodes, 0, GENRE_UNKNOWN))
                .genreCodeB(getFromList(genreCodes, 1, null))
                .genreCodeC(getFromList(genreCodes, 2, null))
                .movieName(movieDetail.getTitle() != null ? movieDetail.getTitle() : "제목없음")
                .directCodeA(getIdFromCastList(directors, 0, CREATOR_UNKNOWN))
                .directCodeB(getIdFromCastList(directors, 1, null))
                .actorCodeA(getIdFromCastList(topActors, 0, CREATOR_UNKNOWN))
                .actorCodeB(getIdFromCastList(topActors, 1, null))
                .actorCodeC(getIdFromCastList(topActors, 2, null))
                .actorCodeD(getIdFromCastList(topActors, 3, null))
                .actorCodeE(getIdFromCastList(topActors, 4, null))
                .synopsis(movieDetail.getOverview() != null ? movieDetail.getOverview() : "정보없음")
                .runtime(movieDetail.getRuntime() != null ? movieDetail.getRuntime() : 0)
                .ratingTpcd(movieDetail.getAdult() ? "1" : "2")
                .movieRelease(parseDate(movieDetail.getRelease_date()))
                .teaser(teaser)
                .poster("https://image.tmdb.org/t/p/w500" + movieDetail.getPoster_path())
                .sales(0)
                .build();

            // 장르가 없거나 DB에 존재하지 않으면 영화 저장하지 않음
            if (GENRE_UNKNOWN.equals(movieDto.getGenreCodeA())) {
                log.warn("⚠️ 영화 {} 저장 불가: 장르 없음 (GENRE_UNKNOWN)", movieDto.getMovieName());
                continue;
            }
            if (!movieMapper.existsGenre(movieDto.getGenreCodeA())) {
                log.warn("⚠️ 영화 {} 저장 불가: 장르 코드 {} DB에 없음", movieDto.getMovieName(), movieDto.getGenreCodeA());
                continue;
            }

            // 2-7. 영화 삽입
            movieMapper.batchInsertMovie(movieDto);

            // 2-8. 로그 출력
            String genreNames = movieDetail.getGenres().stream()
                .map(g -> g.getName())
                .collect(Collectors.joining(", "));
            log.info("🎬 영화: {} | 개봉일: {} | 장르: {}", movieDetail.getTitle(), movieDetail.getRelease_date(), genreNames);
            log.info("🎞 비디오 수: {}, 🎭 배우 수: {}", videoList.size(), castList.size());
        }

        log.info("TMDB 영화 배치 완료");
    }

    // 유틸 메서드
    private String getFromList(List<String> list, int index, String defaultCode) {
        return (list != null && list.size() > index && list.get(index) != null) ? list.get(index) : defaultCode;
    }
    private String getIdFromCastList(List<TMDBCreditDto> list, int index, String defaultCode) {
        if (list != null && list.size() > index) {
            TMDBCreditDto dto = list.get(index);
            if (dto != null && dto.getId() != 0) {
                return String.valueOf(dto.getId());
            }
        }
        return defaultCode;
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
