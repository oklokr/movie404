package com.project.controller.order;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.model.ApiResponse;
import com.project.model.Order;
import com.project.service.OrderService;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/create")
    public ApiResponse createOrder(@RequestBody Map<String, Object> body) {
        try {
            String userId = (String) body.get("userId");
            String movieCode = (String) body.get("movieCode");
            int price = Integer.parseInt(body.get("price").toString());

            Order order = orderService.createOrder(userId, movieCode, price);
            return new ApiResponse(order);

        } catch (Exception e) {
            return new ApiResponse(500, "주문 생성 실패: " + e.getMessage(), null);
        }
    }

    @PostMapping("/validate")
    public ApiResponse validatePayment(@RequestBody Map<String, String> body) {
        try {
            String orderCode = body.get("orderCode");
            String impUid = body.get("impUid");

            IamportResponse<Payment> response = orderService.validatePayment(orderCode, impUid);
            return new ApiResponse(response);

        } catch (IllegalStateException e) {
            return new ApiResponse(400, "결제 검증 실패: " + e.getMessage(), null);
        } catch (Exception e) {
            return new ApiResponse(500, "시스템 오류: " + e.getMessage(), null);
        }
    }
}