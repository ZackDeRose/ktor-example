package com.nx.models

import kotlinx.serialization.Serializable

@Serializable
data class ToDo(val id: String, val title: String, val completed: Boolean)

val todoStorage = mutableListOf<ToDo>(
    ToDo("1", "Buy milk", false)
)