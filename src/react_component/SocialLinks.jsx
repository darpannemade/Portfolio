import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
  </svg>
);

const GmailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
);

const links = [
  {
    label: 'GitHub',
    handle: '/darpannemade',
    Icon: GithubIcon,
    color: 'rgba(255,255,255,0.9)',
    href: 'https://github.com/darpannemade',
  },
  {
    label: 'LinkedIn',
    handle: 'Connect',
    Icon: LinkedinIcon,
    color: '#58a6ff',
    href: 'https://www.linkedin.com/in/darpan-nemade-4082971b2',
  },
  {
    label: 'Gmail',
    handle: 'Say hello',
    Icon: GmailIcon,
    color: '#ff6b6b',
    href: 'mailto:darpannemade2004@gmail.com',
  },
];

function SocialCard({ item }) {
  const cardRef  = useRef(null);
  const barRef   = useRef(null);
  const iconRef  = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const card  = cardRef.current;
    const bar   = barRef.current;
    const icon  = iconRef.current;
    const arrow = arrowRef.current;
    if (!card) return;

    gsap.set(bar,   { scaleX: 0, transformOrigin: 'left' });
    gsap.set(arrow, { opacity: 0, x: -3, y: 3 });

    const tl = gsap.timeline({ paused: true });
    tl
      .to(card,  { y: -5, duration: 0.3, ease: 'power2.out' }, 0)
      .to(bar,   { scaleX: 1, duration: 0.35, ease: 'power3.out' }, 0)
      .to(icon,  { color: item.color, scale: 1.15, duration: 0.25, ease: 'back.out(2)' }, 0.04)
      .to(arrow, { opacity: 1, x: 0, y: 0, duration: 0.2, ease: 'power2.out' }, 0.1);

    const enter = () => tl.play();
    const leave = () => {
      gsap.to(icon, { color: 'rgba(255,255,255,0.55)', scale: 1, duration: 0.2 });
      tl.reverse();
    };
    const down = () => gsap.to(card, { scale: 0.95, duration: 0.1 });
    const up   = () => gsap.to(card, { scale: 1, duration: 0.25, ease: 'back.out(2)' });

    card.addEventListener('mouseenter', enter);
    card.addEventListener('mouseleave', leave);
    card.addEventListener('mousedown', down);
    card.addEventListener('mouseup', up);
    return () => {
      card.removeEventListener('mouseenter', enter);
      card.removeEventListener('mouseleave', leave);
      card.removeEventListener('mousedown', down);
      card.removeEventListener('mouseup', up);
      gsap.killTweensOf([card, bar, icon, arrow]);
    };
  }, [item.color]);

  return (
    <a
      ref={cardRef}
      href={item.href}
      target={item.href.startsWith('mailto') ? undefined : '_blank'}
      rel="noreferrer"
      className="social-card-link"
    >
      {/* Icon */}
      <span ref={iconRef} className="scl-icon">
        <item.Icon />
      </span>

      {/* Text stack */}
      <span className="scl-text">
        <span className="scl-label">{item.label}</span>
        <span className="scl-handle">{item.handle}</span>
      </span>

      {/* Diagonal arrow */}
      <span ref={arrowRef} className="scl-arrow">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M1 9L9 1M9 1H3.5M9 1v5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </span>

      {/* Animated bottom bar */}
      <span ref={barRef} className="scl-bar" style={{ background: item.color }} />
    </a>
  );
}

export default function SocialLinks() {
  return (
    <div className="social-links-row">
      {links.map(l => <SocialCard key={l.label} item={l} />)}
    </div>
  );
}
