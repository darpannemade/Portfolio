import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const NeonButton = ({
  children,
  onClick,
  className = '',
  glowColor = '#ffffff',
  type = 'button',
  disabled = false,
  animationDuration = 0.4,
  glowIntensity = 'medium',
}) => {
  const buttonRef = useRef(null);
  const fillRef = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const fill = fillRef.current;
    const border = borderRef.current;
    if (!button || !fill || !border) return;

    // Initial state
    gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(border, { strokeDashoffset: border.getTotalLength?.() || 300 });

    const enter = () => {
      if (disabled) return;
      // Liquid fill sweeps from left
      gsap.to(fill, {
        scaleX: 1,
        duration: animationDuration,
        ease: 'power3.out',
      });
      // Border draws itself
      if (border.getTotalLength) {
        const len = border.getTotalLength();
        gsap.fromTo(border,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: animationDuration * 1.2, ease: 'power2.out' }
        );
      }
      // Text glow
      gsap.to(button.querySelector('.nb-text'), {
        color: '#000',
        textShadow: 'none',
        duration: animationDuration * 0.6,
      });
    };

    const leave = () => {
      gsap.to(fill, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: animationDuration * 0.8,
        ease: 'power3.in',
      });
      if (border.getTotalLength) {
        const len = border.getTotalLength();
        gsap.to(border, {
          strokeDashoffset: len,
          duration: animationDuration * 0.6,
          ease: 'power2.in',
        });
      }
      gsap.to(button.querySelector('.nb-text'), {
        color: '#fff',
        duration: animationDuration * 0.5,
      });
    };

    const down = () => !disabled && gsap.to(button, { scale: 0.95, duration: 0.1 });
    const up = () => !disabled && gsap.to(button, { scale: 1, duration: 0.2, ease: 'back.out(2)' });

    button.addEventListener('mouseenter', enter);
    button.addEventListener('mouseleave', leave);
    button.addEventListener('mousedown', down);
    button.addEventListener('mouseup', up);

    return () => {
      button.removeEventListener('mouseenter', enter);
      button.removeEventListener('mouseleave', leave);
      button.removeEventListener('mousedown', down);
      button.removeEventListener('mouseup', up);
      gsap.killTweensOf([button, fill, border]);
    };
  }, [glowColor, animationDuration, disabled, glowIntensity]);

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`neon-button ${className}`}
      style={{
        position: 'relative',
        background: 'transparent',
        borderRadius: '10px',
        padding: '11px 26px',
        color: 'white',
        fontSize: '15px',
        fontWeight: '500',
        cursor: disabled ? 'not-allowed' : 'pointer',
        overflow: 'hidden',
        fontFamily: 'inherit',
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0',
      }}
    >
      {/* SVG border that draws itself */}
      <svg
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none', overflow: 'visible',
        }}
      >
        <rect
          ref={borderRef}
          x="1" y="1"
          width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx="9"
          fill="none"
          stroke={glowColor}
          strokeWidth="1.5"
          style={{
            filter: `drop-shadow(0 0 4px ${glowColor})`,
            strokeDasharray: 300,
            strokeDashoffset: 300,
          }}
        />
      </svg>

      {/* Liquid fill layer */}
      <div
        ref={fillRef}
        style={{
          position: 'absolute', inset: 0,
          background: `${glowColor}`,
          borderRadius: '9px',
          pointerEvents: 'none',
        }}
      />

      {/* Text */}
      <span className="nb-text" style={{ position: 'relative', zIndex: 1, color: 'white', transition: 'none' }}>
        {children}
      </span>
    </button>
  );
};

export default NeonButton;
