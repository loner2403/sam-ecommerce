"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Pixelify_Sans } from 'next/font/google';

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // Include relevant weights
  variable: '--font-pixelify-sans',
});

const ScrollingText = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-black to-neutral-900/20" />
      
      {/* Single scrolling line */}
      <div className="relative">
        <motion.div
          className="flex"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {/* Create enough repetitions for seamless loop */}
          {[...Array(4)].map((_, i) => (
            <span 
              key={i}
              className="text-white text-[80px] md:text-[120px] lg:text-[180px] font-black whitespace-nowrap pr-8"
            >
              our reputation built • 
            </span>
          ))}
        </motion.div>
        {/* Duplicate for seamless loop */}
        <motion.div
          className="flex absolute top-0"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {[...Array(4)].map((_, i) => (
            <span 
              key={i}
              className="text-white text-[80px] md:text-[120px] lg:text-[180px] font-black whitespace-nowrap pr-8"
            >
              our reputation built • 
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Better approach using transform
const SeamlessScrollingText = () => {
  const text = "our reputation built • ";
  
  return (
    <div className="relative w-full overflow-hidden bg-black py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-black to-neutral-900/20" />
      
      <div className="relative flex">
        <motion.div
          className="flex flex-shrink-0"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 15,
              ease: "linear",
            },
          }}
        >
          <span className="text-white text-[80px] md:text-[120px] lg:text-[180px] font-black whitespace-nowrap pr-8">
            {text}
          </span>
          <span className="text-white text-[80px] md:text-[120px] lg:text-[180px] font-black whitespace-nowrap pr-8">
            {text}
          </span>
        </motion.div>
        
        {/* This creates the seamless effect */}
        <motion.div
          className="flex flex-shrink-0"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop", 
              duration: 15,
              ease: "linear",
            },
          }}
        >
          <span className="text-white text-[80px] md:text-[120px] lg:text-[180px] font-black whitespace-nowrap pr-8">
            {text}
          </span>
          <span className="text-white text-[80px] md:text-[120px] lg:text-[180px] font-black whitespace-nowrap pr-8">
            {text}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

// Most reliable approach - using CSS animation
const CSSScrollingText = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-black to-neutral-900/20" />
      
      <div className="relative">
        <div className="animate-scroll flex">
          {/* Repeat text enough times to fill screen width */}
          {[...Array(10)].map((_, i) => (
            <span 
              key={i}
              className="text-white text-[80px] md:text-[120px] lg:text-[180px] font-black whitespace-nowrap pr-8 flex-shrink-0"
            >
              our reputation built • 
            </span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Recommended approach - Cleanest solution
const PerfectScrollingText = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-16 md:py-24">
      <div className="relative whitespace-nowrap">
        <motion.div
          className="inline-block"
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {/* First set */}
          <span 
            className="text-white text-[60px] md:text-[100px] lg:text-[150px] xl:text-[200px] font-black pr-12"
            style={{
              fontFamily: 'Pixelify Sans, monospace',
              letterSpacing: '-0.05em',
            }}
          >
            our reputation built • our reputation built • 
          </span>
          {/* Duplicate for seamless loop */}
          <span 
            className="text-white text-[60px] md:text-[100px] lg:text-[150px] xl:text-[200px] font-black pr-12"
            style={{
              fontFamily: 'Pixelify Sans, monospace',
              letterSpacing: '-0.05em',
            }}
          >
            our reputation built • our reputation built • 
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default PerfectScrollingText;