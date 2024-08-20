package com.example.TemplateApp.Document;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "org_names")
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) // TODO: check if this works
public class Organization {
    private String company;
    private String[] fields;
}
