package com.project.scheduler;

import com.project.scheduler.dto.MovieResponse;
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
        List<MovieResponse> movies = tmdbClient.fetchPopularMovies();

        for (MovieResponse movie : movies) {
            if (!movieMapper.existsByMovieName(movie.getTitle())) {
                log.info("삽입 대상 영화: {}", movie.getTitle());
                movieMapper.insertMovie(movie);
            }
        }
    }
}
