import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

// ── Constants ─────────────────────────────────────────────────────────────
const CIRCLE_TEXT  = 'DARPAN NEMADE · AI ENGINEER · ML DEVELOPER · DATA SCIENTIST · ';
const RADIUS       = 115;   // SVG units
const FONT_SIZE    = 11.5;
const CENTER       = 160;   // viewBox centre
const VIEWBOX      = 320;

// Build per-character data once
function buildChars(text) {
  const chars = [];
  const total = text.length;
  for (let i = 0; i < total; i++) {
    chars.push({
      char:   text[i],
      angle:  (i / total) * 360,   // degrees
      index:  i,
      total,
    });
  }
  return chars;
}

const CHARS = buildChars(CIRCLE_TEXT);

// ── The animated SVG ring ─────────────────────────────────────────────────
function CircularRing({ phase }) {
  // phase: 'idle' | 'hover' | 'exploding'
  const groupRef   = useRef(null);
  const textRefs   = useRef([]);
  const spinRef    = useRef(0);         // current rotation degrees
  const rafRef     = useRef(null);
  const phaseRef   = useRef(phase);
  phaseRef.current = phase;

  // Continuous slow spin + wave on hover
  useEffect(() => {
    let frame = 0;
    const loop = () => {
      frame++;
      if (phaseRef.current === 'exploding') {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Spin speed
      const speed = phaseRef.current === 'hover' ? 1.4 : 0.45;
      spinRef.current += speed;

      const g = groupRef.current;
      if (g) g.setAttribute('transform', `rotate(${spinRef.current}, ${CENTER}, ${CENTER})`);

      // Wave distortion per char on hover
      textRefs.current.forEach((el, i) => {
        if (!el) return;
        if (phaseRef.current === 'hover') {
          const wave   = Math.sin(frame * 0.06 + i * 0.4) * 6;
          const scale  = 1 + Math.sin(frame * 0.08 + i * 0.5) * 0.22;
          el.setAttribute('dy', wave);
          el.setAttribute('font-size', FONT_SIZE * scale);
          el.setAttribute('opacity', 0.5 + Math.abs(Math.sin(frame * 0.06 + i * 0.3)) * 0.5);
        } else {
          el.setAttribute('dy', 0);
          el.setAttribute('font-size', FONT_SIZE);
          el.setAttribute('opacity', 0.65);
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <g ref={groupRef}>
      {CHARS.map(({ char, angle, index }) => {
        const rad = (angle - 90) * (Math.PI / 180);
        const x   = CENTER + RADIUS * Math.cos(rad);
        const y   = CENTER + RADIUS * Math.sin(rad);
        const rot = angle;   // each char rotates with its position

        return (
          <text
            key={index}
            ref={el => { textRefs.current[index] = el; }}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={FONT_SIZE}
            fontFamily='"baneta", sans-serif'
            fontWeight="700"
            letterSpacing="0.08em"
            fill="white"
            opacity="0.65"
            transform={`rotate(${rot}, ${x}, ${y})`}
            style={{ userSelect: 'none' }}
          >
            {char}
          </text>
        );
      })}
    </g>
  );
}

// ── Main splash component ─────────────────────────────────────────────────
export default function IntroSplash({ onEnter }) {
  const [phase, setPhase]       = useState('idle');   // idle | hover | exploding | done
  const splashRef               = useRef(null);
  const circleRef               = useRef(null);
  const logoRef                 = useRef(null);
  const hintRef                 = useRef(null);
  const overlayRef              = useRef(null);

  // Entrance animation on mount
  useEffect(() => {
    const tl = gsap.timeline();
    tl
      .fromTo(circleRef.current,
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.4)' }
      )
      .fromTo(logoRef.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' },
        '-=0.7'
      )
      .fromTo(hintRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );

    // Subtle pulsing hint
    gsap.to(hintRef.current, {
      opacity: 0.35,
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.5,
    });

    // Key listener
    const onKey = e => {
      if (e.code === 'Space' || e.code === 'Enter') triggerExplode();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const triggerExplode = useCallback(() => {
    if (phase === 'exploding' || phase === 'done') return;
    setPhase('exploding');

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('done');
        onEnter?.();
      }
    });

    // 1. Ring expands outward and blurs
    tl.to(circleRef.current, {
      scale: 4,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.in',
    }, 0)

    // 2. Logo punches forward then vanishes
    .to(logoRef.current, {
      scale: 2.5,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in',
    }, 0)

    // 3. White flash overlay fills screen
    .fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: 'power2.in' },
      0.25
    )

    // 4. Overlay fades out revealing portfolio
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.55,
      ease: 'power2.out',
    }, 0.55)

    // 5. Whole splash exits
    .to(splashRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
    }, 0.65);

  }, [phase, onEnter]);

  if (phase === 'done') return null;

  return (
    <div
      ref={splashRef}
      className="intro-splash"
      onClick={triggerExplode}
      onMouseEnter={() => phase === 'idle' && setPhase('hover')}
      onMouseLeave={() => phase === 'hover' && setPhase('idle')}
    >
      {/* White flash overlay */}
      <div ref={overlayRef} className="intro-flash" />

      {/* Circular SVG ring */}
      <div ref={circleRef} className="intro-ring-wrap">
        <svg
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          width={VIEWBOX}
          height={VIEWBOX}
          style={{ overflow: 'visible' }}
        >
          {/* Faint circle guide track */}
          <circle
            cx={CENTER} cy={CENTER} r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          {/* Animated characters */}
          <CircularRing phase={phase} />
        </svg>
      </div>

      {/* DN Logo centred */}
      <div ref={logoRef} className="intro-logo">
        <span className="intro-logo-dn">DN</span>
      </div>

      {/* Hint */}
      <p ref={hintRef} className="intro-hint">
        click anywhere to enter &nbsp;·&nbsp; press enter
      </p>
    </div>
  );
}
