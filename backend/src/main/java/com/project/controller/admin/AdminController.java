package com.project.controller.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.project.model.UserDto;
import com.project.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/admin")
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
}