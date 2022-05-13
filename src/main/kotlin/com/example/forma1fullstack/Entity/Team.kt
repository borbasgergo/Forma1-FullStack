package com.example.forma1fullstack.Entity

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.validation.constraints.Min
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

@Entity
data class Team(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @field:NotEmpty(message = "Name is mandatory")
    @field:Size(min=3, max=20)
    val name: String?,

    @field:NotNull(message = "Signed up is mandatory!")
    val isSignedUp : Boolean = false,

    @field:JsonFormat(pattern="yyyy-MM-dd")
    @field:NotNull(message = "Date of foundation is mandatory!")
    val dateOfFoundation: LocalDate?,

    @field:Min(1, message = "Amount of victories must be greater than 1!")
    val championship: Int = 0
)
