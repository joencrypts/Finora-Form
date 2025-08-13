import React from 'react';

interface FinoraLogoProps {
  className?: string;
}

const FinoraLogo = ({ className = "h-8" }: FinoraLogoProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
        FINORA
      </div>
    </div>
  );
};

export default FinoraLogo;