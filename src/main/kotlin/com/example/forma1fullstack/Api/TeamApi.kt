package com.example.forma1fullstack.Api

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/team/v1")
class TeamApi {

    /*
        ONLY FOR TESTING PURPOSES
     */
    @GetMapping
    fun getAll(): ResponseEntity<String> {
        return ResponseEntity.ok("Success");
    }
}