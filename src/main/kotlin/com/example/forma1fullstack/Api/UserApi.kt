package com.example.forma1fullstack.Api

import com.example.forma1fullstack.Entity.Request.CheckJwtData
import com.example.forma1fullstack.Entity.Request.LoginRegisterData
import com.example.forma1fullstack.Entity.Response.Success
import com.example.forma1fullstack.Entity.User
import com.example.forma1fullstack.Service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/api/user/v1")
class UserApi(
    private val userService: UserService
) {

    @PostMapping("/login")
    fun login(
        @RequestBody(required = false) @Valid loginRequest: LoginRegisterData
    ) : ResponseEntity<Success> {

        val tokenSuccess = userService.login(loginRequest)
        return ResponseEntity.ok(tokenSuccess)
    }

    @PostMapping("/signup")
    fun signUp(
        @RequestBody(required = false) @Valid registerRequest: LoginRegisterData
    ) : ResponseEntity<Success> {

        val tokenSuccess = userService.register(registerRequest)
        return ResponseEntity.ok(tokenSuccess)
    }

    @PostMapping("/jwt")
    fun checkJwt(
        @RequestBody(required = false) @Valid jwtData: CheckJwtData
    ) : ResponseEntity<Success> {

        userService.checkJwt(jwtData)

        val user = userService.getUserDTO(jwtData.username)

        return ResponseEntity.ok().body(Success(object {
            val user = user
            val jwt = jwtData.jwt

        }))
    }
}