package com.example.TemplateApp.service;


import com.example.TemplateApp.Document.Organization;
import com.example.TemplateApp.repository.OrgRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class OrgServiceImpl implements OrgService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private OrgRepository orgRepository;
    @Override
    public List<Organization> getAllOrgs() {
        log.info(orgRepository.findAll().toString());
        return orgRepository.findAll();
    }

    @Override
    public Organization getOrgInfo(String name) {
        Query query = new Query();
        query.addCriteria(Criteria.where("company").is(name));

        Organization organization=mongoTemplate.findOne(query, Organization.class, "org_names");
        return organization;
    }

    @Override
    public void editFields(String name, String field) {
        Query query=new Query();
        query.addCriteria(Criteria.where("company").is(name));

        Update update=new Update();
        String[] flds=field.split(",");
        log.info(flds.length);
        flds[0]=flds[0].substring(1);
        flds[flds.length-1]=flds[flds.length-1].substring(0,flds[flds.length-1].length()-1);
        update.set("fields",flds);
        mongoTemplate.updateFirst(query,update,"org_names");
    }


}
