package net.consensys.nayzek.model

import net.consensys.nayzek.enumeration.NFT_TYPE
import org.springframework.data.mongodb.core.mapping.DBRef
import java.math.BigDecimal
import java.util.*

data class Nft (
        val id: String,
        val contract: String,
        val value: BigDecimal,
        val type: NFT_TYPE,
        @DBRef val minter: User,
        val collection: NftCollection,
        var ownerAddress: String,
        val name: String,
        val description: String,
        val createdAt: Date,
        var updatedAt: Date
)
