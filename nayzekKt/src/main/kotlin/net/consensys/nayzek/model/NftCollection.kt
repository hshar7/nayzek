package net.consensys.nayzek.model

import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.util.*

@Document("nft_collections")
data class NftCollection (
        val id: String,
        @DBRef val owner: User,
        var txHash: String = "0x0",
        var contractAddress: String = "0x0",
        var deploymentStatus: String = "NOT_DEPLOYED",
        var imageUrl: String = "https://s3.amazonaws.com/nayzek-imgs/collection.png",
        var name: String,
        var description: String,
        val createdAt: Date,
        var updatedAt: Date
)
