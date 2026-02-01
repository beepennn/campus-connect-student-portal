'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type OAuthProvider = 'google' | 'github'

const STORAGE_KEYS = {
  email: 'campusconnect_email',
  remember: 'campusconnect_remember',
} as const

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function sanitizeEmail(value: string) {
  return value.trim().toLowerCase()
}

export default function LoginPage() {
  const router = useRouter()
  const supabase = React.useMemo(() => createClient(), [])

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(false)

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [oauthProvider, setOauthProvider] = React.useState<OAuthProvider | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const errorId = React.useId()

  React.useEffect(() => {
    // Client-only: safe to read localStorage here
    try {
      const savedRemember = localStorage.getItem(STORAGE_KEYS.remember) === 'true'
      const savedEmail = localStorage.getItem(STORAGE_KEYS.email)

      if (savedRemember && savedEmail) {
        setRememberMe(true)
        setEmail(savedEmail)
      }
    } catch {
      // Ignore storage errors (private mode / restricted environments)
    }
  }, [])

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const normalizedEmail = sanitizeEmail(email)

    if (!normalizedEmail || !password) {
      setError('Please enter both email and password.')
      return
    }

    setIsSubmitting(true)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      })

      if (authError) {
        // Avoid leaking detailed auth failure reasons
        setError('Invalid email or password.')
        return
      }

      try {
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEYS.email, normalizedEmail)
          localStorage.setItem(STORAGE_KEYS.remember, 'true')
        } else {
          localStorage.removeItem(STORAGE_KEYS.email)
          localStorage.removeItem(STORAGE_KEYS.remember)
        }
      } catch {
        // Ignore storage errors
      }

      router.replace('/protected/dashboard')
      router.refresh()
    } catch {
      setError('Unable to log in right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleOAuthLogin(provider: OAuthProvider) {
    setError(null)
    setOauthProvider(provider)

    try {
      const origin = window.location.origin
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      })

      if (oauthError) {
        setError(`Unable to continue with ${provider}. Please try again.`)
        setOauthProvider(null)
      }
    } catch {
      setError(`Unable to continue with ${provider}. Please try again.`)
      setOauthProvider(null)
    }
  }

  const busy = isSubmitting || oauthProvider !== null

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-sm">
          <CardHeader className="space-y-2">
            <div className="space-y-1">
              <CardTitle className="text-2xl sm:text-3xl tracking-tight">
                Welcome to <span className="text-indigo-700">CampusConnect</span>
              </CardTitle>
              <CardDescription className="text-base">
                Log in to continue to your dashboard.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  required
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  />
                  <span className="font-medium">Remember me</span>
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded-sm"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div
                  id={errorId}
                  role="alert"
                  aria-live="polite"
                  className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={busy}>
                {isSubmitting ? 'Logging in…' : 'Log In'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-sm text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white hover:bg-gray-50"
                onClick={() => handleOAuthLogin('google')}
                disabled={busy}
                aria-label="Continue with Google"
              >
                <GoogleIcon className="mr-2 h-5 w-5" />
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-white hover:bg-gray-50"
                onClick={() => handleOAuthLogin('github')}
                disabled={busy}
                aria-label="Continue with GitHub"
              >
                <GitHubIcon className="mr-2 h-5 w-5" />
                Continue with GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/sign-up"
                className="font-medium text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded-sm"
              >
                Sign up
              </Link>
            </p>

            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to CampusConnect&apos;s{' '}
              <Link href="/legal/terms" className="underline underline-offset-4 hover:no-underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/legal/privacy" className="underline underline-offset-4 hover:no-underline">
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
