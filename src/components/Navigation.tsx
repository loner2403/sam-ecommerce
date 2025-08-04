'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Gas Burner Catalog
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/' ? 'text-gray-900 bg-gray-100' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/products' ? 'text-gray-900 bg-gray-100' : ''
              }`}
            >
              Products
            </Link>
            <Link 
              href="/admin" 
              className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
                pathname?.startsWith('/admin') ? 'text-gray-900 bg-gray-100' : ''
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
