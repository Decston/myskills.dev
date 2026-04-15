package com.myskills.backend.service;

import com.myskills.backend.ai.AIClient;
import com.myskills.backend.dto.RecommendationResponse;
import com.myskills.backend.model.Technology;
import com.myskills.backend.repository.TechnologyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnologyService {

    private final TechnologyRepository repository;

    private final AIClient aiClient;

    public TechnologyService(TechnologyRepository repository, AIClient aiClient) {
        this.repository = repository;
        this.aiClient = aiClient;
    }

    public Technology create(Technology tech) {
        return repository.save(tech);
    }

    public List<Technology> findAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public RecommendationResponse recommendMock() {

        List<Technology> techs = repository.findAll();

        // 🔥 MOCK (por enquanto)
        return RecommendationResponse.builder()
                .suggestions(List.of("Docker", "TypeScript", "CI/CD"))
                .explanation("Baseado na sua stack atual, essas tecnologias vão elevar seu nível profissional.")
                .build();
    }

    public RecommendationResponse recommend() {

        List<Technology> techs = repository.findAll();

        return aiClient.getRecommendation(techs);
    }

}