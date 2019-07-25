package net.consensys.nayzek.graphql.transaction

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.github.kittinunf.fuel.core.isSuccessful
import com.github.kittinunf.fuel.httpPost
import findOne
import net.consensys.nayzek.repository.NftCollectionRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TransactionMutation @Autowired constructor(
        val nftCollectionRepository: NftCollectionRepository
) : GraphQLMutationResolver {

    fun monitorTx(txHash: String, collectionId: String): Boolean {

        val collection = nftCollectionRepository.findOne(collectionId)
                ?: throw Exception("NftCollection Not found $collectionId")

        val (_, response, _) = "http://localhost:8060/api/rest/v1/transaction?identifier=$txHash&nodeName=default"
                .httpPost().responseString()

        collection.txHash = txHash
        nftCollectionRepository.save(collection)

        return response.isSuccessful
    }
}
