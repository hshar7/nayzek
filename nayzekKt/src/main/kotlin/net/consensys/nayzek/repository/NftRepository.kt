package net.consensys.nayzek.repository

import net.consensys.nayzek.model.Nft
import net.consensys.nayzek.model.NftTemplate
import net.consensys.nayzek.model.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.mongodb.repository.MongoRepository

interface NftRepository : MongoRepository<Nft, String> {
    fun findByTemplate(template: NftTemplate, pr: PageRequest): Page<Nft>
    fun findByMinter(minter: User, pr: PageRequest): Page<Nft>
}
