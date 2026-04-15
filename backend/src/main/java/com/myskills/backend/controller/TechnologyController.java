package com.myskills.backend.controller;

import com.myskills.backend.dto.RecommendationResponse;
import com.myskills.backend.model.Technology;
import com.myskills.backend.service.TechnologyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/technologies")
@CrossOrigin(origins = "*")
public class TechnologyController {

    private final TechnologyService service;

    public TechnologyController(TechnologyService service) {
        this.service = service;
    }

    @PostMapping
    public Technology create(@RequestBody Technology tech) {
        return service.create(tech);
    }

    @GetMapping
    public List<Technology> findAll() {
        return service.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/recommend")
    public RecommendationResponse recommend() {
        return service.recommend();
    }

}