package com.example.TemplateApp.controller;

import com.example.TemplateApp.Document.Organization;
import com.example.TemplateApp.service.OrgService;
import com.example.TemplateApp.service.TemplateService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
    private TemplateService templateService;

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

        return templateService.downloadCollectionAsCsv(collectionName);
    }


    @DeleteMapping("/{collectionName}/{fieldsName}/{fieldValue}")
    public String deleteUserByField(@PathVariable String collectionName,@PathVariable String fieldsName,@PathVariable String fieldValue){
        Query query=new Query(Criteria.where(fieldsName).is(fieldValue));
        mongoTemplate.remove(query,collectionName);
        return "User is removed with id";
    }

    @PostMapping("/upload-csv/{collectionName}")
    public ResponseEntity<String> uploadCSV(@PathVariable("collectionName") String collectionName,
                                            @RequestParam("file") MultipartFile file
                                            ) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
        }

        try {
            templateService.saveCSV(collectionName, file);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
    }
}
