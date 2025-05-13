package com.project.service;

import com.project.model.MovieDto;
import com.project.repository.MovieMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MovieService {
    private MovieMapper movieMapper;

    public MovieService(MovieMapper movieMapper) {
        this.movieMapper = movieMapper;
    }

    public Map<String, Object> getMovieList(String movieName, int page, int size) {
        int offset = (page - 1) * size;
        List<MovieDto> list = movieMapper.selectMovieList(movieName, offset, size);
        int total = movieMapper.countMovieList(movieName);

        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("total", total);
        return result;
    }

    public MovieDto getMovieDetail(String movieCode) {
        return movieMapper.selectMovieDetail(movieCode);
    }
}