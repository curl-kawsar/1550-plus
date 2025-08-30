'use client';
import React, {useEffect} from 'react';
import {Check} from 'lucide-react';
// import {URL} from 'next/dist/compiled/@edge-runtime/primitives/url';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import './landing.css';

const Unlock = () => {
  useEffect(() => {
    // Load Norwester font dynamically
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Norwester&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col lg:flex-row">
      {/* Right Side - Full Height Image (Top on mobile, Right on desktop) */}
      <div className="w-full lg:w-1/2 h-64 lg:h-screen relative overflow-hidden lg:order-2">
        {/* Image Placeholder */}
        <div className="relative z-10 h-full flex items-center justify-center p-8">
          {/*  */}
          {/* Uncomment and replace with your actual image */}
          <Image
            src="/bar-chart.png" // replace with your actual image path
            alt="SAT Score Chart"
            fill
            className="object-cover w-1/2 h-full"
            priority
          />
          */
        </div>
      </div>

      {/* Left Side - White Background with Text & Checklist (Bottom on mobile, Left on desktop) */}
      <div className="w-full lg:w-1/2 bg-white flex items-center px-6 py-8 lg:px-8 xl:px-16 lg:order-1">
        <div className="max-w-lg space-y-6 lg:space-y-8 w-full">
          <h2 className="text-3xl lg:text-4xl xl:text-6xl font-bold text-blue-500 tracking-wider text-center lg:text-left">
            NEVER SETTLE
          </h2>
          <p className="text-gray-600 text-base lg:text-lg xl:text-xl leading-relaxed text-center lg:text-left">
            1550+ isn't just a score. It's proof you refuse to settle for less
            than your true potential. Your goals are worth fighting for, no
            matter what they are.
          </p>

          <ul className="space-y-3 lg:space-y-4">
            {[
              'Entry into Top Colleges',
              'Athletic Scholarships',
              'Merit Scholarships',
              'Bragging Rights',
              'Confidence',
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 md:gap-4 text-[#141C42] font-semibold text-base md:text-lg"
              >
                <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="tracking-wide">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Unlock;
