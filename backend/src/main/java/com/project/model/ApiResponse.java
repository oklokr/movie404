package com.project.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {
    private int code;
    private String message;
    private Object data;

    public ApiResponse() {}

    public ApiResponse(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public ApiResponse(Object data) {
        this.code = 200;
        this.message = "success";
        this.data = data;
    }
}
