package com.project.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.project.scheduler.dto.TMDBCastDto;
import com.project.scheduler.dto.TMDBDiscoverIdListDto;
import com.project.scheduler.dto.TMDBGenreDto;
import com.project.scheduler.dto.TMDBMovieDetailDto;
import com.project.scheduler.dto.TMDBVideoDto;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieBatchService {

    private final TMDBClient tmdbClient;

    public void updateMovies() {
        // 장르 Fetch
        List<TMDBGenreDto> genreList = tmdbClient.getGenreList();
        Map<Integer, String> genreMap = genreList.stream().collect(Collectors.toMap(TMDBGenreDto::getId, TMDBGenreDto::getName));

        // 영화목록 ID Fetch
        List<TMDBDiscoverIdListDto> movieIdList = tmdbClient.getMovieIdList();
        for (TMDBDiscoverIdListDto idDto : movieIdList) {
            int movieId = idDto.getId();

            // 3. 영화 상세 정보
            TMDBMovieDetailDto movieDetail = tmdbClient.getMovieDetailById(movieId);
            if (movieDetail == null) continue;

            // 4. 출연 배우 리스트
            List<TMDBCastDto> castList = tmdbClient.getCastListByMovieId(movieId);
            List<TMDBCastDto> actingList = castList.stream()
                .filter(cast -> "Acting".equalsIgnoreCase(cast.getKnown_for_department()))
                .limit(5)
                .collect(Collectors.toList());

            List<TMDBCastDto> directingList = castList.stream()
                .filter(cast -> "Directing".equalsIgnoreCase(cast.getKnown_for_department()))
                .limit(5)
                .collect(Collectors.toList());

            // 5. 비디오 리스트
            List<TMDBVideoDto> videoList = tmdbClient.getVideoListByMovieId(movieId);

            // 6. 장르 이름 리스트 생성
            List<String> genreNames = movieDetail.getGenres().stream()
                    .map(genre -> genreMap.getOrDefault(genre.getId(), "Unknown"))
                    .collect(Collectors.toList());

            // 로그 출력
            log.info("🎥 출연진: {} | 감독: {}", actingList, directingList);
            log.info("🎥 영화: {} | 개봉일: {} | 장르: {}", movieDetail.getTitle(), movieDetail.getRelease_date(), genreNames);
            log.info("🎞 비디오 수: {}, 🎭 배우 수: {}", videoList.size(), castList.size());

            // 👉 여기에 DB 저장 또는 후처리 로직 추가
        }
        log.info("✅ TMDB 영화 배치 완료");
    }
}
