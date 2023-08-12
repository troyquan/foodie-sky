package com.sky.controller.admin;
import com.sky.constant.MessageConstant;
import com.sky.result.Result;
import com.sky.utils.AliOssUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

/**
 * @author Lingjun
 * @date 2023/8/9 22:02
 */

/**
 * Common Interface
 */
@RestController
@RequestMapping("/admin/common")
@Api(tags = "Common Interface")
@Slf4j
public class CommonController {
    @Autowired
    private AliOssUtil aliOssUtil;

    /**
     * File Upload
     * @param file
     * @return
     */
    @PostMapping("/upload")
    @ApiOperation("File Upload")
    public Result<String> upload(MultipartFile file){
        log.info("File Upload：{}",file);

        try {
            //Original filename
            String originalFilename = file.getOriginalFilename();
            //Intercepts the suffix of the original filename   ***.png/***.jpg
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            //Constructing a new file name with a UUID.
            //UUID is called Universally Unique Identifier. It consists of a 32-bit hexadecimal character.
            //The purpose of the UUID is to allow all elements of a distributed system to be uniquely identified without the need to specify identification information through a central console.
            String objectName = UUID.randomUUID().toString() + extension;

            //The request path of the file
            String filePath = aliOssUtil.upload(file.getBytes(), objectName);
            return Result.success(filePath);
        } catch (IOException e) {
            log.error("File upload failed：{}", e);
        }

        return Result.error(MessageConstant.UPLOAD_FAILED);
    }
}
