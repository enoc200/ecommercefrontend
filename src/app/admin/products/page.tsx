/*'use client'

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
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">🛍️ Product Management</h1>
          <Link href="/admin/products/new">
            <Button>Add New Product</Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">Image</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="p-3 border-b font-medium">{product.name}</td>
                    <td className="p-3 border-b">Kshs {product.price.toFixed(2)}</td>
                    <td className="p-3 border-b space-x-4">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

*/
