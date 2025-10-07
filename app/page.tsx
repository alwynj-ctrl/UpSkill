import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Briefcase, Code, Cog, Users } from "lucide-react"

const services = [
  {
    icon: Briefcase,
    title: "CORPORATE TRAINING",
    description:
      "We provide customized corporate training programs designed to enhance your employees skills, boost productivity, and align teams for organizational success.",
  },
  {
    icon: Code,
    title: "IT TRAINING",
    description:
      "Our IT training courses cover fundamentals with in-demand technologies and programming languages essential for career growth and advancement in the tech industry.",
  },
  {
    icon: Cog,
    title: "INDUSTRIAL TRAINING",
    description:
      "We offer specialized industrial training to develop hands-on skills and technical expertise ready to meet the demands of modern industries.",
  },
  {
    icon: Users,
    title: "SOFT SKILLS TRAINING",
    description:
      "Our soft skills programs help individuals improve communication, leadership, and interpersonal skills for professional success.",
  },
]

const courses = [
  {
    title: "ACCOUNTANT TEST - LEVEL 1",
    price: "₹5,000.00",
    image: "/accountant-training-course.jpg",
  },
  {
    title: "ACCOUNTANT TEST - LEVEL 2",
    price: "₹6,000.00",
    image: "/advanced-accountant-training.jpg",
  },
  {
    title: "GERMAN ONLINE INTENSIVE",
    price: "₹25,000.00",
    image: "/german-language-learning-online.jpg",
  },
  {
    title: "GERMAN ONLINE INDIVIDUAL TRAINING",
    price: "₹35,000.00",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5UbOwyhOk87qTuWCIR8iJ8JU5XSbws.png",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
              Empowering Growth Through
              <span className="text-primary block">Professional Training</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Transform potential into performance with our comprehensive training solutions designed for the modern
              workforce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/courses">Explore Courses</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">OUR SERVICES</h2>
            <div className="w-16 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About & Contact CTAs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-primary text-primary-foreground p-8">
              <h3 className="text-2xl font-bold mb-4">ABOUT US</h3>
              <p className="mb-6 leading-relaxed">
                We specialize in delivering innovative training solutions with industry-leading expertise and measurable
                results.
              </p>
              <Button variant="secondary" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </Card>

            <Card className="bg-accent text-accent-foreground p-8">
              <h3 className="text-2xl font-bold mb-4">CONTACT US</h3>
              <p className="mb-6 leading-relaxed">
                Ready to invest in your team's success? Get in touch to discuss your training needs and discover how we
                can help.
              </p>
              <Button variant="secondary" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">COURSES WE OFFER</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-sm">{course.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">{course.price}</p>
                  <Button className="w-full" size="sm">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
