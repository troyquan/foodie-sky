package com.sky.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;

public class JwtUtil {
    /**
     * Generate JWT
     * Use HS256 algorithm, with a fixed secret key
     *
     * @param secretKey JWT secret key
     * @param ttlMillis JWT expiration time (milliseconds)
     * @param claims    Information to set
     * @return
     */
    public static String createJWT(String secretKey, long ttlMillis, Map<String, Object> claims) {
        // Specify the signature algorithm to use during signing, corresponding to the JWT header part
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        // Generate the expiration time for the JWT
        long expMillis = System.currentTimeMillis() + ttlMillis;
        Date exp = new Date(expMillis);

        // Set up the JWT body
        JwtBuilder builder = Jwts.builder()
                // If there are private claims, they should be set first. Once set, if standard claims are added after, they will overwrite these private claims.
                .setClaims(claims)
                // Specify the signature algorithm and the secret key for signing
                .signWith(signatureAlgorithm, secretKey.getBytes(StandardCharsets.UTF_8))
                // Set the expiration time
                .setExpiration(exp);

        return builder.compact();
    }


    /**
     * Decrypt the token.
     *
     * @param secretKey JWT secret key. This key must be kept secure on the server side. Exposure can lead to token forgery. If working with multiple clients, consider using multiple keys.
     * @param token     The encrypted token
     * @return Claims object containing the token's payload
     */
    public static Claims parseJWT(String secretKey, String token) {
        // Obtain the DefaultJwtParser
        Claims claims = Jwts.parser()
                // Set the signing secret key
                .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                // Specify the JWT to be parsed
                .parseClaimsJws(token).getBody();
        return claims;
    }


}
