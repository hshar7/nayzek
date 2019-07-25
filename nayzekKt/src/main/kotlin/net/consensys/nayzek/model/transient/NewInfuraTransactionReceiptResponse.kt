package net.consensys.nayzek.model.transient

class NewInfuraTransactionReceiptResponse(
    val jsonrpc: String,
    val id: Int,
    val result: NewInfuraTransactionReceiptResponseResult
)

data class NewInfuraTransactionReceiptResponseResult (
        val blockHash: String,
        val blockNumber: String,
        val contractAddress: String,
        val cumulativeGasUsed: String,
        val from: String,
        val gasUsed: String,
        val status: String,
        val transactionHash: String,
        val transactionIndex: String
)
