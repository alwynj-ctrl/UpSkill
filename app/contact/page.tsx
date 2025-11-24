import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Linkedin, Dribbble } from "lucide-react"

export default function ContactPage() {
  const teamFaces = [
    "/placeholder-user.jpg",
    "/placeholder-vv3ul.png",
    "/placeholder-user.jpg",
    "/placeholder-vv3ul.png",
    "/placeholder-user.jpg",
    "/placeholder-vv3ul.png",
  ]

  const socials = [
    { label: "@UpSkillHQ", icon: Facebook, href: "https://facebook.com" },
    { label: "@UpSkillHQ", icon: Twitter, href: "https://twitter.com" },
    { label: "@UpSkillHQ", icon: Linkedin, href: "https://linkedin.com" },
    { label: "@UpSkillHQ", icon: Dribbble, href: "https://dribbble.com" },
  ]

  const partnerLogos = ["Contentful", "Stripe", "Evernote", "Zapier", "Coinbase", "Square"]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="hero-bleed bg-card py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center">CONTACT US</h1>
        </div>
      </section>

      {/* Contact Form & Experience */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mx-auto grid max-w-6xl gap-4 rounded-[32px] bg-slate-100/70 p-2 lg:grid-cols-[1.1fr,1.6fr]">
            {/* Left panel */}
            <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white p-8 shadow-sm">
              <div className="pointer-events-none absolute inset-8 rounded-[24px] border border-dashed border-slate-200"></div>
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100/60 blur-xl"></div>

              <div className="relative space-y-8">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Connect</p>
                  <h2 className="text-3xl font-semibold">Talk with an enablement partner</h2>
                  <p className="text-sm text-slate-500">
                    We'll match you with a program strategist within 24 hours to scope your requirements and onboarding timeline.
                  </p>
                </div>

                <div className="relative h-64">
                  {teamFaces.map((face, index) => {
                    const angle = (index / teamFaces.length) * Math.PI * 2
                    const radius = 100 + (index % 2) * 20
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    return (
                      <div
                        key={`${face}-${index}`}
                        className="absolute h-12 w-12 rounded-full border-4 border-white shadow-lg"
                        style={{
                          left: `calc(50% + ${x}px - 1.5rem)`,
                          top: `calc(50% + ${y}px - 1.5rem)`,
                          backgroundImage: `url(${face})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    )
                  })}
                </div>

                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Social</p>
                  <div className="flex flex-col gap-3 text-sm font-semibold text-slate-600">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="flex items-center gap-3 rounded-full border border-slate-200 px-4 py-2 transition hover:border-slate-400"
                      >
                        <social.icon className="h-4 w-4 text-emerald-600" />
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form panel */}
            <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-100 to-emerald-50 p-8 shadow-sm">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-slate-900">Contact us</h2>
                <p className="text-sm text-slate-600">Reach out and we'll get in touch within a business day.</p>
              </div>

              <form className="mt-8 space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-600">
                      First name
                    </label>
                    <Input id="firstName" placeholder="Alex" className="h-11 rounded-xl border-white/60 bg-white/70" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-slate-600">
                      Last name
                    </label>
                    <Input id="lastName" placeholder="Fernandez" className="h-11 rounded-xl border-white/60 bg-white/70" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-600">
                    Email address
                  </label>
                  <Input id="email" type="email" placeholder="you@company.com" className="h-11 rounded-xl border-white/60 bg-white/70" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600">Team size</label>
                    <select className="h-11 w-full rounded-xl border border-white/60 bg-white/70 px-3 text-sm text-slate-700">
                      <option>1-50 people</option>
                      <option>50-250 people</option>
                      <option>250+ people</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600">Location</label>
                    <select className="h-11 w-full rounded-xl border border-white/60 bg-white/70 px-3 text-sm text-slate-700">
                      <option>India</option>
                      <option>USA</option>
                      <option>UK</option>
                      <option>Europe</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-600">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your goals..."
                    className="rounded-2xl border-white/60 bg-white/70"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-slate-600">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                  <span>
                    You agree to our friendly{" "}
                    <a href="/privacy" className="text-emerald-700 underline underline-offset-2">
                      privacy policy
                    </a>
                    .
                  </span>
                </label>

                <Button type="submit" className="w-full h-11 rounded-2xl text-base">
                  Send message
                </Button>
              </form>

              <div className="mt-8 border-t border-white/70 pt-6">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-4">Trusted by teams</p>
                <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-700">
                  {partnerLogos.map((logo) => (
                    <span key={logo} className="uppercase tracking-wide text-slate-500">
                      {logo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
