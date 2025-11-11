// airpay-checksum.js
import crypto from "crypto";

function sha256(value) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

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
  amount,
  orderId,
  uid,
  date,
}) {
  const currentDate = date || new Date().toISOString().split("T")[0];

  // Step 1: Private key (payload)
  const privateKey = sha256(`${secretKey}@${username}:|:${password}`);

  // Step 2: Key (checksum seed)
  const key = sha256(`${username}~:~${password}`);

  // Step 3: Concatenate data (siindexvar empty for seamless)
  const fields = [
    buyerEmail,
    buyerFirstName,
    buyerLastName,
    buyerAddress,
    buyerCity,
    buyerState,
    buyerCountry,
    amount,
    orderId,
    uid,
    "", // siindexvar
  ].map((v) => (v || "").replace(/[\r\n]/g, "").trim());
  const alldata = fields.join("");

  // Step 4: Checksum with current date suffix
  const checksumInput = `${key}@${alldata}${currentDate}`;
  const checksum = sha256(checksumInput);

  return {
    privateKey,
    key,
    alldata,
    checksum,
    checksumInput,
    date: currentDate,
  };
}
