import './App.css'; 
import CircularText from './react_component/circulartext.jsx';
import './assets/font.css';
import RotatingText from './react_component/rotatingtext.jsx';
import DotExpandButton from './react_component/DotExpandButton.jsx'; 
import HorizontalScroll from './react_component/HorizontalScroll.jsx'; 
import { useState } from 'react';
import NeonButton from './react_component/NeonButton.jsx';

import BackToTopButton from './react_component/BackToTop.jsx';
import logo from './photo.jpg'
import TextPressure from './react_component/TextPressure.jsx';

// import useMagneticEffect from './react_component/MagnetButton.jsx';
// import LogoComponent from 'C:\\Users\\Darpan\\Desktop\\Portfolio\\Portfolio\\src\\react_component\\EnhancedLogo.jsx';
// import TiltedCard from 'C:\\Users\\Darpan\\Desktop\\Portfolio\\Portfolio\\src\\react_component\\TitledCard.jsx';
// import Home from 'C:\\Users\\Darpan\\Desktop\\Portfolio\\Portfolio\\src\\react_component\\Photo.jsx';

function App() {
  const [activeNavItem, setActiveNavItem] = useState('Home');

const handleNavClick = (item, href) => {
  setActiveNavItem(item);
  if (href) {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
  return (
    
    <div className="App">
      <svg style={{ display: 'none' }}>
  <defs>
    <filter id="glass-distortion">
      <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="77" />
    </filter>
  </defs>
</svg>
      {/* <div className="navbar">
        
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div> */}
      <div className="navbar">
  <nav className="glass-nav">
    <div className="glass-filter"></div>
    <div className="glass-overlay"></div>
    <div className="glass-specular"></div>
    <div className="glass-content">
      <ul className="nav-list">
        <li>
          <button
              onClick={() => {
                  setActiveNavItem('Home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`nav-item ${activeNavItem === 'Home' ? 'active' : ''}`}
              >
                Home
</button>
        </li>
        <li>
          <button
            onClick={() => handleNavClick('About', '#about')}
            className={`nav-item ${activeNavItem === 'About' ? 'active' : ''}`}
          >
            About
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavClick('Work', '#work')}
            className={`nav-item ${activeNavItem === 'Work' ? 'active' : ''}`}
          >
            Work
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavClick('Contact', '#contact')}
            className={`nav-item ${activeNavItem === 'Contact' ? 'active' : ''}`}
          >
            Contact
          </button>
        </li>
      </ul>
    </div>
  </nav>
</div>
      <CircularText
          text="DNDNDNDN"
          onHover="speedUp"
          spinDuration={10} 
          className="logo"
          fontSize='16px'
          repeat={4}
        />

      


      <section className="page1" id="Home">
        <div className="name_cont" >
          <div className="name1">
            <p id="name1p1">DARPAN NEMADE</p>
          </div>
          <div className="name1">
            <p id="name1p2">Turning data chaos into actionable clarity , </p>
          </div>
          <div className="name1">
            <p id="name1p3">one neural net </p>
          </div>

          <div className="name1">
            <p id="name1p4"> at a time.</p>
          </div>
          <div className="name1">
            <p id="name1p5"> Hello,I'm </p>
          </div>
        </div>

        <div className="prof">

          <RotatingText
              texts={['ML Developer', 'Data Scientist', 'AI Engineer','Frontend Developer' ]}
              mainClassName="px-2 sm:px-2 md:px-3  text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg w-1/2 sm:w-3/4 md:w-1/2 text-1xl sm:text-4xl md:text-2xl"
              style={{ backgroundColor: 'rgb(255, 187, 10)' ,height:"45px",alignItems: 'center'}}
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
              
          />

        </div>

        


        {/* <div class="linkcont">
          <button className="git">Github</button>
          <button className="link">Linkedin</button>
          <button className="mail">Gmail</button>

        </div> */}

        <div className="linkcont" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <NeonButton 
                onClick={() => window.open('https://github.com/darpannemade', '_blank')}
                glowColor="#ffffff"
                glowIntensity="medium"
              >
                Github
              </NeonButton>
              
              <NeonButton 
                onClick={() => window.open('https://www.linkedin.com/in/darpan-nemade-4082971b2', '_blank')}
                glowColor="#ffffff"
                glowIntensity="medium"
              >
                Linkedin
              </NeonButton>
              
              <NeonButton 
                onClick={() => window.location.href = 'mailto:your.darpannemade2004@gmail.com'}
                glowColor="#ffffff"
                glowIntensity="medium"
              >
                Gmail
              </NeonButton>
</div>

<div className="imgcont">
 <img src={logo} alt="Logo" className="profile-logo" />
</div>
      </section>






       <section className="page2" id="about">

        <div className="ver"></div>
        <div className="intro">
          <p id="intro1">INTRODUCTION</p>
          <p id="intro2">
            I’m a final-year Computer Science student specializing in AI/ML. I focus on <br></br>developing data-drivensolutions using deep learning and machine 
            learning <br></br>techniques to solve real-world problems. 
            Passionate about building scalable, <br></br>efficient systems with a strong foundation in TensorFlow, PyTorch, and scikit-learn.
          </p>
          
          <div className="info">

          


          <div className="ex1">
          <p id="ed">EDUCATION </p><br></br><p id="ed2">VIT Bhopal University</p> <p id="ed3">Computer Science Engineering (AI & ML)</p>
          <p id="year">2022-2026 </p><br></br>
          <p id="cg"><b>CGPA - 8.64</b></p>
          </div>
          <div className="ex2">
          <p id="ex11">EXPERIENCE & CERTIFICATION</p><br></br>
          <p id="ex21">Experience-</p>

          <ul id="exp"><li>Space Lab Internship -(Nov24-Dec24)</li></ul><br></br>

          <p id="ex31">Certifications-</p>

          <ul id="cert"><li>MongoDB SmartBridge MERN Stack Certification </li>  <li>IBM Gen AI Certification </li></ul>
          </div>
          </div>
          {/* <button type="button" id="buttintro" >Download Resume</button> */}
          <div id="buttintro">
          <DotExpandButton
              text="Download Resume"
              onClick={() => window.open('/Darpan_Resume.pdf', '_blank')}/>
          </div>    
        </div>
      </section>
      

      {/* <section className="page3" id="work">
        <p id="recwork">Recent Work</p>
        
        <HorizontalScroll /> */}

        {/* <p id="proj1">UAV surveillance system</p>
        <p id="proj2">Social Media Image Caption Generator</p>
        <p id="proj3">Brain Tumor Classification using Ensemble Learning</p> */}

        {/* <img src="C:\Users\Darpan\Desktop\Portfolio\Portfolio\src\assets\image.jpg" id="proj1img" alt="Project 1" />
        <img src="C:\Users\Darpan\Desktop\Portfolio\Portfolio\src\assets\image.jpg" id="proj2img" alt="Project 2" />
        <img src="C:\Users\Darpan\Desktop\Portfolio\Portfolio\src\assets\image.jpg" id="proj3img" alt="Project 3" /> */}
        
      {/* </section> */}

      <section className="page3" id="work">
        {/* <p id="recwork">
              Recent Work
        </p> */}
        <div className="projcont">
                <HorizontalScroll />
        </div>
      </section>



      <section className="page4" id="contact">

<div style={{position: 'relative'} }id="mind">
  <TextPressure
    text="HAVE A PROJECT IN MIND ?"
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
</div>
        {/* <p id="mind">HAVE A PROJECT IN MIND ?</p> */}
        <p id="dev">Designed & Developed by DARPAN NEMADE</p>
        {/* <button type="button" id="connect" onClick={() => window.open('https://www.linkedin.com/in/darpan-nemade-4082971b2', '_blank')}>

          Connect Now</button> */}
<div id="connect">
          <NeonButton 
                onClick={() => window.open('https://www.linkedin.com/in/darpan-nemade-4082971b2', '_blank')}
                glowColor="#ffffff"
                glowIntensity="medium"
                
              >
                Connect Now
              </NeonButton>
</div>
        {/* <useMagneticEffect /> */}

        {/* <button
          type="button"
          id="up"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          BACK TO TOP
        </button> */}

         
                  
                  <BackToTopButton />
              
            
            


      </section>
    </div>
  );
}

export default App;
