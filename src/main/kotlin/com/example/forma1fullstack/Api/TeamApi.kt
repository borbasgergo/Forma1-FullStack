package com.example.forma1fullstack.Api

import com.example.forma1fullstack.Entity.Response.Success
import com.example.forma1fullstack.Entity.Team
import com.example.forma1fullstack.Service.Interface.IServiceCRUD
import com.example.forma1fullstack.Service.TeamService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid

@RestController
@RequestMapping("/api/team/v1")
class TeamApi(
    private val teamService: IServiceCRUD<Team, Long>
) {

    @GetMapping("/")
    fun getAll() : ResponseEntity<Success> {

        val teams = teamService.getAll()

        return ResponseEntity.ok(Success(teams))
    }

    @PostMapping("/")
    fun create(
        @Valid @RequestBody team: Team
    ) : ResponseEntity<Success> {

        val team = teamService.create(team)

        return ResponseEntity.ok(Success(team))
    }

    @GetMapping("/{id}")
    fun getOneById(
        @PathVariable("id") Id: Long
    ) : ResponseEntity<Success>{

        val team = teamService.getOneById(Id)

        return ResponseEntity.ok(Success(team))
    }

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable("id") Id: Long
    ) : ResponseEntity<Success> {

        teamService.deleteById(Id)

        return ResponseEntity.ok(Success(object {
            val message = "Successfully deleted!"
        }))
    }

    @PutMapping
    fun update(
        @Valid @RequestBody team: Team
    ) : ResponseEntity<Success> {

        val updatedTeam = teamService.update(team)

        return ResponseEntity.ok(Success(updatedTeam))
    }
}