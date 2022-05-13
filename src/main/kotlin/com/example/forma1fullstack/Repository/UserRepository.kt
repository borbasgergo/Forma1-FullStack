package com.example.forma1fullstack.Repository

import com.example.forma1fullstack.Entity.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : CrudRepository<User, Long> {

    fun findByUsername(username: String) : User?
}