"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="@container relative overflow-hidden bg-black pt-14 md:pt-16">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #1e40af 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #1e40af 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #1e40af 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="p-4 pt-10 sm:p-6 md:p-8 lg:p-12 relative">
        <div className="relative flex min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex-col gap-4 sm:gap-6 sm:gap-8 sm:rounded-2xl items-start justify-center overflow-hidden bg-gradient-to-br from-neutral-900 to-black">
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          {/* Content Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full relative z-10">
            
            {/* Left Content */}
            <motion.div 
              className="flex flex-col gap-4 sm:gap-6 text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Small badge with logo */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl">⚙️</span>
                </div>
                <span className="text-white text-xl font-medium">
                  Hello! Ready to build with Centra?
                </span>
              </motion.div>

              {/* Main heading */}
              <motion.h1 
                variants={itemVariants}
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
              >
                Build your own
                <span className="block">commerce stack.</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p 
                variants={itemVariants}
                className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-2xl"
              >
                With Centra's developer tools, you've got everything you need to build best-in-class ecommerce experiences.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start mt-4"
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative group flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-blue-500 text-white text-base font-bold tracking-wide shadow-lg hover:bg-blue-600 transition-colors"
                  onClick={() => console.log('Get Started clicked')}
                >
                  <span className="relative z-10">Get Started</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-neutral-800 border border-neutral-700 text-white text-base font-semibold tracking-wide hover:bg-neutral-700 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Content - Visual Elements */}
            <div className="relative h-full min-h-[400px] hidden lg:block">
              {/* Orders Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute top-10 right-20 bg-yellow-400 text-black px-6 py-4 rounded-xl shadow-2xl"
              >
                <div className="text-sm font-medium">Orders</div>
                <div className="text-3xl font-bold">+132%</div>
              </motion.div>

              {/* Code Snippet */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="absolute top-32 right-10 bg-blue-500 text-white p-4 rounded-xl shadow-2xl font-mono text-sm max-w-xs"
              >
                <div className="opacity-90">1  products (where: {`{st`}</div>
                <div className="ml-4">2  id</div>
                <div className="ml-4">3  name</div>
                <div className="ml-4 opacity-70">4  createdAt (format:"da</div>
                <div className="ml-4 opacity-70">5  brand {`{name}`}</div>
              </motion.div>

              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, type: "spring" }}
                className="absolute bottom-40 left-20"
              >
                <img 
                  src="/gas-burner4.jpg" 
                  alt="Gas Burner"
                  className="w-48 h-48 object-contain filter drop-shadow-2xl"
                />
              </motion.div>

              {/* Developers First Badge */}
              <motion.div
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: -15 }}
                transition={{ delay: 1.1, type: "spring" }}
                className="absolute bottom-20 right-20 bg-green-400 text-black px-8 py-6 rounded-full shadow-2xl font-bold transform -rotate-12"
              >
                <div className="text-center">
                  <div className="text-lg">developers</div>
                  <div className="text-2xl">first</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Visual Elements */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 mt-8 w-full lg:hidden"
          >
            <div className="bg-yellow-400 text-black p-3 rounded-lg text-center">
              <div className="text-xs">Orders</div>
              <div className="text-lg font-bold">+132%</div>
            </div>
            <div className="bg-blue-500 text-white p-3 rounded-lg text-center">
              <div className="text-xs">API First</div>
              <div className="text-lg font-bold">100%</div>
            </div>
            <div className="bg-green-400 text-black p-3 rounded-lg text-center">
              <div className="text-xs">Dev</div>
              <div className="text-lg font-bold">First</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;