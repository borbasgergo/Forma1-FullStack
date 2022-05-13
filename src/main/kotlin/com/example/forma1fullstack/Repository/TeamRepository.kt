package com.example.forma1fullstack.Repository

import com.example.forma1fullstack.Entity.Team
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface TeamRepository : CrudRepository<Team, Long>{
}