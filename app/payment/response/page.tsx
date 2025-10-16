"use client"

import { useEffect, useRef, useState } from "react"
import { parsePaymentResponse } from "sabpaisa-pg-dev"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SABPAISA_CONFIG, SABPAISA_STAGING } from "@/lib/sabpaisa"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, XCircle } from "lucide-react"

export default function SabPaisaResponsePage() {
  const [entries, setEntries] = useState<[string, any][]>([])
  const [payload, setPayload] = useState<Record<string, any> | null>(null)
  const hasSavedRef = useRef(false)

  useEffect(() => {
    const run = async () => {
      try {
        const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost"
        const useAuth = isLocalhost ? SABPAISA_STAGING : SABPAISA_CONFIG
        const data = await parsePaymentResponse(useAuth.AUTH_KEY, useAuth.AUTH_IV)
        const safeEntries = data && typeof data === "object" ? Object.entries(data) : []
        try { localStorage.setItem("sabpaisa:lastResponse", JSON.stringify(data ?? {})) } catch {}
        setPayload((data ?? {}) as Record<string, any>)
        setEntries(safeEntries as [string, any][])

        // Persist successful purchase in Supabase
        if (!hasSavedRef.current && data && (data.status === "SUCCESS" || data.statusCode === "0000")) {
          hasSavedRef.current = true
          try {
            const supabase = createClient()
            const userRes = await supabase.auth.getUser()
            const userId = userRes.data.user?.id
            if (userId) {
              const paymentId = data.sabpaisaTxnId || data.bankTxnId || data.clientTxnId || ""
              const purchaseRow = {
                user_id: userId,
                course_name: data.udf2 || data.productInfo || "Course",
                course_price: Number(data.amount) || 0,
                payment_id: paymentId,
                payment_status: "completed",
              }

              // Prefer upsert for idempotency
              const { error: upsertError } = await supabase
                .from("purchases")
                .upsert(purchaseRow, { onConflict: "user_id,payment_id" })

              if (upsertError) {
                console.warn("Upsert failed, will fallback to check-then-insert:", upsertError.message)
                // Fallback: check-then-insert (works even if index not present)
                const { data: existing } = await supabase
                  .from("purchases")
                  .select("id")
                  .eq("user_id", userId)
                  .eq("payment_id", paymentId)
                  .limit(1)
                if (!existing || existing.length === 0) {
                  const { error: insertError } = await supabase.from("purchases").insert(purchaseRow)
                  if (insertError) {
                    console.error("Insert fallback failed:", insertError.message)
                  }
                }
              }
            }
          } catch (e) {
            console.error("Failed to save purchase record:", e)
          }
        }
      } catch (err) {
        console.error("SabPaisa parse response error", err)
      }
    }
    run()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            {payload && (payload.status === "SUCCESS" || payload.statusCode === "0000") ? (
              <>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
              </>
            ) : (
              <>
                <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl text-red-600">Payment Status</CardTitle>
              </>
            )}
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            {payload && (
              <div className="bg-muted p-4 rounded-lg space-y-2 text-left">
                <h3 className="font-medium">Payment Details</h3>
                <div className="text-sm space-y-1">
                  {payload.sabpaisaTxnId && (
                    <div className="flex justify-between"><span>SabPaisa Txn ID:</span><span className="font-mono">{payload.sabpaisaTxnId}</span></div>
                  )}
                  {payload.bankTxnId && (
                    <div className="flex justify-between"><span>Bank Txn ID:</span><span className="font-mono">{payload.bankTxnId}</span></div>
                  )}
                  {payload.amount && (
                    <div className="flex justify-between"><span>Amount:</span><span>₹{payload.amount}</span></div>
                  )}
                  {payload.paymentMode && (
                    <div className="flex justify-between"><span>Payment Mode:</span><span>{payload.paymentMode}</span></div>
                  )}
                  <div className="flex justify-between"><span>Status:</span><span className={payload.status === "SUCCESS" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{payload.status}</span></div>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/courses">Browse More Courses</Link>
              </Button>
            </div>

            {entries.length > 0 && (
              <details className="mt-4">
                <summary className="text-sm text-muted-foreground cursor-pointer">View raw response</summary>
                <div className="overflow-auto mt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left">
                        <th className="py-2 pr-4">Field</th>
                        <th className="py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map(([k, v]) => (
                        <tr key={k} className="border-t">
                          <td className="py-2 pr-4 font-medium">{k}</td>
                          <td className="py-2">{v === null ? <i className="text-muted-foreground">N/A</i> : String(v)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}


