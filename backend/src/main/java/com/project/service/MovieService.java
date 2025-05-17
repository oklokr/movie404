package com.project.service;

import com.project.model.MovieDto;
import com.project.repository.MovieMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MovieService {
    private final MovieMapper movieMapper;

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

    public List<Map<String, Object>> getGenreList() {
        return movieMapper.selectGenreList();
    }

    public List<Map<String, Object>> getCreatorList() {
        return movieMapper.selectCreatorList();
    }

    public void deleteMovie(String movieCode) {
        movieMapper.deleteOrderHistoryByMovieCode(movieCode);
        movieMapper.deleteWatchHistoryByMovieCode(movieCode);
        movieMapper.deleteVodByMovieCode(movieCode);
        movieMapper.deleteMovie(movieCode);
    }

    public void createMovie(Map<String, String> allParams) {
        MovieDto movie = buildMovieDto(null, allParams);
        movieMapper.insertMovie(movie);

        handleVodInfo(movie.getMovieCode(), allParams);
    }

    public void updateMovie(String movieCode, Map<String, String> allParams) {
        MovieDto movie = buildMovieDto(movieCode, allParams);
        movieMapper.updateMovie(movie);

        handleVodInfo(movieCode, allParams);
    }

    // MovieDto 생성 공통 메서드
    private MovieDto buildMovieDto(String movieCode, Map<String, String> allParams) {
        MovieDto movie = new MovieDto();
        movie.setMovieCode(movieCode != null ? movieCode : "M" + UUID.randomUUID().toString().replace("-", "").substring(0, 7).toUpperCase());
        movie.setGenreCodeA(allParams.get("GENRE_CODEA"));
        movie.setGenreCodeB(allParams.get("GENRE_CODEB"));
        movie.setGenreCodeC(allParams.get("GENRE_CODEC"));
        movie.setMovieName(allParams.get("MOVIE_NAME"));
        movie.setDirectCodeA(allParams.get("DIRECT_CODEA"));
        movie.setDirectCodeB(allParams.get("DIRECT_CODEB"));
        movie.setActorCodeA(allParams.get("ACTOR_CODEA"));
        movie.setActorCodeB(allParams.get("ACTOR_CODEB"));
        movie.setActorCodeC(allParams.get("ACTOR_CODEC"));
        movie.setActorCodeD(allParams.get("ACTOR_CODED"));
        movie.setActorCodeE(allParams.get("ACTOR_CODEE"));
        movie.setSynopsis(allParams.get("SYNOPSIS"));
        movie.setRatingTpcd(allParams.get("RATING_TPCD"));
        movie.setMovieRelease(allParams.get("MOVIE_RELEASE"));
        movie.setSales(0L);

        // runtime: "110" 분 → Integer로 저장
        String runtimeMin = allParams.get("RUNTIME");
        if (runtimeMin != null && !runtimeMin.isEmpty()) {
            try {
                movie.setRuntime(Integer.parseInt(runtimeMin));
            } catch (NumberFormatException e) {
                movie.setRuntime(0);
            }
        } else {
            movie.setRuntime(0);
        }

        // 포스터 URL만 저장
        movie.setPoster(allParams.get("POSTER"));

        return movie;
    }

    // VOD 정보 처리 공통 메서드
    private void handleVodInfo(String movieCode, Map<String, String> allParams) {
        if ("Y".equals(allParams.get("DVD_USE"))) {
            Integer price = parseIntOrNull(allParams.get("DVD_PRICE"));
            Integer discount = parseIntOrNull(allParams.get("DVD_DISCOUNT"));
            String startDate = allParams.get("DVD_DATE_FROM");
            String endDate = allParams.get("DVD_DATE_TO");

            // 빈 문자열 처리
            startDate = (startDate == null || startDate.isEmpty()) ? "2024-01-01" : startDate;
            endDate = (endDate == null || endDate.isEmpty()) ? "2024-12-31" : endDate;

            MovieDto detail = movieMapper.selectMovieDetail(movieCode);
            if (detail == null || detail.getDvdPrice() == null) {
                // 없으면 insert
                movieMapper.insertVod(
                    movieCode,
                    price != null ? price : 0,
                    startDate,
                    endDate,
                    discount != null ? discount : 0
                );
            } else {
                // 있으면 update
                movieMapper.updateVod(
                    movieCode,
                    price != null ? price : 0,
                    startDate,
                    endDate,
                    discount != null ? discount : 0
                );
            }
        } else {
            movieMapper.deleteVodByMovieCode(movieCode);
        }
    }

    private Integer parseIntOrNull(String s) {
        try {
            return (s == null || s.isEmpty()) ? null : Integer.parseInt(s);
        } catch (Exception e) {
            return null;
        }
    }

    public MovieDto selectUserVod(String id){
        return movieMapper.selectUserVod(id);
    }

    public void createRunSchedule(Map<String, Object> param) {
        // SCHEDULE_CODE 생성 (예: UUID)
        param.put("scheduleCode", UUID.randomUUID().toString().replace("-", "").substring(0, 8));

        // startHour, endHour → startTime, endTime 변환
        Object startHourObj = param.get("startHour");
        Object endHourObj = param.get("endHour");
        if (startHourObj != null && endHourObj != null) {
            int startHour = Integer.parseInt(startHourObj.toString());
            int endHour = Integer.parseInt(endHourObj.toString());
            String startTime = String.format("%02d:00:00", startHour);
            String endTime = String.format("%02d:00:00", endHour);
            param.put("startTime", startTime);
            param.put("endTime", endTime);
        } else {
            param.put("startTime", null);
            param.put("endTime", null);
        }

        movieMapper.insertRunSchedule(param);
    }

    public List<Map<String, Object>> getRunScheduleList(String runDate, String theaterCode) {
        return movieMapper.selectRunScheduleList(runDate, theaterCode);
    }
}