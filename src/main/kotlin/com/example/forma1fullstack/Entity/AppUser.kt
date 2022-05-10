package com.example.forma1fullstack.Entity

import javax.persistence.*

@Entity
@Table(name = "AppUser")
class AppUser(

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val Id: Long,

    val username: String,
    val password: String,
) {}