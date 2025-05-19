package com.project.model;

import java.sql.Date;
import java.sql.Time;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VodDto {
    private String poster;
    private String movieName;
    private String synopsis;
    private Date watchdate;
    private Time watchtime;
    private String directorA;
    private String actorA;
    private String actorB;
    private String actorC;

}