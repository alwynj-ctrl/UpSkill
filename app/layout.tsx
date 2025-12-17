import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Inter, Roboto_Mono } from "next/font/google"

// Initialize fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "UpSkill Workforce - Professional Training & Development",
  description: "Empowering individuals and organizations through high-quality, industry-relevant training programs.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
        {/* Paytm JS Script - Commented out (not required for the hosted checkout flow used in /payment) */}
        {/* <script 
          type="application/javascript" 
          src="https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/YOUR_PAYTM_MID.js" 
          onLoad="onScriptLoad();" 
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function onScriptLoad(){
                window.PaytmConfig = {
                  "root": "",
                  "flow": "DEFAULT",
                  "data": {
                    "orderId": "",
                    "token": "",
                    "tokenType": "TXN_TOKEN",
                    "amount": ""
                  },
                  "handler": {
                    "notifyMerchant": function(eventName,data){
                      console.log("notifyMerchant handler function called");
                      console.log("eventName => ",eventName);
                      console.log("data => ",data);
                    }
                  }
                };
              }
            `,
          }}
        /> */}
      </head>
      <body className="font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('dark')`,
          }}
        />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
