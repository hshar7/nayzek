package net.consensys.nayzek.repository

import net.consensys.nayzek.model.NftCollection
import net.consensys.nayzek.model.NftTemplate
import net.consensys.nayzek.model.User
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.mongodb.repository.MongoRepository

interface NftTemplateRepository : MongoRepository<NftTemplate, String> {
    fun findByCreator(user: User, pr: PageRequest): Page<NftTemplate>
    fun findByCollection(collection: NftCollection, pr: PageRequest): Page<NftTemplate>
}
