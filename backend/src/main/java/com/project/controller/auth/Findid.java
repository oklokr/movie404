package com.project.controller.auth;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;
import com.project.service.UserService;

@RestController
@RequestMapping("/api/find")
public class Findid {
     @Autowired
     private UserService userService;

    @PostMapping("/findid")
    public ApiResponse findId(@RequestBody Map<String, Object> requestBody) {
        String text = (String) requestBody.get("email");

        String id = userService.selectIdbyEmail(text);

        if(id!=""){
            int length = id.length();

            if(length<5)
               id = id.substring(0,length-2) +"**";
            else
               id = id.substring(0,length-3)+"***" ;

        return new ApiResponse(id);
        }

        return new ApiResponse(404,"fail",null);
    }
}
