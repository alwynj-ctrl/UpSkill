import crypto from "crypto"

// Official Paytm Checksum utility based on Paytm documentation
// Supports both JSON and form parameter formats as per official spec

export interface PaytmConfig {
  mid: string
  key: string
  website: string
  callbackUrl: string
  environment?: "staging" | "production"
}

export interface PaytmTransactionParams {
  mid: string
  orderId: string
  amount: string
  txnToken?: string
  userInfo?: {
    custId: string
    mobile?: string
    email?: string
  }
  [key: string]: any
}

export interface PaytmResponse {
  STATUS: string
  CHECKSUMHASH: string
  ORDERID: string
  TXNID?: string
  TXNAMOUNT?: string
  RESPCODE?: string
  RESPMSG?: string
  [key: string]: any
}

export class PaytmChecksum {
  /**
   * Generate checksum for Paytm API requests
   * Follows official Paytm Node.js implementation with SHA256 hashing
   */
  static generateSignature(params: Record<string, any> | string, key: string): string {
    try {
      let parameterString: string
      
      if (typeof params === "string") {
        parameterString = params
      } else {
        // Convert object to parameter string format for checksum
        parameterString = this.getStringByParams(params)
      }
      
      // Generate random salt for security
      const salt = this.generateRandomString(4)
      
      // Create hash with salt
      const hashString = this.calculateHash(parameterString, salt)
      
      // Encrypt the hash with merchant key
      const checksum = this.encrypt(hashString, key)
      
      return checksum
    } catch (error) {
      console.error("Paytm checksum generation error:", error)
      throw new Error("Failed to generate Paytm checksum")
    }
  }

  /**
   * Verify checksum for Paytm responses
   * Used to validate response authenticity from Paytm
   */
  static verifySignature(params: Record<string, any> | string, key: string, checksum: string): boolean {
    try {
      let parameterString: string
      
      if (typeof params === "string") {
        parameterString = params
      } else {
        // Remove checksum from params for verification
        const verifyParams = { ...params }
        delete verifyParams.CHECKSUMHASH
        parameterString = this.getStringByParams(verifyParams)
      }
      
      // Decrypt the received checksum
      const decryptedHash = this.decrypt(checksum, key)
      
      // Extract salt from decrypted hash (last 4 characters)
      const salt = decryptedHash.substring(decryptedHash.length - 4)
      
      // Calculate expected hash
      const expectedHash = this.calculateHash(parameterString, salt)
      
      // Compare hashes
      return decryptedHash === expectedHash
    } catch (error) {
      console.error("Paytm checksum verification error:", error)
      return false
    }
  }

  /**
   * Generate signature for JSON request body (used in JS Checkout API)
   */
  static generateSignatureByString(body: string, key: string): string {
    try {
      const salt = this.generateRandomString(4)
      const hashString = this.calculateHash(body, salt)
      return this.encrypt(hashString, key)
    } catch (error) {
      console.error("Paytm signature generation error:", error)
      throw new Error("Failed to generate Paytm signature")
    }
  }

  /**
   * Verify signature for JSON response body
   */
  static verifySignatureByString(body: string, key: string, signature: string): boolean {
    try {
      const decryptedHash = this.decrypt(signature, key)
      const salt = decryptedHash.substring(decryptedHash.length - 4)
      const expectedHash = this.calculateHash(body, salt)
      return decryptedHash === expectedHash
    } catch (error) {
      console.error("Paytm signature verification error:", error)
      return false
    }
  }

  /**
   * AES encryption as per Paytm specification
   */
  private static encrypt(input: string, key: string): string {
    try {
      const iv = Buffer.alloc(16, 0) // Initialization vector of 16 zeros
      const cipher = crypto.createCipheriv("aes-128-cbc" as any, key.substring(0, 16), iv as any)
      
      let encrypted = cipher.update(input, "utf8", "base64")
      encrypted += cipher.final("base64")
      
      return encrypted
    } catch (error) {
      console.error("Paytm encryption error:", error)
      throw new Error("Encryption failed")
    }
  }

  /**
   * AES decryption as per Paytm specification
   */
  private static decrypt(encrypted: string, key: string): string {
    try {
      const iv = Buffer.alloc(16, 0) // Initialization vector of 16 zeros
      const decipher = crypto.createDecipheriv("aes-128-cbc" as any, key.substring(0, 16), iv as any)
      
      let decrypted = decipher.update(encrypted, "base64", "utf8")
      decrypted += decipher.final("utf8")
      
      return decrypted
    } catch (error) {
      console.error("Paytm decryption error:", error)
      throw new Error("Decryption failed")
    }
  }

  /**
   * Convert parameters object to string format for checksum calculation
   * Follows Paytm's sorting and formatting requirements
   */
  private static getStringByParams(params: Record<string, any>): string {
    const sortedParams: Record<string, string> = {}
    
    // Sort parameters alphabetically and convert to string
    Object.keys(params)
      .sort()
      .forEach((key) => {
        const value = params[key]
        
        // Skip null, undefined values and CHECKSUMHASH
        if (value !== null && value !== undefined && key !== "CHECKSUMHASH") {
          if (typeof value === "object") {
            sortedParams[key] = JSON.stringify(value)
          } else {
            sortedParams[key] = value.toString()
          }
        }
      })
    
    // Create parameter string in key=value format separated by |
    return Object.keys(sortedParams)
      .map((key) => `${key}=${sortedParams[key]}`)
      .join("|")
  }

  /**
   * Calculate SHA256 hash with salt
   */
  private static calculateHash(params: string, salt: string): string {
    const finalString = `${params}|${salt}`
    const hash = crypto.createHash("sha256").update(finalString).digest("hex")
    return hash + salt // Append salt to hash
  }

  /**
   * Generate random salt for security
   */
  private static generateRandomString(length: number): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    return result
  }
}
