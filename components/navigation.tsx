"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "lucide-react"
import { UpskillLogo } from "@/app/upskill-logo"

const navigation = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "COURSES", href: "/courses" },
  { name: "CONTACT US", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }

    checkUser()

    // Listen for auth changes
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="full-bleed sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" aria-label="UpSkill home" className="flex items-center">
            <UpskillLogo size="sm" />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.32em] transition-colors duration-200",
                    isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900",
                  )}
                >
                  <span>{item.name}</span>
                  <span
                    className={cn(
                      "block h-0.5 w-0 bg-gradient-to-r from-primary via-primary/70 to-primary/30 transition-all duration-300",
                      isActive ? "w-full" : "group-hover:w-full",
                    )}
                  />
                </Link>
              )
            })}
            {!isLoading && (
              <>
                {user ? (
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full bg-primary px-6 text-[12px] font-semibold tracking-[0.2em] text-white hover:bg-primary/90"
                  >
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="sm"
                    variant="ghost"
                    className="rounded-full border border-slate-200 px-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-slate-600 hover:bg-slate-50"
                  >
                    <Link href="/auth/login">Login</Link>
                  </Button>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </header>
  )
}
