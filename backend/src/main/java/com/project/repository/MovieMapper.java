package com.project.repository;

import com.project.model.MovieDto;
import com.project.scheduler.dto.insert.InsertCreatorDto;
import com.project.scheduler.dto.insert.InsertGenreDto;
import com.project.scheduler.dto.insert.InsertMovieDto;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface MovieMapper {
    List<MovieDto> selectMovieList(@Param("movieName") String movieName, @Param("offset") int offset, @Param("size") int size);
    int countMovieList(@Param("movieName") String movieName);
    MovieDto selectMovieDetail(@Param("movieCode") String movieCode);

    List<Map<String, Object>> selectGenreList();
    void deleteOrderHistoryByMovieCode(@Param("movieCode") String movieCode);
    void deleteMovie(@Param("movieCode") String movieCode);
    void deleteWatchHistoryByMovieCode(@Param("movieCode") String movieCode);
    void deleteVodByMovieCode(@Param("movieCode") String movieCode);
    void insertMovie(MovieDto movie);
    void insertVod(@Param("movieCode") String movieCode,
               @Param("price") int price,
               @Param("startDate") String startDate,
               @Param("endDate") String endDate,
               @Param("discount") int discount);

    List<Map<String, Object>> selectCreatorList();    
    void updateMovie(MovieDto movie);
    void updateVod(@Param("movieCode") String movieCode,
               @Param("price") int price,
               @Param("startDate") String startDate,
               @Param("endDate") String endDate,
               @Param("discount") int discount);
    void insertRunSchedule(Map<String, Object> param);
    List<Map<String, Object>> selectRunScheduleList(@Param("runDate") String runDate, @Param("theaterCode") String theaterCode);


    boolean existsGenre(String genreCode);
    boolean existsCreator(String creatorCode);
    boolean existsMovie(Integer movieCode);
    void batchInsertGenre(InsertGenreDto genre);
    void batchInsertCreator(InsertCreatorDto creator);
    void batchInsertMovie(InsertMovieDto movie);
}