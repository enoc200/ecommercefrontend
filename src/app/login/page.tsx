'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.warning('Please fill in both email and password.')
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Login successful')
      router.push('/')
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full items-center bg-white shadow-lg rounded-xl p-0">
        {/* Image Section */}
        <div className="hidden md:block h-full w-full">
          <img
            src="/sign-up.jpg"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full p-6 md:p-10">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md"
          >
            <h1 className="text-3xl font-bold text-center">👋 Welcome Back!</h1>
            <p className="text-center text-sm text-gray-500">
              Login to your account to continue shopping
            </p>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} /> Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock size={16} /> Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{' '}
              <a href="/signup" className="text-blue-600 underline">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

