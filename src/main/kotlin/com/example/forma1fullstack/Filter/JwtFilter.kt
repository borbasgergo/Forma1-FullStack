package com.example.forma1fullstack.Filter


import com.example.forma1fullstack.Builder.SimpleErrorBuilder
import com.example.forma1fullstack.Entity.AppUserDetails
import com.example.forma1fullstack.Entity.Response.Errors
import com.example.forma1fullstack.Entity.Response.Failure
import com.example.forma1fullstack.Service.JwtService
import com.example.forma1fullstack.Service.JwtUserDetailService
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JwtFilter(
    private val jwtService: JwtService,
    private val userDetailService: JwtUserDetailService
) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            val authHeader = checkHeader(request)
            checkBearer(authHeader)

            val token = getTokenFromHeader(authHeader)

            val username = jwtService.extractUsername(token)
            checkUsernameEmpty(username)

            val userDetails = userDetailService.loadUserByUsername(username)

            checkIfTokenValid(token, userDetails)

            populateRequestWithAuthenticatedUserData(request, userDetails)

            //continue filter chain
            filterChain.doFilter(request, response)

        } catch (ex: RuntimeException) {
            handleError(ex, response)
        }
    }

    private fun handleError(ex: RuntimeException, response: HttpServletResponse) {
        response.status = HttpStatus.BAD_REQUEST.value();
        response.contentType = "application/json"
        response.writer.write(stringError(SimpleErrorBuilder.errorBuilder(ex)));
    }

    private fun stringError(errors: Errors) : String {
        return ObjectMapper().writeValueAsString(Failure(errors))
    }

    @Throws(java.lang.RuntimeException::class)
    private fun checkHeader(request: HttpServletRequest) : String {
        return request.getHeader("Authorization")
            ?: throw java.lang.RuntimeException("No auth header!")
    }

    @Throws(java.lang.RuntimeException::class)
    private fun checkBearer(header: String) {
        if (!header.startsWith("Bearer"))
            throw java.lang.RuntimeException("Bad header formula, try again!")
    }

    @Throws(java.lang.RuntimeException::class)
    private fun checkUsernameEmpty(username: String) {
        if (username.isEmpty())
            throw java.lang.RuntimeException("Bad token, try again!")
    }

    @Throws(java.lang.RuntimeException::class)
    private fun checkIfTokenValid(token: String, userDetails: UserDetails) {
        if(!jwtService.validateToken(token,userDetails))
            throw java.lang.RuntimeException("Token couldn't be validated, try again!")
    }

    @Throws(java.lang.RuntimeException::class)
    private fun populateRequestWithAuthenticatedUserData(request: HttpServletRequest, userDetails: UserDetails) {
        try {

            val usernamePasswordAuthenticationToken = UsernamePasswordAuthenticationToken(
                userDetails, userDetails.username, userDetails.authorities
            )

            usernamePasswordAuthenticationToken.details =
                WebAuthenticationDetailsSource().buildDetails(request)

            SecurityContextHolder.getContext().authentication = usernamePasswordAuthenticationToken

        } catch(ex: Exception) {

            throw java.lang.RuntimeException("Something went wrong on our side, sorry!")

        }

    }

    private fun getTokenFromHeader(authHeader: String): String {
        try {
            return authHeader.split(" ")[1]
        } catch(ex: Exception) {
            throw java.lang.RuntimeException("Header couldn't be split!")
        }
    }

}