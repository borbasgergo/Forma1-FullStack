package com.example.forma1fullstack.Entity

import org.hibernate.annotations.GenericGenerator
import javax.persistence.*

@Entity
data class User(
    @field:Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val Id: Long = 0,

    @Column(unique = true)
    val username: String,
    val password: String,
) {
}