import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">C</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">CampusConnect</h1>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight">
                Connect with Your Campus Community
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay informed with notices, access course materials, discover events, and engage with your campus through one unified platform.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Notices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Stay updated with important campus announcements</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Access course materials shared by faculty</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Discover campus events and activities</p>
                </CardContent>
              </Card>

              <Card className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Quick updates from your campus</p>
                </CardContent>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link href="/auth/sign-up">
                <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">Log In</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            CampusConnect © 2024. A modern campus communication platform.
          </p>
        </div>
      </div>
    </div>
  )
}
