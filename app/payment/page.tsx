"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { submitPaymentForm } from "sabpaisa-pg-dev"
import { SABPAISA_CONFIG, SABPAISA_STAGING, generateSabPaisaOrderId } from "@/lib/sabpaisa"
import { useSearchParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const courses = [
  {
    id: "assessment-level-1",
    title: "Assessment Test - Level 1",
    price: 4999,
    image: "/assessment-test-level-1.jpg",
    description:
      "Level 1 assessment test to evaluate your current skill level and determine the appropriate course path.",
    duration: "1 day",
    mode: "Online",
  },
  {
    id: "assessment-level-2",
    title: "Assessment Test - Level 2",
    price: 9999,
    image: "/assessment-test-level-2.jpg",
    description: "Advanced Level 2 assessment test for higher skill evaluation and specialized course recommendations.",
    duration: "1 day",
    mode: "Online",
  },
  {
    id: "german-intensive",
    title: "German online Intensive",
    price: 19999,
    image: "/german-language-intensive-course.jpg",
    description:
      "Intensive German language course designed for rapid learning with daily sessions and immersive practice.",
    duration: "6 months",
    mode: "Online",
  },
  {
    id: "german-individual",
    title: "German Online Individual Training",
    price: 29999,
    image: "/german-individual-training.jpg",
    description: "One-on-one German language training with personalized curriculum and flexible scheduling.",
    duration: "Flexible",
    mode: "Online",
  },
  {
    id: "foreign-a1",
    title: "Foreign Language Course – A1 (Beginner Level)",
    price: 34999,
    image: "/foreign-language-beginner-course.jpg",
    description: "Beginner level foreign language course covering basic vocabulary, grammar, and conversation skills.",
    duration: "4 months",
    mode: "Online/Offline",
  },
  {
    id: "foreign-a2",
    title: "Foreign Language Course – A2 (Elementary Level)",
    price: 44999,
    image: "/foreign-language-elementary-course.jpg",
    description: "Elementary level course building on A1 foundations with expanded vocabulary and grammar structures.",
    duration: "4 months",
    mode: "Online/Offline",
  },
  {
    id: "foreign-b1",
    title: "Foreign Language Course – B1 (Intermediate Level)",
    price: 59999,
    image: "/foreign-language-intermediate-course.jpg",
    description: "Intermediate level course focusing on complex conversations and professional language skills.",
    duration: "5 months",
    mode: "Online/Offline",
  },
  {
    id: "foreign-b2",
    title: "Foreign Language Course – B2 (Upper Intermediate Level)",
    price: 79999,
    image: "/foreign-language-upper-intermediate.jpg",
    description:
      "Upper intermediate course preparing students for advanced proficiency and professional certification.",
    duration: "6 months",
    mode: "Online/Offline",
  },
]

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course")
  const router = useRouter()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [customAmount, setCustomAmount] = useState("")
  const [useCustomAmount, setUseCustomAmount] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [userId, setUserId] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("airpay")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    vpa: "",
    specialRequirements: "",
  })

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push(`/auth/login?redirect=/payment?course=${courseId}`)
        return
      }

      setIsAuthenticated(true)
      setUserId(user.id)
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
      }))
      setIsCheckingAuth(false)
    }

    checkAuth()
  }, [courseId, router])

  useEffect(() => {
    if (courseId) {
      const course = courses.find((c) => c.id === courseId)
      if (course) {
        setSelectedCourse(course)
        setCustomAmount(course.price.toString())
      }
    }
  }, [courseId])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value)
    setUseCustomAmount(true)
  }

  const initiateSabpaisaPayment = async () => {
    setIsProcessingPayment(true)

    if (!selectedCourse || !userId) {
      alert("Missing required information")
      setIsProcessingPayment(false)
      return
    }

    try {
      const payButton = document.getElementById('pay-button') as HTMLButtonElement
      if (payButton) {
        payButton.disabled = true
        payButton.textContent = 'Redirecting...'
      }

      const currentAmount = useCustomAmount ? Number.parseFloat(customAmount) || selectedCourse.price : selectedCourse.price

      const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
      const useAuth = isLocalhost ? SABPAISA_STAGING : SABPAISA_CONFIG

      // Generate transaction date in required format
      const now = new Date()
      const transDate = now.getFullYear() + '-' + 
        String(now.getMonth() + 1).padStart(2, '0') + '-' + 
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0')

      const formState: Record<string, any> = {
        clientCode: useAuth.CLIENT_CODE,
        transUserName: useAuth.USERNAME,
        transUserPassword: useAuth.PASSWORD,
        authKey: useAuth.AUTH_KEY,
        authIV: useAuth.AUTH_IV,
        payerName: `${formData.firstName} ${formData.lastName}`.trim(),
        payerEmail: formData.email,
        payerMobile: formData.phone,
        amount: currentAmount,
        amountType: "INR",
        clientTxnId: `${useAuth.CLIENT_CODE}-${Date.now()}`,
        channelId: "npm",
        // MANDATORY fields from docs
        mcc: "6012", // Education/schools MCC code
        transDate: transDate,
        // carry course/user context back in response for saving purchase
        udf1: selectedCourse.id,
        udf2: selectedCourse.title,
        udf3: userId,
        udf4: null, udf5: null,
        udf6: null, udf7: null, udf8: null, udf9: null, udf10: null,
        udf11: null, udf12: null, udf13: null, udf14: null, udf15: null,
        udf16: null, udf17: null, udf18: null, udf19: null, udf20: null,
        payerVpa: "", modeTransfer: "", byPassFlag: "",
        cardHolderName: "", pan: "", cardExpMonth: "", cardExpYear: "", cardType: "", cvv: "",
        browserDetails: "", bankId: "", env: isLocalhost ? "STAG" : "PROD",
        callbackUrl: `${window.location.origin}/payment/response`,
      }

      // Persist for debugging since the page navigates to SabPaisa
      try { localStorage.setItem('sabpaisa:lastPayload', JSON.stringify(formState)); } catch {}
      console.log('[SabPaisa] Submitting SDK form with params:', formState)
      submitPaymentForm(formState)
    } catch (error) {
      console.error("[v0] SabPaisa payment error:", error)
      alert("Payment initialization failed. Please try again.")
      setIsProcessingPayment(false)
    }
  }

  const initiatePaytmPayment = async () => {
    setIsProcessingPayment(true)

    try {
      const currentAmount = useCustomAmount ? Number.parseFloat(customAmount) || selectedCourse.price : selectedCourse.price

      const supabase = createClient()
      const { data: purchaseData, error: purchaseError } = await supabase
        .from("purchases")
        .insert({
          user_id: userId,
          course_name: selectedCourse.title,
          course_price: currentAmount,
          payment_status: "pending",
        })
        .select()
        .single()

      if (purchaseError) {
        console.error("[v0] Error creating purchase record:", purchaseError)
        alert("Failed to create purchase record. Please try again.")
        setIsProcessingPayment(false)
        return
      }

      const response = await fetch("/api/paytm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: currentAmount,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          productInfo: selectedCourse.title,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          purchaseId: purchaseData.id,
          returnUrl: `${window.location.origin}/payment/success`,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        alert(result.error || "Payment initialization failed. Please try again.")
        setIsProcessingPayment(false)
        return
      }

      console.log("[Paytm] Transaction initiated, txnToken:", result.txnToken)

      // Redirect to Paytm payment page
      const paytmBaseUrl = result.isProduction ? "https://securegw.paytm.in" : "https://securestage.paytm.in"
      const paytmForm = document.createElement("form")
      paytmForm.method = "POST"
      paytmForm.action = `${paytmBaseUrl}/theia/api/v1/showPaymentPage?mid=${result.mid}&orderId=${result.orderId}`
      paytmForm.style.display = "none"

      // Add txnToken as hidden field
      const tokenInput = document.createElement("input")
      tokenInput.type = "hidden"
      tokenInput.name = "txnToken"
      tokenInput.value = result.txnToken
      paytmForm.appendChild(tokenInput)

      document.body.appendChild(paytmForm)
      paytmForm.submit()
    } catch (error) {
      console.error("[v0] Paytm payment error:", error)
      alert("Payment initialization failed. Please try again.")
      setIsProcessingPayment(false)
    }
  }

  const initiatePayUPayment = async () => {
    setIsProcessingPayment(true)

    try {
      const currentAmount = useCustomAmount ? Number.parseFloat(customAmount) || selectedCourse.price : selectedCourse.price

      const supabase = createClient()
      const { data: purchaseData, error: purchaseError } = await supabase
        .from("purchases")
        .insert({
          user_id: userId,
          course_name: selectedCourse.title,
          course_price: currentAmount,
          payment_status: "pending",
        })
        .select()
        .single()

      if (purchaseError) {
        console.error("[PayU] Error creating purchase record:", purchaseError)
        alert("Failed to create purchase record. Please try again.")
        setIsProcessingPayment(false)
        return
      }

      const response = await fetch("/api/payu-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: currentAmount,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          productInfo: selectedCourse.title,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          purchaseId: purchaseData.id,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        alert(result.error || "Payment initialization failed. Please try again.")
        setIsProcessingPayment(false)
        return
      }

      console.log("[PayU] Payment initialized successfully")

      // Create and submit form to PayU
      const payuForm = document.createElement("form")
      payuForm.method = "POST"
      payuForm.action = result.paymentUrl
      payuForm.style.display = "none"

      // Add all payment data as hidden fields
      Object.entries(result.paymentData).forEach(([key, value]) => {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = key
        input.value = String(value)
        payuForm.appendChild(input)
      })

      document.body.appendChild(payuForm)
      payuForm.submit()
    } catch (error) {
      console.error("[PayU] Payment error:", error)
      alert("Payment initialization failed. Please try again.")
      setIsProcessingPayment(false)
    }
  }

  const initiateAirpayPayment = async () => {
    setIsProcessingPayment(true)

    if (!selectedCourse || !userId) {
      alert("Missing required information")
      setIsProcessingPayment(false)
      return
    }

    try {
      const currentAmount = useCustomAmount ? Number.parseFloat(customAmount) || selectedCourse.price : selectedCourse.price

      const supabase = createClient()
      const { data: purchaseData, error: purchaseError } = await supabase
        .from("purchases")
        .insert({
          user_id: userId,
          course_name: selectedCourse.title,
          course_price: currentAmount,
          payment_status: "pending",
        })
        .select()
        .single()

      if (purchaseError) {
        console.error("[Airpay] Error creating purchase record:", purchaseError)
        alert("Failed to create purchase record. Please try again.")
        setIsProcessingPayment(false)
        return
      }

      const response = await fetch("/api/airpay-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: currentAmount,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: "India",
          purchaseId: purchaseData.id,
          uid: userId,
          vpa: formData.vpa,
          domainUrl: typeof window !== "undefined" ? window.location.origin : undefined,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        console.error("[Airpay] Seamless payment failed:", result)
        alert(result.error || "Airpay payment failed. Please try again.")
        setIsProcessingPayment(false)
        return
      }

      try {
        await supabase
          .from("purchases")
          .update({
            payment_id: result.orderId,
            payment_status:
              result.response?.TRANSACTIONSTATUS === "200" ||
              result.response?.TRANSACTIONPAYMENTSTATUS === "SUCCESS"
                ? "completed"
                : "pending",
            gateway_response: result.response,
          })
          .eq("id", purchaseData.id)
      } catch (updateError) {
        console.warn("[Airpay] Failed to update purchase with order id:", updateError)
      }

      console.log("[Airpay Frontend] Seamless payload submitted:", result.payload)
      console.log("[Airpay Frontend] Seamless response:", result.response)

      if (
        result.response?.TRANSACTIONSTATUS === "200" ||
        result.response?.TRANSACTIONPAYMENTSTATUS === "SUCCESS"
      ) {
        alert("Airpay payment completed successfully.")
      } else {
        alert(
          `Payment initiated. Current status: ${
            result.response?.TRANSACTIONPAYMENTSTATUS || result.response?.MESSAGE || "UNKNOWN"
          }`
        )
      }

      setIsProcessingPayment(false)
    } catch (error) {
      console.error("[Airpay] Payment error:", error)
      alert("Payment initialization failed. Please try again.")
      setIsProcessingPayment(false)
    }
  }

  const handlePayment = () => {
    console.log("[v0] Processing payment...", {
      method: paymentMethod,
      course: selectedCourse,
      amount: useCustomAmount ? customAmount : selectedCourse?.price,
      userDetails: formData,
    })

    if (paymentMethod === "paytm") {
      initiatePaytmPayment()
    } else if (paymentMethod === "payu") {
      initiatePayUPayment()
    } else if (paymentMethod === "airpay") {
      initiateAirpayPayment()
    } else {
      initiateSabpaisaPayment()
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Checking authentication...</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
              <p className="text-muted-foreground mb-4">Please select a course from the courses page.</p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const finalAmount = useCustomAmount ? Number.parseFloat(customAmount) || selectedCourse.price : selectedCourse.price

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Details */}
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                <img
                  src={selectedCourse.image || "/placeholder.svg"}
                  alt={selectedCourse.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{selectedCourse.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedCourse.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="font-medium">Duration:</span>
                  <span>{selectedCourse.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Mode:</span>
                  <span>{selectedCourse.mode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Original Price:</span>
                  <span className="text-lg font-bold">₹{selectedCourse.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Custom Amount Section */}
              <div className="border-t pt-4">
                <Label className="text-base font-medium mb-2 block">Customize Amount (Optional)</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  You can adjust the course fee based on your requirements or financial situation.
                </p>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      min="1000"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCustomAmount(selectedCourse.price.toString())
                      setUseCustomAmount(false)
                    }}
                  >
                    Reset
                  </Button>
                </div>
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Final Amount:</span>
                    <span className="text-xl font-bold text-primary">₹{finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Details Form */}
          <Card>
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  disabled
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="vpa">UPI VPA (optional)</Label>
                <Input
                  id="vpa"
                  placeholder="username@bank"
                  value={formData.vpa}
                  onChange={(e) => handleInputChange("vpa", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="specialRequirements">Special Requirements</Label>
                <Textarea
                  id="specialRequirements"
                  placeholder="Any specific requirements or questions about the course..."
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="pt-4 border-t">
                <div className="mb-4">
                  <Label className="text-base font-medium mb-2 block">Payment Method</Label>
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      disabled
                      variant={paymentMethod === "sabpaisa" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("sabpaisa")}
                      className="w-full"
                    >
                      SabPaisa
                    </Button>
                    <Button
                      variant={paymentMethod === "airpay" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("airpay")}
                      className="w-full"
                    >
                      Airpay
                    </Button>
                    <Button
                      variant={paymentMethod === "payu" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("payu")}
                      className="w-full"
                    >
                      PayU
                    </Button>
                    <Button
                      disabled
                      variant={paymentMethod === "paytm" ? "default" : "outline"}
                      onClick={() => setPaymentMethod("paytm")}
                      className="w-full"
                    >
                      Paytm
                    </Button>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg mb-4">
                  <h4 className="font-medium mb-2">Payment Summary</h4>
                  <div className="flex justify-between items-center">
                    <span>Total Amount:</span>
                    <span className="text-xl font-bold text-primary">₹{finalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  id="pay-button"
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.email ||
                    !formData.phone ||
                    isProcessingPayment
                  }
                >
                  {isProcessingPayment
                    ? `Redirecting to ${
                        paymentMethod === "paytm"
                          ? "Paytm"
                          : paymentMethod === "payu"
                            ? "PayU"
                            : paymentMethod === "airpay"
                              ? "Airpay"
                              : "SabPaisa"
                      }...`
                    : `Pay with ${
                        paymentMethod === "paytm"
                          ? "Paytm"
                          : paymentMethod === "payu"
                            ? "PayU"
                            : paymentMethod === "airpay"
                              ? "Airpay"
                              : "SabPaisa"
                      }`}
                </Button>

                <p className="text-xs text-muted-foreground mt-2 text-center">
                  By proceeding, you agree to our Terms & Conditions and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
