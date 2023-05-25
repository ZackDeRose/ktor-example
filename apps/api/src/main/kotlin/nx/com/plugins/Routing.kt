package com.nx.plugins

import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import com.nx.routes.*

fun Application.configureRouting() {
    routing {
        todoRouting()
    }
}
