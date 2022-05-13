package com.example.forma1fullstack.Entity.Response

typealias Errors = HashMap<String, String>

data class Failure(
    val data: Errors,
) {
    val error = true
}