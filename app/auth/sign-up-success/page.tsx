import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Verify Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a confirmation link to your email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please check your email and click the confirmation link to activate your account. You'll then be able to log in and start using CampusConnect.
          </p>
          <Link href="/auth/login" className="block">
            <Button className="w-full">Return to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
