import { type NextRequest, NextResponse } from "next/server"
import { generatePayUHash, generateTxnId, getPayUConfig } from "@/lib/payu"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      amount,
      firstName,
      lastName,
      email,
      phone,
      productInfo,
      address,
      city,
      state,
      pincode,
      purchaseId,
    } = body

    const config = getPayUConfig()
    const txnid = generateTxnId("TXN")

    console.log("[PayU] Initiating payment:", {
      txnid,
      amount,
      email,
      environment: process.env.PAYU_ENVIRONMENT || "TEST",
    })

    // Prepare PayU parameters
    const payuParams = {
      key: config.key,
      txnid: txnid,
      amount: amount.toString(),
      productinfo: productInfo || "Course Purchase",
      firstname: firstName,
      lastname: lastName || "",
      email: email,
      phone: phone,
      surl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/payu-callback`,
      furl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/payu-callback`,
      // Optional fields
      address1: address || "",
      city: city || "",
      state: state || "",
      zipcode: pincode || "",
      country: "India",
      // User-defined fields (can store purchaseId, courseId, etc.)
      udf1: purchaseId || "",
      udf2: productInfo || "",
      udf3: "",
      udf4: "",
      udf5: "",
    }

    // Generate hash
    const hash = generatePayUHash({
      key: config.key,
      txnid: payuParams.txnid,
      amount: payuParams.amount,
      productinfo: payuParams.productinfo,
      firstname: payuParams.firstname,
      email: payuParams.email,
      udf1: payuParams.udf1,
      udf2: payuParams.udf2,
      udf3: payuParams.udf3,
      udf4: payuParams.udf4,
      udf5: payuParams.udf5,
      salt: config.salt,
    })

    // Debug: Log hash string (remove in production or use environment variable)
    if (process.env.NODE_ENV === "development") {
      const hashString = [
        config.key,
        payuParams.txnid,
        payuParams.amount,
        payuParams.productinfo,
        payuParams.firstname,
        payuParams.email,
        payuParams.udf1 || "",
        payuParams.udf2 || "",
        payuParams.udf3 || "",
        payuParams.udf4 || "",
        payuParams.udf5 || "",
        "", "", "", "", "",
        config.salt,
      ].join("|")
      console.log("[PayU DEBUG] Hash String:", hashString)
    }

    console.log("[PayU] Hash generated successfully")
    console.log("[PayU] Transaction ID:", payuParams.txnid)

    // Return payment data for form submission
    return NextResponse.json({
      success: true,
      paymentUrl: config.paymentUrl,
      paymentData: {
        ...payuParams,
        hash: hash,
      },
      environment: process.env.PAYU_ENVIRONMENT || "TEST",
    })
  } catch (error) {
    console.error("[PayU] Payment initialization error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to initialize PayU payment",
      },
      { status: 500 }
    )
  }
}

