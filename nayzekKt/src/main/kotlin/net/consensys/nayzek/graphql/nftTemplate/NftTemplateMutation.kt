package net.consensys.nayzek.graphql.nftTemplate

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import findOne
import net.consensys.nayzek.enumeration.NFT_TYPE
import net.consensys.nayzek.model.NftTemplate
import net.consensys.nayzek.model.User
import net.consensys.nayzek.repository.NftCollectionRepository
import net.consensys.nayzek.repository.NftTemplateRepository
import net.consensys.nayzek.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class NftTemplateMutation @Autowired constructor(
        private val nftTemplateRepository: NftTemplateRepository,
        private val nftCollectionRepository: NftCollectionRepository,
        private val userRepository: UserRepository
) : GraphQLMutationResolver {

    fun createTemplate(type: NFT_TYPE, nftCollectionId: String, name: String, description: String): NftTemplate {
        val user = userRepository.findOne("1") ?: userRepository.insert(User(
                id = "1",
                email = "1",
                name = "1",
                publicAddress = "1",
                reputation = 1,
                createdAt = Date()
        ))

        val collection = nftCollectionRepository.findOne(nftCollectionId)
                ?: throw Exception("Collection $nftCollectionId not found!")

        return nftTemplateRepository.insert(NftTemplate(
                id = UUID.randomUUID().toString(),
                type = type,
                creator = user,
                collection = collection,
                name = name,
                description = description,
                createdAt = Date(),
                updatedAt = Date()
        ))
    }
}
