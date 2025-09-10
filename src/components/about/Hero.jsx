'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {Play} from 'lucide-react';
import {useState, useRef} from 'react';

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };
  return (
    <section className="h-96 md:h-full lg:h-[500px] flex justify-center items-center flex-col lg:flex-row overflow-hidden">
      {/* Left Column - Black with dotted pattern like footer */}
      <div className="w-full h-96 md:h-full lg:w-1/2 bg-black text-white relative overflow-hidden flex flex-col justify-center px-6 sm:px-12 lg:pl-48 py-8 lg:py-0">
        {/* Background Pattern - same as footer */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 2px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Chevron Arrow Pattern - Left Side - Hidden on mobile */}
        <div className="hidden lg:block absolute left-6 top-1/2 transform -translate-y-1/2">
          <div className="flex flex-col space-y-1">
            {Array.from({length: 8}, (_, i) => (
              <div
                key={i}
                className="text-blue-400 text-xl font-bold transform rotate-90 opacity-80"
              >
                &gt;
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-full lg:max-w-lg text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-wider font-norwester mb-4 lg:mb-6 text-blue-400">
            Disclaimer
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 lg:mb-6 lg:pr-4">
            Our About Us page is long. Some people don't like reading anymore.
            If you're one of them, here's a cat video instead.
          </p>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded uppercase tracking-wide font-norwester">
            WATCH VIDEO
          </Button>
        </div>
      </div>

      {/* Right Column - Blue with play button */}
      <div className="w-full h-96 sm:h-full lg:w-1/2 bg-blue-600 flex items-center justify-center relative py-8 lg:py-0">
        {/* Play Button */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 shadow-lg">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-auto object-fill cursor-pointer"
            onClick={handleVideoClick}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            controls={showControls}
            preload="metadata"
            poster="/video-thumbnail.jpg" // Optional: Add a poster image
          >
            <source src="/cat-video.mp4" type="video/mp4" />
            {/* <source src="/your-video.webm" type="video/webm" /> */}
            Your browser does not support the video tag.
          </video>

          {/* Play Button Overlay - Only show when video is not playing */}
          {!isPlaying && (
            <div
              className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:scale-105 hover:bg-opacity-100 transition-all duration-300 shadow-lg"
              onClick={togglePlay}
            >
              <Play
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600 ml-0.5"
                fill="currentColor"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
