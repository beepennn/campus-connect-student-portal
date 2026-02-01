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

type UserType = 'student' | 'admin'
type OAuthProvider = 'google' | 'github'

const STORAGE_KEYS = {
  pendingUserType: 'pendingUserType',
  pendingFullName: 'pendingFullName',
} as const

function sanitizeEmail(value: string) {
  return value.trim().toLowerCase()
}

function validatePassword(pw: string) {
  // Keep simple but useful; adjust to your policy
  if (pw.length < 8) return 'Password must be at least 8 characters.'
  return null
}

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

export default function SignUpPage() {
  const router = useRouter()
  const supabase = React.useMemo(() => createClient(), [])

  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [userType, setUserType] = React.useState<UserType>('student')

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [oauthProvider, setOauthProvider] = React.useState<OAuthProvider | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const errorId = React.useId()

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const normalizedEmail = sanitizeEmail(email)
    const name = fullName.trim()

    if (!name) {
      setError('Please enter your full name.')
      return
    }
    if (!normalizedEmail) {
      setError('Please enter a valid email address.')
      return
    }

    const pwError = validatePassword(password)
    if (pwError) {
      setError(pwError)
      return
    }

    setIsSubmitting(true)

    try {
      const origin = window.location.origin
      const { error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
          data: {
            full_name: name,
            user_type: userType,
          },
        },
      })

      if (authError) {
        const msg = authError.message.toLowerCase()
        if (msg.includes('already') || msg.includes('registered') || msg.includes('exists')) {
          setError('An account with this email already exists. Please log in instead.')
          return
        }
        setError('Unable to sign up right now. Please try again.')
        return
      }

      router.replace('/auth/sign-up-success')
      router.refresh()
    } catch {
      setError('Unable to sign up right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleOAuthSignUp(provider: OAuthProvider) {
    setError(null)

    const name = fullName.trim()
    // Keep your original behavior, but avoid “provider User” if name is missing.
    const fallbackName = name || 'New User'

    setOauthProvider(provider)

    try {
      sessionStorage.setItem(STORAGE_KEYS.pendingUserType, userType)
      sessionStorage.setItem(STORAGE_KEYS.pendingFullName, fallbackName)

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
            <CardTitle className="text-2xl sm:text-3xl tracking-tight">
              Join <span className="text-indigo-700">CampusConnect</span>
            </CardTitle>
            <CardDescription className="text-base">
              Create an account to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSignUp} className="space-y-4" noValidate>
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  required
                />
              </div>

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
                  autoComplete="new-password"
                  placeholder="Create a password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? errorId : undefined}
                  required
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Use at least 8 characters. Consider a mix of letters, numbers, and symbols.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="userType" className="text-sm font-medium">
                  I am a
                </label>
                <div className="relative">
                  <select
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value as UserType)}
                    className="h-10 w-full appearance-none rounded-md border border-input bg-background px-3 pr-10 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                  >
                    <option value="student">Student</option>
                    <option value="admin">Faculty/Admin</option>
                  </select>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground"
                  >
                    ▾
                  </span>
                </div>
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
                {isSubmitting ? 'Creating account…' : 'Sign Up'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-sm text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full bg-white hover:bg-gray-50"
                onClick={() => handleOAuthSignUp('google')}
                disabled={busy}
                aria-label="Sign up with Google"
              >
                <GoogleIcon className="mr-2 h-5 w-5" />
                Sign up with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full bg-white hover:bg-gray-50"
                onClick={() => handleOAuthSignUp('github')}
                disabled={busy}
                aria-label="Sign up with GitHub"
              >
                <GitHubIcon className="mr-2 h-5 w-5" />
                Sign up with GitHub
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded-sm"
              >
                Log in
              </Link>
            </p>

            <p className="text-center text-xs text-muted-foreground">
              By creating an account, you agree to our{' '}
              <Link href="/legal/terms" className="underline underline-offset-4 hover:no-underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link
                href="/legal/privacy"
                className="underline underline-offset-4 hover:no-underline"
              >
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
