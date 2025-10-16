import { type NextRequest, NextResponse } from "next/server"
import { verifyPayUResponseHash, getPayUConfig } from "@/lib/payu"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  console.log("[PayU Callback] ===== CALLBACK RECEIVED =====")

  try {
    const formData = await request.formData()
    const params: Record<string, string> = {}

    formData.forEach((value, key) => {
      params[key] = value.toString()
    })

    console.log("[PayU Callback] Received params:", {
      txnid: params.txnid,
      status: params.status,
      amount: params.amount,
      mihpayid: params.mihpayid,
    })

    const config = getPayUConfig()

    // Verify hash
    const isValidHash = verifyPayUResponseHash({
      status: params.status || "",
      txnid: params.txnid || "",
      amount: params.amount || "",
      productinfo: params.productinfo || "",
      firstname: params.firstname || "",
      email: params.email || "",
      udf1: params.udf1 || "",
      udf2: params.udf2 || "",
      udf3: params.udf3 || "",
      udf4: params.udf4 || "",
      udf5: params.udf5 || "",
      key: config.key,
      salt: config.salt,
      receivedHash: params.hash || "",
    })

    if (!isValidHash) {
      console.error("[PayU Callback] Invalid hash - possible tampering")
      const failureUrl = new URL("/payu/failure", request.url)
      failureUrl.searchParams.set("error", "Invalid hash")
      failureUrl.searchParams.set("txnid", params.txnid || "")
      return NextResponse.redirect(failureUrl)
    }

    console.log("[PayU Callback] Hash verified successfully")

    // Check payment status
    const status = params.status?.toLowerCase()
    const txnid = params.txnid
    const mihpayid = params.mihpayid // PayU transaction ID
    const amount = params.amount
    const purchaseId = params.udf1 // We stored purchaseId in udf1

    if (status === "success") {
      // Update purchase record in database
      if (purchaseId) {
        const supabase = await createClient()

        const { error } = await supabase
          .from("purchases")
          .update({
            payment_status: "completed",
            transaction_id: mihpayid,
            payment_method: "payu",
          })
          .eq("id", purchaseId)

        if (error) {
          console.error("[PayU Callback] Database update error:", error)
        } else {
          console.log("[PayU Callback] Purchase updated successfully:", purchaseId)
        }
      }

      const successUrl = new URL("/payu/success", request.url)
      successUrl.searchParams.set("txnid", txnid)
      successUrl.searchParams.set("mihpayid", mihpayid || "")
      successUrl.searchParams.set("amount", amount)
      successUrl.searchParams.set("mode", params.mode || "")
      return NextResponse.redirect(successUrl)
    } else {
      // Payment failed or pending
      const failureUrl = new URL("/payu/failure", request.url)
      failureUrl.searchParams.set("txnid", txnid || "")
      failureUrl.searchParams.set("status", status || "failed")
      failureUrl.searchParams.set("error", params.error || "")
      failureUrl.searchParams.set("error_Message", params.error_Message || "Payment failed")
      return NextResponse.redirect(failureUrl)
    }
  } catch (error) {
    console.error("[PayU Callback] ===== CRITICAL ERROR =====")
    console.error("[PayU Callback] Error:", error)

    const failureUrl = new URL("/payu/failure", request.url)
    failureUrl.searchParams.set("error", "Processing error")
    failureUrl.searchParams.set("details", error instanceof Error ? error.message : "Unknown error")
    return NextResponse.redirect(failureUrl)
  }
}

