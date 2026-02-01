import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    title: 'Notices',
    description: 'Stay updated with important campus announcements in one place.',
  },
  {
    title: 'Materials',
    description: 'Access course materials shared by faculty, organized and searchable.',
  },
  {
    title: 'Events',
    description: 'Discover campus events, deadlines, and activities you care about.',
  },
  {
    title: 'Announcements',
    description: 'Quick updates from departments and student bodies—no noise.',
  },
] as const

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Skip link (accessibility) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to content
      </a>

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <span className="font-bold" aria-hidden="true">
                C
              </span>
              <span className="sr-only">CampusConnect</span>
            </div>
            <span className="text-lg font-semibold tracking-tight sm:text-xl">CampusConnect</span>
          </Link>

          <nav aria-label="Primary" className="flex items-center gap-2 sm:gap-3">
            <Button asChild variant="outline">
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* subtle background decoration */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/4 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div id="main" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Connect with your campus community
            </h1>
            <p className="mt-5 text-pretty text-base text-muted-foreground sm:text-lg">
              Stay informed with notices, access course materials, discover events, and engage with your campus through one unified platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/auth/sign-up">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                <Link href="/auth/login">Log in</Link>
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Built for students and faculty. Secure sign-in. Mobile friendly.
            </p>
          </div>

          {/* Features */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group border-border/70 bg-card/60 backdrop-blur transition-shadow hover:shadow-md"
              >
                <CardHeader className="space-y-2">
                  <CardTitle className="text-base font-semibold text-foreground">
                    <span className="text-primary">{f.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CampusConnect. All rights reserved.
            </p>
            <nav aria-label="Footer" className="flex items-center gap-4 text-sm">
              <Link className="text-muted-foreground underline-offset-4 hover:underline" href="/legal/privacy">
                Privacy
              </Link>
              <Link className="text-muted-foreground underline-offset-4 hover:underline" href="/legal/terms">
                Terms
              </Link>
              <Link className="text-muted-foreground underline-offset-4 hover:underline" href="/support">
                Support
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  )
}
