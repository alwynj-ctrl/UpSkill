import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-card py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center">ABOUT US</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8 text-lg leading-relaxed">
            <p>
              At <strong className="text-primary">UPSKILL WORKFORCE PVT LTD.</strong>, we are dedicated to empowering
              individuals and organizations through high-quality, industry-relevant training programs. As a trusted
              provider of professional training services, we specialize in delivering practical learning experiences
              that bridge the gap between knowledge and application.
            </p>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">OUR MISSION</h2>
              <p>
                Equip learners with the skills and expertise needed to excel in today's competitive and rapidly evolving
                business environment. With a focus on innovation, excellence, and measurable results, we design training
                solutions that are tailored to meet diverse needs — whether for individuals seeking career advancement
                or organizations aiming to enhance workforce capabilities.
              </p>
            </div>

            <p>
              Backed by a team of experienced trainers and subject matter experts, we offer comprehensive courses,
              hands-on workshops, and customized corporate training programs. Our learner-centric approach ensures that
              every participant gains not just theoretical knowledge, but also the confidence to apply it effectively in
              real-world scenarios.
            </p>

            <p>
              At <strong className="text-primary">UPSKILL WORKFORCE PVT LTD.</strong>, we believe in transforming
              potential into performance — fostering growth, productivity, and success for every client we serve.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
