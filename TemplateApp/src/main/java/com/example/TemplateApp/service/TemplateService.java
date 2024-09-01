package com.example.TemplateApp.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

public interface TemplateService {
    StreamingResponseBody downloadCollectionAsCsv(String collectionName);

    void saveCSV(String collectionName, MultipartFile file);
}
