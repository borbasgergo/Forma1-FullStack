package com.example.forma1fullstack.Service.Interface

interface IServiceCRUD<T, ID> {

    fun create(t: T): T

    fun getOneById(id: ID): T

    fun deleteById(id: ID)

    fun update(t: T): T

    fun getAll() : MutableIterable<T>
}