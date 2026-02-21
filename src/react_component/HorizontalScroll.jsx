import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: "/bg5.png",
    title: "ODIN",
    description: "Web3 site for Cryptofinance with AI chatbot, Wallet Integration and NFT Marketplace",
    github: "https://github.com/darpannemade/ODIN",
    live: null,
  },
  {
    image: "/bg7.png",
    title: "EvoCine",
    description: "Multimodal GenAI pipeline using SDXL, AnimateDiff & Stable Video Diffusion to generate cinematic scenes from text.",
    github: "https://github.com/darpannemade",
    live: null,
  },
  {
    image: "/bg2.png",
    title: "UAV Surveillance System",
    description: "Surveillance System for UAV using deep learning along with Thermal mode",
    github: "https://github.com/darpannemade/Object-Detection",
    live: null,
  },
  {
    image: "/bg8.png",
    title: "Email Productivity Agent",
    description: "Offline LLaMA 3 automation agent that handles emails along with n8n automation",
    github: "https://github.com/darpannemade/Email_Productivity_agent",
    live: null,
  },
  {
    image: "/bg4.jpg",
    title: "TuneTrails",
    description: "Music Streaming app made using React & Tailwind",
    github: "https://github.com/darpannemade/TuneTrails",
    live: null,
  },
];
const springValues = { damping: 30, stiffness: 100, mass: 2 };

// ── Get card size based on viewport ───────────────────────────────────────
function getCardSize() {
  const vw = window.innerWidth;
  if (vw <= 480)       return { width: Math.min(vw - 32, 320), height: 220 };
  if (vw <= 768)       return { width: Math.min(vw - 40, 480), height: 300 };
  if (vw <= 1024)      return { width: Math.min(vw * 0.65, 560), height: 380 };
  if (vw <= 1440)      return { width: Math.min(vw * 0.55, 700), height: 440 };
  return               { width: Math.min(vw * 0.52, 800), height: 500 };
}

// ── Tilted project card (desktop hover effect) ────────────────────────────
function TiltedProjectCard({ project, index, cardWidth, cardHeight }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });
  const [lastY, setLastY] = useState(0);
  const mouseDownX = useRef(0);
  const isDragging = useRef(false);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    rotateX.set((offsetY / (rect.height / 2)) * -14);
    rotateY.set((offsetX / (rect.width / 2)) * 14);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    rotateFigcaption.set(-(offsetY - lastY) * 0.6);
    setLastY(offsetY);
    // Track drag distance
    if (Math.abs(e.clientX - mouseDownX.current) > 5) isDragging.current = true;
  }

  return (
    <motion.a
      ref={ref}
      href={project.github || project.live || '#'}
      target={project.github || project.live ? '_blank' : undefined}
      rel="noreferrer"
      draggable={false}
      className="flex-shrink-0 relative group cursor-pointer"
      style={{ width: `${cardWidth}px`, height: `${cardHeight}px`, perspective: '800px', pointerEvents: 'auto', display: 'block', textDecoration: 'none' }}
      onMouseDown={(e) => { mouseDownX.current = e.clientX; isDragging.current = false; }}
      onMouseMove={handleMouse}
      onClick={(e) => { if (isDragging.current) { e.preventDefault(); isDragging.current = false; } }}
      onMouseEnter={() => { scale.set(1.05); opacity.set(1); }}
      onMouseLeave={() => { opacity.set(0); scale.set(1); rotateX.set(0); rotateY.set(0); rotateFigcaption.set(0); }}
    >
      {/* Main card with 3D tilt */}
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, scale }}
      >
        {/* Base image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover will-change-transform"
          draggable={false}
          style={{ display: 'block' }}
        />

        {/* Always-visible bottom gradient + index */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div
          className="absolute top-4 right-4 flex items-center justify-center text-white/60 font-mono text-xs"
          style={{ transform: 'translateZ(5px)' }}
        >
          {String(index + 1).padStart(2, '0')} / {String(5).padStart(2, '0')}
        </div>

        {/* Scan-line reveal overlay — slides UP on hover */}
        <div
          className="scan-overlay group-hover:translate-y-0"
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Content */}
          <div className="scan-content">
            <p className="scan-index">PROJECT_{String(index + 1).padStart(2, '0')}</p>
            <h3 className="scan-title" style={{ fontSize: `clamp(1rem, ${cardWidth * 0.024}px, 1.6rem)` }}>
              {project.title}
            </h3>
            <p className="scan-desc" style={{ fontSize: `clamp(0.7rem, ${cardWidth * 0.014}px, 0.9rem)` }}>
              {project.description}
            </p>

            {/* Tap hint */}
            <p className="scan-tap-hint">click to view project ↗</p>
          </div>
        </div>

        {/* Corner bracket decorations - visible on hover */}
        <div className="corner-tl group-hover:opacity-100" />
        <div className="corner-br group-hover:opacity-100" />
      </motion.div>

      {/* Floating label tooltip */}
      <motion.figcaption
        className="pointer-events-none absolute left-0 top-0 rounded-lg bg-black/80 backdrop-blur-sm px-3 py-1.5 text-xs text-white/80 z-10 hidden md:block border border-white/10"
        style={{ x, y, opacity, rotate: rotateFigcaption }}
      >
        {project.title}
      </motion.figcaption>
    </motion.a>
  );
}

// ── Mobile swipe carousel ─────────────────────────────────────────────────
function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isScrollingRef = useRef(false);

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isScrollingRef.current = false;
  }

  function onTouchMove(e) {
    if (touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // If primarily vertical movement, let page scroll, don't swipe
    if (!isScrollingRef.current && Math.abs(dy) > Math.abs(dx)) {
      isScrollingRef.current = true;
    }
  }

  function onTouchEnd(e) {
    if (touchStartX.current === null || isScrollingRef.current) {
      touchStartX.current = null;
      return;
    }
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setCurrent(c => Math.min(c + 1, projects.length - 1));
      else        setCurrent(c => Math.max(c - 1, 0));
    }
    touchStartX.current = null;
  }

  const p = projects[current];

  return (
    <div className="w-full bg-black flex flex-col" style={{ minHeight: '100vw', maxHeight: '90vh', paddingBottom: '1.5rem' }}>
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 6vw, 2.5rem)', fontFamily: '"humion", "Sans Serif"' }}>
          Featured Projects
        </h2>
        <p className="text-gray-400 text-sm" style={{ fontFamily: '"humion", "Sans Serif"' }}>
          Swipe to explore →
        </p>
      </div>

      {/* Card */}
      <div
        className="relative mx-4 rounded-2xl overflow-hidden flex-1"
        style={{ maxHeight: '55vw', minHeight: '200px' }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-full object-cover"
          draggable={false}
          style={{ minHeight: '200px' }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        {/* Project number */}
        <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs font-semibold border border-white/20">
          {String(current + 1).padStart(2, '0')}
        </div>
        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-base leading-tight mb-1">{p.title}</h3>
          <p className="text-gray-300 text-xs leading-relaxed">{p.description}</p>
        </div>
      </div>

      {/* Dot indicators + arrows */}
      <div className="flex items-center justify-center gap-4 mt-4 px-5">
        <button
          onClick={() => setCurrent(c => Math.max(c - 1, 0))}
          disabled={current === 0}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white border border-white/30 disabled:opacity-30 transition-opacity"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          ‹
        </button>

        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '20px' : '8px',
                height: '8px',
                background: i === current ? 'rgb(255,187,0)' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent(c => Math.min(c + 1, projects.length - 1))}
          disabled={current === projects.length - 1}
          className="w-8 h-8 rounded-full flex items-center justify-center text-white border border-white/30 disabled:opacity-30 transition-opacity"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          ›
        </button>
      </div>

      {/* Project count */}
      <div className="text-center text-gray-500 text-xs mt-2">
        {current + 1} / {projects.length}
      </div>
    </div>
  );
}

// ── Desktop GSAP horizontal scroll ───────────────────────────────────────
function DesktopHorizontalScroll() {
  const containerRef = useRef();
  const trackRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentProject, setCurrentProject] = useState(1);
  const [cardSize, setCardSize] = useState(getCardSize());

  useEffect(() => {
    function handleResize() { setCardSize(getCardSize()); }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      const scrollDistance = track.scrollWidth - container.offsetWidth;

      if (scrollDistance > 0) {
        gsap.to(track, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${scrollDistance * 0.04 * Math.max(0.6, projects.length / 5)}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            refreshPriority: -1,
            invalidateOnRefresh: true,
            markers: false,
            onUpdate: (self) => {
              const progress = Math.min(Math.max(self.progress, 0), 1);
              setScrollProgress(progress * 100);
              setCurrentProject(Math.min(Math.floor(progress * (projects.length - 1)) + 1, projects.length));
            },
            onRefresh: () => {
              gsap.set(track, { x: 0 });
              setScrollProgress(0);
              setCurrentProject(1);
            }
          },
        });
      }
    }, container);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [cardSize]);

  useLayoutEffect(() => {
    if (trackRef.current) trackRef.current.style.transform = 'translateX(0px)';
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-black relative overflow-hidden"
      style={{ height: "80vh" }}
    >
      <div
        ref={trackRef}
        className="flex items-center h-full"
        style={{ marginTop: '5rem', width: "max-content", gap: '2rem', willChange: 'transform', pointerEvents: 'auto' }}
      >
        <div style={{ width: "clamp(1rem, 5vw, 4rem)", flexShrink: 0 }} />
        {projects.map((project, index) => (
          <TiltedProjectCard
            key={`${project.title}-${index}`}
            project={project}
            index={index}
            cardWidth={cardSize.width}
            cardHeight={cardSize.height}
          />
        ))}
        <div style={{ width: "clamp(1rem, 5vw, 4rem)", flexShrink: 0 }} />
      </div>

      {/* Title */}
      <div className="absolute top-6 left-8 z-10">
        <h2 className="font-bold text-white"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", fontFamily: '"humion", "Sans Serif"' }}>
          Featured Projects
        </h2>
        <p className="text-gray-400" style={{ fontFamily: '"humion", "Sans Serif"', fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}>
          Scroll to explore my work →
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute left-8 right-8 z-10" style={{ bottom: '-1rem' }}>
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: `${scrollProgress}%` }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <motion.span key={currentProject} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {String(currentProject).padStart(2, '0')}
          </motion.span>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </div>
        <motion.div className="mt-1 text-white/60" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.8rem)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {projects[currentProject - 1]?.title}
        </motion.div>
      </div>
    </section>
  );
}

// ── Root export: switches between mobile carousel and desktop scroll ──────
export default function HorizontalScroll() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768); }
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileCarousel /> : <DesktopHorizontalScroll />;
}
