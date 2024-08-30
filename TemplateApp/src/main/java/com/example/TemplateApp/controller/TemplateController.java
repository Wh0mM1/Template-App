package com.example.TemplateApp.controller;

import com.example.TemplateApp.service.OrgService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.List;


@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/template")
public class TemplateController {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private OrgService orgService;

    @PostMapping("/{companyName}")
    public String insertJson(@PathVariable String companyName, @RequestBody String jsonInput) {
        Document document = Document.parse(jsonInput);
        mongoTemplate.insert(document, companyName);
        return "Employee added to company: "+ companyName;
    }

    @GetMapping("/{companyName}")
    public ResponseEntity<List> templateScreen(@PathVariable String companyName){
        Query query = new Query();

        List<Document> result = mongoTemplate.find(query, Document.class, companyName);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/export/{collectionName}")
    public StreamingResponseBody exportCollectionToCsv(@PathVariable String collectionName, HttpServletResponse response) {
        response.setContentType("text/csv");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + collectionName + ".csv");

        return orgService.downloadCollectionAsCsv(collectionName);
    }
}
