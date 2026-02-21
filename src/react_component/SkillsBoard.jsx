import { useRef, useEffect, useCallback } from 'react';

// ── Data ──────────────────────────────────────────────────────────────────
const skillCategories = [
  {
    label: 'AI / ML',
    color: '#ff8c00',
    skills: [
      { name: 'Python',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TensorFlow',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'scikit-learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' },
      { name: 'OpenCV',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' },
    ],
  },
  {
    label: 'Web',
    color: '#61dafb',
    skills: [
      { name: 'React',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Tailwind', icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg' },
      { name: 'MongoDB',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
  },
  {
    label: 'Tools',
    color: '#f05032',
    skills: [
      { name: 'Docker',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'LangChain',  icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4' },
      { name: 'n8n',        icon: 'https://avatars.githubusercontent.com/u/45487711?s=200&v=4' },
    ],
  },
];

// ── Hex helper ────────────────────────────────────────────────────────────
const toHex = n => Math.max(0, Math.min(255, Math.round(n * 255))).toString(16).padStart(2, '0');

// ── Single tile — pure DOM manipulation, zero React re-renders ────────────
function SkillTile({ skill, color }) {
  const wrapRef  = useRef(null);
  const innerRef = useRef(null);
  const imgRef   = useRef(null);

  // Expose DOM nodes so the parent RAF loop can reach them
  const expose = useCallback(node => {
    wrapRef.current = node;
    if (node) node._skillColor = color;
  }, [color]);

  return (
    <div ref={expose} className="skill-tile-wrap">
      <div ref={innerRef} className="skill-tile-inner">
        <div className="skill-tile-icon-box">
          <img
            ref={imgRef}
            src={skill.icon}
            alt={skill.name}
            className="skill-tile-img"
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
          <span className="skill-tile-fallback">⚙️</span>
        </div>
        <span className="skill-tile-name">{skill.name}</span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function SkillsBoard() {
  const sectionRef = useRef(null);
  const blobRef    = useRef(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const rafRef     = useRef(null);
  const tilesRef   = useRef([]);   // filled after mount

  // Collect all tile wrappers after mount
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    tilesRef.current = Array.from(section.querySelectorAll('.skill-tile-wrap'));
  }, []);

  // RAF loop — update each tile's styles based on mouse proximity
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;
      const { x: mx, y: my } = mouseRef.current;
      const isActive = mx > -1000;

      // Move ambient blob
      if (blobRef.current) {
        blobRef.current.style.opacity = isActive ? '0.07' : '0';
        if (isActive) {
          blobRef.current.style.left = `${mx}px`;
          blobRef.current.style.top  = `${my}px`;
        }
      }

      tilesRef.current.forEach(wrap => {
        const inner = wrap.querySelector('.skill-tile-inner');
        const img   = wrap.querySelector('.skill-tile-img');
        const name  = wrap.querySelector('.skill-tile-name');
        if (!inner) return;

        const color = wrap._skillColor || '#ffffff';
        const rect  = wrap.getBoundingClientRect();
        const cx    = rect.left + rect.width  / 2;
        const cy    = rect.top  + rect.height / 2;

        const dist  = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        const prox  = isActive ? Math.max(0, 1 - dist / 260) : 0;

        // Tilt
        const tX = prox > 0.04 ? ((my - cy) / (rect.height / 2)) * -10 * prox : 0;
        const tY = prox > 0.04 ? ((mx - cx) / (rect.width  / 2)) *  10 * prox : 0;
        inner.style.transform = `rotateX(${tX.toFixed(2)}deg) rotateY(${tY.toFixed(2)}deg)`;

        // Glow background — radial follows cursor
        const lx = prox > 0.04
          ? Math.max(0, Math.min(100, ((mx - rect.left) / rect.width)  * 100)).toFixed(1)
          : 50;
        const ly = prox > 0.04
          ? Math.max(0, Math.min(100, ((my - rect.top)  / rect.height) * 100)).toFixed(1)
          : 50;

        const bgA     = toHex(prox * 0.45);
        const borderA = toHex(0.08 + prox * 0.52);
        const shadowA = toHex(prox * 0.38);
        const shadow2A= toHex(prox * 0.14);

        inner.style.background   = `radial-gradient(ellipse at ${lx}% ${ly}%, ${color}${bgA} 0%, rgba(0,0,0,0.6) 62%)`;
        inner.style.borderColor  = `${color}${borderA}`;
        inner.style.boxShadow    = prox > 0.06
          ? `0 0 ${Math.round(prox*20)}px ${color}${shadowA}, 0 0 ${Math.round(prox*40)}px ${color}${shadow2A}`
          : 'none';

        // Image — desaturate when far, full color when close
        if (img) {
          const gr = Math.round((1 - prox) * 35);
          const br = (0.78 + prox * 0.22).toFixed(2);
          img.style.filter = `grayscale(${gr}%) brightness(${br})`;
        }

        // Name opacity
        if (name) {
          name.style.color = prox > 0.18
            ? 'rgba(255,255,255,0.92)'
            : 'rgba(255,255,255,0.45)';
        }
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { active = false; cancelAnimationFrame(rafRef.current); };
  }, []);

  const onMove  = useCallback(e => { mouseRef.current = { x: e.clientX, y: e.clientY }; }, []);
  const onLeave = useCallback(() => { mouseRef.current = { x: -9999, y: -9999 }; }, []);

  return (
    <section
      ref={sectionRef}
      className="skills-board-section"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Header */}
      <div className="skills-board-header">
        <span className="skills-board-label">TECH STACK</span>
        <h3 className="skills-board-title">Tools I Build With</h3>
      </div>

      {/* Three category columns */}
      <div className="skills-categories">
        {skillCategories.map(cat => (
          <div key={cat.label} className="skills-cat-col">
            <div className="skills-cat-label" style={{ color: cat.color }}>
              <span className="skills-cat-dot" style={{ background: cat.color }} />
              {cat.label}
            </div>
            <div className="skills-cat-grid">
              {cat.skills.map(skill => (
                <SkillTile key={skill.name} skill={skill} color={cat.color} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Ambient cursor glow — positioned absolutely, updated via RAF */}
      <div ref={blobRef} className="skills-cursor-blob" />

      {/* <p className="skills-swap-hint">
        Replace <code>icon</code> URLs with <code>/icons/yourfile.png</code> for custom icons
      </p> */}
    </section>
  );
}
