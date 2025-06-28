'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  price: number
  image_url?: string
  categories?: { name: string }[]
  category_id?: string
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const { addToCart } = useCart()

  const selectedCategory = searchParams.get('category')
  const searchQuery = searchParams.get('search')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      let query = supabase
        .from('products')
        .select('id, name, price, image_url, category_id, categories(name)')
        .order('created_at', { ascending: false })

      if (selectedCategory) {
        query = query.eq('category_id', selectedCategory)
      }

      const { data, error } = await query

      if (error) {
        toast.error('Failed to load products')
      } else {
        const filtered = searchQuery
          ? data?.filter((p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          : data
        setProducts(filtered || [])
      }

      setLoading(false)
    }

    fetchProducts()
  }, [selectedCategory, searchQuery])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || '',
      quantity: 1,
    })
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded flex flex-col justify-between">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 rounded mb-2" />
            )}
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>

            <div className="flex gap-2 mt-auto">
              <Link href={`/product/${product.id}`}>
                <Button variant="secondary" size="sm">Show More</Button>
              </Link>
              <Button size="sm" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}








