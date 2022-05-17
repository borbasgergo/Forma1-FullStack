package com.example.forma1fullstack.Service

import com.example.forma1fullstack.Entity.Request.CheckJwtData
import com.example.forma1fullstack.Entity.User
import com.example.forma1fullstack.Entity.Request.LoginRegisterData
import com.example.forma1fullstack.Entity.Response.Success
import com.example.forma1fullstack.Entity.UserDTO
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

        val user = findByUsername(loginRequest.username!!)

        checkPassword(user.password,loginRequest.password!!)

        try {

            val token = jwtService.generateToken(user.username)

            return Success(object {
                val id: Long = user.Id
                val token: String = token
            })

        } catch( ex: Exception ) {
            throw java.lang.RuntimeException("Error due to creating jwt token, try again!")
        }

    }

    fun register(
        registerRequest: LoginRegisterData
    ) : Success {

        val hashedPassword = BCrypt.hashpw(
            registerRequest.password!!,
            BCrypt.gensalt(10)
        )

        val user = User(
            username = registerRequest.username!!,
            password = hashedPassword
        )

        try {
            val savedUser: User = userRepository.save(user)

            val token = jwtService.generateToken(savedUser.username)

            return Success(object {
                val id = savedUser.Id
                val token = token
            })

        } catch( ex: Exception) {
            throw RegistrationException("UserService "+ex.message!!)
        }
    }

    fun getUserDTO(username: String): UserDTO {
        val user = this.findByUsername(username)

        return UserDTO(user)
    }

    @kotlin.jvm.Throws(NotFoundByUsernameException::class)
    fun findByUsername(username: String): User {
        return userRepository.findByUsername(username)
            ?: throw NotFoundByUsernameException()
    }

    fun checkJwt(jwtData: CheckJwtData) {
        if(!jwtService.validateToken(jwtData.jwt, jwtData.username))
            throw java.lang.RuntimeException("Invalid token!")
    }


    @Throws(java.lang.RuntimeException::class)
    private fun checkPassword(hash: String, purePsw: String) {
        if(!passwordEncoder.matches(purePsw, hash))
            throw java.lang.RuntimeException("Couldn't login due to invalid password")
    }



}