package com.example.forma1fullstack.Exception.Handler

import com.example.forma1fullstack.Entity.Response.Errors
import com.example.forma1fullstack.Entity.Response.Failure
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class NotValidExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handler(
        exception: MethodArgumentNotValidException
    ) : ResponseEntity<Failure> {

        val failure = Failure(errorBuilder(exception))

        return ResponseEntity.badRequest().body(failure)
    }

    internal fun errorBuilder(exception: MethodArgumentNotValidException)
        : Errors
    {
        var errors = hashMapOf<String, String>();

        exception.bindingResult.allErrors.forEach {
            errors[(it as FieldError).field] = it.defaultMessage!!
        }

        return errors
    }
}