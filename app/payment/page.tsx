"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
// import { submitPaymentForm } from "sabpaisa-pg-dev"
// import { SABPAISA_CONFIG, SABPAISA_STAGING } from "@/lib/sabpaisa"
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
  {
    id: "full-stack-java",
    title: "Full Stack Java Development",
    price: 119999,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
    description:
      "End-to-end application development with Core Java, Spring Boot, modern frontend frameworks, databases, testing, and deployments.",
    duration: "4–9 months",
    mode: "Online / Hybrid",
  },
  {
    id: "python-development",
    title: "Python Programming & Application Development",
    price: 74999,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    description:
      "Beginner-friendly Python path covering fundamentals, web frameworks, APIs, automation, and database integration.",
    duration: "2–6 months",
    mode: "Online",
  },
  {
    id: "data-analytics-bi",
    title: "Data Analytics & Business Intelligence",
    price: 149999,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    description:
      "Analytics toolkit with Excel, SQL, Python, visualization tools, and dashboard storytelling using real datasets.",
    duration: "3–8 months",
    mode: "Online / Hybrid",
  },
  {
    id: "data-science-ml",
    title: "Data Science & Machine Learning",
    price: 249999,
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Advanced AI/ML curriculum spanning statistics, deep learning, NLP, TensorFlow/PyTorch, and cloud deployment.",
    duration: "6–12 months",
    mode: "Online / Hybrid",
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud Engineering",
    price: 179999,
    image: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1200&q=80",
    description:
      "DevOps lifecycle coverage: Linux, Git, CI/CD, Docker, Kubernetes, Terraform, and AWS/Azure cloud infrastructure.",
    duration: "4–10 months",
    mode: "Online / Hybrid",
  },
  {
    id: "cybersecurity-ethical-hacking",
    title: "Cybersecurity & Ethical Hacking",
    price: 219999,
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
    description:
      "Security programme covering vulnerability assessment, pen testing, SOC operations, SIEM tooling, and malware analysis.",
    duration: "5–12 months",
    mode: "Online / Hybrid",
  },
  {
    id: "ui-ux-frontend",
    title: "UI/UX Design & Frontend Development",
    price: 89999,
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Design-thinking plus frontend build track using Figma, HTML/CSS/JS, React, responsive design, and portfolio projects.",
    duration: "2–6 months",
    mode: "Online",
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing (AWS / Azure / GCP)",
    price: 109900,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Cloud certification prep covering compute, storage, networking, IAM, VPC, load balancing, and architecture design.",
    duration: "3–6 months",
    mode: "Online",
  },
  {
    id: "german-master-bundle",
    title: "German Language Training (A1–C1)",
    price: 115000,
    image: "/german-language-learning-online.jpg",
    description:
      "German master bundle advancing from greetings to professional fluency with Goethe C1 preparation.",
    duration: "A1–C1 tracks",
    mode: "Online / Classroom",
  },
  {
    id: "french-master-bundle",
    title: "French Language Training (A1–C1)",
    price: 105000,
    image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=80",
    description:
      "Comprehensive French mastery program emphasizing pronunciation, communication, grammar, and cultural immersion.",
    duration: "A1–C1 tracks",
    mode: "Online / Classroom",
  },
  {
    id: "spanish-master-bundle",
    title: "Spanish Language Training (A1–C1)",
    price: 95000,
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Structured Spanish journey to achieve fluent communication and DELE certification readiness.",
    duration: "A1–C1 tracks",
    mode: "Online / Classroom",
  },
  {
    id: "japanese-jlpt",
    title: "Japanese Language Training (JLPT N5–N1)",
    price: 145000,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description:
      "JLPT-aligned track strengthening Kanji, grammar, and business communication for careers in Japan.",
    duration: "N5–N1 tracks",
    mode: "Online / Classroom",
  },
  {
    id: "korean-topik",
    title: "Korean Language Training (TOPIK 1–6)",
    price: 120000,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    description:
      "TOPIK-ready Korean learning path from Hangul basics to advanced business communication and writing.",
    duration: "TOPIK 1–6 tracks",
    mode: "Online / Classroom",
  },
  {
    id: "english-communication",
    title: "English Communication (Beginner → Advanced)",
    price: 29999,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    description:
      "Practical English communication bundle spanning grammar, workplace writing, presentations, and leadership speaking.",
    duration: "Flexible tracks",
    mode: "Online / Classroom",
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
  const [paymentMethod, setPaymentMethod] = useState<"payu" | "upskill">("payu")
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
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

  const formatContactNumber = (value: string) => {
    if (!value) return ""
    const trimmed = value.replace(/\s+/g, "")
    if (trimmed.startsWith("+")) {
      return trimmed
    }
    // Default to India country code if one is not provided
    return `+91${trimmed}`
  }

  // Razorpay disabled

  /* const initiateSabpaisaPayment = async () => {
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
  } */

  const initiatePayUPayment = async () => {
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

      if (!response.ok || !result.success) {
        alert(result.error || "Payment initialization failed. Please try again.")
        setIsProcessingPayment(false)
        return
      }

      console.log("[PayU] Payment initialized successfully")
      console.log("[PayU] Transaction ID:", result.paymentData.txnid)
      console.log("[PayU] Hash:", result.paymentData.hash)

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

  /* const initiateAirpayPayment = async () => {
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
          customField: selectedCourse.id,
          uid: userId,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        alert(result.error || "Payment initialization failed. Please try again.")
        setIsProcessingPayment(false)
        return
      }

      try {
        await supabase
          .from("purchases")
          .update({ payment_id: result.orderId })
          .eq("id", purchaseData.id)
      } catch (updateError) {
        console.warn("[Airpay] Failed to update purchase with order id:", updateError)
      }

      // Log form data being submitted to Airpay
      console.log("[Airpay Frontend] Form data being submitted to Airpay:")
      console.log("  Payment URL:", result.paymentUrl)
      console.log("  Order ID:", result.orderId)
      console.log("  Total fields:", Object.keys(result.paymentData).length)
      console.log("  Payment Data Fields:", Object.keys(result.paymentData).join(", "))
      console.log("  orderid:", result.paymentData.orderid)
      console.log("  amount:", result.paymentData.amount)
      console.log("  buyerEmail:", result.paymentData.buyerEmail)
      console.log("  buyerFirstName:", result.paymentData.buyerFirstName)
      console.log("  buyerLastName:", result.paymentData.buyerLastName)
      console.log("  UID:", result.paymentData.UID)
      console.log("  mercid:", result.paymentData.mercid)
      console.log("  privatekey:", "privatekey" in result.paymentData ? (result.paymentData.privatekey?.substring(0, 20) + "...") : "NOT PRESENT")
      console.log("  checksum:", result.paymentData.checksum)
      console.log("  checksumLength:", result.paymentData.checksum?.length)
      console.log("[Airpay Frontend] ✓ privatekey included (required by Airpay):", "privatekey" in result.paymentData)
      console.log("[Airpay Frontend] ✓ Empty optional fields filtered out")
      console.log("[Airpay Frontend] Full paymentData object (cleaned):", JSON.stringify(result.paymentData, null, 2))

      const airpayForm = document.createElement("form")
      airpayForm.method = "POST"
      airpayForm.action = result.paymentUrl
      airpayForm.style.display = "none"

      // Log each form field being added
      const formFields: Record<string, string> = {}
      Object.entries(result.paymentData).forEach(([key, value]) => {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = key
        input.value = String(value)
        formFields[key] = String(value)
        airpayForm.appendChild(input)
      })

      console.log("[Airpay Frontend] Form fields being submitted:", formFields)

      document.body.appendChild(airpayForm)
      airpayForm.submit()
    } catch (error) {
      console.error("[Airpay] Payment error:", error)
      alert("Payment initialization failed. Please try again.")
      setIsProcessingPayment(false)
    }
  } */

  const handlePayment = () => {
    console.log("[v0] Processing payment...", {
      method: paymentMethod,
      course: selectedCourse,
      amount: useCustomAmount ? customAmount : selectedCourse?.price,
      userDetails: formData,
    })

    if (paymentMethod === "payu") {
      initiatePayUPayment()
    } else if (paymentMethod === "upskill") {
      alert("Upskill Pay is not configured yet. Please switch to PayU for now.")
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
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto text-center border-emerald-100 shadow-sm">
            <CardContent className="p-10 space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">Checkout</p>
              <h1 className="text-3xl font-semibold">No course selected</h1>
              <p className="text-muted-foreground">Please return to the courses page and choose the program you want to enroll in.</p>
              <div className="flex gap-3 justify-center pt-2">
                <Button onClick={() => window.history.back()}>Go Back</Button>
                <Button variant="outline" onClick={() => (window.location.href = "/courses")}>
                  View Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const finalAmount = useCustomAmount ? Number.parseFloat(customAmount) || selectedCourse.price : selectedCourse.price
  const paymentMethodLabel = paymentMethod === "upskill" ? "Upskill Pay" : "PayU"

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="hero-bleed bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 text-white py-12">
        <div className="container mx-auto px-4 text-center space-y-4 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">Secure Checkout</p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Complete Enrollment · {selectedCourse.title}
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            Confirm your learner details, pick a payment method, and reserve your seat in the next cohort.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 grid gap-8 lg:grid-cols-[3fr,2fr]">
        {/* Course Summary */}
        <Card className="border-emerald-100/70 shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex-1 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">{selectedCourse.mode}</p>
                <h2 className="text-2xl font-semibold">{selectedCourse.title}</h2>
                <p className="text-sm text-slate-600">{selectedCourse.description}</p>
              </div>
              <div className="md:w-48 rounded-lg overflow-hidden">
                <img
                  src={selectedCourse.image || "/placeholder.svg"}
                  alt={selectedCourse.title}
                  className="h-32 w-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-1">Duration</p>
                <p className="font-semibold">{selectedCourse.duration}</p>
              </div>
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-1">Mode</p>
                <p className="font-semibold">{selectedCourse.mode}</p>
              </div>
              <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-700 mb-1">Base Fee</p>
                <p className="font-semibold">₹{selectedCourse.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-semibold">Custom Amount (optional)</Label>
                  <p className="text-xs text-slate-500">Adjust fee for scholarships or custom plans.</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCustomAmount(selectedCourse.price.toString())
                    setUseCustomAmount(false)
                  }}
                >
                  Reset
                </Button>
              </div>
              <Input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                min="1000"
              />
              <div className="rounded-xl bg-slate-100 px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-slate-600">Final Amount</span>
                <span className="text-2xl font-semibold text-emerald-700">₹{finalAmount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Form */}
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">Student Details</p>
              <h3 className="text-xl font-semibold">Who are we enrolling?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email *</Label>
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
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                />
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" value={formData.state} onChange={(e) => handleInputChange("state", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="pincode">PIN</Label>
                <Input
                  id="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange("pincode", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specialRequirements">Notes</Label>
              <Textarea
                id="specialRequirements"
                placeholder="Anything we should know before onboarding?"
                value={formData.specialRequirements}
                onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="space-y-1">
                <Label className="text-base font-medium">Payment Method</Label>
                <p className="text-xs text-slate-500">
                  Choose between our PayU gateway and Upskill Pay (internal payment option).
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <Button
                  variant={paymentMethod === "payu" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("payu")}
                  className="w-full"
                >
                  PayU
                </Button>
                <Button
                  variant={paymentMethod === "upskill" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("upskill")}
                  className="w-full"
                >
                  Upskill Pay
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course Fee</span>
                <span>₹{selectedCourse.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Custom Adjustment</span>
                <span>{useCustomAmount ? "Applied" : "Default"}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-base font-medium">Amount Payable</span>
                <span className="text-2xl font-bold text-emerald-700">₹{finalAmount.toLocaleString()}</span>
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                checked={hasAcceptedTerms}
                onChange={(e) => setHasAcceptedTerms(e.target.checked)}
              />
              <span>
                I confirm that I have read and agree to the{" "}
                <Link href="/terms" className="text-emerald-700 underline underline-offset-2">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-emerald-700 underline underline-offset-2">
                  Privacy Policy
                </Link>
                . I understand that the selected payment method will be used to process my enrollment.
              </span>
            </label>

            <Button
              id="pay-button"
              className="w-full h-12 text-base"
              onClick={handlePayment}
              disabled={
                !formData.firstName ||
                !formData.lastName ||
                !formData.email ||
                !formData.phone ||
                isProcessingPayment ||
                !hasAcceptedTerms
              }
            >
              {isProcessingPayment ? `Redirecting to ${paymentMethodLabel}...` : `Pay with ${paymentMethodLabel}`}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
