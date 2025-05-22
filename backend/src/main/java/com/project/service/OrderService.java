package com.project.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.project.model.Order;
import com.project.repository.OrderMapper;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;
    private final IamportClient iamportClient;

    public Order createOrder(String userId, String movieCode, int price) {
        String orderCode = UUID.randomUUID().toString();

        Order order = new Order();
        order.setOrderCode(orderCode);
        order.setUserId(userId);
        order.setMovieCode(movieCode);
        order.setPrice(price);
        order.setOrderDate(LocalDate.now());

        orderMapper.insertOrder(order);

        return order;
    }

    public IamportResponse<Payment> validatePayment(String orderCode, String impUid) {
        try {
            Order order = orderMapper.findOrderByCode(orderCode);
            if (order == null) throw new IllegalStateException("주문이 존재하지 않습니다.");

            IamportResponse<Payment> paymentResponse = iamportClient.paymentByImpUid(impUid);

            BigDecimal paidAmount = paymentResponse.getResponse().getAmount();
            if (!paidAmount.equals(BigDecimal.valueOf(order.getPrice()))) {
                throw new IllegalStateException("결제 금액 불일치");
            }

            // 카드 번호 업데이트
            String cardNum = paymentResponse.getResponse().getCardNumber();
            orderMapper.updateCardNum(orderCode, cardNum);

            return paymentResponse;

        } catch (Exception e) {
            throw new RuntimeException("결제 검증 실패", e);
        }
    }
}