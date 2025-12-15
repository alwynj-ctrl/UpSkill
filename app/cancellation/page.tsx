import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function CancellationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="hero-bleed bg-card py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center">CANCELLATION & REFUND POLICY</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">
                Cancellation & Refund Policy – UPSKILL WORKFORCE PRIVATE LIMITED
              </h2>
              <p className="text-muted-foreground">
                At UPSKILL WORKFORCE PRIVATE LIMITED, we aim to offer the best possible experience through our training
                and coaching services. We understand that plans can change, so we offer a flexible cancellation policy.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Cancellations:</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>You can cancel your booking within 24 hours of enrolling in a course or scheduling a coaching session.</p>
                <p>
                  Cancellations may not be accepted if the course has already started, coaching has begun, or learning
                  materials have been shared.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Refund Processing Time:</h3>
              <p className="text-muted-foreground">
                If a refund is approved, it will be credited within 5 to 7 working days to the original payment method.
              </p>
            </div>

             <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information:</h3>
              <p className="text-muted-foreground">
                For any issues or questions, feel free to reach out to our Customer Support team on this email:
                <a href="mailto:admin@upskillworkforce.co" className="text-primary hover:underline ml-1">
                  admin@upskillworkforce.co
                </a>
              </p>
            </div> 
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
