package com.example.TemplateApp.service;

import com.example.TemplateApp.Document.Organization;
import com.example.TemplateApp.repository.OrgRepository;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import org.bson.Document;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
public class OrgServiceImpl implements OrgService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private OrgRepository orgRepository;

    @Override
    public List<Organization> getAllOrgs() {
        List<Organization> organizations = orgRepository.findAll();
        log.info("All organizations: {}", organizations);
        return organizations;
    }

    @Override
    public Organization getOrgInfo(String name) {
        Query query = new Query(Criteria.where("company").is(name));
        return mongoTemplate.findOne(query, Organization.class, "org_names");
    }

    @Override
    public void editFields(String name, String field) {

        field=field.substring(1,field.length()-1);
        Query query = new Query(Criteria.where("company").is(name));
        Organization organization = mongoTemplate.findOne(query, Organization.class, "org_names");

        if (organization == null) {
            log.warn("Organization with name {} not found", name);
            return;
        }

        List<String> existingFields = Arrays.asList(organization.getFields());
        List<String> updatedFields = Arrays.stream(field.replace("[", "").replace("]", "").split(","))
                .map(String::trim)
                .collect(Collectors.toList());

        List<String> fieldsToRemove = existingFields.stream()
                .filter(existingField -> !updatedFields.contains(existingField))
                .collect(Collectors.toList());

        // Remove fields from all documents in the collection where the field exists
        fieldsToRemove.forEach(fieldToRemove -> {
            Query removeFieldQuery = new Query();
            Update removeFieldUpdate = new Update().unset(fieldToRemove);
            mongoTemplate.updateMulti(removeFieldQuery, removeFieldUpdate, name);
        });

        // Update the fields array
        Update update = new Update().set("fields", updatedFields.toArray(new String[0]));
        mongoTemplate.updateFirst(query, update, "org_names");

        log.info("Updated fields for organization {}: {}", name, updatedFields);
    }


}
