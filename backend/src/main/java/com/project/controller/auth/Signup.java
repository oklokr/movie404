package com.project.controller.auth;

import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;
import com.project.model.UserDto;
import com.project.service.UserService;


import java.util.Map;
import org.springframework.mail.javamail.JavaMailSender;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
@RestController
@RequestMapping("/api")
public class Signup {
    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/checkId")
    public ApiResponse checkId(@RequestBody Map<String, Object> requestBody) {
        String text = (String) requestBody.get("id");
      
        int check = userService.checkId(text);
        if(check==0){
        return new ApiResponse(text);
        }
        return new ApiResponse(404,"fail",null);
    }

    @PostMapping("/checkEmail")
    public ApiResponse checkEmail(@RequestBody Map<String, Object> requestBody) {
        String text = (String) requestBody.get("email");
      
        int check = userService.checkEmail(text);
        if(check==0){
        return new ApiResponse(text);
        }
        return new ApiResponse(404,"fail",null);
    }

    private static String key;
	public void RandomKey(){
		key = Integer.toString( (int) Math.floor(Math.random()*90000)+10000);
	}

    @PostMapping("/authEmail")
    public ApiResponse authEmail(@RequestBody Map<String, Object> requestBody) {

        String email = (String) requestBody.get("email");

        MimeMessage message = mailSender.createMimeMessage();
		
		try {
			message.setFrom("socialquizwebsite@gmail.com");
			message.setRecipients(MimeMessage.RecipientType.TO, email);
			message.setSubject("MOVIE 404 CINEMA 회원가입 인증 메일입니다:)");
            RandomKey();
			String text = "";
			text += "<h1>"+"인증코드 : "+"</h1><br>";
			text += "<h2>"+key+"</h2>";
			//System.out.println(key);
			message.setText(text,"UTF-8","html");
			
			mailSender.send(message);

		} catch (MessagingException e) {
			e.printStackTrace();
		}
		System.out.println("[/sendmail] 메일 전송 성공!");


      
        return new ApiResponse(200,"success",key);
        
       // return new ApiResponse(404,"fail",null);
    }

    @PostMapping("/signup")
    public ApiResponse signup(@RequestBody Map<String, Object> requestBody) {
        UserDto userdto = new UserDto();
         userdto.setUserId((String) requestBody.get("id"));
         userdto.setPasswd((String) requestBody.get("pwd"));
         userdto.setEmail((String) requestBody.get("email"));


        int check = userService.insertUser(userdto);
        if(check==0){
        return new ApiResponse(userdto);
        }
        return new ApiResponse(404,"fail",null);
    }

}