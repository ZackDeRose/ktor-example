package com.nx.routes

import com.nx.models.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

var id: Int = 1
fun getId(): String {
    ++id
    return id.toString();
}

fun Route.todoRouting() {
    route("") {
        get {
            call.respond(todoStorage)
        }
        post("/create") {
            val createBody = call.receive<CreateToDoBody>()
            val newTodo = todoStorage.add(ToDo(getId(), createBody.title, false))
            call.respond(newTodo)
        }
        post("/toggle") {
            val toggleBody = call.receive<ToggleToDoBody>()
            val targetTodo = todoStorage.find { it.id == toggleBody.id }
            if (targetTodo == null) {
                call.respondText("No matching ToDo found", status = HttpStatusCode.NotFound)
                return@post
            }
            val newTodo = ToDo(
                targetTodo!!.id,
                targetTodo!!.title,
                !targetTodo!!.completed
            )
            todoStorage.remove(targetTodo)
            todoStorage.add(newTodo)
            call.respond(newTodo)
        }
        delete {
            val deleteBody = call.receive<ToggleToDoBody>()
            val targetTodo = todoStorage.find { it.id == deleteBody.id }
            if (targetTodo == null) {
                call.respondText("No matching ToDo found", status = HttpStatusCode.NotFound)
                return@delete
            }
            todoStorage.remove(targetTodo)
            call.respond(targetTodo)
        }
    }
}