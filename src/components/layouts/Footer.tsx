// components/layout/Footer.tsx
'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white mt-8 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
        <div className="space-x-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
