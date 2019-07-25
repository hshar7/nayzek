package net.consensys.nayzek.model.transient

data class NewContractTransaction (
        val id: String,
        val type: String,
        val details: NewContractTransactionDetails,
        val retries: Int
)

data class NewContractTransactionDetails (
        val hash: String,
        val nonce: String,
        val blockHash: String,
        val blockNumber: String,
        val transactionIndex: String,
        val from: String,
        val value: String,
        val nodeName: String,
        val status: String
)
