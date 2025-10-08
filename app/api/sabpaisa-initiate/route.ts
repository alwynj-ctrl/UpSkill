import { NextRequest, NextResponse } from 'next/server'
import { SABPAISA_CONFIG, generateSabPaisaOrderId } from '@/lib/sabpaisa'

// SabPaisa typically uses a POST form submission with required params
// We'll return the fields required for the frontend to auto-submit a form

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, courseId, userInfo } = body

    if (!amount || !userInfo?.email || !userInfo?.firstName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const orderId = generateSabPaisaOrderId()

    // Minimal required params; SabPaisa has more optional fields depending on setup
    const params: Record<string, string> = {
      clientCode: SABPAISA_CONFIG.CLIENT_CODE,
      transUserName: SABPAISA_CONFIG.USERNAME,
      transUserPassword: SABPAISA_CONFIG.PASSWORD,
      amount: Number(amount).toFixed(2),
      spURL: SABPAISA_CONFIG.INIT_URL,
      accountNumber: orderId,
      payerName: `${userInfo.firstName} ${userInfo.lastName || ''}`.trim(),
      payerEmail: userInfo.email,
      payerMobile: userInfo.phone || '',
      programId: courseId || 'COURSE',
      returnUrl: SABPAISA_CONFIG.RETURN_URL,
      failureURL: SABPAISA_CONFIG.FAILURE_URL,
    }

    return NextResponse.json({ success: true, orderId, formAction: SABPAISA_CONFIG.INIT_URL, fields: params })
  } catch (e) {
    console.error('SabPaisa initiate error', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


