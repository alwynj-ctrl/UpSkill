import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-card py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center">CONTACT US</h1>
        </div>
      </section>

      {/* Contact Form & Address */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">GET IN TOUCH</h2>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your name:
                    </label>
                    <Input id="name" type="text" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your email:
                    </label>
                    <Input id="email" type="email" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject:
                    </label>
                    <Input id="subject" type="text" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Your message:
                    </label>
                    <Textarea id="message" rows={6} />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Office Address */}
            <div>
              <h2 className="text-2xl font-bold mb-6">OFFICE ADDRESS</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>No 57 Om Shakti complex</p>
                <p>Hosur main Rd Garvebhavipalya</p>
                <p>Bangalore Karnataka 560068</p>
                <p className="pt-4">
                  <strong>Email:</strong>
                  <a href="mailto:admin@upskillworkforce.co" className="text-primary hover:underline ml-1">
                    admin@upskillworkforce.co
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>
                  <a href="tel:9513161161" className="text-primary hover:underline ml-1">
                    9513161161
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
