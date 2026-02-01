'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Navbar({ user }: { user: any }) {
  const supabase = createClient()
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <nav className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition" onClick={() => router.push('/protected/dashboard')}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          <div>
            <div className="text-xl font-bold text-foreground">CampusConnect</div>
            <div className="text-xs text-muted-foreground">Campus Hub</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {user?.user_metadata?.user_type === 'admin' ? '🔐 Admin' : '👤 Student'}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full bg-transparent">
                {user?.user_metadata?.full_name?.split(' ')[0] || 'User'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => router.push('/protected/profile')}>
                <span>👤 My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/protected/settings')}>
                <span>⚙️ Settings</span>
              </DropdownMenuItem>
              {user?.user_metadata?.user_type === 'admin' && (
                <DropdownMenuItem onClick={() => router.push('/protected/admin/dashboard')}>
                  <span>🔐 Admin Panel</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <span>🚪 Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
