"use client"

import { useState } from "react"

export const FluidBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const handleVideoLoad = () => {
    setVideoLoaded(true)
  }

  return (
    <>
      {/* Video background - only for hero */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`
            absolute w-full h-full object-cover transition-opacity duration-1000
            ${videoLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onCanPlayThrough={handleVideoLoad}
          onLoadedData={handleVideoLoad}
        >
          <source src="/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Black transparent overlay for better text readability */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Fallback background while video loads */}
        <div
          className={`
            absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800
            transition-opacity duration-1000
            ${videoLoaded ? 'opacity-0' : 'opacity-100'}
          `}
        />
      </div>
    </>
  )
}
