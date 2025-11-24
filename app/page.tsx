import Link from "next/link"
import { Briefcase, Code, Cog, Users } from "lucide-react"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Briefcase,
    tag: "Enterprise",
    title: "Corporate Capability Uplift",
    description:
      "Role-based academies, leadership accelerators, and manager readiness labs that align skill outcomes to OKRs.",
  },
  {
    icon: Code,
    tag: "Technology",
    title: "Engineering & IT Mastery",
    description:
      "Modern stacks, cloud fluency, and automation-first bootcamps crafted with hiring partners for billable readiness.",
  },
  {
    icon: Cog,
    tag: "Industrial",
    title: "Plant & Operations Reskilling",
    description:
      "Hands-on simulations, AR job aids, and compliance-first pathways that make frontline teams future proof.",
  },
  {
    icon: Users,
    tag: "People",
    title: "Soft Skills & Culture Design",
    description:
      "Communication, consultative selling, and change enablement journeys that build confident, customer-obsessed teams.",
  },
]

const highlightCourses = [
  {
    id: "assessment-level-1",
    title: "Assessment Test - Level 1",
    price: "₹5,000.00",
    image: "/accountant-training-course.jpg",
    duration: "Online · 1 Day",
    mode: "Diagnose readiness",
    description: "Benchmark fundamentals, receive a personalized readiness score, and unlock the ideal learning path.",
    highlights: ["Skill heatmap", "Mentor review", "Fast-track unlock"],
    ctaLabel: "Enroll",
  },
  {
    id: "assessment-level-2",
    title: "Assessment Test - Level 2",
    price: "₹6,000.00",
    image: "/advanced-accountant-training.jpg",
    duration: "Online · 1 Day",
    mode: "Advanced evaluation",
    description: "Deep-dive technical interviews and scenario tasks for mid-level professionals switching roles.",
    highlights: ["Role-fit insights", "Capstone feedback", "Scholarship eligible"],
    ctaLabel: "Reserve Slot",
  },
  {
    id: "german-intensive",
    title: "German Online Intensive",
    price: "₹25,000.00",
    image: "/german-language-learning-online.jpg",
    duration: "Hybrid · 6 Months",
    mode: "Immersive cohort",
    description: "A multi-level experience with live labs, pronunciation clinics, and Goethe-oriented assessments.",
    highlights: ["Speaking labs", "Native mentors", "Exam simulator"],
    ctaLabel: "Join Cohort",
  },
  {
    id: "german-individual",
    title: "German Individual Training",
    price: "₹35,000.00",
    image: "/german-individual-training.jpg",
    duration: "Hybrid · Flexible",
    mode: "1:1 coaching",
    description: "Personalized pathways for professionals targeting relocation, visa interviews, or overseas roles.",
    highlights: ["Custom syllabus", "Flexible timetable", "Career playbooks"],
    ctaLabel: "Book Mentor",
  },
]

const heroStats = [
  { value: "15K+", label: "Professionals Skilled" },
  { value: "180+", label: "Enterprise Programs" },
  { value: "120+", label: "Hiring Partners" },
  { value: "9.4/10", label: "Learner CSAT" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navigation />

      <main className="space-y-20 pb-24">
        {/* Hero */}
        <section className="hero-bleed relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-emerald-700 text-white">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_60%)]" />
          <div className="relative container mx-auto py-24 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-white/70">UpSkill Workforce</p>
            <h1 className="mt-6 text-4xl md:text-6xl font-semibold leading-tight max-w-4xl mx-auto">
              Career-grade learning architecture for teams that need to move fast.
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/80 max-w-3xl mx-auto">
              From workforce diagnostics to implementation and coaching, we orchestrate full-stack training programs that
              deliver measurable capability, productivity, and retention outcomes.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90" asChild>
                <Link href="/courses">Explore Programs</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/about">Work With Us</Link>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left md:text-center">
              {heroStats.map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-3xl font-semibold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="container mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-800 font-semibold">Capability pillars</p>
            <h2 className="text-3xl md:text-4xl font-bold">Design sprints, academies, and playbooks built with you</h2>
            <p className="text-slate-600">
              Blend live instruction, async micro-learning, and on-the-job reinforcement. Every pillar comes with success
              metrics, reporting, and practitioner mentors.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card
                key={service.title}
                className="border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-emerald-700">
                    <span>{service.tag}</span>
                    <service.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                  >
                    Schedule a diagnostic →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-slate-900 text-white p-10 border-none">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Why Upskill</p>
            <h3 className="mt-4 text-3xl font-semibold">Strategy + Ops + Coaching under one roof</h3>
            <p className="mt-4 text-sm text-white/80 leading-relaxed">
              We co-design curriculum with business leaders, deploy blended delivery models, and embed enablement squads
              for adoption. Every engagement ships with analytics and success dashboards.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-white/80">
              <li>• Role-wise diagnostics and learner journeys</li>
              <li>• Pod-based delivery with SME coaches & talent partners</li>
              <li>• Capability scorecards and leadership playbooks</li>
            </ul>
            <Button size="lg" className="mt-8 bg-white text-slate-900 hover:bg-white/90" asChild>
              <Link href="/about">Meet the team</Link>
            </Button>
          </Card>
          <Card className="p-10 border border-slate-100">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-700 font-semibold">Engagement models</p>
            <h3 className="mt-4 text-3xl font-semibold">Rapid pilots to nationwide rollouts</h3>
            <p className="mt-4 text-slate-600 text-sm">
              Launch a proof of concept in four weeks, scale with hybrid cohorts, and keep alumni communities active with
              hiring and mentoring pods.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 text-sm text-slate-700">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Pilot</p>
                <p className="text-2xl font-semibold text-slate-900">30 days</p>
                <p className="text-xs text-slate-500">Design + launch</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Scale</p>
                <p className="text-2xl font-semibold text-slate-900">3-9 months</p>
                <p className="text-xs text-slate-500">Multi-cohort rollout</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sustain</p>
                <p className="text-2xl font-semibold text-slate-900">Quarterly</p>
                <p className="text-xs text-slate-500">Capability scorecards</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Partners</p>
                <p className="text-2xl font-semibold text-slate-900">120+</p>
                <p className="text-xs text-slate-500">Embedded ecosystem</p>
              </div>
            </div>
            <Button variant="outline" className="mt-10 text-emerald-700 border-emerald-200" asChild>
              <Link href="/contact">Book a discovery call</Link>
            </Button>
          </Card>
        </section>

        {/* Featured courses */}
        <section className="bg-white py-20">
          <div className="container mx-auto space-y-12">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-700 font-semibold">Spotlight programs</p>
              <h2 className="text-3xl md:text-4xl font-bold">Fast-track credentials crafted with hiring partners</h2>
              <p className="text-slate-600">
                Each cohort blends live mentoring, assessments, and tailored career playbooks. Choose your next milestone.
              </p>
            </div>

            <div className="space-y-8">
              {highlightCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1 p-6 space-y-4">
                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-emerald-600">
                        <span>{course.mode}</span>
                        <span className="text-slate-300">•</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-semibold leading-tight">{course.title}</h3>
                        <p className="text-slate-600 text-sm">{course.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                        {course.highlights.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium"
                          >
                            <span className="text-emerald-600">●</span>
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <span className="text-3xl font-bold text-emerald-700">{course.price}</span>
                        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Applications open</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button asChild>
                          <Link href={`/payment?course=${course.id}`}>{course.ctaLabel}</Link>
                        </Button>
                        <Button variant="outline" className="border-emerald-200 text-emerald-700" asChild>
                          <Link href="/courses">Program details</Link>
                        </Button>
                      </div>
                    </div>
                    <div className="lg:w-80 relative">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-64 w-full object-cover lg:h-full"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700 shadow">
                        Next cohort soon
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" asChild>
                <Link href="/courses">View Full Catalog</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
