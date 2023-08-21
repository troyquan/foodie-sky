package com.sky.utils;


import com.sky.entity.ShoppingCart;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class StripePayUtil {
    @Value("${sky.stripe.api.key}")
    private String stripeApiKey;

    public String createPaymentIntent(List<ShoppingCart> shoppingCartList) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        List<Map<String,Object>> items = new ArrayList<>();
        for (ShoppingCart shoppingCart : shoppingCartList) {
            Map<String,Object> item = new HashMap<>();
            item.put("name",shoppingCart.getName());
            item.put("amount", shoppingCart.getAmount());
            item.put("number",shoppingCart.getNumber());
            item.put("currency", "cad");
            items.add(item);
        }
        Map<String, Object> automaticPaymentMethods =
                new HashMap<>();
        automaticPaymentMethods.put("enabled", true);
        Map<String,Object> params = new HashMap<>();
//        params.put("line_items", items);
        params.put("amount",calculateTotalAmount(shoppingCartList));
        params.put("currency", "cad");



        PaymentIntent paymentIntent = PaymentIntent.create(params);
        System.out.println(paymentIntent);
        return paymentIntent.getClientSecret();
    }

    private int calculateTotalAmount(List<ShoppingCart> shoppingCartList) {
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (ShoppingCart shoppingCart : shoppingCartList) {
            BigDecimal itemAmount = shoppingCart.getAmount().multiply(BigDecimal.valueOf(shoppingCart.getNumber()));
            totalAmount = totalAmount.add(itemAmount);
        }

        return totalAmount.multiply(BigDecimal.valueOf(100)).intValue();
    }
}
