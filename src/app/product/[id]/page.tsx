'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
interface Category {
  id: string
  name: string
}

interface Product {
  id: string
  name: string
  price: number
  category_id?: string
  category_name?: string
  image_url?: string
  description?: string
  categories?: { name: string }[]
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('products')
        .select(`
          id, name, price, image_url, description,
          categories(name )
        `)
        .eq('id', id)
        .single()

      if (error) {
        toast.error('Failed to load product details.')
        console.error(error.message)
      } else {
        setProduct(data)
      }

      setLoading(false)
    }

    if (id) fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || '',
      quantity: 1,
    })
    toast.success('Product added to cart!')
  }

  if (loading) return <p className="p-4">Loading product...</p>
  if (!product) return <p className="p-4">Product not found.</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/" className="text-blue-600 hover:underline text-sm">
        ← Back to Home
      </Link>

      <div className="bg-white p-6 rounded shadow mt-4 flex flex-col md:flex-row gap-6">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full md:w-64 h-64 object-cover rounded"
          />
        ) : (
          <div className="w-full md:w-64 h-64 bg-gray-200 rounded" />
        )}

        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-sm">
            Category: {product.categories?.[0]?.name || 'Uncategorized'}
          </p>
          <p className="text-gray-800 font-semibold text-lg">Kshs{product.price.toFixed(2)}</p>
          <p className="text-gray-700">{product.description || 'No description provided.'}</p>

          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}

