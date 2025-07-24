'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, User } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || !fullName) {
      return toast.warning('Please fill in all fields.')
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'customer', // default role
        },
      },
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Signup successful!.')
      router.push('/login')
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
            alt="Sign Up Illustration"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Form Section */}
        <div className="w-full p-6 md:p-10">
          <form
            onSubmit={handleSignup}
            className="w-full max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md"
          >
            <h1 className="text-3xl font-bold text-center">
              Hey👋 Create an Account
            </h1>
            <p className="text-center text-sm text-gray-500">
              Join us and start shopping smarter today
            </p>

            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User size={16} /> Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}


