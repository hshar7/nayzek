package net.consensys.nayzek.model.transient

data class RegisterContractEventRequest (
        val id: String,
        val contractAddress: String,
        val eventSpecification: EventSpecification = EventSpecification(),
        val correlationIdStrategy: CorrelationIdStrategy = CorrelationIdStrategy()
)

data class EventSpecification(
        val eventName: String = "NewToken",
        val nonIndexedParameterDefinitions: List<NonIndexedParameterDefinitions> = listOf(
                NonIndexedParameterDefinitions(0, "UINT256"),
                NonIndexedParameterDefinitions(1, "ADDRESS"),
                NonIndexedParameterDefinitions(2, "ADDRESS"),
                NonIndexedParameterDefinitions(3, "STRING")
        )
)

data class NonIndexedParameterDefinitions(
        val position: Int,
        val type: String
)

data class CorrelationIdStrategy(
    val type: String = "NON_INDEXED_PARAMETER",
    val parameterIndex: Int = 0
)
