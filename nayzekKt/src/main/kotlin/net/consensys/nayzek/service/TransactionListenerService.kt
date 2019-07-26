//package net.consensys.nayzek.service
//
//import com.github.kittinunf.fuel.core.isSuccessful
//import com.github.kittinunf.fuel.httpPost
//import com.squareup.moshi.JsonAdapter
//import org.springframework.kafka.annotation.KafkaListener
//import org.springframework.stereotype.Service
//import com.squareup.moshi.Moshi
//import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
//import net.consensys.nayzek.model.NftCollection
//import net.consensys.nayzek.model.transient.NewContractTransaction
//import net.consensys.nayzek.model.transient.NewInfuraTransactionReceiptRequest
//import net.consensys.nayzek.model.transient.NewInfuraTransactionReceiptResponse
//import net.consensys.nayzek.model.transient.RegisterContractEventRequest
//import net.consensys.nayzek.repository.NftCollectionRepository
//import org.springframework.beans.factory.annotation.Autowired
//
//@Service
//class TransactionListenerService @Autowired constructor(
//        val nftCollectionRepository: NftCollectionRepository
//) {
//    @KafkaListener(topics = ["transaction-events"], groupId = "nayzek")
//    fun listen(message: String) {
//        val moshi = Moshi.Builder().add(KotlinJsonAdapterFactory()).build()
//        val newContractTransactionAdapter: JsonAdapter<NewContractTransaction> =
//                moshi.adapter(NewContractTransaction::class.java)
//        val newContractTransaction: NewContractTransaction = newContractTransactionAdapter.fromJson(message)!!
//
//        // Connect to infura to get contract address since eventum doesn't do that
//        val newInfuraRequestAdapter: JsonAdapter<NewInfuraTransactionReceiptRequest> =
//                moshi.adapter(NewInfuraTransactionReceiptRequest::class.java)
//        val requestBody: String = newInfuraRequestAdapter.toJson(
//                NewInfuraTransactionReceiptRequest(
//                        params = listOf(newContractTransaction.id)
//                )
//        )
//         val (_, response, _) =
//                "https://rinkeby.infura.io/v3/1703c01ec0814e7796155ff061b350a1"
//                        .httpPost().header("Content-Type" to "application/json")
//                        .body(requestBody).responseString()
//        val newInfuraTransactionReceiptResponseAdapter: JsonAdapter<NewInfuraTransactionReceiptResponse> =
//                moshi.adapter(NewInfuraTransactionReceiptResponse::class.java)
//        val newInfuraTransactionReceiptResponse: NewInfuraTransactionReceiptResponse =
//                newInfuraTransactionReceiptResponseAdapter.fromJson(
//                        response.body().asString("application/json")
//                )!!
//
//
//        val nftCollection = nftCollectionRepository.findByTxHash(newContractTransaction.id)
//                ?: throw Exception("Collection not found by TxHash ${newContractTransaction.id}")
//        if (nftCollection.deploymentStatus != "CONFIRMED") {
//            nftCollection.contractAddress = newInfuraTransactionReceiptResponse.result.contractAddress
//            nftCollection.deploymentStatus = newContractTransaction.details.status
//            if (newContractTransaction.details.status == "CONFIRMED") {
//                addContractToEventum(moshi, nftCollection)
//            }
//        }
//        nftCollectionRepository.save(nftCollection)
//    }
//
//    private fun addContractToEventum(moshi: Moshi, nftCollection: NftCollection): Boolean {
//        val registerContractEventRequestAdapter: JsonAdapter<RegisterContractEventRequest> =
//                moshi.adapter(RegisterContractEventRequest::class.java)
//        val requestBody: String = registerContractEventRequestAdapter.toJson(
//                RegisterContractEventRequest(
//                        id = "NewMintedTokens" + nftCollection.contractAddress,
//                        contractAddress = nftCollection.contractAddress
//                )
//        )
//        val (_, response, _) = "http://localhost:8060/api/rest/v1/event-filter"
//                .httpPost().header("Content-Type" to "application/json").body(requestBody).responseString()
//
//        return response.isSuccessful
//    }
//}
