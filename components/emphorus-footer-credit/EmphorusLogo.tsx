import React from 'react';

interface EmphorusLogoProps {
  /**
   * Width of the logo in pixels
   * @default 60
   */
  width?: number;
  /**
   * Height of the logo in pixels
   * @default 20
   */
  height?: number;
  /**
   * Custom className for styling
   */
  className?: string;
}

export const EmphorusLogo: React.FC<EmphorusLogoProps> = ({ 
  width = 60, 
  height = 20,
  className = ''
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 512 512" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Emphorus Logo"
    >
      <defs>
        <linearGradient id="emphorus-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a5568" />
          <stop offset="20%" stopColor="#6b7280" />
          <stop offset="40%" stopColor="#8b7a8b" />
          <stop offset="60%" stopColor="#b88a8a" />
          <stop offset="80%" stopColor="#d4958d" />
          <stop offset="100%" stopColor="#e8a798" />
        </linearGradient>
      </defs>
      
      {/* Hexagonal shape */}
      <path 
        d="M256 50 L406 140 L406 320 L256 410 L106 320 L106 140 Z" 
        fill="url(#emphorus-logo-gradient)" 
        opacity="0.2"
        className="emphorus-logo-bg"
      />
      
      {/* Main hexagon outline */}
      <path 
        d="M256 80 L380 150 L380 290 L256 360 L132 290 L132 150 Z" 
        stroke="url(#emphorus-logo-gradient)" 
        strokeWidth="16" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="emphorus-logo-outline"
      />
      
      {/* Inner diamond/gem */}
      <path 
        d="M256 220 L290 256 L256 292 L222 256 Z" 
        fill="url(#emphorus-logo-gradient)"
        className="emphorus-logo-gem"
      />
      
      {/* Bottom stem connecting to base */}
      <path 
        d="M256 292 L256 340" 
        stroke="url(#emphorus-logo-gradient)" 
        strokeWidth="12" 
        strokeLinecap="round"
        className="emphorus-logo-stem"
      />
    </svg>
  );
};

export default EmphorusLogo;

