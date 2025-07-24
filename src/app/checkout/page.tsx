'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email) {
      toast.error('Please fill in all fields')
      return
    }

    // Simulate order submission
    console.log('Submitting Order:', { name, email, items })

    toast.success('Order placed successfully!')
    clearCart()
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {items.length === 0 ? (
        <p>Your cart is empty. Please add items before checking out.</p>
      ) : (
        <>
          {/* Order Summary */}
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
            <ul className="text-sm space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  {item.name} × {item.quantity} = ${(
                    item.price * item.quantity
                  ).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
          </div>

          {/* User Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-sm">Full Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">Email Address</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </form>
        </>
      )}
    </div>
  )
}
