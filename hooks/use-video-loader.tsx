"use client"

import { useEffect, useState } from "react"

export const useVideoLoader = (videoSrc: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let loadingComplete = false

    // Create video element for preloading
    const video = document.createElement('video')
    video.preload = 'metadata' // Changed from 'auto' to 'metadata' for faster loading
    video.src = videoSrc
    video.muted = true

    const handleCanPlayThrough = () => {
      if (!loadingComplete) {
        loadingComplete = true
        setIsLoaded(true)
        setIsLoading(false)
      }
    }

    const handleError = () => {
      setError('Failed to load video')
      setIsLoading(false)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    // Also check if video is already cached or has enough data
    const handleLoadedData = () => {
      if (video.readyState >= 2) { // HAVE_CURRENT_DATA - enough to start playing
        handleCanPlayThrough()
      }
    }

    video.addEventListener('canplaythrough', handleCanPlayThrough)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('loadstart', handleLoadStart)

    // Start loading
    video.load()

    // Fallback timeout - don't wait forever
    const fallbackTimeout = setTimeout(() => {
      if (!loadingComplete) {
        loadingComplete = true
        setIsLoading(false)
        setIsLoaded(true)
      }
    }, 5000) // 5 second max wait (reduced from 8)

    return () => {
      clearTimeout(fallbackTimeout)
      video.removeEventListener('canplaythrough', handleCanPlayThrough)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadstart', handleLoadStart)
    }
  }, [videoSrc])

  return { isLoading, isLoaded, error }
}
