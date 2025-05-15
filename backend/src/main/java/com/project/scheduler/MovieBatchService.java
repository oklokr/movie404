package com.project.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieBatchService {

    public void updateMovies() {
        log.info("🎉 영화 배치 완료");
    }
}
