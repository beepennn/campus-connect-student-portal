import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'CampusConnect Terms of Service.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            <Link href="/" className="underline underline-offset-4 hover:no-underline">
              Home
            </Link>{' '}
            / Legal / Terms
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Terms of Service</h1>
          <p className="mt-3 text-muted-foreground">
            These Terms govern your use of CampusConnect. By using the service, you agree to these Terms.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}-01-01</p>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <h2>1. Eligibility</h2>
          <p>
            You must be at least 13 years old (or the minimum age required in your country) to use CampusConnect. If you
            are using CampusConnect on behalf of an institution, you represent that you have authority to bind that
            institution to these Terms.
          </p>

          <h2>2. Accounts and security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your login credentials and for all activities
            under your account. Notify us immediately if you suspect unauthorized access.
          </p>

          <h2>3. Acceptable use</h2>
          <ul>
            <li>Do not upload illegal, harmful, or infringing content.</li>
            <li>Do not attempt to access data you are not authorized to access.</li>
            <li>Do not disrupt or overload the service (e.g., scraping, abuse, or attacks).</li>
            <li>Follow your institution’s policies when using CampusConnect.</li>
          </ul>

          <h2>4. Content</h2>
          <p>
            You retain ownership of content you submit. You grant CampusConnect a limited license to host, store, and
            display your content solely to operate the service.
          </p>

          <h2>5. Materials and notices</h2>
          <p>
            CampusConnect may display academic materials and campus notices provided by faculty/admins. CampusConnect is
            not responsible for accuracy, completeness, or timeliness of third-party content.
          </p>

          <h2>6. Termination</h2>
          <p>
            We may suspend or terminate access if you violate these Terms or pose a security risk. You may stop using
            CampusConnect at any time.
          </p>

          <h2>7. Disclaimers</h2>
          <p>
            CampusConnect is provided “as is” and “as available”. To the maximum extent allowed by law, we disclaim all
            warranties, including fitness for a particular purpose and non-infringement.
          </p>

          <h2>8. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, CampusConnect will not be liable for indirect, incidental, special,
            consequential, or punitive damages, or any loss of data or profits.
          </p>

          <h2>9. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the service after changes means you accept the
            updated Terms.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these Terms? Contact us via the{' '}
            <Link href="/support" className="underline underline-offset-4 hover:no-underline">
              Support
            </Link>{' '}
            page.
          </p>
        </div>
      </section>
    </main>
  )
}
