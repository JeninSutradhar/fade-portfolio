"use client"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { FluidBackground } from "@/components/fluid-background"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { PremiumLoader } from "@/components/premium-loader"
import { useVideoLoader } from "@/hooks/use-video-loader"

const FadePortfolio = () => {
  const [showContent, setShowContent] = useState(false)
  const { isLoading } = useVideoLoader("/hero.mp4")

  const handleLoadComplete = () => {
    setShowContent(true)
  }

  return (
    <>
      {/* Premium Loader */}
      {(isLoading || !showContent) && (
        <PremiumLoader onLoadComplete={handleLoadComplete} />
      )}

      {/* Main Content */}
      <div
        className={`
          bg-black text-white min-h-screen relative font-[var(--font-plus-jakarta)]
          transition-opacity duration-1000 ease-out
          ${showContent ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* Fluid background only for hero section */}
        <FluidBackground />

        {/* Content */}
        <div className="relative z-10">
          <Navigation />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </>
  )
}

export default FadePortfolio
