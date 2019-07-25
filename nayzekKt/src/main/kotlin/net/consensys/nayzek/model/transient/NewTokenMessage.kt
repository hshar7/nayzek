package net.consensys.nayzek.model.transient

data class NewTokenMessage (
        val id: String,
        val type: String,
        val details: NewTokenMessageDetails,
        val retries: Int
)

data class NewTokenMessageDetails(
        val name: String,
        val filterId: String,
        val nodeName: String,
        val nonIndexedParameters: List<NewTokenMessageDetailsNonIndexedParams>,
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

data class NewTokenMessageDetailsNonIndexedParams(
        val type: String,
        val value: String
)
