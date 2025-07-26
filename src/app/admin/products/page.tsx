'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Category = {
  name: string;
};

type SupabaseProduct = {
  id: string;
  name: string;
  price: number;
  image_url: string;
  created_at: string;
  category_id: string;
  categories: Category[];
};

export default function AdminProductPage() {
  const [products, setProducts] = useState<SupabaseProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
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
            name
          )
        `);

      if (error) {
        console.error('Error fetching products:', error.message);
      } else {
        setProducts(data as SupabaseProduct[]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Product List</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="border rounded p-4 shadow">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">KSh {product.price}</p>
            <p className="text-sm text-gray-500">
              Category: {product.categories[0]?.name || 'Uncategorized'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}









