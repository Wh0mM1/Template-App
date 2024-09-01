package com.example.TemplateApp.service;

import com.example.TemplateApp.Document.Organization;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.List;

public interface OrgService {
    List getAllOrgs();

    Organization getOrgInfo(String name);

    void editFields(String name, String field);


}
