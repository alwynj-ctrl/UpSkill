"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PayUFailurePage() {
  const searchParams = useSearchParams()
  const [paymentDetails, setPaymentDetails] = useState<{
    txnid: string | null
    status: string | null
    error: string | null
    errorMessage: string | null
    details: string | null
  }>({
    txnid: null,
    status: null,
    error: null,
    errorMessage: null,
    details: null,
  })

  useEffect(() => {
    setPaymentDetails({
      txnid: searchParams.get("txnid"),
      status: searchParams.get("status"),
      error: searchParams.get("error"),
      errorMessage: searchParams.get("error_Message"),
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
                {paymentDetails.txnid && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Transaction ID:</span>
                    <span className="font-mono">{paymentDetails.txnid}</span>
                  </div>
                )}
                {paymentDetails.status && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-red-600 font-medium capitalize">{paymentDetails.status}</span>
                  </div>
                )}
                {(paymentDetails.errorMessage || paymentDetails.error) && (
                  <div className="bg-white p-3 rounded mt-2">
                    <span className="text-red-600 font-medium">
                      {paymentDetails.errorMessage || paymentDetails.error}
                    </span>
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
              <p className="text-sm text-muted-foreground">Common reasons for payment failure:</p>
              <ul className="text-sm text-left space-y-1 text-muted-foreground max-w-md mx-auto">
                <li>• Insufficient balance in your account</li>
                <li>• Incorrect payment details</li>
                <li>• Transaction timeout</li>
                <li>• Bank server issues</li>
                <li>• Card not enabled for online transactions</li>
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

