"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaymentFailurePage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState(null)

  useEffect(() => {
    // Extract payment details from URL parameters
    const transactionId = searchParams.get("TRANSACTIONID")
    const amount = searchParams.get("AMOUNT")
    const orderId = searchParams.get("ORDERID")
    const status = searchParams.get("STATUS")
    const message = searchParams.get("MESSAGE")

    setPaymentDetails({
      transactionId,
      amount,
      orderId,
      status,
      message,
    })
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              We're sorry, but your payment could not be processed. Please try again.
            </p>

            {paymentDetails && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-medium">Payment Details</h3>
                <div className="text-sm space-y-1">
                  {paymentDetails.transactionId && (
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span className="font-mono">{paymentDetails.transactionId}</span>
                    </div>
                  )}
                  {paymentDetails.orderId && (
                    <div className="flex justify-between">
                      <span>Order ID:</span>
                      <span className="font-mono">{paymentDetails.orderId}</span>
                    </div>
                  )}
                  {paymentDetails.amount && (
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span>₹{paymentDetails.amount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-red-600 font-medium">{paymentDetails.status || "Failed"}</span>
                  </div>
                  {paymentDetails.message && (
                    <div className="flex justify-between">
                      <span>Message:</span>
                      <span className="text-red-600">{paymentDetails.message}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you continue to experience issues, please contact our support team.
              </p>

              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.history.back()}>Try Again</Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
