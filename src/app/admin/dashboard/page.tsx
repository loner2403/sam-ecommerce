'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAdmin } from '@/contexts/AdminContext'
import { supabase, Product } from '@/lib/supabase'
import { 
  PlusIcon, 
  ChartBarIcon, 
  CubeIcon, 
  CurrencyDollarIcon,
  TagIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import ProductForm from '@/components/admin/ProductForm'
import ProductList from '@/components/admin/ProductList'

export default function AdminDashboard() {
  const { logout } = useAdmin()
  const [products, setProducts] = useState<Product[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalProducts: 0,
    categories: 0,
    avgPrice: 0,
    totalValue: 0
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    // Calculate stats when products change
    const totalProducts = products.length
    const categories = new Set(products.map(p => p.category)).size
    const avgPrice = products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0
    const totalValue = products.reduce((sum, p) => sum + p.price, 0)
    
    setStats({ totalProducts, categories, avgPrice, totalValue })
  }, [products])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProductSave = () => {
    fetchProducts()
    setShowAddForm(false)
    setEditingProduct(null)
  }

  const handleProductDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Error deleting product')
      }

      fetchProducts()
    } catch (error: any) {
      console.error('Error deleting product:', error)
      alert(`Failed to delete product: ${error.message}`)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowAddForm(true)
  }

  const handleCancelEdit = () => {
    setShowAddForm(false)
    setEditingProduct(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  }

  const statsData = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <CubeIcon className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      change: '+12%'
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: <TagIcon className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      change: '+5%'
    },
    {
      title: 'Avg. Price',
      value: `₹${stats.avgPrice.toLocaleString()}`,
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      change: '+8%'
    },
    {
      title: 'Total Value',
      value: `₹${stats.totalValue.toLocaleString()}`,
      icon: <ChartBarIcon className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      change: '+15%'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.div 
        className="relative z-10 glass-dark border-b border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-gray-400 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                Manage your premium gas burner catalog
              </p>
            </motion.div>
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-dark rounded-2xl p-6 group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <span className="text-xs text-green-400 font-medium">{stat.change}</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.title}</h3>
              <p className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          >
            <PlusIcon className="w-5 h-5" />
            Add New Product
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/products'}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-bold hover:bg-white/20 transition-all duration-300"
          >
            <EyeIcon className="w-5 h-5" />
            View Store
          </motion.button>
        </motion.div>

        {/* Product Form Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={(e) => e.target === e.currentTarget && handleCancelEdit()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="glass-dark rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancelEdit}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </motion.button>
                </div>
                <ProductForm
                  product={editingProduct}
                  onSave={handleProductSave}
                  onCancel={handleCancelEdit}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products List */}
        <motion.div variants={itemVariants} className="glass-dark rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Products Catalog
            </h2>
            <span className="text-gray-400 text-sm">
              {products.length} {products.length === 1 ? 'product' : 'products'} total
            </span>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"
              />
            </div>
          ) : (
            <ProductList
              products={products}
              onEdit={handleEdit}
              onDelete={handleProductDelete}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
