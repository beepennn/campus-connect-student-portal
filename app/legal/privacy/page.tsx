import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'CampusConnect Privacy Policy.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            <Link href="/" className="underline underline-offset-4 hover:no-underline">
              Home
            </Link>{' '}
            / Legal / Privacy
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-muted-foreground">
            This Policy explains what data we collect, how we use it, and your choices.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}-01-01</p>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <h2>1. Information we collect</h2>
          <ul>
            <li>
              <strong>Account data:</strong> name, email, and authentication identifiers.
            </li>
            <li>
              <strong>Usage data:</strong> basic logs (e.g., sign-in events, page interactions) for security and
              performance.
            </li>
            <li>
              <strong>Content you provide:</strong> notices, materials, messages, or uploads you submit.
            </li>
          </ul>

          <h2>2. How we use information</h2>
          <ul>
            <li>Provide and maintain the service (authentication, access, content delivery).</li>
            <li>Secure the platform (fraud detection, abuse prevention, auditing).</li>
            <li>Improve performance and user experience (analytics, debugging).</li>
            <li>Communicate with you (support responses, service updates).</li>
          </ul>

          <h2>3. Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with service providers (e.g., hosting,
            email delivery, analytics) strictly to operate CampusConnect, and when required by law.
          </p>

          <h2>4. Data retention</h2>
          <p>
            We retain account and service data as long as needed to provide CampusConnect and meet legal, security, and
            operational requirements. You may request deletion where applicable.
          </p>

          <h2>5. Security</h2>
          <p>
            We use reasonable administrative, technical, and physical safeguards. No system is 100% secure; please use a
            strong password and keep it confidential.
          </p>

          <h2>6. Your choices</h2>
          <ul>
            <li>Access and update profile information via your account settings (if available).</li>
            <li>Request deletion or export by contacting support.</li>
            <li>Opt out of non-essential communications where offered.</li>
          </ul>

          <h2>7. Children’s privacy</h2>
          <p>
            CampusConnect is not intended for children under 13 (or the minimum age required in your country). If you
            believe a child has provided personal data, contact support.
          </p>

          <h2>8. Contact</h2>
          <p>
            For privacy questions, contact us via the{' '}
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
