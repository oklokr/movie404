package com.project.scheduler;

import com.project.model.MovieDto;
import com.project.scheduler.dto.GenreResponseDto;
import com.project.scheduler.dto.MovieResponseDto;
import com.project.scheduler.dto.TMDBGenreResponseDto;
import com.project.scheduler.dto.TMDBMovieListResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class TMDBClient {

    private final RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final String tmdbBaseUrl = "https://api.themoviedb.org/3/";
    private final String tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";

    @PostConstruct
    public void init() {
        getGenres(); // 캐싱 불필요하면 제거 가능
    }

    public List<GenreResponseDto> getGenres() {
        String url = tmdbBaseUrl + "genre/movie/list?api_key=" + apiKey + "&language=ko";
        TMDBGenreResponseDto response = restTemplate.getForObject(url, TMDBGenreResponseDto.class);
        return response != null ? response.getGenres() : List.of();
    }

    public List<MovieDto> fetchMovieDtoList() {
        String url = tmdbBaseUrl + "discover/movie?api_key=" + apiKey + "&language=ko-KR&page=1&include_adult=true&include_video=true";
        TMDBMovieListResponseDto response = restTemplate.getForObject(url, TMDBMovieListResponseDto.class);
        List<MovieResponseDto> movies = response != null ? response.getResults() : List.of();

        return movies.stream().map(movie -> {
            List<String> genreCodes = movie.getGenre_ids().stream()
                    .map(String::valueOf)
                    .filter(Objects::nonNull)
                    .limit(3)
                    .collect(Collectors.toList());

            return MovieDto.builder()
                    .movieCode(String.valueOf(movie.getId()))
                    .movieName(movie.getTitle())
                    .synopsis(movie.getOverview())
                    .poster(movie.getPoster_path() != null ? tmdbImageBaseUrl + movie.getPoster_path() : null)
                    .movieRelease(movie.getRelease_date())
                    .genreCodeA(genreCodes.size() > 0 ? genreCodes.get(0) : null)
                    .genreCodeB(genreCodes.size() > 1 ? genreCodes.get(1) : null)
                    .genreCodeC(genreCodes.size() > 2 ? genreCodes.get(2) : null)
                    .directCodeA(null)
                    .directCodeB(null)
                    .actorCodeA(null)
                    .actorCodeB(null)
                    .actorCodeC(null)
                    .actorCodeD(null)
                    .actorCodeE(null)
                    .runtime(null)
                    .ratingTpcd(null)
                    .sales(null)
                    .dvdDateFrom(null)
                    .dvdDateTo(null)
                    .reserveDateFrom(null)
                    .reserveDateTo(null)
                    .dvdPrice(null)
                    .reservePrice(null)
                    .dvdDiscount(null)
                    .reserveDiscount(null)
                    .build();
        }).collect(Collectors.toList());
    }
}
