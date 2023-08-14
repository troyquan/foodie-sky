package com.sky.properties;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "sky.wechat")
@Data
public class WeChatProperties {

    private String appid; //appid in app
    private String secret; //secret key in app
    private String mchid; //merchant ID
    private String mchSerialNo; //Merchant API certificate's serial number
    private String privateKeyFilePath; //Merchant private key file.
    private String apiV3Key; //Key for certificate decryption.
    private String weChatPayCertFilePath; //Platform certificate
    private String notifyUrl; //Payment success callback URL
    private String refundNotifyUrl; //Refund success callback URL

}
