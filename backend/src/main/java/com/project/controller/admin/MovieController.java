package com.project.controller.admin;

import com.project.model.MovieDto;
import com.project.service.MovieService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/movie")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public Map<String, Object> getMovieList(
            @RequestParam(name = "movieName", required = false) String movieName,
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
    ) {
        return movieService.getMovieList(movieName, page, size);
    }

    @GetMapping("/{movieCode}")
    public MovieDto getMovieDetail(@PathVariable("movieCode") String movieCode) {
        return movieService.getMovieDetail(movieCode);
    }

    @GetMapping("/genres")
    public List<Map<String, Object>> getGenreList() {
        return movieService.getGenreList();
    }

    @DeleteMapping("/{movieCode}")
    public void deleteMovie(@PathVariable("movieCode") String movieCode) {
        movieService.deleteMovie(movieCode);
    }

    @PostMapping
    public void createMovie(
            @RequestParam Map<String, String> allParams,
            @RequestParam(value = "POSTER", required = false) MultipartFile poster
    ) {
        movieService.createMovie(allParams, poster);
    }

    @GetMapping("/creator")
    public List<Map<String, Object>> getCreatorList() {
        return movieService.getCreatorList();
    }

    @PutMapping("/{movieCode}")
    public ResponseEntity<?> updateMovie(
            @PathVariable("movieCode") String movieCode,
            @RequestParam Map<String, String> allParams,
            @RequestParam(value = "POSTER", required = false) MultipartFile poster
    ) {
        movieService.updateMovie(movieCode, allParams, poster);
        return ResponseEntity.ok().build();
    }
}