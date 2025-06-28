'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        toast.error('Please log in to access the dashboard.')
        router.push('/login')
      } else {
        // ✅ Get user name and role from metadata
        const fullName = data.user.user_metadata?.full_name || 'User'
        const role = data.user.user_metadata?.role || 'customer'

        setUserName(fullName)
        setUserRole(role)
      }
    }

    getUser()
  }, [router])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error('Error logging out')
    } else {
      toast.success('Logged out successfully')
      router.push('/login')
    }
  }

  // Extract initials from name
  const getInitials = (name: string) => {
    const first = name.trim().split(' ')[0] || ''
    return first.substring(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        {/* Avatar Circle */}
        {userName && (
          <div className="mx-auto w-16 h-16 bg-blue-600 text-white flex items-center justify-center rounded-full text-xl font-bold">
            {getInitials(userName)}
          </div>
        )}

        <h1 className="text-2xl font-bold">
          👋 Welcome, {userName?.split(' ')[0] || 'User'}!
        </h1>

        {/* ✅ Display Role */}
        {userRole && (
          <p className="text-gray-500 text-sm">
            Role: <strong className="capitalize">{userRole}</strong>
          </p>
        )}

        <p className="text-gray-600 text-sm">
          This is your personalized dashboard.
        </p>

        <Button onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  )
}

