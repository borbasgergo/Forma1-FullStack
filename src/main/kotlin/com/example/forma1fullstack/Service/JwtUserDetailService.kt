package com.example.forma1fullstack.Service

import com.example.forma1fullstack.Entity.AppUserDetails
import com.example.forma1fullstack.Exception.NotFoundByUsernameException
import com.example.forma1fullstack.Repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class JwtUserDetailService(
    private val userRepository: UserRepository
) : UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
            ?: throw NotFoundByUsernameException();
        return AppUserDetails(user);
    }
}