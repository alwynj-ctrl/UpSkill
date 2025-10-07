import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const courses = [
  {
    id: "assessment-level-1",
    title: "ASSESSMENT TEST - LEVEL 1",
    price: "₹4,999",
    image: "/assessment-test-level-1.jpg",
  },
  {
    id: "assessment-level-2",
    title: "ASSESSMENT TEST - LEVEL 2",
    price: "₹9,999",
    image: "/assessment-test-level-2.jpg",
  },
  {
    id: "german-intensive",
    title: "GERMAN ONLINE INTENSIVE",
    price: "₹19,999",
    image: "/german-language-intensive-course.jpg",
  },
  {
    id: "german-individual",
    title: "GERMAN ONLINE INDIVIDUAL TRAINING",
    price: "₹29,999",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5UbOwyhOk87qTuWCIR8iJ8JU5XSbws.png",
  },
  {
    id: "foreign-a1",
    title: "FOREIGN LANGUAGE COURSE – A1 (BEGINNER LEVEL)",
    price: "₹34,999",
    image: "/foreign-language-beginner-course.jpg",
  },
  {
    id: "foreign-a2",
    title: "FOREIGN LANGUAGE COURSE – A2 (ELEMENTARY LEVEL)",
    price: "₹44,999",
    image: "/foreign-language-elementary-course.jpg",
  },
  {
    id: "foreign-b1",
    title: "FOREIGN LANGUAGE COURSE – B1 (INTERMEDIATE LEVEL)",
    price: "₹59,999",
    image: "/foreign-language-intermediate-course.jpg",
  },
  {
    id: "foreign-b2",
    title: "FOREIGN LANGUAGE COURSE – B2 (UPPER INTERMEDIATE LEVEL)",
    price: "₹79,999",
    image: "/foreign-language-upper-intermediate.jpg",
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-card py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-4xl md:text-5xl font-bold">COURSES</h1>
            <div className="mt-4 md:mt-0">
              <p className="text-muted-foreground">Showing all 8 results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
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
                  <h3 className="font-semibold mb-4 text-sm leading-tight">{course.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">{course.price}</p>
                  <Link href={`/payment?course=${course.id}`}>
                    <Button className="w-full">Book Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
