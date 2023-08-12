package com.sky.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "sky.jwt")
@Data
public class JwtProperties {

    /**
     * Configuration related to admin staff generating JWT tokens
     */
    private String adminSecretKey;
    private long adminTtl;
    private String adminTokenName;

    /**
     * Configuration related to WeChat users on the client side generating JWT tokens.
     */
    private String userSecretKey;
    private long userTtl;
    private String userTokenName;

}
