import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="hero-bleed bg-card py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center">TERMS & CONDITIONS</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-sm text-muted-foreground">
              These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding
              agreement by and between Upskill Workforce Private Limited ("Website Owner" or "we" or "us" or "our") and
              you ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as
              applicable) (collectively, "Services").
            </p>

            <p>
              By using our website and availing the Services, you agree that you have read and accepted these Terms
              (including the Privacy Policy). We reserve the right to modify these Terms at any time and without
              assigning any reason. It is your responsibility to periodically review these Terms to stay informed of
              updates.
            </p>

            <p>The use of this website or availing of our Services is subject to the following terms of use:</p>

            <ul className="space-y-4 list-disc pl-6">
              <li>
                To access and use the Services, you agree to provide true, accurate and complete information to us
                during and after registration, and you shall be responsible for all acts done through the use of your
                registered account.
              </li>
              <li>
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness,
                performance, completeness or suitability of the information and materials offered on this website or
                through the Services, for any specific purpose. You acknowledge that such information and materials may
                contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to
                the fullest extent permitted by law.
              </li>
              <li>
                Your use of our Services and any dispute arising out of such use of the Services is subject to the laws
                of India.
              </li>
            </ul>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Refund Processing Time:</h2>
              <p>
                If a refund is approved, it will be credited within 5 to 8 working days to the original payment method.
              </p>
            </div>

            {/* <div className="space-y-4">
              <h2 className="text-xl font-bold">Contact Information:</h2>
              <p>
                For any issues or questions, feel free to reach out to our Customer Support team on this email:
                <a href="mailto:admin@upskillworkforce.co" className="text-primary hover:underline ml-1">
                  admin@upskillworkforce.co
                </a>
              </p>
            </div> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
