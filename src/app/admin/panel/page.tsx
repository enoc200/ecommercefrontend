'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPanel() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch total products
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })

      // Fetch orders data
      const { data: ordersData } = await supabase
        .from('orders')
        .select('id, total')

      const orderCount = ordersData?.length || 0
      const totalRevenue = ordersData?.reduce(
        (sum, order) => sum + (order.total || 0),
        0
      )

      // Fetch total customers
      const { count: customerCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      setStats({
        products: productCount ?? 0,
        orders: orderCount,
        customers: customerCount ?? 0,
        revenue: totalRevenue??0,
      })
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🛠️ Admin Panel</h1>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => {
              // Add your logout logic here
              alert('Logged out (not implemented)')
            }}
          >
            Log out
          </button>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Products" value={stats.products} emoji="🛍️" />
          <StatCard title="Total Orders" value={stats.orders} emoji="📦" />
          <StatCard title="Total Customers" value={stats.customers} emoji="👥" />
          <StatCard
            title="Total Revenue"
            value={`KSh ${stats.revenue.toLocaleString()}`}
            emoji="💰"
          />
        </section>

        <div className="text-sm text-gray-500">
          <p>To manage products, orders, and customers, use the links from the sidebar or top nav (to be added).</p>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  emoji,
}: {
  title: string
  value: string | number
  emoji: string
}) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex flex-col gap-2">
      <span className="text-4xl">{emoji}</span>
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  )
}
