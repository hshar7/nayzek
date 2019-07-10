package net.consensys.nayzek.graphql.nftTemplate

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import findOne
import net.consensys.nayzek.model.NftTemplate
import net.consensys.nayzek.model.User
import net.consensys.nayzek.repository.NftCollectionRepository
import net.consensys.nayzek.repository.NftTemplateRepository
import net.consensys.nayzek.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.util.*

@Service
class NftTemplateQuery @Autowired constructor(
        private val nftTemplateRepository: NftTemplateRepository,
        private val nftCollectionRepository: NftCollectionRepository,
        private val userRepository: UserRepository
) : GraphQLQueryResolver {

    fun getTemplates(count: Int, offset: Int): Page<NftTemplate> {
        val user = userRepository.findOne("1") ?: userRepository.insert(User(
                id = "1",
                email = "1",
                name = "1",
                publicAddress = "1",
                reputation = 1,
                createdAt = Date()
        ))

        val sort = Sort(Sort.Direction.DESC, "createdAt")
        return nftTemplateRepository.findByCreator(user, PageRequest.of(offset, count, sort))
    }

    fun getTemplatesByCollection(nftCollectionId: String, count: Int, offset: Int): Page<NftTemplate> {

        val collection = nftCollectionRepository.findOne(nftCollectionId)
                ?: throw Exception("Collection $nftCollectionId not found!")

        val sort = Sort(Sort.Direction.DESC, "createdAt")
        return nftTemplateRepository.findByCollection(collection, PageRequest.of(offset, count, sort))
    }

    fun getTemplate(id: String): NftTemplate {
        return nftTemplateRepository.findOne(id) ?: throw Exception("Template $id not found.")
    }
}
