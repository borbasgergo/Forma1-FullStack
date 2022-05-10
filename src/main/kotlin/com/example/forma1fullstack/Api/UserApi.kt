package com.example.forma1fullstack.Api

import com.example.forma1fullstack.Entity.Response.Success
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/user/v1")
class UserApi {

    @PostMapping("/login")
    fun login(

    ) : ResponseEntity<Success> {

    }
}