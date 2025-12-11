import React from 'react';
import './emphorus-credit.css';
import { EmphorusLogo } from './EmphorusLogo';

interface EmphorusCreditProps {
  /**
   * The URL to open when the component is clicked
   * @default "https://www.emphorus.in"
   */
  url?: string;
  /**
   * Custom text to display (default: "Crafted with ♥ by")
   */
  text?: string;
  /**
   * Show the Emphorus logo (default: true)
   */
  showLogo?: boolean;
  /**
   * Logo width in pixels (default: 50)
   */
  logoWidth?: number;
  /**
   * Logo height in pixels (default: 16)
   */
  logoHeight?: number;
}

export const EmphorusCredit: React.FC<EmphorusCreditProps> = ({ 
  url = "https://www.emphorus.in",
  text = "Crafted with",
  showLogo = false,
  logoWidth = 50,
  logoHeight = 16
}) => {
  return (
    <div className="emphorus-credit-container">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="emphorus-credit-link"
      >
        <div className="emphorus-credit-wrapper">
          <div className="emphorus-credit-text">
            {text} <span className="emphorus-heart">♥</span> by{' '}
            {showLogo ? (
              <span className="emphorus-logo-container">
                <EmphorusLogo width={logoWidth} height={logoHeight} className="emphorus-logo" />
              </span>
            ) : (
              <span className="emphorus-brand">Emphorus</span>
            )}
          </div>
          <div className="emphorus-motionblur">
            <div className="emphorus-motion-box">
              <div className="emphorus-fireball-core"></div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default EmphorusCredit;

