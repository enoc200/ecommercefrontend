'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface Category {
  id: string
  name: string
}

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  // 🔁 Fetch categories & product
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // Fetch categories
      const { data: catData, error: catError } = await supabase.from('categories').select('*')
      if (catError) {
        toast.error('Failed to load categories.')
        setLoading(false)
        return
      }
      setCategories(catData || [])

      // Fetch product
      const { data: prodData, error: prodError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (prodError || !prodData) {
        toast.error('Failed to load product.')
        router.push('/admin/products')
      } else {
        setName(prodData.name)
        setPrice(prodData.price.toString())
        setCategoryId(prodData.category_id || '')
        setDescription(prodData.description || '')
        setImageUrl(prodData.image_url || '')
      }

      setLoading(false)
    }

    fetchData()
  }, [id, router])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !price || !categoryId) {
      toast.warning('Please fill in all required fields.')
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from('products')
      .update({
        name,
        price: parseFloat(price),
        category_id: categoryId,
        description,
        image_url: imageUrl,
      })
      .eq('id', id)

    setLoading(false)

    if (error) {
      toast.error('Failed to update product.')
    } else {
      toast.success('Product updated!')
      router.push('/admin/products')
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">✏️ Edit Product</h1>

        <div>
          <Label>Name *</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Price *</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Category *</Label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Label>Image URL</Label>
          <Input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Updating...' : 'Update Product'}
        </Button>
      </form>
    </div>
  )
}

