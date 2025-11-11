// airpay-checksum-final.js
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
  date, // format YYYY-MM-DD
}) {
  // Step 1: Private key (for payload, not for checksum)
  const privateKey = sha256(`${secretKey}@${username}:|:${password}`);

  // Step 2: Key (for checksum)
  const key = sha256(`${username}:${password}`);

  // Step 3: Alldata
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
    date,
  ].map(v => (v || "").trim());
  const alldata = fields.join("");

  // Step 4: Checksum
  const checksum = sha256(`${key}@${alldata}`);

  return {
    privateKey,
    key,
    alldata,
    checksum,
  };
}

// Example usage:
const result = generateAirpayChecksum({
  username: "zXHrr2v3cX",
  password: "fxjg7xeK",
  secretKey: "AnD2fy34NK6vcU85",
  buyerEmail: "alwynjoseph15@gmail.com",
  buyerFirstName: "Alwyn",
  buyerLastName: "Joseph",
  buyerAddress: "wwewsdsdswewe",
  buyerCity: "Karnataka",
  buyerState: "Karnataka",
  buyerCountry: "India",
  amount: "4999.00",
  orderId: "0c419c3b97924bfaace231d08",
  uid: "38f91f69-fc15-4ecf-aa75-4457520e30d8",
  date: "2025-11-10",
});

console.log("✅ Airpay Checksum:", result);
