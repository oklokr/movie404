package com.project.scheduler;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

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
    public List<TMDBDiscoverIdListDto> getMovieIdList(Integer maxPage) {
        int page = 1;
        int totalPages = 1;
        List<TMDBDiscoverIdListDto> allResults = new ArrayList<>();
        do {
            String url = tmdbBaseUrl + "discover/movie?api_key=" + apiKey + "&language=ko&page=" + page;
            TMDBDiscoverIdListResponseDto response = restTemplate.getForObject(url, TMDBDiscoverIdListResponseDto.class);

            if (response != null && response.getResults() != null) {
                allResults.addAll(response.getResults());
                totalPages = response.getTotal_pages();

                // maxPage가 설정되어 있으면 그 값까지만 호출
                if (maxPage != null) {
                    totalPages = Math.min(totalPages, maxPage);
                }
            } else {
                break; // 실패 시 종료
            }
            page++;
            try {
                Thread.sleep(200); // 호출 속도 제한
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt(); // 예외 발생 시 현재 스레드에 인터럽트 설정
            }
        } while (page <= totalPages);
        return allResults;
    }

    // TMDB API 호출 : 영화 상세 List
    public TMDBMovieDetailDto getMovieDetailById(int movieId) {
        String url = tmdbBaseUrl + "movie/" + movieId + "?api_key=" + apiKey + "&language=ko";
        return restTemplate.getForObject(url, TMDBMovieDetailDto.class);
    }

    // TMDB API 호출 : 영화 배우 List
    public TMDBCreditResponseDto getCreditByMovieId(int movieId) {
        String url = tmdbBaseUrl + "movie/" + movieId + "/credits?api_key=" + apiKey + "&language=ko";
        TMDBCreditResponseDto response = restTemplate.getForObject(url, TMDBCreditResponseDto.class);
        return response != null ? response : new TMDBCreditResponseDto();
    }

    // TMDB API 호출 : 영화 Viedo List
    public List<TMDBVideoDto> getVideoListByMovieId(int movieId) {
        String url = tmdbBaseUrl + "movie/" + movieId + "/videos?api_key=" + apiKey + "&language=ko";
        TMDBVideoResponseDto response = restTemplate.getForObject(url, TMDBVideoResponseDto.class);
        return response != null ? response.getResults() : List.of();
    }
}
