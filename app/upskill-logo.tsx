'use client'

import { ArrowUpRight } from "lucide-react"

interface UpskillLogoProps {
  size?: "sm" | "md" | "lg"
  showTagline?: boolean
}

export function UpskillLogo({ size = "md", showTagline = false }: UpskillLogoProps) {
  const sizes = {
    sm: {
      container: "h-10",
      mainText: "text-lg",
      subText: "text-[8px]",
      taglineText: "text-[7px]",
      iconSize: "h-5 w-5",
      badgeSize: "h-6 w-6",
      spacing: "gap-2",
    },
    md: {
      container: "h-16",
      mainText: "text-3xl",
      subText: "text-[10px]",
      taglineText: "text-[8px]",
      iconSize: "h-7 w-7",
      badgeSize: "h-8 w-8",
      spacing: "gap-3",
    },
    lg: {
      container: "h-24",
      mainText: "text-4xl",
      subText: "text-[12px]",
      taglineText: "text-[9px]",
      iconSize: "h-9 w-9",
      badgeSize: "h-10 w-10",
      spacing: "gap-4",
    },
  }

  const currentSize = sizes[size]

  return (
    <>
      <div className={`flex items-center ${currentSize.spacing} group relative logo-container`}>
        {/* Badge/Icon Container */}
        <div className={`relative ${currentSize.badgeSize} shrink-0`}>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 animate-logo-badge-in"></div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
          <ArrowUpRight 
            className={`absolute inset-0 m-auto ${currentSize.iconSize} text-white animate-logo-icon-in group-hover:scale-110 transition-transform duration-300`}
            strokeWidth={2.5}
            fill="white"
          />
          {/* Animated pulse ring */}
          <div className="absolute inset-0 rounded-xl border-2 border-primary/30 animate-pulse-ring opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Text Container */}
        <div className="flex flex-col justify-center">
          <div className={`flex items-baseline ${currentSize.spacing} mb-0.5`}>
            <span 
              className={`font-extrabold ${currentSize.mainText} tracking-tight animate-logo-text-in logo-main-text`}
              style={{
                background: 'linear-gradient(135deg, oklch(0.35 0.08 247) 0%, oklch(0.42 0.12 160) 50%, oklch(0.38 0.1 200) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              UpSkill
            </span>
          </div>
          <div className="flex flex-col">
            <span 
              className={`font-bold uppercase tracking-widest ${currentSize.subText} animate-logo-subtitle-in`}
              style={{
                color: 'oklch(0.35 0.08 247 / 0.75)',
                letterSpacing: '0.15em',
              }}
            >
              WORKFORCE PRIVATE LIMITED
            </span>
            {showTagline && (
              <span 
                className={`font-medium uppercase tracking-wide ${currentSize.taglineText} animate-logo-tagline-in mt-1`}
                style={{
                  color: 'oklch(0.35 0.08 247 / 0.6)',
                  letterSpacing: '0.08em',
                }}
              >
                ELEVATE YOUR TEAM AND EMPOWER THEM TO SHINE
              </span>
            )}
          </div>
        </div>

        {/* Decorative accent line */}
        <div className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary via-primary/60 to-transparent w-0 group-hover:w-full transition-all duration-500 animate-logo-accent-in"></div>
      </div>
      
      <style jsx>{`
        @keyframes logo-badge-in {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes logo-icon-in {
          from {
            opacity: 0;
            transform: translate(-8px, 8px) scale(0.3);
          }
          to {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }
        
        @keyframes logo-text-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
            filter: blur(4px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
            filter: blur(0);
          }
        }
        
        @keyframes logo-subtitle-in {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 0.75;
            transform: translateY(0);
          }
        }
        
        @keyframes logo-tagline-in {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 0.6;
            transform: translateY(0);
          }
        }
        
        @keyframes logo-accent-in {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        
        .animate-logo-badge-in {
          animation: logo-badge-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-logo-icon-in {
          animation: logo-icon-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
          opacity: 0;
        }
        
        .animate-logo-text-in {
          animation: logo-text-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
          opacity: 0;
        }
        
        .animate-logo-subtitle-in {
          animation: logo-subtitle-in 0.6s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        .animate-logo-tagline-in {
          animation: logo-tagline-in 0.6s ease-out 0.8s forwards;
          opacity: 0;
        }
        
        .animate-logo-accent-in {
          animation: logo-accent-in 1s ease-out 1s forwards;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-out infinite;
        }
        
        .logo-container {
          position: relative;
          padding-bottom: 4px;
        }
        
        .logo-main-text {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          font-feature-settings: "kern" 1;
          letter-spacing: -0.02em;
        }
        
        .group:hover .logo-main-text {
          background: linear-gradient(135deg, oklch(0.38 0.1 200) 0%, oklch(0.45 0.12 160) 50%, oklch(0.42 0.11 180) 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  )
}
