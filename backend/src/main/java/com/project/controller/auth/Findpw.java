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
@RequestMapping("/api")
public class Findpw {
     @Autowired
     private UserService userService;

     public String RandomString(String id){
        String newpw = "";
        int key = id.hashCode();
        newpw = Integer.toHexString((int) Math.floor(Math.random()*90000)+key);	
        return newpw;

     }
    @PostMapping("/findpw")
    public ApiResponse findId(@RequestBody Map<String, Object> requestBody) {
        String email = (String) requestBody.get("email");
        String id = (String) requestBody.get("id");

        int result = userService.checkUserByIdEmail(email, id);
        if(result ==1){
            String newpw = RandomString(id);
            userService.resetUserPassword(id, newpw);

            return new ApiResponse(200,"success",newpw);

        }
        else{
            return new ApiResponse(404,"fail",null);

        }

    }
}
