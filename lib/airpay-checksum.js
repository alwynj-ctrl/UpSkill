// airpay-checksum.js
import crypto from "crypto";

export function generateAirpayChecksum({
  username,
  password,
  secretKey,
  buyerEmail,
  buyerFirstName,
  buyerLastName,
  buyerAddress = "",
  buyerCity = "",
  buyerState = "",
  buyerCountry = "",
  amount, // e.g. "4999.00"
  orderId,
  date,
}) {
  const sha256 = (value) =>
    crypto.createHash("sha256").update(value, "utf8").digest("hex");

  // Step 1: Private key
  const privateKey = sha256(`${secretKey}@${username}:|:${password}`);

  // Step 2: Key
  const key = sha256(`${username}~:~${password}`);

  // Step 3: Build alldata EXACTLY as per original JavaScript kit
  // Original kit: stringParam = buyerEmail + buyerFirstName + buyerLastName + buyerAddress + buyerCity + buyerState + buyerCountry + amount + orderid
  // Then: alldata = paramString + date.toISOString().split('T')[0]
  // NOTE: Original kit does NOT include mercid, UID, or subscriptionIndex in alldata
  // NOTE: Original kit does NOT append privateKey to checksum calculation
  const clean = (v) => String(v || "").replace(/[\r\n]/g, "").trim();

  const alldata = [
    clean(buyerEmail),
    clean(buyerFirstName),
    clean(buyerLastName),
    clean(buyerAddress),
    clean(buyerCity),
    clean(buyerState),
    clean(buyerCountry),
    clean(amount),
    clean(orderId),
    clean(date),
  ].join("");

  // Step 4: Final checksum - EXACTLY as per original JavaScript kit
  // Original kit: checksum = sha256(key + "@" + alldata)
  // NOTE: Original kit does NOT append privateKey to checksum
  const checksumInput = `${key}@${alldata}`;
  const checksum = sha256(checksumInput);

  return {
    privateKey,
    key,
    alldata,
    checksum,
    checksumInput,
    alldataLength: alldata.length,
  };
}
