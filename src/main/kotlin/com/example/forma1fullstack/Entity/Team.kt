package com.example.forma1fullstack.Entity

import java.time.LocalDate
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
class Team(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    val name: String,
    val isSignedUp : Boolean = false,
    val dateOfFoundation: LocalDate,
    val championship: Int
)
