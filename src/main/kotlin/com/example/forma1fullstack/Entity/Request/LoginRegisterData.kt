package com.example.forma1fullstack.Entity.Request

import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class LoginRegisterData(
    @field:NotBlank(message = "Username is mandatory!")
    @field:Size(
        min = 5,
        max = 20,
        message = "The length of username should be between 5 and 20 characters"
    )
    val username: String?,

    @field:NotNull(message = "Password is mandatory!")
    @field:Size(
        min = 5,
        max = 20,
        message = "The length of password should be between 5 and 20 characters"
    )
    val password: String?
)
