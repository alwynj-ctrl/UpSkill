"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PaytmFailurePage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<{
    orderId: string | null
    reason: string | null
    error: string | null
    details: string | null
  }>({
    orderId: null,
    reason: null,
    error: null,
    details: null,
  })

  useEffect(() => {
    setPaymentDetails({
      orderId: searchParams.get("orderId"),
      reason: searchParams.get("reason"),
      error: searchParams.get("error"),
      details: searchParams.get("details"),
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

            <div className="bg-red-50 border border-red-200 p-6 rounded-lg space-y-3">
              <h3 className="font-semibold text-lg text-red-800">Error Details</h3>
              <div className="text-sm space-y-2 text-left">
                {paymentDetails.orderId && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="font-mono">{paymentDetails.orderId}</span>
                  </div>
                )}
                {paymentDetails.reason && (
                  <div className="bg-white p-3 rounded">
                    <span className="text-red-600 font-medium">Reason: {paymentDetails.reason}</span>
                  </div>
                )}
                {paymentDetails.error && (
                  <div className="bg-white p-3 rounded">
                    <span className="text-red-600 font-medium">Error: {paymentDetails.error}</span>
                  </div>
                )}
                {paymentDetails.details && (
                  <div className="bg-white p-3 rounded">
                    <span className="text-red-600 text-xs">Details: {paymentDetails.details}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Common reasons for payment failure:
              </p>
              <ul className="text-sm text-left space-y-1 text-muted-foreground max-w-md mx-auto">
                <li>• Insufficient balance in your account</li>
                <li>• Incorrect payment details</li>
                <li>• Transaction timeout</li>
                <li>• Bank server issues</li>
              </ul>

              <div className="flex gap-4 justify-center flex-wrap">
                <Button onClick={() => window.history.back()} size="lg">
                  Try Again
                </Button>
                <Button variant="outline" asChild size="lg">
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

