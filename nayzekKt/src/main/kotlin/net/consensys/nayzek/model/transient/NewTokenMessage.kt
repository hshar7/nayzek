package net.consensys.nayzek.model.transient

import com.squareup.moshi.JsonClass

@JsonClass(generateAdapter = true)
data class NewTokenMessage (
        val id: String,
        val type: String,
        val details: NewTokenMessageDetails,
        val retries: Int
)

@JsonClass(generateAdapter = true)
data class NewTokenMessageDetails(
        val name: String,
        val filterId: String,
        val nodeName: String,
        val indexedParameters: ArrayList<NewTokenMessageDetailsIndexedParams>,
        val transactionHash: String,
        val logIndex: Int,
        val blockNumber: Int,
        val blockHash: String,
        val address: String,
        val status: String,
        val eventSpecificationSignature: String,
        val networkName: String,
        val id: String
)

@JsonClass(generateAdapter = true)
data class NewTokenMessageDetailsIndexedParams(
        val type: String,
        val value: String
)
