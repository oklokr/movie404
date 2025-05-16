package com.project.service;

import com.project.model.MovieDto;
import com.project.repository.MovieMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

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

    public List<Map<String, Object>> getGenreList() {
        return movieMapper.selectGenreList();
    }

    public void deleteMovie(String movieCode) {
        movieMapper.deleteOrderHistoryByMovieCode(movieCode);
        movieMapper.deleteWatchHistoryByMovieCode(movieCode);
        movieMapper.deleteVodByMovieCode(movieCode);
        movieMapper.deleteMovie(movieCode);
    }

    public void createMovie(Map<String, String> allParams) {
        MovieDto movie = new MovieDto();
        String movieCode = "M" + UUID.randomUUID().toString().replace("-", "").substring(0, 7).toUpperCase();
        movie.setMovieCode(movieCode);
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

        // runtime: "110" 분 → "01:50:00" 변환
        String runtimeMin = allParams.get("RUNTIME");
        if (runtimeMin != null && !runtimeMin.isEmpty()) {
            int min = Integer.parseInt(runtimeMin);
            LocalTime time = LocalTime.of(min / 60, min % 60);
            movie.setRuntime(time.format(DateTimeFormatter.ofPattern("HH:mm:ss")));
        }

        // 포스터 URL만 저장
        movie.setPoster(allParams.get("POSTER"));

        movieMapper.insertMovie(movie);

        // DVD(VOD) 정보 등록/삭제
        if ("Y".equals(allParams.get("DVD_USE"))) {
            Integer price = parseIntOrNull(allParams.get("DVD_PRICE"));
            Integer discount = parseIntOrNull(allParams.get("DVD_DISCOUNT"));
            String startDate = allParams.get("DVD_DATE_FROM");
            String endDate = allParams.get("DVD_DATE_TO");

            // 빈 문자열 처리
            startDate = (startDate == null || startDate.isEmpty()) ? "2024-01-01" : startDate;
            endDate = (endDate == null || endDate.isEmpty()) ? "2024-12-31" : endDate;

            // 등록 시에는 무조건 insertVod
            movieMapper.insertVod(
                movieCode,
                price != null ? price : 0,
                startDate,
                endDate,
                discount != null ? discount : 0
            );
        } else {
            movieMapper.deleteVodByMovieCode(movieCode);
        }
    }

    public List<Map<String, Object>> getCreatorList() {
        return movieMapper.selectCreatorList();
    }

    public void updateMovie(String movieCode, Map<String, String> allParams) {
        MovieDto movie = new MovieDto();
        movie.setMovieCode(movieCode);
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

        // runtime: "110" 분 → "01:50:00" 변환
        String runtimeMin = allParams.get("RUNTIME");
        if (runtimeMin != null && !runtimeMin.isEmpty()) {
            int min = Integer.parseInt(runtimeMin);
            LocalTime time = LocalTime.of(min / 60, min % 60);
            movie.setRuntime(time.format(DateTimeFormatter.ofPattern("HH:mm:ss")));
        }

        // 포스터 URL만 저장
        movie.setPoster(allParams.get("POSTER"));

        movieMapper.updateMovie(movie);

        // DVD(VOD) 정보 수정/삭제
        if ("Y".equals(allParams.get("DVD_USE"))) {
            Integer price = parseIntOrNull(allParams.get("DVD_PRICE"));
            Integer discount = parseIntOrNull(allParams.get("DVD_DISCOUNT"));
            String startDate = allParams.get("DVD_DATE_FROM");
            String endDate = allParams.get("DVD_DATE_TO");

            // 빈 문자열 처리
            startDate = (startDate == null || startDate.isEmpty()) ? "2024-01-01" : startDate;
            endDate = (endDate == null || endDate.isEmpty()) ? "2024-12-31" : endDate;

            // VOD 레코드 존재 여부 확인 후 분기
            MovieDto detail = movieMapper.selectMovieDetail(movieCode);
            if (detail.getDvdPrice() == null) {
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
}