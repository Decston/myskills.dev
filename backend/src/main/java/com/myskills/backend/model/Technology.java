package com.myskills.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "technologies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Technology {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;
    // Ex: LANGUAGE, FRAMEWORK, DATABASE

    private String level;
    // Ex: BEGINNER, INTERMEDIATE, ADVANCED
}