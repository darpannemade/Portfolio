import './App.css';
import IntroSplash from './react_component/IntroSplash.jsx';
import CircularText from './react_component/circulartext.jsx';
import './assets/font.css';
import RotatingText from './react_component/rotatingtext.jsx';
// DotExpandButton replaced by ResumeButton
import HorizontalScroll from './react_component/HorizontalScroll.jsx';
import { useState } from 'react';
import SocialLinks from './react_component/SocialLinks.jsx';
import ResumeButton from './react_component/ResumeButton.jsx';
import BackToTopButton from './react_component/BackToTop.jsx';
import logo from './photo.jpg';
import TextPressure from './react_component/TextPressure.jsx';
import BlurText from './react_component/BlurText.jsx';
import SkillsBoard from './react_component/SkillsBoard.jsx';

// ── Social links for the contact section ─────────────────────────────────
const socials = [
  {
    label: 'GitHub',
    sub: '@darpannemade',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.9 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    href: 'https://github.com/darpannemade',
  },
  {
    label: 'LinkedIn',
    sub: 'Darpan Nemade',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/>
      </svg>
    ),
    href: 'https://www.linkedin.com/in/darpan-nemade-4082971b2',
  },
  {
    label: 'Gmail',
    sub: 'darpannemade2004',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M24 5.46v13.08A2.46 2.46 0 0 1 21.54 21H2.46A2.46 2.46 0 0 1 0 18.54V5.46A2.46 2.46 0 0 1 2.46 3h19.08A2.46 2.46 0 0 1 24 5.46zM21.54 5.46H2.46L12 12.77l9.54-7.31zM2.46 18.54h19.08V8.31L12 15.69 2.46 8.31v10.23z"/>
      </svg>
    ),
    href: 'mailto:darpannemade2004@gmail.com',
  },
];

function App() {
  const [activeNavItem, setActiveNavItem] = useState('Home');
  const [showSplash, setShowSplash] = useState(true);

  const handleNavClick = (item, href) => {
    setActiveNavItem(item);
    if (href) {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

return (
    <>
      {showSplash && (
        <IntroSplash onEnter={() => setShowSplash(false)} />
      )}

      {/* ── NAVBAR outside .App so filter/transform don't trap it ── */}
      <div className="navbar">
        <nav className="glass-nav">
          <div className="glass-filter"></div>
          <div className="glass-overlay"></div>
          <div className="glass-specular"></div>
          <div className="glass-content">
            <ul className="nav-list">
              <li>
                <button
                  onClick={() => { setActiveNavItem('Home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`nav-item ${activeNavItem === 'Home' ? 'active' : ''}`}
                >Home</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('About', '#about')} className={`nav-item ${activeNavItem === 'About' ? 'active' : ''}`}>About</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('Work', '#work')} className={`nav-item ${activeNavItem === 'Work' ? 'active' : ''}`}>Work</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('Contact', '#contact')} className={`nav-item ${activeNavItem === 'Contact' ? 'active' : ''}`}>Contact</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="App" style={{
        opacity: showSplash ? 0 : 1,
        filter: showSplash ? 'blur(12px)' : 'blur(0px)',
        transform: showSplash ? 'translateY(18px)' : 'translateY(0px)',
        transition: showSplash
          ? 'none'
          : 'opacity 0.7s ease 0.1s, filter 0.7s ease 0.1s, transform 0.7s ease 0.1s',
      }}>
      {/* SVG filter for glass distortion */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="glass-distortion">
            <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
          </filter>
        </defs>
      </svg>

      {/* ── CIRCULAR LOGO ── */}
      <CircularText text="DNDNDNDN" onHover="speedUp" spinDuration={10} className="logo" fontSize="16px" repeat={4} />
      {/* ══════════════════════════════════════
          PAGE 1 — HERO
          IMPROVEMENT 1: BlurText on hero name
      ══════════════════════════════════════ */}
      <section className="page1" id="Home">

        {/* "Hello, I'm" label */}
        <p className="hero-label">Hello, I'm</p>

        {/* ✨ IMPROVEMENT 1: BlurText word-by-word reveal on the name */}
        <div className="hero-name-wrap">
          <BlurText
            text="DARPAN NEMADE"
            animateBy="words"
            direction="top"
            delay={120}
            stepDuration={0.5}
            className="hero-name-blur"
          />
        </div>

        {/* Tagline — staggered blur reveal by words */}
        <div className="hero-tagline-wrap">
          <BlurText
            text="Turning data chaos into actionable clarity,"
            animateBy="words"
            direction="bottom"
            delay={80}
            stepDuration={0.4}
            className="hero-tagline-blur"
          />
          <BlurText
            text="one neural net at a time."
            animateBy="words"
            direction="bottom"
            delay={80}
            stepDuration={0.4}
            className="hero-tagline-blur hero-tagline-accent"
          />
        </div>

        {/* Profile image + rotating pill */}
        <div className="hero-row">
          <div className="imgcont">
            <img src={logo} alt="Darpan Nemade" className="profile-logo" />
          </div>
          <div className="prof">
            <RotatingText
              texts={['ML Developer', 'Data Scientist', 'AI Engineer', 'Frontend Developer']}
              mainClassName="rotating-pill"
              staggerFrom="last"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-120%' }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </div>
        </div>

        {/* Social links */}
        <SocialLinks />
      </section>


      {/* ══════════════════════════════════════
          PAGE 2 — ABOUT
      ══════════════════════════════════════ */}
      <section className="page2" id="about">
        <div className="intro">
          <div className="intro-top">
            <p id="intro1">INTRODUCTION</p>
            <p id="intro2">
              I'm a final-year Computer Science student specializing in AI/ML. I focus on
              developing data-driven solutions using deep learning and machine learning
              techniques to solve real-world problems.
              Passionate about building scalable, efficient systems with a strong foundation
              in TensorFlow, PyTorch, and scikit-learn.
            </p>
          </div>

          <div className="info">
            <div className="ex1">
              <p id="ed">EDUCATION</p>
              <br />
              <p id="ed2">VIT Bhopal University</p>
              <p id="ed3">Computer Science Engineering (AI & ML)</p>
              <p id="year">2022–2026</p>
              <br />
              <p id="cg"><b>CGPA — 8.64</b></p>
            </div>
            <div className="ver"></div>
            <div className="ex2">
              <p id="ex11">EXPERIENCE & CERTIFICATION</p>
              <br />
              <p id="ex21">Experience —</p>
              <ul id="exp"><li>Space Lab Internship (Nov 24 – Dec 24)</li></ul>
              <br />
              <p id="ex31">Certifications —</p>
              <ul id="cert">
                <li>MongoDB SmartBridge MERN Stack Certification</li>
                <li>IBM Gen AI Certification</li>
              </ul>
            </div>
          </div>

          <div id="buttintro">
            <ResumeButton onClick={() => window.open('/Darpan_Resume.pdf', '_blank')} />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SKILLS BOARD (3D proximity glow grid)
      ══════════════════════════════════════ */}
      <SkillsBoard />


      {/* ══════════════════════════════════════
          PAGE 3 — WORK
      ══════════════════════════════════════ */}
      <section className="page3" id="work">
        <div className="projcont">
          <HorizontalScroll />
        </div>
      </section>


      {/* ══════════════════════════════════════
          PAGE 4 — CONTACT
          IMPROVEMENT 4: Full visual statement
      ══════════════════════════════════════ */}
      <section className="page4" id="contact">

        {/* Animated gradient background blobs */}
        <div className="contact-blob contact-blob-1" />
        <div className="contact-blob contact-blob-2" />

        {/* TextPressure heading — full width */}
        <div className="contact-heading">
          <TextPressure
            text="LET'S BUILD SOMETHING"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={16}
          />
          <TextPressure
            text="REMARKABLE TOGETHER"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="rgb(255,187,0)"
            strokeColor="#ff0000"
            minFontSize={16}
          />
        </div>

        {/* Social cards grid */}
        <div className="contact-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="social-card"
            >
              <div className="social-card-icon">{s.icon}</div>
              <div className="social-card-text">
                <span className="social-card-label">{s.label}</span>
                <span className="social-card-sub">{s.sub}</span>
              </div>
              <div className="social-card-arrow">↗</div>
            </a>
          ))}
        </div>

        {/* Divider line */}
        <div className="contact-divider" />

        {/* Footer row */}
        <div className="contact-footer">
          <p className="contact-credit">Designed &amp; Developed by <span>DARPAN NEMADE</span></p>
          <BackToTopButton />
        </div>

      </section>
    </div>
    </>
  );
}

export default App;
