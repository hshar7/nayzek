package net.consensys.nayzek.model

import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document("users")
data class User (
        val id: String,
        val publicAddress: String,
        var name: String = "",
        var email: String = "",
        val reputation: Int = 0,
        val createdAt: Date
)
