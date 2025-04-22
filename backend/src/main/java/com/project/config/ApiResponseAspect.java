package com.project.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.project.model.ApiResponse;

@Aspect
@Component
public class ApiResponseAspect {

    @AfterReturning(pointcut = "execution(public * com.project.controller..*.*(..))", returning = "result")
    public Object wrapResponse(JoinPoint joinPoint, Object result) {
        if(result instanceof ApiResponse) {
            ApiResponse apiResponse = (ApiResponse) result;
            int code = apiResponse.getCode();
            if( code != 200 ) apiResponse.setData(null);
            return apiResponse;
        } else {
            return new ApiResponse(200, "success", result);
        }
    }

    @AfterThrowing(pointcut = "execution(public * com.project.controller..*.*(..))", throwing = "ex")
    public Object handleException(Exception ex) {
        return new ApiResponse(500, ex.getMessage(), null);
    }
}