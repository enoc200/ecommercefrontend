'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const [search, setSearch] = useState('')
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

  // ✅ Correctly typed reducer
  const cartCount = items.reduce((sum: number, item) => sum + item.quantity, 0)

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
        </nav>
      </div>
    </header>
  )
}



