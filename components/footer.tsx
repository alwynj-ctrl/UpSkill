import Link from "next/link"
import { Clock3, Mail, MapPin } from "lucide-react"
import { EmphorusCredit } from "@/components/emphorus-footer-credit"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Leadership", href: "/about#leadership" },
  { label: "Industries", href: "/courses" },
  { label: "Careers", href: "/contact" },
  { label: "Cancellation & Refund Policy", href: "/cancellation" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
]

export function Footer() {
  return (
    <footer className="full-bleed bg-slate-950 text-slate-200 border-t border-slate-900">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 py-16 space-y-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Navigate</p>
            <ul className="space-y-3 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

            <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Contact us</p>
            <div className="space-y-6">
              <div>
                <p className="text-2xl font-semibold text-white">UpSkill Workforce Private Limited</p>
                <p className="text-sm text-slate-400 mt-1">Global Talent & Data Solutions</p>
              </div>
              <div className="space-y-4 text-sm text-slate-300">
                {/* <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-orange-400" />
                  <div>
                    <p>India | USA | UK</p>
                    <p>57 Om Shakti Complex, Hosur Main Rd</p>
                    <p>Bangalore · Karnataka 560068</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 text-orange-400" />
                  <div>
                    <p className="uppercase text-slate-400 text-xs tracking-[0.3em]">General enquiries</p>
                    <a
                      href="mailto:admin@upskillworkforce.co"
                      className="text-emerald-300 hover:text-emerald-200 transition-colors"
                    >
                      admin@upskillworkforce.co
                    </a>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-400">Operation hours</p>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <Clock3 className="mt-1 h-5 w-5 text-orange-400" />
              <div className="space-y-1">
                <p className="font-medium text-white">Mon–Friday: 09:00 AM – 06:00 PM</p>
                <p className="text-slate-400">Weekend: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 space-y-4">
          <p className="text-center text-sm text-slate-500">
            ©{new Date().getFullYear()} Copyright{" "}
            <span className="text-white font-semibold">Upskill Workforce.</span> All Rights Reserved
          </p>
          <div className="flex justify-center">
            <EmphorusCredit />
          </div>
        </div>
      </div>
    </footer>
  )
}
