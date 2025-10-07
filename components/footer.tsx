import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-xl font-bold text-primary">Up Skill</div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Connect with UpSkill to access exclusive updates and opportunities that drive your business forward.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">QUICK LINK</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-muted-foreground hover:text-primary transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-semibold text-foreground mb-4">OFFICE ADDRESS</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>No 57 Om Shakti complex</p>
              <p>Hosur main Rd Garvebhavipalya</p>
              <p>Bangalore Karnataka 560068</p>
              <p className="pt-2">
                <strong>Email:</strong> admin@upskillworkforce.co
              </p>
              <p>
                <strong>Phone:</strong> 9513161161
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">©upskillworkforce2025</p>
        </div>
      </div>
    </footer>
  )
}
