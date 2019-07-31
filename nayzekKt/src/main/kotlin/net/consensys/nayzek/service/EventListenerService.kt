package net.consensys.nayzek.service

import com.squareup.moshi.JsonAdapter
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import findOne
import mu.KotlinLogging
import net.consensys.nayzek.enumeration.NFT_TYPE
import net.consensys.nayzek.model.Nft
import net.consensys.nayzek.model.User
import net.consensys.nayzek.model.transient.NewTokenMessage
import net.consensys.nayzek.repository.NftRepository
import net.consensys.nayzek.repository.NftTemplateRepository
import net.consensys.nayzek.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import java.lang.Exception
import java.util.*

@Service
class EventListenerService @Autowired constructor(
        val nftRepository: NftRepository,
        val userRepository: UserRepository,
        val nftTemplateRepository: NftTemplateRepository
) {

    protected val log = KotlinLogging.logger {}

    @KafkaListener(topics = ["contract-events"], groupId = "nayzek")
    fun listen(message: String) {
        log.info("New Event with message: $message}")

        val moshi = Moshi.Builder().add(KotlinJsonAdapterFactory()).build()
        val jsonAdapter: JsonAdapter<NewTokenMessage> = moshi.adapter(NewTokenMessage::class.java)
        val newTokenMessage: NewTokenMessage = jsonAdapter.fromJson(message)!!
        val minter = userRepository.findByPublicAddress(newTokenMessage.details.nonIndexedParameters[1].value) ?:
                userRepository.insert(User(
                        id = UUID.randomUUID().toString(),
                        publicAddress = newTokenMessage.details.nonIndexedParameters[1].value,
                        createdAt = Date()
                ))

        val template = nftTemplateRepository.findOne(newTokenMessage.details.nonIndexedParameters[3].value) ?:
                throw Exception("Template not found ${newTokenMessage.details.nonIndexedParameters[3].value}")

        if (nftRepository.existsByTokenIdAndTemplate(
                        newTokenMessage.details.nonIndexedParameters[0].value.toInt(), template)) return

        val nft = nftRepository.insert(Nft(
                id = UUID.randomUUID().toString(),
                contract = newTokenMessage.details.address,
                value = 0.toBigDecimal(),
                tokenId = newTokenMessage.details.nonIndexedParameters[0].value.toInt(),
                type = NFT_TYPE.ERC721,
                minter = minter,
                template = template,
                ownerAddress = newTokenMessage.details.nonIndexedParameters[1].value,
                dataJson = newTokenMessage.details.nonIndexedParameters[2].value,
                createdAt = Date(),
                updatedAt = Date()
        ))

        log.info("Created new NFT tokenId: ${nft.tokenId}, contract: ${nft.contract}, details: ${nft.dataJson}")
    }
}
