"use client"

import type React from "react"
import { ArrowUpRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { SectionSeparator } from "@/components/section-separator"

const projects = [
  {
    id: 1,
    title: "NexusCRM",
    description: "A modern B2B SaaS Customer Relationship Management platform for freelancers and small businesses.",
    category: "SaaS",
    type: "Web App",
    link: "https://NexusCRM.netlify.app",
    image: "/mocks/nexus.png",
  },
  {
    id: 2,
    title: "PurpleRain Techsafe",
    description: "Landing page for PurpleRain Techsafe security solutions.",
    category: "Frontend",
    type: "Landing Page",
    link: "https://purplerain.tech",
    image:
      "/mocks/purplerain.png",
  },
  {
    id: 3,
    title: "Fortifynet Proxy v2",
    description: "A flexible asynchronous proxy server library written in Rust, designed for performance and security.",
    category: "Backend",
    type: "Rust Library",
    link: "https://github.com/JeninSutradhar/fortifynet_proxyortifynet-proxy",
    image:
      "/mocks/fortifynet.png",
  },
  {
    id: 4,
    title: "MomentumCRM",
    description: "A modern B2B SaaS Customer Relationship Management platform with task tracking and analytics.",
    category: "SaaS",
    type: "Web App",
    link: "https://momentumcrm.netlify.app",
    image:
      "/mocks/momentum.png",
  },
  {
    id: 5,
    title: "CypherSec Landing Page",
    description: "A Beautiful Next.js Landing Page",
    category: "UI/UX",
    type: "Next.js",
    link: "https://cyphersec.netlify.app",
    image:
      "/mocks/cyphersec.jpeg",
  },
  {
    id: 6,
    title: "Kryptos",
    description: "Secure Password Wallet built with Go and Fyne for local password management.",
    category: "Desktop",
    type: "Go App",
    link: "https://github.com/JeninSutradhar/kryptos",
    image:
      "/mocks/kryptos.png",
  },
]

export const ProjectsSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [translateX, setTranslateX] = useState(0)
  const animationRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Create multiple copies for infinite scroll
  const allProjects = [...projects, ...projects, ...projects]
  const cardWidth = 350 + 20 // Reduced card width + gap for better fit
  const totalWidth = cardWidth * projects.length

  // Animation loop using requestAnimationFrame
  useEffect(() => {
    const animate = () => {
      setTranslateX((prev) => {
        const newX = prev - 1 // Move 1px per frame (adjust speed here)
        // Reset when we've moved one full set
        return newX <= -totalWidth ? 0 : newX
      })
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [totalWidth])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    })
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (hoveredCard) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        })
      }
    }

    if (hoveredCard) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
    }
  }, [hoveredCard])

  return (
    <>
      <section id="projects" className="py-20">
        <div className="w-full px-6">
          <div className="text-center mb-8">
            <span className="text-gray-400 text-lg italic font-light font-[var(--font-playfair)]">-- Projects --</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-center mb-20 leading-tight font-[var(--font-plus-jakarta)]">
            My Latest <span className="italic font-normal text-gray-400 font-[var(--font-playfair)]">Projects</span>
          </h2>

          {/* Infinite Scrolling Container */}
          <div className="overflow-hidden w-full" ref={containerRef}>
            <div
              className="flex space-x-5 will-change-transform"
              style={{
                transform: `translateX(${translateX}px)`,
                width: `${cardWidth * allProjects.length}px`,
              }}
            >
              {allProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="flex-shrink-0 w-[350px] h-[280px] group cursor-pointer relative"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setHoveredCard(project.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => project.link && window.open(project.link, '_blank')}
                >
                  <div className="project-card-landscape bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:scale-105 will-change-transform shadow-xl hover:shadow-2xl hover:shadow-white/10 relative">
                    {/* Project Image - Full Card */}
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Project Info - Overlaid on Image */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-white font-medium font-[var(--font-plus-jakarta)] bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
                            {project.category}
                          </span>
                          <span className="text-xs text-gray-300 font-medium font-[var(--font-plus-jakarta)] bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                            {project.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-light text-white font-[var(--font-plus-jakarta)] mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                          {project.description}
                        </p>
                        <div className="text-xs text-gray-400">
                          {project.link && new URL(project.link).hostname}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cursor Following Button */}
            {hoveredCard && (
              <div
                className="fixed pointer-events-none z-50"
                style={{
                  left: mousePosition.x,
                  top: mousePosition.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <button className="bg-white/40 backdrop-blur-md rounded-full px-6 py-3 text-white font-medium flex items-center space-x-2 border border-white/50 button-glow shadow-2xl">
                  <span className="text-sm">View Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* View All Projects Link */}
          <div className="text-center mt-16">
            <a
              href="/projects"
              className="group text-gray-400 hover:text-white transition-colors flex items-center mx-auto text-lg font-medium font-[var(--font-plus-jakarta)]"
            >
              View All Projects
              <ArrowUpRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Beautiful separator after Projects section */}
      <SectionSeparator />
    </>
  )
}
