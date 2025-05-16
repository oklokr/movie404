package com.project.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.model.ApiResponse;
import com.project.model.UserDto;
import com.project.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public List<UserDto> getUserList() {
        return userService.getUserList();
    }

    @GetMapping("/user/{id}")
    public UserDto getUserDetail(@PathVariable("id") String id) {
        return userService.getUserDetail(id);
    }

    // 회원 비밀번호 초기화 (비밀번호를 1234로 변경)
    @PostMapping("/user/{id}/reset-password")
    public int resetUserPassword(@PathVariable("id") String id) {
        return userService.resetUserPassword(id, "1234");
    }

    // 회원 유형 변경
    @PutMapping("/user/{id}/type")
    public int updateUserType(@PathVariable("id") String id, @RequestBody Map<String, Object> body) {
        String type = (String) body.get("type");
        return userService.updateUserType(id, type);
    }

    //회원 약관동의 변경
    @PostMapping("/user/terms")
    public ApiResponse updateUserTerms(@RequestBody Map<String, Object> body) {
        String id = (String) body.get("id");
        String terms = (String) body.get("terms");
        
        try{
            userService.updateUserTerms(id, terms);
            return new ApiResponse(200,"success",null);

        }catch(Exception e){
            return new ApiResponse(404,"fail",null);

        }

    }
    
}