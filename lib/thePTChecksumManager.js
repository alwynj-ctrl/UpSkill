"use strict";

// import checksum generation utility
const PaytmChecksum = require("./PaytmChecksum");

// basic config wrapper – replace with your real key or env variable
const config = {
  PAYTM_MERCHANT_KEY: "uYTkMQ79093638871742",
};

/**
 * thePTChecksumManager
 *
 * Simple helper with two methods:
 *  - Create: sample checksum verification flow (you can adapt it to actually generate and store checksums)
 *  - Validate: same sample flow, intended for validating incoming callbacks
 *
 * NOTE: Both methods currently mirror the sample code you provided. Replace the
 * placeholder body and CHECKSUM_VALUE with real values when wiring into Paytm.
 */
const thePTChecksumManager = {
  async Create(body) {
    const paytmChecksum = await PaytmChecksum.generateSignature(body, config.PAYTM_MERCHANT_KEY);
    return paytmChecksum;
  },

  async Validate(body, paytmChecksum) {
    const isVerifySignature = await PaytmChecksum.verifySignature(
      body,
      config.PAYTM_MERCHANT_KEY,
      paytmChecksum
    );
    return isVerifySignature;
  },
};

module.exports = thePTChecksumManager;


