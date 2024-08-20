package com.example.TemplateApp.service;

import com.example.TemplateApp.Document.Organization;

import java.util.List;

public interface OrgService {
    List getAllOrgs();

    Organization getOrgInfo(String name);

    void editFields(String name, String field);
}
