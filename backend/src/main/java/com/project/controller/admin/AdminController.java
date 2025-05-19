package com.project.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.model.ApiResponse;
import com.project.model.OrderDto;
import com.project.model.UserDto;
import com.project.model.VodDto;
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

        //회원 개인설정 변경
    @PostMapping("/user/set")
    public ApiResponse updateUserSet(@RequestBody Map<String, Object> body) {
        String id = (String) body.get("id");
        String adult = (String) body.get("adult");
        String lang = (String) body.get("lang");
        String dateformat = (String) body.get("dateformat");
        String savehistory = (String) body.get("savehistory");
        System.out.println("[/user/set]"+id+adult+lang+dateformat+savehistory);

        try{
            userService.updateUserSet(id, adult, lang, dateformat, savehistory);
            return new ApiResponse(200,"success",null);

        }catch(Exception e){
            System.out.println(e);
            return new ApiResponse(404,"fail",null);

        }

    }
            //회원 정보 변경
    @PostMapping("/user/info")
    public ApiResponse updateUser(@RequestBody Map<String, Object> body) {
        String id = (String) body.get("id");
        String pwd = (String) body.get("pwd");
        String email = (String) body.get("email");

        try{
            userService.updateUser(id, pwd, email);
            return new ApiResponse(200,"success",null);

        }catch(Exception e){
            System.out.println(e);
            return new ApiResponse(404,"fail",null);

        }

    }
    @PostMapping("/user/orderlist")
    public ApiResponse selectOrderList(@RequestBody Map<String, Object> body) {
        String id=(String) body.get("id");
        System.out.println("/user/orderlist");
        System.out.println(id);
        try{
            List<OrderDto> list = userService.selectOrderList(id);
            return new ApiResponse(200,"success",list);

        }catch(Exception e){
            System.out.println(e);
            return new ApiResponse(404,"fail",null);

        }    
    }
    
}