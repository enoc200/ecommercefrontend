'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Category = {
  id: string
  name: string
}

type SupabaseProduct = {
  id: string
  name: string
  price: number
  image_url: string
  created_at: string
  category_id: string
  categories: Category[]
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<SupabaseProduct[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          image_url,
          created_at,
          category_id,
          categories (
            id,
            name
          )
        `)

      if (error) {
        console.error('Error fetching products:', error)
        setError('Failed to fetch products')
        setLoading(false)
        return
      }

      const mappedProducts: SupabaseProduct[] = (data || []).map((product: any) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        created_at: product.created_at,
        category_id: product.category_id,
        categories: product.categories ? [product.categories] : [],
      }))

      setProducts(mappedProducts)
      setLoading(false)
    }

    fetchProducts()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin: Product List</h1>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && products.length === 0 && <p>No products found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">Ksh {product.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">
              Category: {product.categories[0]?.name || 'Uncategorized'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Added on: {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}







