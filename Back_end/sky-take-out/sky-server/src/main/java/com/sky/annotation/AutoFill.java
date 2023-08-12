package com.sky.annotation;

/**
 * @author Lingjun
 * @date 2023/8/9 14:25
 */

import com.sky.enumeration.OperationType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Custom annotations to identify a method that requires function field autofill processing
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AutoFill {
    //Types of database operations：UPDATE INSERT
    OperationType value();
}
