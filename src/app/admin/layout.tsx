'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const handleLogout = () => {
    // Clear any stored admin session (if needed)
    localStorage.removeItem('admin-auth')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">🛒 E-Shop Admin</h1>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      {/* Navigation */}
      <nav className="bg-blue-600 text-white px-6 py-3 flex gap-4 text-sm">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/admin/products" className="hover:underline">
          Products
        </Link>
        <Link href="/admin/orders" className="hover:underline">
          Orders
        </Link>
        <Link href="/admin/customers" className="hover:underline">
          Customers
        </Link>
      </nav>

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  )
}
