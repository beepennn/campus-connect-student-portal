import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'CampusConnect Terms of Service.',
  robots: { index: true, follow: true },
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M12 3.2 3 10.5V21a1 1 0 0 0 1 1h5v-6.2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V22h5a1 1 0 0 0 1-1V10.5l-9-7.3ZM19 20h-3v-4.2a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3V20H5v-8.6l7-5.7 7 5.7V20Z"
      />
    </svg>
  )
}

function SectionBox({
  title,
  children,
  index,
}: {
  title: string
  children: React.ReactNode
  index: number
}) {
  return (
    <div
      className="group rounded-xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur
                 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
                 motion-reduce:transform-none motion-reduce:transition-none"
      style={{
        animation: 'cc-fade-up 520ms ease-out both',
        animationDelay: `${120 + index * 90}ms`,
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          aria-hidden="true"
        >
          <span className="text-sm font-semibold">{index + 1}</span>
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default function TermsPage() {
  const lastUpdated = '2026-01-01' // set your real date

  // Lazy evaluation: content is defined once and rendered by mapping
  const sections = [
    {
      title: 'Eligibility',
      content: (
        <>
          You must be at least 13 years old (or the minimum age required in your country) to use CampusConnect. If you
          are using CampusConnect on behalf of an institution, you represent that you have authority to bind that
          institution to these Terms.
        </>
      ),
    },
    {
      title: 'Accounts and security',
      content: (
        <>
          You are responsible for maintaining the confidentiality of your login credentials and for all activities under
          your account. Notify us immediately if you suspect unauthorized access.
        </>
      ),
    },
    {
      title: 'Acceptable use',
      content: (
        <ul className="list-disc space-y-1 pl-5">
          <li>Do not upload illegal, harmful, or infringing content.</li>
          <li>Do not attempt to access data you are not authorized to access.</li>
          <li>Do not disrupt or overload the service (e.g., scraping, abuse, or attacks).</li>
          <li>Follow your institution’s policies when using CampusConnect.</li>
        </ul>
      ),
    },
    {
      title: 'Content',
      content: (
        <>
          You retain ownership of content you submit. You grant CampusConnect a limited license to host, store, and
          display your content solely to operate the service.
        </>
      ),
    },
    {
      title: 'Termination',
      content: (
        <>
          We may suspend or terminate access if you violate these Terms or pose a security risk. You may stop using
          CampusConnect at any time.
        </>
      ),
    },
    {
      title: 'Disclaimers and limitation of liability',
      content: (
        <>
          CampusConnect is provided “as is” and “as available”. To the maximum extent allowed by law, we disclaim all
          warranties. To the maximum extent permitted by law, CampusConnect will not be liable for indirect, incidental,
          special, consequential, or punitive damages.
        </>
      ),
    },
    {
      title: 'Contact',
      content: (
        <>
          Questions about these Terms? Visit{' '}
          <Link href="/support" className="underline underline-offset-4 hover:no-underline">
            Support
          </Link>
          .
        </>
      ),
    },
  ] as const

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background hover:bg-accent hover:text-foreground transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Home"
              title="Home"
            >
              <HomeIcon className="h-4 w-4" />
            </Link>

            <span aria-hidden="true">/</span>
            <span className="font-medium">Legal</span>
            <span aria-hidden="true">/</span>
            <span className="text-foreground font-medium">Terms</span>
          </nav>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Terms of Service</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            These Terms govern your use of CampusConnect. By using the service, you agree to these Terms.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Last updated: {lastUpdated}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-base">CampusConnect Terms</CardTitle>
            <p className="text-sm text-muted-foreground">
              Please read carefully. If you do not agree, do not use the service.
            </p>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            {/* Animated Section Boxes */}
            <div className="grid gap-4">
              {sections.map((s, i) => (
                <SectionBox key={s.title} title={s.title} index={i}>
                  {s.content}
                </SectionBox>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* local keyframes */}
      <style>{`
        @keyframes cc-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  )
}
