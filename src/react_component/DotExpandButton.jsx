import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const DotExpandButton = ({
  text = "Download Resume",
  onClick,
}) => {
  const btnRef     = useRef(null);
  const fillRef    = useRef(null);
  const arrowRef   = useRef(null);
  const shimmerRef = useRef(null);
  const glowRef    = useRef(null);

  useEffect(() => {
    const btn     = btnRef.current;
    const fill    = fillRef.current;
    const arrow   = arrowRef.current;
    const shimmer = shimmerRef.current;
    const glow    = glowRef.current;
    if (!btn) return;

    gsap.set(fill,    { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(arrow,   { x: -5, opacity: 0 });
    gsap.set(shimmer, { x: '-110%', opacity: 0 });
    gsap.set(glow,    { opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl
      .to(fill,   { scaleX: 1, duration: 0.42, ease: 'power3.out' }, 0)
      .to(arrow,  { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.1)
      .fromTo(shimmer,
        { x: '-110%', opacity: 0.65 },
        { x: '210%',  opacity: 0, duration: 0.5, ease: 'power2.out' },
        0.14
      )
      .to(glow, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0);

    const enter = () => tl.play();
    const leave = () => tl.reverse();
    const down  = () => gsap.to(btn, { scale: 0.96, duration: 0.1 });
    const up    = () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'back.out(2)' });

    btn.addEventListener('mouseenter', enter);
    btn.addEventListener('mouseleave', leave);
    btn.addEventListener('mousedown',  down);
    btn.addEventListener('mouseup',    up);
    return () => {
      btn.removeEventListener('mouseenter', enter);
      btn.removeEventListener('mouseleave', leave);
      btn.removeEventListener('mousedown',  down);
      btn.removeEventListener('mouseup',    up);
      gsap.killTweensOf([btn, fill, arrow, shimmer, glow]);
    };
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {/* Outer glow bloom on hover */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: '-12px',
        borderRadius: '999px',
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        opacity: 0,
      }} />

      <button
        ref={btnRef}
        onClick={onClick}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '13px 24px 13px 20px',
          borderRadius: '999px',
          border: '1px solid rgba(255,255,255,0.14)',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          color: 'rgba(255,255,255,0.85)',
          fontSize: '14px',
          fontWeight: '500',
          letterSpacing: '0.05em',
          fontFamily: '"baneta", sans-serif',
          cursor: 'pointer',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 16px rgba(0,0,0,0.4)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          outline: 'none',
        }}
      >
        {/* Frosted glass hover fill */}
        <div ref={fillRef} style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 'inherit',
          pointerEvents: 'none',
        }} />

        {/* Shimmer */}
        <div ref={shimmerRef} style={{
          position: 'absolute', top: 0, left: 0,
          width: '55%', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
          transform: 'skewX(-18deg)',
          pointerEvents: 'none',
          opacity: 0,
        }} />

        {/* Download icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{ position: 'relative', zIndex: 1, flexShrink: 0, opacity: 0.65 }}>
          <path d="M7 1v8M7 9L4 6.5M7 9l3-2.5M1.5 12.5h11"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Label */}
        <span style={{ position: 'relative', zIndex: 1 }}>{text}</span>

        {/* Arrow slides in on hover */}
        <span ref={arrowRef} style={{
          position: 'relative', zIndex: 1,
          display: 'inline-flex', alignItems: 'center',
          opacity: 0,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 6h9M7.5 2.5l4 3.5-4 3.5"
              stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default DotExpandButton;
