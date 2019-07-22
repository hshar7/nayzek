package net.consensys.nayzek.model

import java.util.*

data class User (
        val id: String,
        val publicAddress: String,
        var name: String = "",
        var email: String = "",
        val reputation: Int = 0,
        val createdAt: Date
)
