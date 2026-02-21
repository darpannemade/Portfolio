import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const BackToTopButton = () => {
  const btnRef = useRef(null);
  const ringRef = useRef(null);
  const arrowRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Track scroll: show after 20%, update ring progress
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(pct);
      setVisible(pct > 0.08);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate in/out
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    if (visible) {
      gsap.to(btn, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(2)' });
    } else {
      gsap.to(btn, { opacity: 0, scale: 0.6, y: 20, duration: 0.3, ease: 'power2.in' });
    }
  }, [visible]);

  // Hover: arrow bounces up
  const onEnter = () => gsap.to(arrowRef.current, { y: -3, duration: 0.25, ease: 'power2.out', yoyo: true, repeat: -1 });
  const onLeave = () => { gsap.killTweensOf(arrowRef.current); gsap.to(arrowRef.current, { y: 0, duration: 0.2 }); };

  const circumference = 2 * Math.PI * 20; // r=20
  const strokeDash = circumference;
  const strokeOffset = circumference * (1 - progress);

  return (
    <button
      ref={btnRef}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.12)',
        cursor: 'pointer',
        opacity: 0,
        scale: 0.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        padding: 0,
      }}
    >
      {/* Progress ring SVG */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
        viewBox="0 0 48 48"
      >
        {/* Background ring */}
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        {/* Progress ring */}
        <circle
          ref={ringRef}
          cx="24" cy="24" r="20"
          fill="none"
          stroke="rgb(255,187,0)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={strokeDash}
          strokeDashoffset={strokeOffset}
          style={{ transition: 'stroke-dashoffset 0.2s ease' }}
        />
      </svg>

      {/* Arrow icon */}
      <span ref={arrowRef} style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 12V4M4 8l4-4 4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  );
};

export default BackToTopButton;
