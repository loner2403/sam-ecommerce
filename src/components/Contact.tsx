"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";

const Contact = () => {
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
      boxShadow: "0 20px 40px rgba(37, 211, 102, 0.3)",
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

  const handleWhatsAppClick = () => {
    const phoneNumber = "918788649590";
    
    // This will navigate in the same window
    // On mobile: Opens WhatsApp app
    // On desktop: Opens WhatsApp Web (no new window)
    window.location.href = `https://wa.me/${phoneNumber}`;
  };

  return (
    <div className="@container relative overflow-hidden bg-black">
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #059669 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #059669 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #059669 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div 
        className="relative z-10 flex flex-col justify-center items-center gap-6 px-4 py-16 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col gap-4 text-center max-w-[720px]"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
            variants={itemVariants}
          >
            Need Assistance?
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-base @[480px]:text-lg font-normal leading-relaxed"
            variants={itemVariants}
          >
            Reach out to us for any questions or support. We're here to help you build amazing experiences.
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex flex-1 justify-center"
          variants={itemVariants}
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleWhatsAppClick}
            className="relative group flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 @[480px]:h-14 px-6 @[480px]:px-8 bg-green-600 text-white text-sm @[480px]:text-base font-bold tracking-wide shadow-lg hover:bg-green-500 transition-colors"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg 
                className="w-5 h-5 @[480px]:w-6 @[480px]:h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="truncate">Contact Us on WhatsApp</span>
            </span>
            
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-10 right-10 w-20 h-20 bg-green-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"
        />
      </motion.div>
    </div>
  );
};

export default Contact;