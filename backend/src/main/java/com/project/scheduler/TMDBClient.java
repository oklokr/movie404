package com.project.scheduler;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.project.scheduler.dto.TMDBCastDto;
import com.project.scheduler.dto.TMDBDiscoverIdListDto;
import com.project.scheduler.dto.TMDBGenreDto;
import com.project.scheduler.dto.TMDBMovieDetailDto;
import com.project.scheduler.dto.TMDBVideoDto;
import com.project.scheduler.dto.response.TMDBCreditResponseDto;
import com.project.scheduler.dto.response.TMDBDiscoverIdListResponseDto;
import com.project.scheduler.dto.response.TMDBGenreResponseDto;
import com.project.scheduler.dto.response.TMDBVideoResponseDto;

@Slf4j
@Component
@RequiredArgsConstructor
public class TMDBClient {

    private final RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final String tmdbBaseUrl = "https://api.themoviedb.org/3/";

    // TMDB API 호출 : 장르 List
    public List<TMDBGenreDto> getGenreList() {
        String url = tmdbBaseUrl + "genre/movie/list?api_key=" + apiKey + "&language=ko";
        TMDBGenreResponseDto response = restTemplate.getForObject(url, TMDBGenreResponseDto.class);
        return response != null ? response.getGenres() : List.of();
    }

    // TMDB API 호출 : 영화 ID List 
    public List<TMDBDiscoverIdListDto> getMovieIdList() {
        String url = tmdbBaseUrl + "discover/movie?api_key=" + apiKey + "&language=ko";
        TMDBDiscoverIdListResponseDto response = restTemplate.getForObject(url, TMDBDiscoverIdListResponseDto.class);
        return response != null ? response.getResults() : List.of();
    }

    // TMDB API 호출 : 영화 상세 List
    public TMDBMovieDetailDto getMovieDetailById(int movieId) {
        String url = tmdbBaseUrl + "movie/" + movieId + "?api_key=" + apiKey + "&language=ko";
        return restTemplate.getForObject(url, TMDBMovieDetailDto.class);
    }

    // TMDB API 호출 : 영화 배우 List
    public List<TMDBCastDto> getCastListByMovieId(int movieId) {
        String url = tmdbBaseUrl + "movie/" + movieId + "/credits?api_key=" + apiKey + "&language=ko";
        TMDBCreditResponseDto response = restTemplate.getForObject(url, TMDBCreditResponseDto.class);
        return response != null ? response.getCast() : List.of();
    }

    // TMDB API 호출 : 영화 Viedo List
    public List<TMDBVideoDto> getVideoListByMovieId(int movieId) {
        String url = tmdbBaseUrl + "movie/" + movieId + "/videos?api_key=" + apiKey + "&language=ko";
        TMDBVideoResponseDto response = restTemplate.getForObject(url, TMDBVideoResponseDto.class);
        return response != null ? response.getResults() : List.of();
    }
}
