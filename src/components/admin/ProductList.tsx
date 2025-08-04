'use client'

import { Product } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found. Add your first product to get started!</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Features
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16">
                    <Image
                      className="h-16 w-16 rounded-lg object-cover"
                      src={product.image_url}
                      alt={product.name}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                    <div className="text-sm text-gray-500 max-w-xs truncate">
                      {product.description}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₹{product.price.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="mb-1">
                      • {feature}
                    </div>
                  ))}
                  {product.features.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{product.features.length - 2} more
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <Button
                  onClick={() => onEdit(product)}
                  variant="outline"
                  size="sm"
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this product?')) {
                      onDelete(product.id)
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-900 border-red-600 hover:border-red-900"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
