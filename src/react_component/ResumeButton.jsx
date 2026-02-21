import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function ResumeButton({ onClick }) {
  const btnRef    = useRef(null);
  const shimRef   = useRef(null);
  const arrowRef  = useRef(null);
  const borderRef = useRef(null);

  useEffect(() => {
    const btn    = btnRef.current;
    const shim   = shimRef.current;
    const arrow  = arrowRef.current;
    const border = borderRef.current;
    if (!btn || !border) return;

    // Continuously travelling dashed border
    const len = border.getTotalLength ? border.getTotalLength() : 320;
    gsap.set(border, {
      strokeDasharray: `${len * 0.12} ${len * 0.88}`,
      strokeDashoffset: 0,
    });
    const dashTween = gsap.to(border, {
      strokeDashoffset: -len,
      duration: 3.5,
      ease: 'none',
      repeat: -1,
    });

    gsap.set(shim,  { x: '-120%' });
    gsap.set(arrow, { y: 0 });

    const tl = gsap.timeline({ paused: true });
    tl
      .to(btn,   { background: 'rgba(255,255,255,0.09)', borderColor: 'rgba(255,255,255,0.3)', duration: 0.3, ease: 'power2.out' }, 0)
      .fromTo(shim,
        { x: '-120%', opacity: 0.4 },
        { x:  '220%', opacity: 0, duration: 0.55, ease: 'power2.out' }, 0.05)
      .to(arrow, { y: 4, repeat: -1, yoyo: true, duration: 0.45, ease: 'sine.inOut' }, 0.1);

    const enter = () => tl.play();
    const leave = () => {
      tl.pause();
      gsap.killTweensOf(arrow);
      gsap.to(btn,   { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)', duration: 0.25 });
      gsap.to(arrow, { y: 0, duration: 0.2 });
    };
    const down = () => gsap.to(btn, { scale: 0.96, duration: 0.1 });
    const up   = () => gsap.to(btn, { scale: 1, duration: 0.28, ease: 'back.out(2)' });

    btn.addEventListener('mouseenter', enter);
    btn.addEventListener('mouseleave', leave);
    btn.addEventListener('mousedown',  down);
    btn.addEventListener('mouseup',    up);
    return () => {
      btn.removeEventListener('mouseenter', enter);
      btn.removeEventListener('mouseleave', leave);
      btn.removeEventListener('mousedown',  down);
      btn.removeEventListener('mouseup',    up);
      dashTween.kill();
      gsap.killTweensOf([btn, shim, arrow]);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className="resume-btn"
    >
      {/* Travelling dashed border SVG */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'visible' }}>
        <rect
          ref={borderRef}
          x="1" y="1"
          width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx="12"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1.2"
        />
      </svg>

      {/* Shimmer on hover */}
      <div ref={shimRef} className="resume-btn-shim" />

      {/* PDF icon */}
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="resume-btn-pdf">
        <path d="M3 1.5h6l3 3V13a.5.5 0 0 1-.5.5h-8A.5.5 0 0 1 2.5 13V2a.5.5 0 0 1 .5-.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
        <path d="M9 1.5V4.5H12" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
        <path d="M5 7.5h5M5 9.5h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>

      <span className="resume-btn-label">Download Resume</span>

      {/* Bouncing down arrow */}
      <span ref={arrowRef} className="resume-btn-arrow">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M6.5 2v8M3.5 7.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
  );
}
