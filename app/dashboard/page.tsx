import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut, ShoppingBag, User } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's purchases
  const { data: purchases, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", user.id)
    .order("purchased_at", { ascending: false })

  if (error) {
    console.error("Error fetching purchases:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.email}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Member Since</p>
                  <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <form action="/api/auth/signout" method="post" className="pt-4 border-t">
                  <Button variant="outline" className="w-full bg-transparent" type="submit">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  My Purchases
                </CardTitle>
                <CardDescription>View all your course purchases and payment history</CardDescription>
              </CardHeader>
              <CardContent>
                {!purchases || purchases.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
                    <p className="text-muted-foreground mb-6">Start your learning journey by enrolling in a course</p>
                    <Button asChild>
                      <Link href="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <Card key={purchase.id} className="border-2">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{purchase.course_name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Purchased on {new Date(purchase.purchased_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex flex-col md:items-end gap-2">
                              <p className="text-2xl font-bold text-primary">
                                ₹{Number(purchase.course_price).toLocaleString()}
                              </p>
                              <div
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  purchase.payment_status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : purchase.payment_status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {purchase.payment_status.charAt(0).toUpperCase() + purchase.payment_status.slice(1)}
                              </div>
                            </div>
                          </div>
                          {purchase.payment_id && (
                            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                              Payment ID: {purchase.payment_id}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
