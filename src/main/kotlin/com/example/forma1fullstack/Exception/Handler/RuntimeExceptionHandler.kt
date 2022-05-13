package com.example.forma1fullstack.Exception.Handler

import com.example.forma1fullstack.Builder.SimpleErrorBuilder
import com.example.forma1fullstack.Entity.Response.Errors
import com.example.forma1fullstack.Entity.Response.Failure
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class RuntimeExceptionHandler {

    @ExceptionHandler(java.lang.RuntimeException::class)
    fun handler(
        exception: RuntimeException
    ) : ResponseEntity<Failure> {

        val failure = Failure(SimpleErrorBuilder.errorBuilder(exception))

        return ResponseEntity.badRequest().body(failure)
    }


}