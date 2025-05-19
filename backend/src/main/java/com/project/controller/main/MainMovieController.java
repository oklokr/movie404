package com.project.controller.main;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;
import com.project.service.MovieService;

@RestController
@RequestMapping("/api")
public class MainMovieController {
    @Autowired
    private MovieService movieService;

    @PostMapping("/main/movieList")
    public ApiResponse getMovie(@RequestBody Map<String, Object> requestBody) {
        int page  = Optional.ofNullable(requestBody.get("page"))
            .map(Object::toString)
            .map(Integer::parseInt)
            .orElse(1);
        int size  = Optional.ofNullable(requestBody.get("size"))
            .map(Object::toString)
            .map(Integer::parseInt)
            .orElse(10);
        String genreTpcd = (String) requestBody.get("genreTpcd");   // nullable
        String schedule = (String) requestBody.get("schedule");   // nullable
        String keyword   = (String) requestBody.get("keyword");     // nullable

        Map<String, Object> result = movieService.getMovieList(genreTpcd, keyword, schedule, page, size);
        return new ApiResponse(result);
    }

    @PostMapping("/movie/detail")
    public ApiResponse getMovieDetail(@RequestBody Map<String, Object> requestBody) {
        // String movieCode = (String) requestBody.get("movieCode");

        return new ApiResponse(false);
    }
}
