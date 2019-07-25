package net.consensys.nayzek.model.transient

data class NewInfuraTransactionReceiptRequest (
        val jsonrpc: String = "2.0",
        val method: String = "eth_getTransactionReceipt",
        val params: List<String>,
        val id: Int = 1
)
