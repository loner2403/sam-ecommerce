"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardTitle } from "./ui/card";

const offerings = [
  {
    title: 'Gas Burners',
    description: 'High-quality gas burners for efficient cooking.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaJMtAC29pJA8w1UrcHH-58eP_ZzxNAQj4LJ4sPWeEdLTfhTJLEtE3HzkQOLRQtUs-0WaQ9AQNtB5C-XEiz8b68dMpifZJsmjC-Z5Z2v9QBaSfwFMpCB5zBurj7xS-vNe-96pCQrw0_XywR5PkjUQLqjYFUsYUA410sLio2vicqPj60rOybl_tfbFAoF7wD5iXETlOJceA0yK0QjDPs8xvJG5O1_jTEE7PZelgK9UyrP80sRnIfHfqVCVanzTuGhC_mpPieJ23ZXUA',
  },
  {
    title: 'Accessories',
    description: 'Essential accessories to complement your gas burner.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDkwH93IG33T5eUlXGpmTEwA3hatwMNqY6qwxGTFGE-4tUeLaRHL4qxdayZ4CEeU0t3cZKdimHoQ4S8eYh9QwJYaqFr0aQaH9yN76FZ_slBCTQrxbME0J1Lda3WdlbzN-0eqYLUPdDbkFH9Wob8gLHmTZAikICf_SBOHNhv-aeGgWNYapB_F2-Mpkr3D0nXnzN8KIZZWjmUvaDuXTJ7Gb_4Nw0zSVjsFseDiqID2QCn0rDzNdoFaTzyixVHaX7PRERuk40uYZp_PwB',
  },
  {
    title: 'Installation Services',
    description: 'Professional installation services for a seamless setup.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCg371XEz0GSMJ5_4W7ku2xX8Bm4nPAt8QvLopINjI1xNynV-sLneYjSzWsDDmMZgwXOYj-ttNQkYHO788kaJgb6SDFUwPxPzn9rtC2yGXAus7CXiaay5MpuGFu6fP6dtb8xhmAv0rI8Vd4_btwEpYsCPXR10q6xuAWIBd_s0WlhlF7PCuRCCd5AlJlgOgh-FiqolChArGZKpCyaGrxxivHv_tIZVxD_ieonhTUKCu6vG1Tp7u222zJekp5YkkywmHifNWj0CSjf2Y1',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
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

const cardVariants = {
  hover: {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

const Offerings = () => (
  <div className="flex flex-col gap-10 px-4 py-10 @container bg-black relative overflow-hidden">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black" />
    
    {/* Grid pattern overlay */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
    
    <motion.div 
      className="relative z-10 flex flex-col gap-10 max-w-7xl mx-auto w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex flex-col gap-4" variants={itemVariants}>
        <h1 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
          Explore Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Offerings
          </span>
        </h1>
        <p className="text-gray-400 text-base font-normal leading-normal max-w-[720px]">
          Discover our range of products and services designed to enhance your{" "}
          <span className="text-green-400 font-medium">kitchen experience</span>.
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 @[768px]:gap-6"
        variants={containerVariants}
      >
        {offerings.map((offering, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover="hover"
          >
            <motion.div
              variants={cardVariants}
              className="group relative"
            >
              <Card className="flex flex-col gap-3 pb-3 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:bg-zinc-900/70 transition-all duration-300 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/0 to-red-600/0 group-hover:from-orange-600/5 group-hover:to-red-600/5 transition-all duration-300" />
                
                <div className="relative overflow-hidden rounded-lg">
                  <motion.div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover"
                    style={{ backgroundImage: `url('${offering.image}')` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Dark overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardContent className="p-4 relative z-10">
                  <CardTitle className="text-white text-lg font-medium leading-normal mb-2 group-hover:text-blue-500 transition-colors duration-300">
                    {offering.title}
                  </CardTitle>
                  <p className="text-gray-500 text-sm font-normal leading-normal group-hover:text-gray-400 transition-colors duration-300">
                    {offering.description}
                  </p>
                  
                  {/* Animated underline */}
                  <motion.div
                    className="mt-3 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);

export default Offerings;