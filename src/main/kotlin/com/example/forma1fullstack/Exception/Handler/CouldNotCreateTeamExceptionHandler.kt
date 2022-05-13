package com.example.forma1fullstack.Exception.Handler

import com.example.forma1fullstack.Builder.SimpleErrorBuilder
import com.example.forma1fullstack.Entity.Response.Failure
import com.example.forma1fullstack.Exception.CouldNotCreateTeamException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class CouldNotCreateTeamExceptionHandler {

    @ExceptionHandler(CouldNotCreateTeamException::class)
    fun handler(
        exception: CouldNotCreateTeamException
    ) : ResponseEntity<Failure> {

        val failure = Failure(SimpleErrorBuilder.errorBuilder(exception))

        return ResponseEntity.badRequest().body(failure)
    }
}