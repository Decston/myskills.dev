package com.myskills.backend.ai;

import com.myskills.backend.dto.RecommendationResponse;
import com.myskills.backend.model.Technology;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class AIClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public RecommendationResponse getRecommendation(List<Technology> technologies) {

        String url = "http://localhost:3001/recommend";

        Map<String, Object> body = new HashMap<>();
        body.put("technologies", technologies);

        RecommendationResponse response =
                restTemplate.postForObject(url, body, RecommendationResponse.class);

        return response;
    }

}