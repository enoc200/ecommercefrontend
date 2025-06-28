'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
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

export default function AddProductPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  // 🔄 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('id, name')
      if (error) {
        toast.error('Failed to load categories')
      } else {
        setCategories(data)
      }
    }

    fetchCategories()
  }, [])

  // ✅ Submit product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !price || !categoryId) {
      toast.warning('Name, Price and Category are required!')
      return
    }

    setLoading(true)

    const { error } = await supabase.from('products').insert({
      name,
      price: parseFloat(price),
      description,
      image_url: imageUrl || null,
      category_id: categoryId,
    })

    setLoading(false)

    if (error) {
      toast.error('Failed to add product.')
    } else {
      toast.success('Product added successfully!')
      router.push('/admin/products')
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-center">➕ Add New Product</h1>

        <div>
          <Label>Name *</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <Label>Price *</Label>
          <Input
            type="number"
            step="0.01"
            min="0"
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
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <Label>Image URL</Label>
          <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Product'}
        </Button>
      </form>
    </div>
  )
}

