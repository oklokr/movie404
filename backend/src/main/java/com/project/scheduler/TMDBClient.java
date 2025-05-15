package com.project.scheduler;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
@RequiredArgsConstructor
public class TMDBClient {

    private final RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    private final String tmdbBaseUrl = "https://api.themoviedb.org/3/";
    private final String tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";

    public void fetchMovieDtoList() {
        System.out.println("test");
    }
}
