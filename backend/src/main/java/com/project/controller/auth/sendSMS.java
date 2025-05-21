package com.project.controller.auth;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Balance;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.model.StorageType;
import net.nurigo.sdk.message.request.MessageListRequest;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.MessageListResponse;
import net.nurigo.sdk.message.response.MultipleDetailMessageSentResponse;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class sendSMS {

    final DefaultMessageService messageService;

    public sendSMS() {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        this.messageService = NurigoApp.INSTANCE.initialize("NCSH6DKDDSRZ9OVG", "DQ75ZDEW0G2AE3BO2QHWOMUKDEWDCXK8", "https://api.coolsms.co.kr");
    }  

    /**
     * 단일 메시지 발송 예제
     */
        private static String key;

   @PostMapping("/send-one")
    public SingleMessageSentResponse sendOne(@RequestBody Map<String, Object> body) {
        String id=(String) body.get("phone");
        System.out.println(id);
        Message message = new Message();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01049222126");
        message.setTo("01049222126");
        //랜덤키 생성
        key = Integer.toString( (int) Math.floor(Math.random()*90000)+10000);

        message.setText("테스트 문자입니다. 인증번호["+key+"]를 입력해주세요.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        return response;
    }
       @PostMapping("/sms-auth")
        public ApiResponse smsAuth(@RequestBody Map<String, Object> body) {
        String code=(String) body.get("code");
        System.out.println(code);
        System.out.println(key);
        if(key.equals(code)){
           return new ApiResponse(200,"success",null);
        }
        else{
            return new ApiResponse(404,"success",null);

        }
    }


}