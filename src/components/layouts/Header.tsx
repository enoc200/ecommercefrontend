'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [search, setSearch] = useState('')
  const [showOTPModal, setShowOTPModal] = useState(false)
  const [otp, setOtp] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    router.push(`/?${params.toString()}`)
  }

  const cartCount = items.reduce((sum: number, item) => sum + item.quantity, 0)

  const handleOTPSubmit = () => {
    if (otp === '123456') {
      setShowOTPModal(false)
      router.push('/admin/panel') // ✅ Correct redirect path
    } else {
      alert('Invalid OTP. Try 123456')
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 sm:justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          🛒 E-Shop
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center w-full sm:w-1/2 gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded px-3 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Nav Icons */}
        <nav className="flex gap-4 items-center text-sm">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Admin Button */}
          <button
            onClick={() => setShowOTPModal(true)}
            className="text-blue-600 font-semibold hover:underline"
          >
            Admin
          </button>
        </nav>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Admin OTP Verification</h2>
            <input
              type="text"
              maxLength={6}
              className="border rounded w-full p-2 mb-4"
              placeholder="Enter OTP (123456)"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => setShowOTPModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleOTPSubmit}>Verify</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}





