import React from 'react';

const LogoComponent = ({ 
  src,
  alt = "Logo", 
  size = 200, 
  className = "" 
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        // If src is provided, render image with glow effect
        <img 
          src={src}
          alt={alt}
          className="rounded-full bg-white p-2"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            objectFit: 'cover',
            filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 40px rgba(59, 130, 246, 0.2))',
            boxShadow: `
              0 0 60px rgba(59, 130, 246, 0.3),
              0 0 120px rgba(59, 130, 246, 0.15),
              0 20px 40px rgba(0, 0, 0, 0.1)
            `
          }}
        />
      ) : (
        // Fallback to text-based logo if no src provided
        <div 
          className="relative flex items-center justify-center bg-white rounded-full shadow-2xl"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            boxShadow: `
              0 0 60px rgba(59, 130, 246, 0.3),
              0 0 120px rgba(59, 130, 246, 0.15),
              0 20px 40px rgba(0, 0, 0, 0.1)
            `
          }}
        >
          {/* Subtle gradient overlay */}
          <div 
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
            }}
          />
          
          {/* Logo text */}
          <span 
            className="relative z-10 font-light text-gray-700 tracking-wide"
            style={{ fontSize: `${size * 0.12}px` }}
          >
            Logo
          </span>
        </div>
      )}
    </div>
  );
};

export default LogoComponent;