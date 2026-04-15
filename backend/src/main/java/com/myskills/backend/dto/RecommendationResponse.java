package com.myskills.backend.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecommendationResponse {

    private List<String> suggestions;
    private String explanation;

}