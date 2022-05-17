package com.example.forma1fullstack.Entity

data class UserDTO(
    private val user: User
) {

    val Id = user.Id
    val username = user.username

}
