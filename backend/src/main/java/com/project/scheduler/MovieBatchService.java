package com.project.scheduler;

import com.project.scheduler.dto.GenreResponseDto;
import com.project.scheduler.dto.MovieResponseDto;
import com.project.model.MovieDto;
import com.project.repository.MovieMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieBatchService {

    private final TMDBClient tmdbClient;
    private final MovieMapper movieMapper;

    public void updateMovies() {
        // 1. 장르 저장
        List<GenreResponseDto> genreList = tmdbClient.getGenres();
        for (GenreResponseDto genre : genreList) {
            String genreCode = genre.getGenreCode();
            String genreName = genre.getGenreName();
            if (!movieMapper.existsByGenreCode(genreCode)) {
                // DTO 없이 직접 매핑
                movieMapper.insertGenre(genreCode, genreName);
                log.info("✅ 장르 저장: {} ({})", genreName, genreCode);
            } else {
                
            }
        }

        // 2. 영화 저장
        List<MovieDto> movieDtoList = tmdbClient.fetchMovieDtoList();
        for (MovieDto movieDto : movieDtoList) {
            if (!movieMapper.existsByMovieName(movieDto.getMovieName())) {
                movieMapper.insertMovie(movieDto);
                log.info("🍿 영화 저장: {}", movieDto.getMovieName());
            } else {
                log.debug("⚠️ 중복 영화 스킵: {}", movieDto.getMovieName());
            }
        }

        log.info("🎉 영화 배치 완료");
    }
}
