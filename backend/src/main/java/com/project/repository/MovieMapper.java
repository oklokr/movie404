package com.project.repository;

import com.project.model.MovieDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MovieMapper {
    List<MovieDto> selectMovieList(@Param("movieName") String movieName, @Param("offset") int offset, @Param("size") int size);
    int countMovieList(@Param("movieName") String movieName);
}