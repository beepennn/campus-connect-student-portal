import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with CampusConnect.',
  robots: { index: true, follow: true },
}

const faqs = [
  {
    q: 'I did not receive the verification email. What should I do?',
    a: 'Check your spam/junk folder, wait a few minutes, and confirm your email address is correct. If needed, try signing in again to trigger a new email (if your auth flow supports it).',
  },
  {
    q: 'I cannot log in. What can I try?',
    a: 'Verify your email is confirmed, double-check your password, and use “Forgot password” to reset. If you still cannot access, contact support.',
  },
  {
    q: 'How do I report a bug or request a feature?',
    a: 'Send details via the support contact method below, including screenshots and steps to reproduce.',
  },
] as const

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            <Link href="/" className="underline underline-offset-4 hover:no-underline">
              Home
            </Link>{' '}
            / Support
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Support</h1>
          <p className="mt-3 text-muted-foreground">
            Find answers quickly or contact us for help.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* FAQ */}
          <div className="lg:col-span-2 space-y-4">
            {faqs.map((item) => (
              <Card key={item.q} className="border-border/70">
                <CardHeader>
                  <CardTitle className="text-base">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="text-base">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  For account issues, verification problems, or bug reports, contact us with details and screenshots.
                </p>

                <div className="rounded-md border border-border bg-card p-3 text-sm">
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-muted-foreground">lamichhanesneha05@gmail.com</p>
                </div>

                <div className="rounded-md border border-border bg-card p-3 text-sm">
                  <p className="font-medium text-foreground">Response time</p>
                  <p className="text-muted-foreground">Typically within 24–48 hours</p>
                </div>

                <p className="text-xs text-muted-foreground">
                  Tip: Include your account email, device/browser, and steps to reproduce the issue.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="text-base">Related</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <Link className="block underline underline-offset-4 hover:no-underline text-muted-foreground" href="/legal/terms">
                  Terms of Service
                </Link>
                <Link className="block underline underline-offset-4 hover:no-underline text-muted-foreground" href="/legal/privacy">
                  Privacy Policy
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
