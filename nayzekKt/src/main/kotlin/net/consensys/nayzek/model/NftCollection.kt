package net.consensys.nayzek.model

import org.springframework.data.mongodb.core.mapping.DBRef
import java.util.*

data class NftCollection (
        val id: String,
        @DBRef val owner: User,
        val contractAddress: String = "0x0",
        var name: String,
        var description: String,
        val createdAt: Date,
        var updatedAt: Date
)
