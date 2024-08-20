package com.example.TemplateApp.controller;


import com.example.TemplateApp.Document.Organization;
import com.example.TemplateApp.model.OrgRequest;
import com.example.TemplateApp.service.OrgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/orgs")
public class OrgController {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private OrgService orgService;

    @PostMapping
    public String addingOrg(@RequestBody OrgRequest orgRequest){
        mongoTemplate.insert(orgRequest,"org_names");
        return "Added org successfully";
    }

    @GetMapping
    public List<Organization> getAllOrgs(){
        return orgService.getAllOrgs();
    }

    @GetMapping("/{name}")
    public ResponseEntity<Organization> getOrgInfo(@PathVariable String name){
        return new ResponseEntity<>(orgService.getOrgInfo(name), HttpStatus.OK);
    }

    @PutMapping("/{name}")
    public String editFields(@PathVariable String name,@RequestBody String fields){
        orgService.editFields(name,fields);
        return "Fields Edit Successful";
    }

}
