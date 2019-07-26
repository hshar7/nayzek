package net.consensys.nayzek.graphql.transaction

import com.coxautodev.graphql.tools.GraphQLMutationResolver
import com.github.kittinunf.fuel.core.isSuccessful
import com.github.kittinunf.fuel.httpPost
import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import findOne
import net.consensys.nayzek.model.NftCollection
import net.consensys.nayzek.model.transient.RegisterContractEventRequest
import net.consensys.nayzek.repository.NftCollectionRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TransactionMutation @Autowired constructor(
        val nftCollectionRepository: NftCollectionRepository
) : GraphQLMutationResolver {

    fun monitorTx(txHash: String, contractAddress: String, collectionId: String): Boolean {

        val moshi = Moshi.Builder().add(KotlinJsonAdapterFactory()).build()

        val collection = nftCollectionRepository.findOne(collectionId)
                ?: throw Exception("NftCollection Not found $collectionId")
//
//        val (_, response, _) = "http://localhost:8060/api/rest/v1/transaction?identifier=$txHash&nodeName=default"
//                .httpPost().responseString()

        collection.txHash = txHash
        collection.deploymentStatus = "CONFIRMED"
        collection.contractAddress = contractAddress
        nftCollectionRepository.save(collection)

        return addContractToEventum(moshi, collection)
    }

    private fun addContractToEventum(moshi: Moshi, nftCollection: NftCollection): Boolean {
        val registerContractEventRequestAdapter: JsonAdapter<RegisterContractEventRequest> =
                moshi.adapter(RegisterContractEventRequest::class.java)
        val requestBody: String = registerContractEventRequestAdapter.toJson(
                RegisterContractEventRequest(
                        id = "NewMintedTokens" + nftCollection.contractAddress,
                        contractAddress = nftCollection.contractAddress
                )
        )
        val (_, response, _) = "http://localhost:8060/api/rest/v1/event-filter"
                .httpPost().header("Content-Type" to "application/json").body(requestBody).responseString()

        return response.isSuccessful
    }
}
