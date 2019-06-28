package net.consensys.nayzek.model

import net.consensys.nayzek.enumeration.NFT_TYPE
import org.springframework.data.mongodb.core.mapping.DBRef
import java.util.*

data class NftTemplate (
        val id: String,
        val type: NFT_TYPE,
        @DBRef val creator: User,
        val collection: NftCollection,
        var name: String,
        var description: String,
        val createdAt: Date,
        var updatedAt: Date
)
