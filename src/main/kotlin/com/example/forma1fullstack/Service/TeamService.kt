package com.example.forma1fullstack.Service

import com.example.forma1fullstack.Entity.Team
import com.example.forma1fullstack.Exception.CouldNotCreateTeamException
import com.example.forma1fullstack.Repository.TeamRepository
import com.example.forma1fullstack.Service.Interface.IServiceCRUD
import org.springframework.stereotype.Service

@Service
class TeamService(
    private val teamRepository: TeamRepository
) : IServiceCRUD<Team, Long>{

    override fun create(team: Team) : Team {
        try {
            return teamRepository.save(team)
        } catch(ex: Exception) {
            throw CouldNotCreateTeamException("Team couldn't be created, try again!")
        }
    }

    override fun getOneById(id: Long): Team {
        try {
            return teamRepository.findById(id).get()
        } catch(ex: java.util.NoSuchElementException) {
            throw java.lang.RuntimeException("Team was not found by the given ID!")
        }


    }

    override fun deleteById(id: Long) = teamRepository.delete(getOneById(id))


    override fun update(t: Team): Team {

        val team = getOneById(t.id)
        val updatedTeam = team.copy(name = t.name,
            isSignedUp = t.isSignedUp,
            championship = t.championship,
            dateOfFoundation = t.dateOfFoundation)

        return teamRepository.save(updatedTeam)
    }

    override fun getAll(): MutableIterable<Team> {
        return teamRepository.findAll()
    }

}