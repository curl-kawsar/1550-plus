"use client"

import React from 'react'
import Image from 'next/image'

const Spark = () => {
  return (
    <section className="py-6 sm:py-8 px-2 sm:px-4 lg:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 uppercase tracking-wide font-norwester">
          The Spark
        </h2>
        
        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            She referred nine friends. One of those friends referred twelve more. Word spread quickly.
          </p>
          
          <p className="text-lg">
            At the same time, our results were consistently above industry standards. Students starting with 
            1200+ scores were finishing in the top 2% of test-takers nationwide.
          </p>
          
          <p className="text-lg">
            By 2016, demand grew so high that schools began inviting us to deliver large seminars to parents 
            across the Midwest on the secrets of high test scores. Soon after, we launched our after-school 
            methods in a more affordable group format, taking 10-20 students per class.
          </p>
          
          <p className="text-lg">
            Private family clients were limited to only 10-12 per year, and those spots became highly coveted, 
            with families joining waitlists to secure them.
          </p>
          
          <p className="text-lg">
            For years, families guarded our name, sharing it only with their closest friends and relatives. We never 
            advertised because word-of-mouth alone kept our limited private spaces full each year. By 2021, 
            those quiet referrals had expanded into Arizona and California, and today the majority of our most 
            dedicated
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

export default Spark