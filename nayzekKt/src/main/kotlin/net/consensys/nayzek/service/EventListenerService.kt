package net.consensys.nayzek.service

import org.springframework.kafka.annotation.KafkaListener
import org.springframework.stereotype.Service
import com.squareup.moshi.Moshi
import net.consensys.nayzek.model.transient.NewTokenMessage

@Service
class EventListenerService {
    @KafkaListener(topics = ["contract-events"], groupId = "nayzek")
    fun listen(message: String) {
        val moshi = Moshi.Builder().build()
        val jsonAdapter = moshi.adapter(NewTokenMessage::class.java)
        val newTokenMessage = jsonAdapter.fromJson(message)
        System.out.println(newTokenMessage!!.details.status)
    }
}
