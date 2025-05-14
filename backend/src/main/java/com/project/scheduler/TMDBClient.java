package com.project.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.project.scheduler.dto.MovieResponse;
import com.project.scheduler.dto.TMDBMovieListResponse;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class TMDBClient {

    private final RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    public List<MovieResponse> fetchPopularMovies() {
        String url = "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey + "&language=ko-KR&page=1?include_adult=true?include_video=true";

        TMDBMovieListResponse response = restTemplate.getForObject(url, TMDBMovieListResponse.class);
        return response != null ? response.getResults() : List.of();
    }
}