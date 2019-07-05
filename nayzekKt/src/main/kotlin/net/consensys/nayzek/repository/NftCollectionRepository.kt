package net.consensys.nayzek.repository

import net.consensys.nayzek.model.NftCollection
import net.consensys.nayzek.model.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.mongodb.repository.MongoRepository

interface NftCollectionRepository : MongoRepository<NftCollection, String> {
    fun findByOwner(user: User, pr: PageRequest): Page<NftCollection>
}
