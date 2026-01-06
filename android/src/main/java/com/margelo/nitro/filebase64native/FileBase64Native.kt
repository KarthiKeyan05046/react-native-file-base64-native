package com.margelo.nitro.filebase64native

import com.margelo.nitro.core.Promise
import android.util.Base64
import java.io.*
import java.util.concurrent.Executors

class FileBase64Native : HybridFileBase64NativeSpec() {

  private val executor = Executors.newSingleThreadExecutor()

  override fun encode(path: String): Promise<String> {
    val promise = Promise<String>()

    executor.execute {
      var input: FileInputStream? = null
      try {
        val filePath = path.replace("file://", "")
        val file = File(filePath)
        
        if (!file.exists()) {
          promise.reject(RuntimeException("FILE_NOT_FOUND: File not found: $filePath"))
          return@execute
        }
        
        if (!file.canRead()) {
          promise.reject(RuntimeException("FILE_NOT_READABLE: File is not readable: $filePath"))
          return@execute
        }
        
        input = FileInputStream(file)
        val buffer = ByteArray(8192)
        val output = ByteArrayOutputStream()

        var bytesRead: Int
        while (input.read(buffer).also { bytesRead = it } != -1) {
          output.write(buffer, 0, bytesRead)
        }

        val base64 = Base64.encodeToString(
          output.toByteArray(),
          Base64.NO_WRAP
        )

        promise.resolve(base64)
      } catch (e: FileNotFoundException) {
        promise.reject(RuntimeException("FILE_NOT_FOUND: File not found: ${e.message}", e))
      } catch (e: SecurityException) {
        promise.reject(RuntimeException("SECURITY_ERROR: Security error: ${e.message}", e))
      } catch (e: IOException) {
        promise.reject(RuntimeException("IO_ERROR: IO error: ${e.message}", e))
      } catch (e: Exception) {
        promise.reject(RuntimeException("ENCODE_ERROR: Encoding error: ${e.message}", e))
      } finally {
        try {
          input?.close()
        } catch (e: IOException) {
          // Ignore close errors
        }
      }
    }
    
    return promise
  }
}
