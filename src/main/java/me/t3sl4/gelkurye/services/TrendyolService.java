package me.t3sl4.gelkurye.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

@Service
public class TrendyolService {

    //@Autowired
    //private YourDatabaseService databaseService;

    public void fetchDataAndSaveToDb() {
        // Set your Trendyol API credentials
        String apiKey = "64qQhfJV4qZHLU1INWL3";
        String apiSecret = "jHt91BYIJXsCYB2S2mVe";
        String shopID = "736495";

        // Set the URL with the shopID parameter
        String apiUrl = "https://api.trendyol.com/mealgw/suppliers/" + shopID + "/packages";

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + getEncodedCredentials(apiKey, apiSecret));
        headers.set("Content-Type", "application/json");
        headers.set("x-agentname", "your_agent_name"); // Burada Trendyol API'nin beklediği entegratör ismini eklemelisiniz
        headers.set("x-executor-user", "destek@hidirektor.com.tr");

        // Make an HTTP request to the external API
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                null,
                String.class,
                Map.of(), // Add query parameters if needed
                headers // Add headers
        );

        // Get the response body
        String apiResponse = responseEntity.getBody();

        // Print the response to the console
        System.out.println("API Response: " + apiResponse);

        // Save the response data to the database
        //databaseService.saveData(apiResponse);
    }

    private String getEncodedCredentials(String apiKey, String apiSecret) {
        String credentials = apiKey + ":" + apiSecret;
        return Base64.getEncoder().encodeToString(credentials.getBytes());
    }

    public void testReq() {
        int MAGAZAID = 553761;
        String API_KEY = "NxTVQPtIaqNzgbaGrStV";
        String API_SECRET = "5vjfmoIr3L00xbpWCEAI";

        String credentials = API_KEY + ":" + API_SECRET;
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());

        String apiUrl = "https://api.trendyol.com/mealgw/suppliers/" + MAGAZAID + "/packages?packageStatuses=Created";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + encodedCredentials);
        headers.add("Content-Type", "application/json");
        headers.add("x-agentname", "hidirektor");
        headers.add("x-executor-user", "destek@hidirektor.com.tr");

        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                requestEntity,
                String.class
        );

        String responseBody = responseEntity.getBody();
        System.out.println(responseBody);
    }
}
