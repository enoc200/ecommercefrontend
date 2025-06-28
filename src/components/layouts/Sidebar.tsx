// components/layout/Sidebar.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Category {
  id: string
  name: string
}

export default function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*')

      if (error) {
        console.error('Failed to fetch categories:', error.message)
      } else {
        setCategories(data || [])
      }

      setLoading(false)
    }

    fetchCategories()
  }, [])

  return (
    <aside className="hidden md:block w-64 p-4 bg-white shadow rounded mr-4">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : (
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/" className="hover:underline text-blue-600 font-medium">
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/?category=${category.id}`}
                className="hover:underline capitalize text-gray-700"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

