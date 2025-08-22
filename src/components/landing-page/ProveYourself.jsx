"use client"
import React, { useEffect } from 'react'
import { Check } from 'lucide-react'

const ProveYourself = () => {
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
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          
          {/* Left Side - Content */}
          <div className="lg:w-1/2 space-y-6">
            {/* Main Heading */}
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-500 leading-tight"
              style={{ fontFamily: 'Norwester' }}
            >
              PROVE TO YOURSELF THAT YOU HAVE WHAT IT TAKES
            </h2>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Enter into an elite test prep program, where every student is on track for a 1550+ score, top choice admissions, and lifelong success no matter what their goals
            </p>
            
            {/* Checkmark List */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-800">Entry into Top Colleges</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-800">Athletic Scholarships</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-800">Merit Scholarships</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-800">Bragging Rights</span>
              </div>
            </div>
          </div>

          {/* Right Side - Custom Score Progression */}
          <div className="lg:w-1/2 flex flex-col justify-center items-center space-y-8">
            
            {/* Animated Score Display */}
            <div className="relative">
              <div 
                className="w-72 h-72 rounded-full flex flex-col items-center justify-center relative overflow-hidden border-4 border-white shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)',
                  backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
                  backgroundSize: '15px 15px'
                }}
              >
                {/* Score Counter */}
                <div className="text-center text-white relative z-20 drop-shadow-lg">
                  <div 
                    className="text-7xl font-bold mb-3 text-white drop-shadow-md" 
                    style={{ 
                      fontFamily: 'Norwester', 
                      WebkitTextStroke: '#000000',
                      textShadow: `
                        -1px -1px 0 #000000,
                        1px -1px 0 #000000,
                        -1px 1px 0 #000000,
                        1px 1px 0 #000000,
                        2px 2px 4px rgba(0,0,0,0.5)
                      `
                    }}
                  >
                    1550+
                  </div>
                  <div 
                    className="text-2xl font-bold text-white drop-shadow-sm" 
                    style={{ 
                      WebkitTextStroke: '#000000',
                      textShadow: `
                        -1px -1px 0 #000000,
                        1px -1px 0 #000000,
                        -1px 1px 0 #000000,
                        1px 1px 0 #000000,
                        1px 1px 2px rgba(0,0,0,0.5)
                      `
                    }}
                  >
                    TARGET SCORE
                  </div>
                  <div 
                    className="text-lg text-white mt-2 font-semibold drop-shadow-sm" 
                    style={{ 
                      WebkitTextStroke: '#000000',
                      textShadow: `
                        -1px -1px 0 #000000,
                        1px -1px 0 #000000,
                        -1px 1px 0 #000000,
                        1px 1px 0 #000000,
                        1px 1px 2px rgba(0,0,0,0.5)
                      `
                    }}
                  >
                    99th Percentile
                  </div>
                </div>
                
                {/* Animated Ring */}
                <div className="absolute inset-4 border-4 border-blue-300 border-opacity-30 rounded-full"></div>
                <div className="absolute inset-8 border-2 border-white border-opacity-20 rounded-full"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                ACHIEVABLE
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                TOP 1%
              </div>
            </div>

            {/* SAT Sections Breakdown */}
            <div className="w-full max-w-sm space-y-4">
              <h4 className="text-center text-gray-700 font-semibold text-lg mb-6">Section Targets</h4>
              
              {/* Math Section */}
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div>
                  <div className="font-semibold text-gray-800">Math</div>
                  <div className="text-sm text-gray-600">Problem Solving & Data Analysis</div>
                </div>
                <div className="text-2xl font-bold text-blue-600">780+</div>
              </div>
              
              {/* Reading & Writing */}
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div>
                  <div className="font-semibold text-gray-800">Reading & Writing</div>
                  <div className="text-sm text-gray-600">Critical Analysis & Expression</div>
                </div>
                <div className="text-2xl font-bold text-green-600">770+</div>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="text-center p-4 bg-gradient-to-b from-blue-500 to-blue-600 text-white rounded-lg">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Norwester' }}>99%</div>
                <div className="text-sm">Percentile</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-green-500 to-green-600 text-white rounded-lg">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Norwester' }}>TOP</div>
                <div className="text-sm">Universities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProveYourself