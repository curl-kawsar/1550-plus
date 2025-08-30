"use client"

import React from 'react'
import Image from 'next/image'

const Will = () => {
  return (
    <section className="lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 uppercase tracking-wide font-norwester">
          Will This Work for You?
        </h2>
        
        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            Here's the truth…if you only “try,” it won't. This program demands more than trying and will require that you bring out parts of yourself you've been hiding.
          </p>
          
          <p className="text-lg">
            The program works, if you follow it. If you do nothing, nothing happens. 
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

export default Will