package net.consensys.nayzek.controller

import findOne
import net.consensys.nayzek.exception.ResourceNotFoundException
import net.consensys.nayzek.repository.NftCollectionRepository
import net.consensys.nayzek.repository.NftTemplateRepository
import net.consensys.nayzek.service.S3AwsService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api")
class FilesController @Autowired constructor(
        val s3AwsService: S3AwsService,
        val nftCollectionRepository: NftCollectionRepository,
        val nftTemplateRepository: NftTemplateRepository
) {
    @Value("\${aws.s3.imagesBucketName}")
    lateinit var bucketName: String

    @PostMapping("/collection/{collectionId}/image")
    fun uploadCollectionImage(
            @RequestParam("file") file: MultipartFile,
            @PathVariable collectionId: String
    ): ResponseEntity<String> {
        val fullFileName = "collections/$collectionId/${file.originalFilename}"
        val url = "https://s3.us-east-1.amazonaws.com/$bucketName/$fullFileName"

        val collection = nftCollectionRepository.findOne(collectionId)
                ?: throw ResourceNotFoundException("NftCollection", "id", collectionId)

        when (s3AwsService.putObject(fullFileName, file)) {
            true -> {
                collection.imageUrl = url
                nftCollectionRepository.save(collection)
                return ResponseEntity("{\"fileUrl\": \"$url\"}", HttpStatus.OK)
            }
            false -> return ResponseEntity("{\"status\": \"failed\"}", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @PostMapping("/template/{templateId}/image")
    fun uploadTemplateImage(
            @RequestParam("file") file: MultipartFile,
            @PathVariable templateId: String
    ): ResponseEntity<String> {
        val fullFileName = "templates/$templateId/${file.originalFilename}"
        val url = "https://s3.us-east-1.amazonaws.com/$bucketName/$fullFileName"

        val template = nftTemplateRepository.findOne(templateId)
                ?: throw ResourceNotFoundException("NftTemplateRepository", "id", templateId)

        when (s3AwsService.putObject(fullFileName, file)) {
            true -> {
                template.imageUrl = url
                nftTemplateRepository.save(template)
                return ResponseEntity("{\"fileUrl\": \"$url\"}", HttpStatus.OK)
            }
            false -> return ResponseEntity("{\"status\": \"failed\"}", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
