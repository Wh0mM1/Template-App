package com.example.TemplateApp.service;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.*;

@Service
@Log4j2
public class TemplateServiceImpl implements TemplateService{
    @Autowired
    private MongoTemplate mongoTemplate;

    public StreamingResponseBody downloadCollectionAsCsv(String collectionName) {
        List<Map> documents = mongoTemplate.findAll(Map.class, collectionName);

        return outputStream -> {
            if (!documents.isEmpty()) {
                // Set to collect all field names across documents
                Set<String> headers = new HashSet<>();

                // Accumulate all possible field names
                for (Map<String, Object> document : documents) {
                    headers.addAll(document.keySet());
                }

                try (OutputStreamWriter writer = new OutputStreamWriter(outputStream);
                     CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT.withHeader(headers.toArray(new String[0])))) {

                    // Write each document's values as a CSV record
                    for (Map<String, Object> document : documents) {
                        csvPrinter.printRecord(headers.stream().map(header -> document.getOrDefault(header, "")).toArray());
                    }
                }
            }
        };
    }

    public void saveCSV(String collectionName, MultipartFile file) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());

            List<Document> documents = new ArrayList<>();
            for (CSVRecord csvRecord : csvParser) {
                Document document = new Document();
                for (String header : csvParser.getHeaderMap().keySet()) {
                    document.append(header, csvRecord.get(header));
                }
                documents.add(document);
            }

            mongoTemplate.insert(documents, collectionName);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse CSV file: " + e.getMessage());
        }
    }
}
