'use client';
import React, {useEffect} from 'react';

import {Check} from 'lucide-react';
// import {URL} from 'next/dist/compiled/@edge-runtime/primitives/url';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import './landing.css';

const ProveYourself = () => {
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
    <section className="hero-image py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[100%]">
        <div className="flex items-center h-[100%] lg:ml-[5rem]">
          {/* Left Side - Content */}
          <div className="lg:w-1/2 space-y-6">
            {/* Main Heading */}
            <h2
              className="text-9xl sm:text-7xl md:text-9xl lg:text-[10rem] font-bold text-white leading-tight"
              style={{fontFamily: 'Norwester'}}
            >
              1550+
            </h2>

            {/* Description */}
            <p
              className="text-3xl ml-5 text-white leading-relaxed"
              style={{fontFamily: 'Norwester'}}
            >
              It’s not just a score
            </p>
            <Link href="/register">
              <Button className="login-gradient-btn px-10 mt-5 ml-5 text-white hover:scale-105 transition-all duration-200">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProveYourself;
