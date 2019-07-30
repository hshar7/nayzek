package net.consensys.nayzek.graphql.nft

import com.coxautodev.graphql.tools.GraphQLQueryResolver
import findOne
import net.consensys.nayzek.model.Nft
import net.consensys.nayzek.model.User
import net.consensys.nayzek.repository.NftRepository
import net.consensys.nayzek.repository.NftTemplateRepository
import net.consensys.nayzek.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.stereotype.Service
import java.util.*

@Service
class NftQuery @Autowired constructor(
        private val nftTemplateRepository: NftTemplateRepository,
        private val nftRepository: NftRepository,
        private val userRepository: UserRepository
) : GraphQLQueryResolver {

    fun getNfts(count: Int, offset: Int): Page<Nft> {
        val user = userRepository.findByPublicAddress("0xB6E58769550608DEF3043DCcbBE1Fa653af23151")
                ?: userRepository.insert(User(
                        id = "2",
                        email = "1",
                        name = "1",
                        publicAddress = "0xB6E58769550608DEF3043DCcbBE1Fa653af23151",
                        reputation = 1,
                        createdAt = Date()
                ))

        val sort = Sort(Sort.Direction.DESC, "createdAt")
        return nftRepository.findByMinter(user, PageRequest.of(offset, count, sort))
    }

    fun getNftsByTemplate(templateId: String, count: Int, offset: Int): Page<Nft> {

        val template = nftTemplateRepository.findOne(templateId)
                ?: throw Exception("Template $templateId not found!")

        val sort = Sort(Sort.Direction.DESC, "createdAt")
        return nftRepository.findByTemplate(template, PageRequest.of(offset, count, sort))
    }

    fun getNft(id: String): Nft {
        return nftRepository.findOne(id) ?: throw Exception("Nft $id not found.")
    }
}
