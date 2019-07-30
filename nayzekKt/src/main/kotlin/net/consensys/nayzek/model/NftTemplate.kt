package net.consensys.nayzek.model

import net.consensys.nayzek.enumeration.NFT_TYPE
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document("nft_templates")
data class NftTemplate (
        val id: String,
        val type: NFT_TYPE,
        @DBRef val creator: User,
        @DBRef val collection: NftCollection,
        var name: String,
        var description: String,
        val createdAt: Date,
        var updatedAt: Date
)
