import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const featureStats = [
  { label: "Learners Trained", value: "15K+" },
  { label: "Live Batches", value: "48" },
  { label: "Hiring Partners", value: "120+" },
]

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

const parsePriceValue = (priceString: string) => {
  const numeric = Number(priceString.replace(/[^0-9.]/g, ""))
  return Number.isFinite(numeric) ? numeric : 0
}

const getPricingMeta = (priceString: string) => {
  const currentValue = parsePriceValue(priceString)
  const originalValue = currentValue === 0 ? 0 : Math.round(currentValue / 0.6)
  return {
    originalPrice: originalValue ? currencyFormatter.format(originalValue) : priceString,
    discountPercent: 40,
  }
}

const popularCourses = [
  {
    id: "full-stack-java",
    title: "Full Stack Java Development",
    price: "₹1,19,999",
    duration: "4–9 months",
    mode: "Online / Hybrid",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Develop end-to-end applications with Java, modern frontend frameworks, databases, testing, and deployment skills.",
    keyTopics: [
      "Core Java, OOP, Collections",
      "Spring Boot & Microservices",
      "REST APIs, HTML, CSS, JS",
      "React / Angular track",
      "SQL, MySQL, MongoDB",
      "Git, CI/CD, Cloud Deployment",
    ],
    careerOutcomes: [
      "Java Developer",
      "Backend Developer",
      "Full Stack Engineer",
    ],
  },
  {
    id: "python-development",
    title: "Python Programming & Application Development",
    price: "₹74,999",
    duration: "2–6 months",
    mode: "Online",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    description:
      "Beginner-friendly training covering Python for development, automation, data handling, and application building.",
    keyTopics: [
      "Python fundamentals, OOP",
      "Django / Flask web apps",
      "API creation & automation",
      "Database integration",
      "Version control workflows",
    ],
    careerOutcomes: [
      "Python Developer",
      "Automation Engineer",
      "Junior Backend Developer",
    ],
  },
  {
    id: "data-analytics-bi",
    title: "Data Analytics & Business Intelligence",
    price: "₹1,49,999",
    duration: "3–8 months",
    mode: "Online / Hybrid",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    description:
      "Hands-on program using real datasets, analytics tools, and dashboards to prepare industry-ready Data Analysts.",
    keyTopics: [
      "Excel & SQL mastery",
      "Statistics & interpretation",
      "Python, Pandas, NumPy",
      "Power BI / Tableau",
      "Data visualization & reporting",
    ],
    careerOutcomes: [
      "Data Analyst",
      "BI Analyst",
      "Reporting Analyst",
    ],
  },
  {
    id: "data-science-ml",
    title: "Data Science & Machine Learning",
    price: "₹2,49,999",
    duration: "6–12 months",
    mode: "Online / Hybrid",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Advanced track that covers ML math, modeling, deployment, and MLOps for AI/ML career transitions.",
    keyTopics: [
      "Statistics & ML math",
      "Supervised & unsupervised ML",
      "NLP, Deep Learning",
      "TensorFlow / PyTorch",
      "MLOps & cloud deployment",
    ],
    careerOutcomes: [
      "Machine Learning Engineer",
      "Data Scientist",
      "AI Engineer",
    ],
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud Engineering",
    price: "₹1,79,999",
    duration: "4–10 months",
    mode: "Online / Hybrid",
    image: "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Covers automation, CI/CD, infrastructure as code, and cloud platforms for modern DevOps roles.",
    keyTopics: [
      "Linux & shell scripting",
      "Git, Jenkins CI/CD",
      "Docker & Kubernetes",
      "Terraform",
      "AWS / Azure, monitoring tools",
    ],
    careerOutcomes: [
      "DevOps Engineer",
      "Cloud Engineer",
      "Site Reliability Engineer",
    ],
  },
  {
    id: "cybersecurity-ethical-hacking",
    title: "Cybersecurity & Ethical Hacking",
    price: "₹2,19,999",
    duration: "5–12 months",
    mode: "Online / Hybrid",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
    description:
      "Security program focused on assessment, penetration testing, SOC operations, and incident response.",
    keyTopics: [
      "Networking & security basics",
      "Vulnerability assessment",
      "Pen testing & web app security",
      "SOC operations & SIEM tools",
      "Malware analysis, Kali Linux",
    ],
    careerOutcomes: [
      "Cybersecurity Analyst",
      "Penetration Tester",
      "SOC Engineer",
    ],
  },
  {
    id: "ui-ux-frontend",
    title: "UI/UX Design & Frontend Development",
    price: "₹89,999",
    duration: "2–6 months",
    mode: "Online",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Blends design thinking with modern frontend development to build production-ready interfaces.",
    keyTopics: [
      "UI/UX principles & Figma",
      "HTML, CSS, JavaScript",
      "React & responsive design",
      "Prototyping & testing",
      "Portfolio building",
    ],
    careerOutcomes: [
      "UI/UX Designer",
      "Frontend Developer",
    ],
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing (AWS / Azure / GCP)",
    price: "₹1,09,900",
    duration: "3–6 months",
    mode: "Online",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    description:
      "Certification-ready cloud foundations spanning compute, storage, networking, and architecture patterns.",
    keyTopics: [
      "Cloud fundamentals",
      "Compute, storage, networking",
      "IAM security",
      "VPC, load balancing",
      "Architecture & certification prep",
    ],
    careerOutcomes: [
      "Cloud Administrator",
      "Cloud Solutions Architect (entry)",
    ],
  },
  {
    id: "german-master-bundle",
    title: "German Language Training (A1–C1)",
    price: "₹1,15,000",
    duration: "Varies by level",
    mode: "Online / Classroom",
    image: "/german-language-learning-online.jpg",
    description:
      "Master bundle for German proficiency with detailed outcomes from basic greetings to professional fluency.",
    keyTopics: [
      "A1–A2: Foundations & daily conversation",
      "B1–B2: Workplace communication & grammar",
      "C1: Professional German & Goethe prep",
    ],
    careerOutcomes: [
      "Study in Germany aspirants",
      "Healthcare & IT professionals",
      "Migration applicants",
    ],
  },
  {
    id: "french-master-bundle",
    title: "French Language Training (A1–C1)",
    price: "₹1,05,000",
    duration: "Varies by level",
    mode: "Online / Classroom",
    image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1200&q=80",
    description:
      "Complete French curriculum emphasizing pronunciation, communication, and cultural immersion.",
    keyTopics: [
      "A1–A2: Alphabet, phrases, listening",
      "B1–B2: Academic reading, advanced writing",
      "C1: Professional writing & confident speaking",
    ],
    careerOutcomes: [
      "Canada aspirants",
      "Hospitality professionals",
      "French culture enthusiasts",
    ],
  },
  {
    id: "spanish-master-bundle",
    title: "Spanish Language Training (A1–C1)",
    price: "₹95,000",
    duration: "Varies by level",
    mode: "Online / Classroom",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Structured Spanish journey geared toward DELE certification and fluent communication.",
    keyTopics: [
      "A1–A2: Grammar & daily expressions",
      "B1: Travel scenarios & cultural idioms",
      "B2–C1: Business Spanish & storytelling",
    ],
    careerOutcomes: [
      "Travelers & students",
      "BPO / KPO professionals",
      "DELE exam aspirants",
    ],
  },
  {
    id: "japanese-jlpt",
    title: "Japanese Language Training (JLPT N5–N1)",
    price: "₹1,45,000",
    duration: "Varies by level",
    mode: "Online / Classroom",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    description:
      "JLPT-aligned program to master Kanji, grammar, and real-world Japanese communication.",
    keyTopics: [
      "N5–N4: Hiragana/Katakana & dialogues",
      "N3: Workplace communication & Kanji",
      "N2–N1: Advanced comprehension & exam prep",
    ],
    careerOutcomes: [
      "Professionals targeting Japan",
      "University applicants",
      "JLPT candidates",
    ],
  },
  {
    id: "korean-topik",
    title: "Korean Language Training (TOPIK 1–6)",
    price: "₹1,20,000",
    duration: "Varies by level",
    mode: "Online / Classroom",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    description:
      "TOPIK-aligned Korean training covering Hangul, grammar, conversation, and advanced writing.",
    keyTopics: [
      "Level 1–2: Hangul & basics",
      "Level 3–4: Intermediate dialogues",
      "Level 5–6: Business communication",
    ],
    careerOutcomes: [
      "Study/work in Korea aspirants",
      "K-Drama & K-Pop enthusiasts",
      "TOPIK exam takers",
    ],
  },
  {
    id: "english-communication",
    title: "English Communication (Beginner → Advanced)",
    price: "₹29,999",
    duration: "Flexible tracks",
    mode: "Online / Classroom",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    description:
      "Practical English communication bundle covering grammar, fluency, workplace writing, and leadership speaking.",
    keyTopics: [
      "Beginner: Grammar & daily conversation",
      "Intermediate: Group discussion, presentations",
      "Advanced: Business communication & interviews",
    ],
    careerOutcomes: [
      "Students & job seekers",
      "Working professionals",
      "Leadership aspirants",
    ],
  },
]

const courses = [
  {
    id: "assessment-level-1",
    title: "Assessment Test - Level 1",
    price: "₹4,999",
    image: "/assessment-test-level-1.jpg",
    duration: "1 day",
    mode: "Online",
    level: "Assessment",
  },
  {
    id: "assessment-level-2",
    title: "Assessment Test - Level 2",
    price: "₹9,999",
    image: "/assessment-test-level-2.jpg",
    duration: "1 day",
    mode: "Online",
    level: "Assessment",
  },
  {
    id: "german-intensive",
    title: "German Online Intensive",
    price: "₹19,999",
    image: "/german-language-intensive-course.jpg",
    duration: "6 months",
    mode: "Online",
    level: "Language",
  },
  {
    id: "german-individual",
    title: "German Online Individual Training",
    price: "₹29,999",
    image: "/german-individual-training.jpg",
    duration: "Flexible",
    mode: "Online",
    level: "Language",
  },
  {
    id: "foreign-a1",
    title: "Foreign Language Course – A1 (Beginner Level)",
    price: "₹34,999",
    image: "/foreign-language-beginner-course.jpg",
    duration: "4 months",
    mode: "Hybrid",
    level: "Beginner",
  },
  {
    id: "foreign-a2",
    title: "Foreign Language Course – A2 (Elementary Level)",
    price: "₹44,999",
    image: "/foreign-language-elementary-course.jpg",
    duration: "4 months",
    mode: "Hybrid",
    level: "Elementary",
  },
  {
    id: "foreign-b1",
    title: "Foreign Language Course – B1 (Intermediate Level)",
    price: "₹59,999",
    image: "/foreign-language-intermediate-course.jpg",
    duration: "5 months",
    mode: "Hybrid",
    level: "Intermediate",
  },
  {
    id: "foreign-b2",
    title: "Foreign Language Course – B2 (Upper Intermediate Level)",
    price: "₹79,999",
    image: "/foreign-language-upper-intermediate.jpg",
    duration: "6 months",
    mode: "Hybrid",
    level: "Upper Intermediate",
  },
]

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navigation />

      <main className="space-y-16 pb-24">
        {/* Hero */}
        <section className="hero-bleed relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-600 text-white">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_#ffffff44,_transparent_60%)]" />
          <div className="relative container mx-auto px-4 py-16 text-center max-w-4xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-white/70">Courses</p>
            <h1 className="text-4xl md:text-5xl font-semibold">Explore the Collection</h1>
            <p className="text-base md:text-lg text-white/80">
              Absolute beginner? Want to polish existing skills? Each cohort mixes expert mentors, self-paced content, and
              outstanding support so you can move confidently into your next role.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#popular-courses">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
                  Browse Programs
                </Button>
              </Link>
              <Link href="#all-courses">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                  View Full Catalog
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 pt-4 text-sm text-white/80">
              {featureStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="text-2xl font-semibold text-white">{stat.value}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Courses */}
        <section id="popular-courses" className="bg-white py-20">
          <div className="container mx-auto px-4 space-y-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-semibold">Popular Programs</p>
                <h2 className="text-3xl md:text-4xl font-bold mt-3">High-impact tracks with career outcomes</h2>
                <p className="text-slate-600 mt-3 max-w-3xl">
                  Immersive cohorts co-created with hiring partners. Learn with live mentors, structured milestones, and
                  job-focused support from enrollment to placement.
                </p>
              </div>
              <Link href="#all-courses">
                <Button variant="outline" className="border-emerald-200 text-emerald-700">
                  Explore Full Catalog
                </Button>
              </Link>
            </div>

            <div className="space-y-8">
              {popularCourses.map((course) => {
                const { originalPrice, discountPercent } = getPricingMeta(course.price)
                return (
                  <Card
                    key={course.id}
                    className="overflow-hidden border border-emerald-100/60 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
                      <div className="flex-1 p-6 space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-emerald-600">
                          <span>{course.mode}</span>
                          <span className="text-slate-300">•</span>
                          <span>{course.duration}</span>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-semibold leading-tight">{course.title}</h3>
                          <p className="text-sm text-slate-600">{course.description}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-baseline gap-3">
                            <span className="text-sm text-slate-400 line-through">{originalPrice}</span>
                            <span className="text-3xl font-bold text-emerald-700">{course.price}</span>
                          </div>
                          <span className="rounded-full bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1">
                            {discountPercent}% off
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                          {course.keyTopics.slice(0, 3).map((topic) => (
                            <span
                              key={topic}
                              className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 font-medium"
                            >
                              <span className="text-emerald-600">●</span>
                              {topic}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs uppercase tracking-[0.3em] text-slate-500">
                          Career Outcomes · {course.careerOutcomes.join(" · ")}
                        </div>
                        <div className="flex flex-wrap gap-3 pt-2">
                          <Link href={`/payment?course=${course.id}`}>
                            <Button>Buy Now</Button>
                          </Link>
                          <Link href={`/payment?course=${course.id}`}>
                            <Button variant="outline" className="border-emerald-200 text-emerald-700">
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="md:w-80 relative">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="h-64 w-full object-cover md:h-full"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-emerald-700 shadow">
                          Cohort starting soon
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Full Catalog */}
        <section id="all-courses" className="container mx-auto px-4">
          <div className="space-y-4 text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-semibold">Complete Catalog</p>
            <h2 className="text-3xl md:text-4xl font-bold">Language & skill pathways for every milestone</h2>
            <p className="text-slate-600">
              Pick the certification or language level that fits your goals. Flexible batches, hybrid delivery, and dedicated
              program advisors keep your progress on track.
            </p>
          </div>

          <div className="space-y-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden border border-slate-100 shadow-sm">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="sm:w-56 relative">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="h-48 w-full object-cover sm:h-full"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full text-emerald-700 shadow">
                      {course.level}
                    </div>
                  </div>
                  <div className="flex-1 p-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
                      <span>{course.duration}</span>
                      <span className="text-slate-300">•</span>
                      <span>{course.mode}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <p className="text-sm text-slate-600">
                      Tailored batches with instructor guidance, continuous assessments, and flexible learning slots.
                    </p>
                    <p className="text-2xl font-bold text-emerald-700">{course.price}</p>
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/payment?course=${course.id}`}>
                        <Button>Enroll Now</Button>
                      </Link>
                      <Link href={`/payment?course=${course.id}`}>
                        <Button variant="outline" className="border-emerald-200 text-emerald-700">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
