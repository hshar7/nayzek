package net.consensys.nayzek.graphql.nftCollection

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import findOne
import net.consensys.nayzek.model.NftCollection
import net.consensys.nayzek.model.User
import net.consensys.nayzek.repository.NftCollectionRepository
import net.consensys.nayzek.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class NftCollectionMutation @Autowired constructor(
        private val nftCollectionRepository: NftCollectionRepository,
        private val userRepository: UserRepository
) : GraphQLMutationResolver {

    fun createCollection(name: String, description: String): NftCollection {
        val user = userRepository.findOne("1") ?: userRepository.insert(User(
                id = "1",
                email = "1",
                name = "1",
                publicAddress = "1",
                reputation = 1,
                createdAt = Date()
        ))

        return nftCollectionRepository.insert(NftCollection(
                id = UUID.randomUUID().toString(),
                owner = user,
                name = name,
                description = description,
                createdAt = Date(),
                updatedAt = Date()
        ))
    }
}
