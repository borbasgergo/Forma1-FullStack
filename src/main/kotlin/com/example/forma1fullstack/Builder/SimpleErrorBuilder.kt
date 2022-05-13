package com.example.forma1fullstack.Builder

import com.example.forma1fullstack.Entity.Response.Errors
import com.example.forma1fullstack.Entity.Response.Failure
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException

class SimpleErrorBuilder {

    companion object {
        fun errorBuilder(exception: RuntimeException)
                : Errors
        {
            var errors = hashMapOf<String, String>();

            errors["message"] = exception.message ?: "Error occurred!"

            return errors
        }

    }
}