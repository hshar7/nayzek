package net.consensys.nayzek.graphql.nftCollection

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import findOne
import net.consensys.nayzek.model.NftCollection
import net.consensys.nayzek.model.User
import net.consensys.nayzek.repository.NftCollectionRepository
import net.consensys.nayzek.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.util.*

@Service
class NftCollectionQuery @Autowired constructor(
        private val nftCollectionRepository: NftCollectionRepository,
        private val userRepository: UserRepository
) : GraphQLQueryResolver {

    fun getCollections(count: Int, offset: Int): Page<NftCollection> {
        val user = userRepository.findOne("1") ?: userRepository.insert(User(
                id = "1",
                email = "1",
                name = "1",
                publicAddress = "1",
                reputation = 1,
                createdAt = Date()
        ))
        val sort = Sort(Sort.Direction.DESC, "createdAt")
        return nftCollectionRepository.findByOwner(user, PageRequest.of(offset, count, sort))
    }
}
