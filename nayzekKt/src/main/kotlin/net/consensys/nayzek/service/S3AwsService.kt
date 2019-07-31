package net.consensys.nayzek.service

import com.amazonaws.AmazonServiceException
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import com.amazonaws.services.s3.model.DeleteObjectsRequest
import com.amazonaws.services.s3.model.ListObjectsV2Result
import com.amazonaws.services.s3.model.ObjectMetadata
import com.amazonaws.util.IOUtils
import mu.KotlinLogging
import net.consensys.nayzek.exception.AwsS3Exception
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.IOException

@Service
class S3AwsService {

    @Value("\${aws.s3.imagesBucketName}")
    lateinit var bucketName: String

    private val logger = KotlinLogging.logger {}

    fun putObject(name: String, file: MultipartFile): Boolean {
        try {
            val metadata = ObjectMetadata()
            metadata.contentType = file.contentType
            AmazonS3ClientBuilder.defaultClient().putObject(bucketName, name, file.inputStream, metadata)
        } catch (e: AmazonServiceException) {
            logger.error(e.message)
            return false
        }

        return true
    }

    fun getObject(name: String): ByteArray {
        try {
            val o = AmazonS3ClientBuilder.defaultClient().getObject(bucketName, name)
            return IOUtils.toByteArray(o.objectContent)
        } catch (e: AmazonServiceException) {
            throw AwsS3Exception(e.errorMessage)
        } catch (e: IOException) {
            throw AwsS3Exception(e.message)
        }
    }

    fun listObjects(prefix: String): ListObjectsV2Result {
        return AmazonS3ClientBuilder.defaultClient().listObjectsV2(bucketName, prefix)
    }

    fun deleteObject(name: String): Boolean {
        try {
            AmazonS3ClientBuilder.defaultClient().deleteObject(bucketName, name)
            return true
        } catch (e: AmazonServiceException) {
            return false
        }
    }

    fun deleteObjects(prefix: String): Boolean {
        try {
            val objects = mutableListOf<String>()
            listObjects(prefix).objectSummaries.forEach { objects.add(it.key) }

            val dor = DeleteObjectsRequest(bucketName)
                .withKeys(*objects.toTypedArray())
            AmazonS3ClientBuilder.defaultClient().deleteObjects(dor)

        } catch (e: AmazonServiceException) {
            return false
        }

        return true
    }
}
