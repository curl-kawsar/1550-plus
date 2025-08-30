"use client"

import React from 'react'
import Image from 'next/image'

const Believe = () => {
  return (
    <section className="py-8 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 uppercase tracking-wide font-norwester">
          We Believe
        </h2>
        
        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Everyone is capable of far more than they think.
          </p>
          
          <p className="text-lg">
            Too often, students set small, “reasonable” goals like:
          </p>
          
          <p className="text-lg">
            “If I just got a 1300…” <br /> “If I just got a 1420…”
          </p>
          
          <p className="text-lg">
           The truth is, settling never leads to real satisfaction.
            Reasonable goals keep you average. Unreasonable goals change your life.
            We don't believe in average, and neither should you!
          </p>
          
        </div>
        
        {/* Arrow Divider */}
         <div className="flex justify-center my-6">
                  <div className="flex items-center space-x-1">
                    {/* Use arrow.png when available, fallback to chevrons */}
                    <div className="flex items-center">
                      <Image 
                        src="/arrow.png" 
                        alt="Arrow decoration" 
                        width={1000} 
                        height={20} 
                        className="object-contain"
                        onError={(e) => {
                          // Fallback to text arrows if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden items-center space-x-1">
                        {Array.from({ length: 20 }, (_, i) => (
                          <span key={i} className="text-blue-500 text-2xl font-bold">
                            &gt;
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
      </div>
    </section>
  )
}

export default Believe