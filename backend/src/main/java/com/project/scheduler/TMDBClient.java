package com.project.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.project.scheduler.dto.GenreResponseDto;
import com.project.scheduler.dto.TMDBGenreResponseDto;
import com.project.scheduler.dto.MovieResponseDto;
import com.project.scheduler.dto.TMDBMovieListResponseDto;

import jakarta.annotation.PostConstruct;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class TMDBClient {

    private final RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;
    private String tmdbBaseUrl = "https://api.themoviedb.org/3/";

    private Map<Integer, String> genreMap;

    @PostConstruct
    public void init() {
        List<GenreResponseDto> genres = getGenres();
        genreMap = buildGenreMap(genres);
    }

    public List<GenreResponseDto> getGenres() {
        String url = tmdbBaseUrl + "genre/movie/list?api_key=" + apiKey + "&language=ko";
        TMDBGenreResponseDto response = restTemplate.getForObject(url, TMDBGenreResponseDto.class);
        return response != null ? response.getGenres() : List.of();
    }

    private Map<Integer, String> buildGenreMap(List<GenreResponseDto> genres) {
        return genres.stream().collect(Collectors.toMap(GenreResponseDto::getId, GenreResponseDto::getName));
    }

    public List<MovieResponseDto> fetchPopularMovies() {
        String url = tmdbBaseUrl + "/discover/movie?api_key=" + apiKey + "&language=ko-KR&page=1?include_adult=true?include_video=true";
        TMDBMovieListResponseDto response = restTemplate.getForObject(url, TMDBMovieListResponseDto.class);
        return response != null ? response.getResults() : List.of();
    }

    public List<> fetchMoviesWithGenreNames() {

    }
}