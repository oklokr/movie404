package com.project.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {
    // API 경로 (예: /api/**) 및 정적 리소스 경로 (예: /static/**, /images/** 등)를 제외한
    // 모든 경로를 index.html로 포워딩한다.
    // 정규식은 실제 경로 패턴에 맞게 조정해야 할 수 있다.
    @RequestMapping({
        "/",
        "/{path:^(?!api|static|assets|textures|favicon\\.ico|index\\.html|robots\\.txt|manifest\\.json|.*\\.png).*$}",
        "/{path:^(?!api|static|assets|textures|favicon\\.ico|index\\.html|robots\\.txt|manifest\\.json|.*\\.png).*$}/**"
    })
    public String forward() {
        return "forward:/WEB-INF/classes/static/index.html"; // src/main/resources/static/index.html로 포워딩
    }
}