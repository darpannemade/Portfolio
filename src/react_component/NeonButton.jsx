// NeonButton.jsx


import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const NeonButton = ({ 
  children, 
  onClick, 
  className = '', 
  glowColor = '#8b5cf6',
  type = 'button',
  disabled = false,
  animationDuration = 0.3,
  glowIntensity = 'medium' // 'low', 'medium', 'high'
}) => {
  const buttonRef = useRef(null);
  const glowRef = useRef(null);

  const glowIntensitySettings = {
    low: {
      initial: { blur: 3, spread: 8, opacity: 0.15 },
      hover: { blur: 8, spread: 15, opacity: 0.25 }
    },
    medium: {
      initial: { blur: 5, spread: 10, opacity: 0.2 },
      hover: { blur: 12, spread: 20, opacity: 0.35 }
    },
    high: {
      initial: { blur: 8, spread: 15, opacity: 0.25 },
      hover: { blur: 15, spread: 25, opacity: 0.45 }
    }
  };

  const settings = glowIntensitySettings[glowIntensity];

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;

    if (!button || !glow) return;

    // Set initial styles
    gsap.set(button, {
      // border: `2px solid ${glowColor}`, // Uncomment this line if you want borders in future projects
      //boxShadow: `0 0 ${settings.initial.blur}px ${glowColor}40, inset 0 0 ${settings.initial.spread}px ${glowColor}20`,
    });

    gsap.set(glow, {
      opacity: 0,
      scale: 0.8,
    });

    // Hover animations
    const handleMouseEnter = () => {
      if (disabled) return;

      // Button glow animation
      gsap.to(button, {
        duration: animationDuration,
        boxShadow: `
          0 0 ${settings.hover.blur}px ${glowColor}99,
          0 0 ${settings.hover.spread}px ${glowColor}66,
          0 0 ${settings.hover.spread + 20}px ${glowColor}33,
          inset 0 0 ${settings.hover.blur}px ${glowColor}33
        `,
        //borderColor: glowColor, // Uncomment this line if using borders // Uncomment this line if using borders
        //ease: "power2.out"
      });

      // Inner glow animation
      gsap.to(glow, {
        duration: animationDuration,
        opacity: 0.3,
        scale: 1,
        ease: "power2.out"
      });

      // Text glow
      gsap.to(button, {
        duration: animationDuration,
        textShadow: `0 0 10px ${glowColor}80`,
        ease: "power2.out"
      });

      // Pulse effect
      gsap.to(button, {
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        boxShadow: `
          0 0 ${settings.hover.blur + 5}px ${glowColor}aa,
          0 0 ${settings.hover.spread + 10}px ${glowColor}77,
          0 0 ${settings.hover.spread + 30}px ${glowColor}44,
          inset 0 0 ${settings.hover.blur}px ${glowColor}33
        `,
        ease: "power2.inOut"
      });
    };

    const handleMouseLeave = () => {
      // Stop all animations
      gsap.killTweensOf(button);
      gsap.killTweensOf(glow);

      // Return to initial state
      gsap.to(button, {
        duration: animationDuration,
        boxShadow: `0 0 ${settings.initial.blur}px ${glowColor}40, inset 0 0 ${settings.initial.spread}px ${glowColor}20`,
        borderColor: glowColor,
        textShadow: 'none',
        ease: "power2.out"
      });

      gsap.to(glow, {
        duration: animationDuration,
        opacity: 0,
        scale: 0.8,
        ease: "power2.out"
      });
    };

    const handleMouseDown = () => {
      if (disabled) return;
      gsap.to(button, {
        duration: 0.1,
        scale: 0.95,
        ease: "power2.out"
      });
    };

    const handleMouseUp = () => {
      if (disabled) return;
      gsap.to(button, {
        duration: 0.2,
        scale: 1,
        ease: "back.out(1.7)"
      });
    };

    // Add event listeners
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
      gsap.killTweensOf(button);
      gsap.killTweensOf(glow);
    };
  }, [glowColor, animationDuration, settings, disabled]);

  const buttonStyle = {
    position: 'relative',
    background: 'transparent',
    borderRadius: '12px',
    padding: '12px 24px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '500',
    cursor: disabled ? 'not-allowed' : 'pointer',
    overflow: 'hidden',
    fontFamily: 'inherit',
    opacity: disabled ? 0.5 : 1,
  };

  const glowStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at center, ${glowColor}20 0%, transparent 70%)`,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`neon-button ${className}`}
      style={buttonStyle}
    >
      <div ref={glowRef} style={glowStyle}></div>
      <span style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </span>
    </button>
  );
};

export default NeonButton;





/////////////////////////////////////////// Original ///////////////////////////////////////////////////////////////

// import { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';

// const NeonButton = ({ 
//   children, 
//   onClick, 
//   className = '', 
//   glowColor = '#8b5cf6',
//   type = 'button',
//   disabled = false,
//   animationDuration = 0.3,
//   glowIntensity = 'medium' // 'low', 'medium', 'high'
// }) => {
//   const buttonRef = useRef(null);
//   const glowRef = useRef(null);

//   const glowIntensitySettings = {
//     low: {
//       initial: { blur: 5, spread: 10, opacity: 0.2 },
//       hover: { blur: 15, spread: 30, opacity: 0.4 }
//     },
//     medium: {
//       initial: { blur: 10, spread: 20, opacity: 0.3 },
//       hover: { blur: 25, spread: 50, opacity: 0.6 }
//     },
//     high: {
//       initial: { blur: 15, spread: 30, opacity: 0.4 },
//       hover: { blur: 35, spread: 70, opacity: 0.8 }
//     }
//   };

//   const settings = glowIntensitySettings[glowIntensity];

//   useEffect(() => {
//     const button = buttonRef.current;
//     const glow = glowRef.current;

//     if (!button || !glow) return;

//     // Set initial styles
//     gsap.set(button, {
//       border: `2px solid ${glowColor}`,
//       boxShadow: `0 0 ${settings.initial.blur}px ${glowColor}40, inset 0 0 ${settings.initial.spread}px ${glowColor}20`,
//     });

//     gsap.set(glow, {
//       opacity: 0,
//       scale: 0.8,
//     });

//     // Hover animations
//     const handleMouseEnter = () => {
//       if (disabled) return;

//       // Button glow animation
//       gsap.to(button, {
//         duration: animationDuration,
//         boxShadow: `
//           0 0 ${settings.hover.blur}px ${glowColor}99,
//           0 0 ${settings.hover.spread}px ${glowColor}66,
//           0 0 ${settings.hover.spread + 20}px ${glowColor}33,
//           inset 0 0 ${settings.hover.blur}px ${glowColor}33
//         `,
//         borderColor: glowColor,
//         ease: "power2.out"
//       });

//       // Inner glow animation
//       gsap.to(glow, {
//         duration: animationDuration,
//         opacity: 0.3,
//         scale: 1,
//         ease: "power2.out"
//       });

//       // Text glow
//       gsap.to(button, {
//         duration: animationDuration,
//         textShadow: `0 0 10px ${glowColor}80`,
//         ease: "power2.out"
//       });

//       // Pulse effect
//       gsap.to(button, {
//         duration: 1.5,
//         repeat: -1,
//         yoyo: true,
//         boxShadow: `
//           0 0 ${settings.hover.blur + 5}px ${glowColor}aa,
//           0 0 ${settings.hover.spread + 10}px ${glowColor}77,
//           0 0 ${settings.hover.spread + 30}px ${glowColor}44,
//           inset 0 0 ${settings.hover.blur}px ${glowColor}33
//         `,
//         ease: "power2.inOut"
//       });
//     };

//     const handleMouseLeave = () => {
//       // Stop all animations
//       gsap.killTweensOf(button);
//       gsap.killTweensOf(glow);

//       // Return to initial state
//       gsap.to(button, {
//         duration: animationDuration,
//         boxShadow: `0 0 ${settings.initial.blur}px ${glowColor}40, inset 0 0 ${settings.initial.spread}px ${glowColor}20`,
//         borderColor: glowColor,
//         textShadow: 'none',
//         ease: "power2.out"
//       });

//       gsap.to(glow, {
//         duration: animationDuration,
//         opacity: 0,
//         scale: 0.8,
//         ease: "power2.out"
//       });
//     };

//     const handleMouseDown = () => {
//       if (disabled) return;
//       gsap.to(button, {
//         duration: 0.1,
//         scale: 0.95,
//         ease: "power2.out"
//       });
//     };

//     const handleMouseUp = () => {
//       if (disabled) return;
//       gsap.to(button, {
//         duration: 0.2,
//         scale: 1,
//         ease: "back.out(1.7)"
//       });
//     };

//     // Add event listeners
//     button.addEventListener('mouseenter', handleMouseEnter);
//     button.addEventListener('mouseleave', handleMouseLeave);
//     button.addEventListener('mousedown', handleMouseDown);
//     button.addEventListener('mouseup', handleMouseUp);

//     // Cleanup
//     return () => {
//       button.removeEventListener('mouseenter', handleMouseEnter);
//       button.removeEventListener('mouseleave', handleMouseLeave);
//       button.removeEventListener('mousedown', handleMouseDown);
//       button.removeEventListener('mouseup', handleMouseUp);
//       gsap.killTweensOf(button);
//       gsap.killTweensOf(glow);
//     };
//   }, [glowColor, animationDuration, settings, disabled]);

//   const buttonStyle = {
//     position: 'relative',
//     background: 'transparent',
//     borderRadius: '12px',
//     padding: '12px 24px',
//     color: 'white',
//     fontSize: '16px',
//     fontWeight: '500',
//     cursor: disabled ? 'not-allowed' : 'pointer',
//     overflow: 'hidden',
//     fontFamily: 'inherit',
//     opacity: disabled ? 0.5 : 1,
//   };

//   const glowStyle = {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: `radial-gradient(circle at center, ${glowColor}20 0%, transparent 70%)`,
//     borderRadius: 'inherit',
//     pointerEvents: 'none',
//   };

//   return (
//     <button
//       ref={buttonRef}
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`neon-button ${className}`}
//       style={buttonStyle}
//     >
//       <div ref={glowRef} style={glowStyle}></div>
//       <span style={{ position: 'relative', zIndex: 1 }}>
//         {children}
//       </span>
//     </button>
//   );
// };

// export default NeonButton;