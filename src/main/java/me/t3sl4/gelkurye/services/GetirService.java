package me.t3sl4.gelkurye.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GetirService {

    //@Autowired
    //private YourDatabaseService databaseService;

    public void fetchDataAndSaveToDb() {
        // Set the shopID, replace with your actual logic to get the shopID
        String shopID = "g8cq";

        // Set the URL with the shopID parameter
        String apiUrl = "https://locals-integration-api-gateway.artisandev.getirapi.com/v1/orders/" + shopID + "/active-orders";

        // Prepare headers if needed
        HttpHeaders headers = new HttpHeaders();
        // Add headers if needed, e.g., headers.set("Authorization", "Bearer yourAccessToken");

        // Create a request entity with headers
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        // Make an HTTP request to the external API
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                requestEntity,
                String.class,
                shopID
        );

        // Get the response body
        String apiResponse = responseEntity.getBody();

        // Print the response to the console
        System.out.println("API Response: " + apiResponse);

        // Save the response data to the database
        //databaseService.saveData(apiResponse);
    }
}
