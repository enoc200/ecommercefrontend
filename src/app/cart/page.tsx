'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart()

  const subtotal = items.reduce((acc: number, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full mb-4 text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 flex items-center gap-2">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    {item.name}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      className="w-12 border rounded px-2"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="text-red-500 text-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <Button variant="destructive" onClick={clearCart}>
              Clear Cart
            </Button>
            <p className="text-xl font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
          </div>

          <div className="mt-6 text-right">
            <Link href="/checkout">
              <Button>Proceed to Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}



