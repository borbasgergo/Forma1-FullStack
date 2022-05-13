package com.example.forma1fullstack.Service

import com.example.forma1fullstack.Entity.User
import com.example.forma1fullstack.Entity.Request.LoginRegisterData
import com.example.forma1fullstack.Entity.Response.Success
import com.example.forma1fullstack.Exception.NotFoundByUsernameException
import com.example.forma1fullstack.Exception.RegistrationException
import com.example.forma1fullstack.Repository.UserRepository
import org.springframework.security.crypto.bcrypt.BCrypt
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService(
    private val passwordEncoder: BCryptPasswordEncoder,
    private val userRepository: UserRepository,
    private val jwtService: JwtService
) {

    fun login(
        loginRequest: LoginRegisterData
    ) : Success {

        val user = checkUser(loginRequest.username!!)

        checkPassword(loginRequest.password!!, user.password)

        try {

            val token = jwtService.generateToken(user.username)

            return Success(object {
                val token: String = token
            })

        } catch( ex: Exception ) {
            throw java.lang.RuntimeException("Error due to creating jwt token, try again!")
        }

    }

    fun register(
        registerRequest: LoginRegisterData
    ) : Success {

        val hashedPassword = BCrypt.hashpw(registerRequest.password!!, BCrypt.gensalt(10))

        val user = User(username = registerRequest.username!!, password = hashedPassword)

        try {
            val savedUser: User = userRepository.save(user)

            val token = jwtService.generateToken(savedUser.username)

            return Success(object {
                val token = token
            })

        } catch( ex: Exception) {
            throw RegistrationException("UserService "+ex.message!!)
        }
    }

    @Throws(NotFoundByUsernameException::class)
    private fun checkUser(username: String) : User {
        return userRepository.findByUsername(username) // '!!' can be used safely because of the validation
            ?: throw NotFoundByUsernameException()
    }

    @Throws(java.lang.RuntimeException::class)
    private fun checkPassword(hash: String, purePsw: String) {
        if(!passwordEncoder.matches(purePsw, hash))
            throw java.lang.RuntimeException("Couldn't login due to invalid password")
    }



}