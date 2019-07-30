package net.consensys.nayzek.model

import net.consensys.nayzek.enumeration.NFT_TYPE
import org.springframework.data.mongodb.core.index.CompoundIndex
import org.springframework.data.mongodb.core.mapping.DBRef
import org.springframework.data.mongodb.core.mapping.Document
import java.math.BigDecimal
import java.util.*

@Document("nfts")
@CompoundIndex(name = "tokenId_templateId", def = "{'tokenId' : 1, 'template.\$id': 1}", unique = true)
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
