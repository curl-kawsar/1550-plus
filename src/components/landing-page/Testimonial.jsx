"use client"
import React, { useEffect } from 'react'
import { Play } from 'lucide-react'

const Testimonial = () => {
  useEffect(() => {
    // Load Norwester font dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Norwester&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section 
      className="py-16 relative overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(circle at 1px 1px, #93C5FD 1px, transparent 0)',
        backgroundSize: '20px 20px'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Two-Column Layout matching Figma */}
        <div className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden shadow-xl">
          
          {/* Left Column - Profile & Info (Black with dots) */}
          <div className="w-full lg:w-1/2 relative">
            <div 
              className="h-full min-h-[400px] p-8 text-white relative overflow-hidden flex flex-col justify-center"
              style={{ backgroundColor: '#000000' }}
            >
              {/* Dotted Background Pattern on Left Column */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #93C5FD 2px, transparent 0)',
                  backgroundSize: '20px 20px'
                }}
              />
              
              {/* Trophy Icons scattered around */}
              <div className="absolute top-6 right-6">
                <img src="/trophy.svg" alt="Trophy" className="w-6 h-6 opacity-60" />
              </div>
              <div className="absolute bottom-8 left-6">
                <img src="/trophy.svg" alt="Trophy" className="w-5 h-5 opacity-50" />
              </div>
              <div className="absolute top-20 left-8">
                <img src="/trophy.svg" alt="Trophy" className="w-4 h-4 opacity-40" />
              </div>
              
              {/* Profile Section - Top Aligned Layout */}
              <div className="flex items-start space-x-6 relative z-10">
                {/* Circular Profile Picture with Blue Border */}
                <div className="w-20 h-20 rounded-full border-4 border-blue-400 overflow-hidden flex-shrink-0">
                  <img 
                    src="/api/placeholder/80/80" 
                    alt="Hiyu Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Profile Information */}
                <div>
                  {/* Large Bold Name in Blue */}
                  <h3 
                    className="text-3xl font-bold text-blue-400 mb-2" 
                    style={{ fontFamily: 'Norwester' }}
                  >
                    HIYU
                  </h3>
                  
                  {/* Score Range */}
                  <div className="text-lg text-white mb-1">
                    1260 to 1530
                  </div>
                  
                  {/* Program Name in Blue */}
                  <div className="text-blue-400 text-base">
                    Full SAT Program
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Video Player */}
          <div className="w-full lg:w-1/2">
            <div className="relative h-full min-h-[400px]">
              {/* Video Thumbnail */}
              <img 
                src="/api/placeholder/600/400" 
                alt="Hiyu Video Testimonial"
                className="w-full h-full object-cover"
              />
              
              {/* Centered Circular Blue Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 hover:scale-105 transition-all duration-200 shadow-lg">
                  <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial