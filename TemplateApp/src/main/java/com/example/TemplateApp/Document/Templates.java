package com.example.TemplateApp.Document;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;


@Data
@Document(collection = "templates")
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Templates {
    @Id
    private String id= UUID.randomUUID().toString();
    private String firstName;
    private String lastName;
    private Date dob;
    private String city;
    private String email;
}
