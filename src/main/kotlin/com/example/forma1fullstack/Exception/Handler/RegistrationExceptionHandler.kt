package com.example.forma1fullstack.Exception.Handler

import com.example.forma1fullstack.Builder.SimpleErrorBuilder
import com.example.forma1fullstack.Entity.Response.Failure
import com.example.forma1fullstack.Exception.RegistrationException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class RegistrationExceptionHandler {

    @ExceptionHandler(RegistrationException::class)
    fun handler(
        registrationException: RegistrationException
    ) : ResponseEntity<Failure> {

        val failure = Failure(SimpleErrorBuilder.errorBuilder(registrationException))

        return ResponseEntity.badRequest().body(failure);
    }
}