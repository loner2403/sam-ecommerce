'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/lib/supabase'
import { 
  PlusIcon, 
  MinusIcon, 
  CurrencyDollarIcon,
  PhotoIcon,
  DocumentTextIcon,
  TagIcon,
  SparklesIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

interface ProductFormProps {
  product?: Product | null
  onSave: () => void
  onCancel: () => void
}

export default function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<{
    id?: string;
    name: string;
    description: string;
    price: string;
    image_url: string;
    category: string;
    features: string[];
    updated_at?: string;
  }>({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    features: ['']
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image_url: product.image_url,
        category: product.category,
        features: product.features.length > 0 ? product.features : [''],
        updated_at: product.updated_at
      })
    }
  }, [product])

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index)
    setFormData({ ...formData, features: newFeatures })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const productData: Partial<Product> = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: formData.image_url,
        category: formData.category,
        features: formData.features.filter(feature => feature.trim() !== ''),
        updated_at: new Date().toISOString(),
        ...(product ? { id: product.id } : {})
      }

      const response = await fetch('/api/admin/products', {
        method: product ? 'PUT' : 'POST', // Use PUT for updates, POST for creates
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || `Error ${product ? 'updating' : 'adding'} product`)
      }

      onSave()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
          >
            <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <SparklesIcon className="w-4 h-4" />
            Product Name *
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              required
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 ${
                focusedField === 'name' ? 'border-blue-500/50 bg-white/10' : 'border-white/10 hover:border-white/20'
              }`}
              placeholder="Enter product name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="category" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <TagIcon className="w-4 h-4" />
            Category *
          </label>
          <div className="relative">
            <select
              id="category"
              required
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 ${
                focusedField === 'category' ? 'border-blue-500/50 bg-white/10' : 'border-white/10 hover:border-white/20'
              }`}
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              onFocus={() => setFocusedField('category')}
              onBlur={() => setFocusedField(null)}
            >
              <option value="" className="bg-gray-900 text-gray-300">Select Category</option>
              <option value="2-burner" className="bg-gray-900 text-white">2 Burner</option>
              <option value="3-burner" className="bg-gray-900 text-white">3 Burner</option>
              <option value="4-burner" className="bg-gray-900 text-white">4 Burner</option>
              <option value="commercial" className="bg-gray-900 text-white">Commercial</option>
              <option value="portable" className="bg-gray-900 text-white">Portable</option>
            </select>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="price" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <CurrencyDollarIcon className="w-4 h-4" />
            Price (₹) *
          </label>
          <div className="relative">
            <input
              type="number"
              id="price"
              required
              min="0"
              step="0.01"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 ${
                focusedField === 'price' ? 'border-blue-500/50 bg-white/10' : 'border-white/10 hover:border-white/20'
              }`}
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              onFocus={() => setFocusedField('price')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label htmlFor="image_url" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <PhotoIcon className="w-4 h-4" />
            Image URL *
          </label>
          <div className="relative">
            <input
              type="url"
              id="image_url"
              required
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 ${
                focusedField === 'image_url' ? 'border-blue-500/50 bg-white/10' : 'border-white/10 hover:border-white/20'
              }`}
              placeholder="https://example.com/image.jpg"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              onFocus={() => setFocusedField('image_url')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          <DocumentTextIcon className="w-4 h-4" />
          Description *
        </label>
        <div className="relative">
          <textarea
            id="description"
            required
            rows={4}
            className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none ${
              focusedField === 'description' ? 'border-blue-500/50 bg-white/10' : 'border-white/10 hover:border-white/20'
            }`}
            placeholder="Enter detailed product description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-4">
          <SparklesIcon className="w-4 h-4" />
          Features
        </label>
        <div className="space-y-3">
          <AnimatePresence>
            {formData.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-3 items-center"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 ${
                      focusedField === `feature-${index}` ? 'border-blue-500/50 bg-white/10' : 'border-white/10 hover:border-white/20'
                    }`}
                    placeholder="Enter feature"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    onFocus={() => setFocusedField(`feature-${index}`)}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                {formData.features.length > 1 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => removeFeature(index)}
                    className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addFeature}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300"
          >
            <PlusIcon className="w-4 h-4" />
            Add Feature
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex justify-end gap-4 pt-6 border-t border-white/10"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCancel}
          className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:bg-white/20 hover:text-white transition-all duration-300 font-medium"
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
          className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-bold shadow-lg transition-all duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-blue-500/25'
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Saving...
            </span>
          ) : (
            <span className="text-white">
              {product ? 'Update Product' : 'Add Product'}
            </span>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  )
}
