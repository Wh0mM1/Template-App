package com.example.TemplateApp.repository;

import com.example.TemplateApp.Document.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrgRepository extends MongoRepository<Organization,String> {
}
