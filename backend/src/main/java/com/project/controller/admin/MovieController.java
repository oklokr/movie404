package com.project.controller.admin;

import com.project.model.ApiResponse;
import com.project.model.MovieDto;
import com.project.model.VodDto;
import com.project.service.MovieService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        @RequestParam(name = "genreTpcd", required = false) String genreTpcd,
        @RequestParam(name = "movieName", required = false) String movieName,
        @RequestParam(name = "schedule",  required = false) String schedule,
        @RequestParam(name = "page",      defaultValue = "1")  int page,
        @RequestParam(name = "size",      defaultValue = "10") int size
    ) {
        return movieService.getMovieList(genreTpcd, movieName, schedule, page, size);
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
    public ResponseEntity<?> createMovie(
            @RequestParam Map<String, String> allParams
    ) {
        movieService.createMovie(allParams);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/creator")
    public List<Map<String, Object>> getCreatorList() {
        return movieService.getCreatorList();
    }

    @PutMapping("/{movieCode}")
    public ResponseEntity<?> updateMovie(
            @PathVariable("movieCode") String movieCode,
            @RequestParam Map<String, String> allParams
    ) {
        movieService.updateMovie(movieCode, allParams);
        return ResponseEntity.ok().build();
    }
    /*@PostMapping("/uservod")
    public MovieDto selectUserVod(@RequestBody Map<String, Object> requestBody) {
        String id = (String) requestBody.get("id");
        Movie movieService.selectUserVod(id);
        if()
        return ResponseEntity.ok().build();
    }*/

    @PostMapping("/schedule")
    public ResponseEntity<?> createRunSchedule(@RequestBody Map<String, Object> param) {
        movieService.createRunSchedule(param);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/schedule")
    public List<Map<String, Object>> getRunScheduleList(
        @RequestParam(name = "runDate", required = false) String runDate,
        @RequestParam(name = "theaterCode", required = false) String theaterCode
    ) {
        return movieService.getRunScheduleList(runDate, theaterCode);
    }

    @PostMapping("/uservodlist")
    public ApiResponse selectUserVodList(@RequestBody Map<String, Object> requestBody) {
                String id = (String) requestBody.get("id");
                
                try{
                    List<VodDto> list= movieService.selectUserVodList(id);
                    return new ApiResponse(200,"success",list);
                }catch(Exception e){
                    System.out.println(e);
                    return new ApiResponse(404,"fail",null);
                }

    }

    // 상영관(극장) 추가
    @PostMapping("/theater")
    public ResponseEntity<?> createTheater(@RequestBody Map<String, String> param) {
        String code = param.get("code");
        String name = param.get("name");
        movieService.createTheater(code, name);
        return ResponseEntity.ok().build();
    }

    // 상영관(극장) 삭제
    @DeleteMapping("/theater")
    public ResponseEntity<?> deleteTheater(@RequestBody Map<String, String> param) {
        String code = param.get("code");
        movieService.deleteTheater(code);
        return ResponseEntity.ok().build();
    }

    // 상영관(극장) 목록 조회 (필요시)
    @GetMapping("/theater")
    public List<Map<String, Object>> getTheaterList() {
        return movieService.getTheaterList();
    }
}