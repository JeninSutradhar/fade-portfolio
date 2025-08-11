"use client"

import { useEffect, useState } from "react"

interface PremiumLoaderProps {
  onLoadComplete: () => void
}

export const PremiumLoader = ({ onLoadComplete }: PremiumLoaderProps) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Simulate loading progress with realistic timing
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setIsComplete(true)
          
          // Start fade out after a brief pause
          setTimeout(() => {
            setShowLoader(false)
            // Call onLoadComplete after fade animation
            setTimeout(onLoadComplete, 800)
          }, 500)
          
          return 100
        }
        
        // Realistic loading curve - faster at start, slower near end
        const increment = prev < 60 ? Math.random() * 15 + 5 : Math.random() * 3 + 1
        return Math.min(prev + increment, 100)
      })
    }, 150)

    return () => clearInterval(progressInterval)
  }, [onLoadComplete])

  if (!showLoader) return null

  return (
    <div
      className={`
        fixed inset-0 z-[9999] bg-black flex items-center justify-center
        transition-opacity duration-800 ease-out
        ${isComplete ? 'opacity-0' : 'opacity-100'}
      `}
    >
      {/* MacBook-style progress bar */}
      <div className="w-64">
        {/* Progress bar container */}
        <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
          {/* Progress bar fill */}
          <div
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
