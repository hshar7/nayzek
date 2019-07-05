package net.consensys.nayzek.repository

import net.consensys.nayzek.model.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository : MongoRepository<User, String>