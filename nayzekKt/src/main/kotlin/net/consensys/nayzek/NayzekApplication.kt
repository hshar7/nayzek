package net.consensys.nayzek

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class NayzekApplication

fun main(args: Array<String>) {
	runApplication<NayzekApplication>(*args)
}
