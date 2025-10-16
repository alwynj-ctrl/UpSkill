"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaytmSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<{
    orderId: string | null
    txnId: string | null
    amount: string | null
  }>({
    orderId: null,
    txnId: null,
    amount: null,
  })

  useEffect(() => {
    setPaymentDetails({
      orderId: searchParams.get("orderId"),
      txnId: searchParams.get("txnId"),
      amount: searchParams.get("amount"),
    })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              Thank you for your payment. Your transaction has been completed successfully.
            </p>

            {paymentDetails.orderId && (
              <div className="bg-muted p-6 rounded-lg space-y-3">
                <h3 className="font-semibold text-lg">Payment Details</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-mono font-medium">{paymentDetails.orderId}</span>
                  </div>
                  {paymentDetails.txnId && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="font-mono font-medium">{paymentDetails.txnId}</span>
                    </div>
                  )}
                  {paymentDetails.amount && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Amount Paid:</span>
                      <span className="text-lg font-bold text-green-600">₹{paymentDetails.amount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-green-600 font-semibold">✓ Completed</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You can now access your purchased course from the dashboard.
              </p>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}

