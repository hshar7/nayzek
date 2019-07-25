package net.consensys.nayzek.model

import net.consensys.nayzek.enumeration.NFT_TYPE
import org.springframework.data.mongodb.core.mapping.DBRef
import java.math.BigDecimal
import java.util.*

data class Nft (
        val id: String,
        val contract: String,
        var tokenId: Int,
        val value: BigDecimal,
        val type: NFT_TYPE,
        @DBRef val minter: User,
        @DBRef val template: NftTemplate,
        var ownerAddress: String,
        val dataJson: String,
        val createdAt: Date,
        var updatedAt: Date
)
