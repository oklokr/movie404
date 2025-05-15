package com.project.service;

import com.project.model.MovieDto;
import com.project.repository.MovieMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        movieMapper.deleteReservationByMovieCode(movieCode);
        movieMapper.deleteRunScheduleByMovieCode(movieCode);
        movieMapper.deleteWatchHistoryByMovieCode(movieCode);
        movieMapper.deleteVodByMovieCode(movieCode);
        movieMapper.deleteMovie(movieCode);
    }

    public void createMovie(Map<String, String> allParams, MultipartFile posterFile) {
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

        // 포스터 파일 저장 (파일명만 저장)
        if (posterFile != null && !posterFile.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + posterFile.getOriginalFilename();
            // 실제 파일 저장 필요
            // posterFile.transferTo(new File("저장경로/" + fileName));
            movie.setPoster(fileName);
        }

        movieMapper.insertMovie(movie);

        // DVD(VOD) 정보 저장
        if ("Y".equals(allParams.get("DVD_USE"))) {
            Integer price = parseIntOrNull(allParams.get("DVD_PRICE"));
            Integer discount = parseIntOrNull(allParams.get("DVD_DISCOUNT"));
            String startDate = allParams.get("DVD_DATE_FROM");
            String endDate = allParams.get("DVD_DATE_TO");
            movieMapper.insertVod(
                movieCode,
                price != null ? price : 0,
                startDate != null ? startDate : "2024-01-01",
                endDate != null ? endDate : "2024-12-31",
                discount != null ? discount : 0
            );
        }

        // 예매(극장) SEAT 정보 저장
        if ("Y".equals(allParams.get("RESERVE_USE"))) {
            Integer price = parseIntOrNull(allParams.get("SEAT_PRICE"));
            Integer discount = parseIntOrNull(allParams.get("SEAT_DISCOUNT"));
            String seatCode = "A1"; // 실제 좌석코드 생성/선택 로직 필요
            String theaterCode = "T001"; // 실제 극장코드 필요
            movieMapper.insertSeat(
                seatCode,
                theaterCode,
                price != null ? price : 0,
                discount != null ? discount : 0,
                "Y"
            );
        }
    }

    public List<Map<String, Object>> getCreatorList() {
        return movieMapper.selectCreatorList();
    }

    public void updateMovie(String movieCode, Map<String, String> allParams, MultipartFile posterFile) {
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

        // 포스터 파일 저장 (파일명만 저장)
        if (posterFile != null && !posterFile.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + posterFile.getOriginalFilename();
            // 실제 파일 저장 필요
            movie.setPoster(fileName);
        }

        movieMapper.updateMovie(movie);

        // DVD(VOD) 정보 수정/삭제
        if ("Y".equals(allParams.get("DVD_USE"))) {
            Integer price = parseIntOrNull(allParams.get("DVD_PRICE"));
            Integer discount = parseIntOrNull(allParams.get("DVD_DISCOUNT"));
            String startDate = allParams.get("DVD_DATE_FROM");
            String endDate = allParams.get("DVD_DATE_TO");
            movieMapper.updateVod(
                movieCode,
                price != null ? price : 0,
                startDate != null ? startDate : "2024-01-01",
                endDate != null ? endDate : "2024-12-31",
                discount != null ? discount : 0
            );
        } else {
            movieMapper.deleteVodByMovieCode(movieCode);
        }

        // 예매(극장) SEAT 정보 수정/삭제
        if ("Y".equals(allParams.get("RESERVE_USE"))) {
            Integer price = parseIntOrNull(allParams.get("SEAT_PRICE"));
            Integer discount = parseIntOrNull(allParams.get("SEAT_DISCOUNT"));
            String seatCode = "A1"; // 실제 좌석코드 생성/선택 로직 필요
            String theaterCode = "T001"; // 실제 극장코드 필요
            movieMapper.updateSeat(
                seatCode,
                theaterCode,
                price != null ? price : 0,
                discount != null ? discount : 0,
                "Y"
            );
        } else {
            // 좌석 비활성화 처리 (삭제 대신)
            String seatCode = "A1";
            String theaterCode = "T001";
            movieMapper.updateSeat(
                seatCode,
                theaterCode,
                0,
                0,
                "N"
            );
        }
    }

    private Integer parseIntOrNull(String s) {
        try {
            return (s == null || s.isEmpty()) ? null : Integer.parseInt(s);
        } catch (Exception e) {
            return null;
        }
    }
}