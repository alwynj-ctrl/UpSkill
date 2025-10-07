"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState(null)

  useEffect(() => {
    // Extract payment details from URL parameters
    const transactionId = searchParams.get("TRANSACTIONID")
    const amount = searchParams.get("AMOUNT")
    const orderId = searchParams.get("ORDERID")
    const status = searchParams.get("STATUS")

    if (transactionId) {
      setPaymentDetails({
        transactionId,
        amount,
        orderId,
        status,
      })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-muted-foreground">
              Thank you for your payment. Your course enrollment has been confirmed.
            </p>

            {paymentDetails && (
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-medium">Payment Details</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono">{paymentDetails.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Order ID:</span>
                    <span className="font-mono">{paymentDetails.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span>₹{paymentDetails.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600 font-medium">{paymentDetails.status}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You will receive a confirmation email shortly with course access details.
              </p>

              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/courses">Browse More Courses</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Go to Homepage</Link>
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
