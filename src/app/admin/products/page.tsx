'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Product {
  id: string
  name: string
  price: number
  image_url?: string
  created_at?: string
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      const { data, error }: { data: Product[] | null; error: Error | null } = await supabase
        .from('products')
        .select('id, name, price, image_url, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        toast.error('Failed to fetch products.')
        setProducts([])
      } else {
        setProducts(data ?? [])
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return

    const { error } = await supabase.from('products').delete().eq('id', productId)

    if (error) {
      toast.error('Failed to delete product.')
    } else {
      toast.success('Product deleted.')
      setProducts((prev) => prev.filter((p) => p.id !== productId))
    }
  }

  return (
    null
  )
}


