package com.example.forma1fullstack.Entity.Request

import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class CheckJwtData(
    @field:NotNull(message = "Username is mandatory!")
    @field:Size(
        min = 5,
        max = 20,
        message = "The length of username should be between 5 and 20 characters"
    )
    val username: String,

    @field:NotNull(message = "JWT is mandatory!")
    val jwt: String
)
