import crypto from "crypto"

export class PaytmChecksum {
  static encrypt(input: string, key: string): string {
    const cipher = crypto.createCipheriv("aes-128-cbc", key, Buffer.alloc(16, 0))
    let encrypted = cipher.update(input, "utf8", "base64")
    encrypted += cipher.final("base64")
    return encrypted
  }

  static decrypt(encrypted: string, key: string): string {
    const decipher = crypto.createDecipheriv("aes-128-cbc", key, Buffer.alloc(16, 0))
    let decrypted = decipher.update(encrypted, "base64", "utf8")
    decrypted += decipher.final("utf8")
    return decrypted
  }

  static generateSignature(params: Record<string, string> | string, key: string): string {
    if (typeof params !== "string") {
      params = this.getStringByParams(params)
    }
    return this.generateSignatureByString(params, key)
  }

  static verifySignature(params: Record<string, string> | string, key: string, checksum: string): boolean {
    if (typeof params !== "string") {
      params = this.getStringByParams(params)
    }
    return this.verifySignatureByString(params, key, checksum)
  }

  private static generateSignatureByString(params: string, key: string): string {
    const salt = this.generateRandomString(4)
    return this.calculateChecksum(params, key, salt)
  }

  private static verifySignatureByString(params: string, key: string, checksum: string): boolean {
    const paytmHash = this.decrypt(checksum, key)
    const salt = paytmHash.substring(paytmHash.length - 4)
    return paytmHash === this.calculateHash(params, salt)
  }

  private static generateRandomString(length: number): string {
    return crypto.randomBytes(length).toString("hex").substring(0, length)
  }

  private static getStringByParams(params: Record<string, string>): string {
    const data: Record<string, string> = {}
    Object.keys(params)
      .sort()
      .forEach((key) => {
        if (key !== "CHECKSUMHASH") {
          if (typeof params[key] === "object") {
            data[key] = JSON.stringify(params[key])
          } else {
            data[key] = params[key]
          }
        }
      })
    return Object.keys(data)
      .map((key) => `${key}=${data[key]}`)
      .join("|")
  }

  private static calculateHash(params: string, salt: string): string {
    const finalString = params + "|" + salt
    return crypto.createHash("sha256").update(finalString).digest("hex") + salt
  }

  private static calculateChecksum(params: string, key: string, salt: string): string {
    const hashString = this.calculateHash(params, salt)
    return this.encrypt(hashString, key)
  }
}
