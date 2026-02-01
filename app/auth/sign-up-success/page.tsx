import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignUpSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/10">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-indigo-700"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="currentColor"
                  d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
                />
              </svg>
            </div>

            <CardTitle className="text-2xl sm:text-3xl tracking-tight">
              Verify your email
            </CardTitle>
            <CardDescription className="text-base">
              We’ve sent a confirmation link to your inbox.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                Open the email from <span className="font-medium text-foreground">CampusConnect</span>{' '}
                and click the confirmation link to activate your account.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Check your spam/junk folder if you don’t see it.</li>
                <li>Wait 1–2 minutes—delivery can be slightly delayed.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/login">Return to login</Link>
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Used the wrong email?{' '}
                <Link href="/auth/sign-up" className="underline underline-offset-4 hover:no-underline">
                  Create a new account
                </Link>
                .
              </p>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Having trouble?{' '}
              <Link href="/support" className="underline underline-offset-4 hover:no-underline">
                Contact support
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
