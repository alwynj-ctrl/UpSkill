import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // Razorpay intentionally disabled: Paytm is the active gateway.
  // Keeping the route so old clients don't 404, but we block usage explicitly.
  return NextResponse.json(
    { success: false, error: "Razorpay is disabled. Please use Paytm." },
    { status: 410 }
  )
}


