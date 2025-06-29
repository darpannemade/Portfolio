//////////////////////////////////////// Horizontal scroll + tilted Card animation //////////////////////////////////////

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// You can easily add/remove projects here - everything else will adjust automatically
const projects = [
  {
    image: "/bg2.png",
    title: "UAV Surveillance System",
    description: "Surveillance System designed for UAV using deep learning along with Thermal mode"
  },
  {
    image: "/bg4.jpg",
    title: "TuneTrails",
    description: "Music Streaming app made using React & Tailwind"
  },
  {
    image: "/bg5.png",
    title: "ODIN",
    description: "Web3 site for Cryptofinance with AI chatbot, Wallet Integration and NFT Marketplace"
  },
  {
    image: "/bg6.png",
    title: "Brain Tumor Classification",
    description: "Classifies tumors in brain using ensemble DL model of ResNet50+DenseNet201"
  },
  {
    image: "/bg3jpg",
    title: "Social Media Caption Generator",
    description: "CNN-LSTM Based social media post caption generator"
  },
];

// Spring configuration for tilted cards
const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

// Configuration object for easy adjustments
const CONFIG = {
  cardWidth: {
    mobile: 320, // Fixed pixel values
    desktop: 800
  },
  cardHeight: {
    mobile: 240,
    desktop: 500
  },
  gap: '2.5rem',
  // Dynamic scroll end multiplier based on project count
  getScrollEndMultiplier: (projectCount) => {
    // Adjust scroll distance based on number of projects
    const baseMultiplier = 0.04;
    const scaleFactor = Math.max(0.6, projectCount / 5);
    return baseMultiplier * scaleFactor;
  }
};

// TiltedCard component integrated
function TiltedProjectCard({ project, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });
  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -14;
    const rotationY = (offsetX / (rect.width / 2)) * 14;
    
    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    
    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(1.05);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <motion.figure
      ref={ref}
      className="flex-shrink-0 relative group cursor-pointer"
      style={{
        width: `${CONFIG.cardWidth.desktop}px`,
        height: `${CONFIG.cardHeight.desktop}px`,
        perspective: '800px'
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover rounded-2xl shadow-2xl will-change-transform [transform:translateZ(0)]"
        />
        
        {/* Overlay with gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "translateZ(10px)" }}
        />
        
        {/* Title and Description - 3D elevated */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 will-change-transform"
          style={{ transform: "translateZ(30px)" }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-shadow">
            {project.title}
          </h3>
          <p className="text-sm md:text-base text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {project.description}
          </p>
        </motion.div>

        {/* Project number indicator - 3D elevated */}
        <motion.div 
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold border border-white/20 will-change-transform"
          style={{ transform: "translateZ(20px)" }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
      </motion.div>

      {/* Tooltip */}
      <motion.figcaption
        className="pointer-events-none absolute left-0 top-0 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-2 text-sm text-black opacity-0 z-10 hidden md:block shadow-lg"
        style={{
          x,
          y,
          opacity,
          rotate: rotateFigcaption,
        }}
      >
        {project.title}
      </motion.figcaption>
    </motion.figure>
  );
}

export default function HorizontalScroll() {
  const containerRef = useRef();
  const trackRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentProject, setCurrentProject] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 768px)": function () {
          // Refresh ScrollTrigger to get accurate dimensions
          ScrollTrigger.refresh();
          
          // Calculate scroll distance
          const scrollDistance = track.scrollWidth - container.offsetWidth;
          
          // Dynamic scroll end based on project count
          const scrollEndMultiplier = CONFIG.getScrollEndMultiplier(projects.length);
          
          if (scrollDistance > 0) {
            gsap.to(track, {
              
              x: -scrollDistance,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${scrollDistance * scrollEndMultiplier}`,
                // end: () => `+=${window.innerHeight * 4}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                refreshPriority: -1,
                invalidateOnRefresh: true,
                markers: false,
                onUpdate: (self) => {
                  // Clamp progress between 0 and 1
                  const progress = Math.min(Math.max(self.progress, 0), 1);
                  setScrollProgress(progress * 100);
                  
                  // Calculate current project more accurately
                  // Use projects.length - 1 to prevent going beyond array bounds
                  const maxProjectIndex = projects.length - 1;
                  const exactProjectIndex = progress * maxProjectIndex;
                  const currentIndex = Math.min(Math.floor(exactProjectIndex) + 1, projects.length);
                  setCurrentProject(currentIndex);
                },
                onRefresh: () => {
                  // Reset on refresh
                  gsap.set(track, { x: 0 });
                  setScrollProgress(0);
                  setCurrentProject(1);
                }
              },
            });
          }
        },
        
        // Mobile - disable horizontal scroll
        "(max-width: 767px)": function () {
          gsap.set(track, { x: 0 });
          setScrollProgress(0);
          setCurrentProject(1);
        }
      });
    }, container);

    // Cleanup function
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects.length]); // Re-run when projects array changes
useLayoutEffect(() => {
    // Reset any existing transforms on mount
    if (trackRef.current) {
      trackRef.current.style.transform = 'translateX(0px)';
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-black relative overflow-hidden"
      style={{ height: "80vh" }}
    >
      <div
        ref={trackRef}
        className="flex items-center h-full "
        style={{ 
          marginTop: '5rem',
          width: "max-content", 
          gap: CONFIG.gap,
          willChange: 'transform'
        }}
      >

         <div style={{ width: "calc(20vw - 400px)" }} />


        {projects.map((project, index) => (
          <TiltedProjectCard 
            key={`${project.title}-${index}`} 
            project={project} 
            index={index} 
          />
        ))}

        <div style={{ width: "calc(-20vw - 400px)" }} />
        
      </div>

      {/* Section title */}
      <div className="absolute top-8 left-10 z-10">
        <h2 className=" font-bold text-white " style={{ fontSize: "60px", fontFamily: '"humion", "Sans Serif"' }}>
          Featured Projects
        </h2>
        <p className="text-gray-400 text-lg" style={{  fontFamily: '"humion", "Sans Serif"' }}>
          Scroll to explore my work →
        </p>
      </div>

      {/* Dynamic Progress indicator */}
      <div className="absolute left-10 right-10 z-10" style={{ bottom: '-2rem' }}>
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ 
              width: `${scrollProgress}%`,
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${scrollProgress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <motion.span
            key={currentProject}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {String(currentProject).padStart(2, '0')}
          </motion.span>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </div>
        
        {/* Current project title indicator */}
        <motion.div 
          className="mt-2 text-white/60 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {projects[currentProject - 1]?.title}
        </motion.div>
      </div>

      {/* Debug panel - enable for fine-tuning */}
      {/* <div className="absolute top-32 right-4 bg-black/80 p-3 rounded text-white/90 text-xs font-mono">
        <div>Total Projects: {projects.length}</div>
        <div>Progress: {scrollProgress.toFixed(1)}%</div>
        <div>Current Project: {currentProject}</div>
        <div>Scroll Multiplier: {CONFIG.getScrollEndMultiplier(projects.length).toFixed(2)}</div>
        <div className="text-yellow-400 mt-1">Enable markers in code for visual debugging</div>
      </div> */}
    </section>
  );
}
/////////////////////////////// Horizontal scroll with project titles ////////////////////////////////////////////////////



// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const projects = [
//   {
//     image: "/bg1.jpg",
//     title: "E-Commerce Platform",
//     description: "Modern shopping experience with React & Node.js"
//   },
//   {
//     image: "/bg2.jpg",
//     title: "Mobile Banking App",
//     description: "Secure financial transactions with Flutter"
//   },
//   {
//     image: "/bg3.jpg",
//     title: "AI Dashboard",
//     description: "Data visualization with Python & D3.js"
//   },
// ];

// export default function HorizontalScroll() {
//   const containerRef = useRef();
//   const trackRef = useRef();

//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     const track = trackRef.current;

//     const ctx = gsap.context(() => {
//       ScrollTrigger.matchMedia({
//         // desktop
//         "(min-width: 768px)": function () {
//           // Calculate dimensions after layout
//           ScrollTrigger.refresh();
          
//           const scrollDistance = track.scrollWidth - container.offsetWidth;
          
//           gsap.to(track, {
//             x: -scrollDistance,
//             ease: "none",
//             scrollTrigger: {
//               trigger: container,
//               start: "top top",
//               end: () => `+=${scrollDistance * 0.2}`,
//               scrub: 1,
//               pin: true,
//               anticipatePin: 1,
//               invalidateOnRefresh: true,
//               markers: false,
//               onUpdate: (self) => {
//                 // Ensure we complete the full horizontal movement
//                 const progress = Math.min(self.progress, 1);
//                 gsap.set(track, { x: -scrollDistance * progress });
//               },
//               onRefresh: () => {
//                 // Recalculate on refresh
//                 gsap.set(track, { x: 0 });
//               }
//             },
//           });
//         },
//         // mobile - disable horizontal scroll
//         "(max-width: 767px)": function () {
//           gsap.set(track, { x: 0 });
//         }
//       });
//     }, container);

//     // Cleanup
//     return () => {
//       ctx.revert();
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="w-full bg-black relative overflow-hidden"
//       style={{ height: "80vh" }}
//     >
//       <div
//         ref={trackRef}
//         className="flex items-center h-full px-10"
//         style={{ width: "max-content", gap: "2.5rem" }}
//       >
//         {projects.map((project, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[70vw] h-[60vh] md:w-[50vw] md:h-[50vh] relative group cursor-pointer"
//           >
//             <img
//               src={project.image}
//               alt={project.title}
//               className="w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
//             />
            
//             {/* Overlay with gradient */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
//             {/* Title and Description */}
//             <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
//               <h3 className="text-2xl md:text-3xl font-bold mb-2 text-shadow">
//                 {project.title}
//               </h3>
//               <p className="text-sm md:text-base text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
//                 {project.description}
//               </p>
//             </div>

//             {/* Project number indicator */}
//             <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-semibold border border-white/20">
//               {String(index + 1).padStart(2, '0')}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Section title */}
//       <div className="absolute top-8 left-10 z-10">
//         <h2 className="text-4xl md:text-6xl font-bold text-white mb-2">
//           Featured Projects
//         </h2>
//         <p className="text-gray-400 text-lg">
//           Scroll to explore my work →
//         </p>
//       </div>

//       {/* Progress indicator */}
//       <div className="absolute bottom-8 left-10 right-10 z-10">
//         <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-white rounded-full transition-all duration-300 ease-out"
//             style={{ 
//               width: '33.33%', // This would be dynamic based on scroll progress in a real implementation
//               transform: 'translateX(0%)' 
//             }}
//           />
//         </div>
//         <div className="flex justify-between mt-2 text-sm text-gray-400">
//           <span>01</span>
//           <span>0{projects.length}</span>
//         </div>
//       </div>
//     </section>
//   );
// }


/////////////////////////// Original 2 (not that good) ////////////////////////////////////////////

// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const images = [
//   "/bg1.jpg",
//   "/bg2.jpg",
//   "/bg3.jpg",
// ];

// export default function HorizontalScroll() {
//   const containerRef = useRef();
//   const trackRef = useRef();

//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     const track = trackRef.current;

//     // Set CSS for better performance
//     gsap.set(track, {
//       force3D: true,
//       transformOrigin: "left center"
//     });

//     const ctx = gsap.context(() => {
//       ScrollTrigger.matchMedia({
//         // desktop
//         "(min-width: 768px)": function () {
//           // Calculate dimensions after layout
//           ScrollTrigger.refresh();
          
//           const scrollDistance = track.scrollWidth - container.offsetWidth;
          
//           gsap.to(track, {
//             x: -scrollDistance,
//             ease: "none",
//             scrollTrigger: {
//               trigger: container,
//               start: "top top",
//               end: () => `+=${scrollDistance * 0.2}`, // Your preferred multiplier
//               scrub: 1, // Smoother scrub value (0.1-1.0)
//               pin: true,
//               anticipatePin: 1,
//               invalidateOnRefresh: true,
//               markers: false,
//               fastScrollEnd: true, // Prevents scroll from getting stuck
//               preventOverlaps: true, // Prevents overlapping triggers
//               onRefresh: () => {
//                 gsap.set(track, { x: 0 });
//               }
//             },
//           });
//         },
//         // mobile - disable horizontal scroll
//         "(max-width: 767px)": function () {
//           gsap.set(track, { x: 0 });
//         }
//       });
//     }, container);

//     // Enhanced cleanup
//     return () => {
//       ctx.revert();
//       ScrollTrigger.getAll().forEach(trigger => {
//         if (trigger.trigger === container) {
//           trigger.kill();
//         }
//       });
//     };
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="w-full bg-black relative overflow-hidden"
//       style={{ 
//         height: "100vh",
//         willChange: "transform",
//         backfaceVisibility: "hidden"
//       }}
//     >
//       <div
//         ref={trackRef}
//         className="flex items-center h-full px-10"
//         style={{ 
//           width: "max-content", 
//           gap: "2.5rem",
//           willChange: "transform",
//           backfaceVisibility: "hidden",
//           perspective: "1000px"
//         }}
//       >
//         {images.map((src, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[70vw] h-[60vh] md:w-[50vw] md:h-[50vh]"
//             style={{
//               willChange: "transform",
//               backfaceVisibility: "hidden"
//             }}
//           >
//             <img
//               src={src}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-full object-cover rounded-2xl shadow-2xl"
//               style={{
//                 willChange: "transform",
//                 backfaceVisibility: "hidden"
//               }}
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



//////////////////////////////// Original (most appropriate) ///////////////////////////////////////////////////////////////


// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const images = [
//   "/bg1.jpg",
//   "/bg2.jpg",
//   "/bg3.jpg",
// ];

// export default function HorizontalScroll() {
//   const containerRef = useRef();
//   const trackRef = useRef();

//   useLayoutEffect(() => {
//     const container = containerRef.current;
//     const track = trackRef.current;

//     const ctx = gsap.context(() => {
//       ScrollTrigger.matchMedia({
//         // desktop
//         "(min-width: 768px)": function () {
//           // Calculate dimensions after layout
//           ScrollTrigger.refresh();
          
//           const scrollDistance = track.scrollWidth - container.offsetWidth;
          
//           gsap.to(track, {
//             x: -scrollDistance,
//             ease: "none",
//             scrollTrigger: {
//               trigger: container,
//               start: "top top",
//               end: () => `+=${scrollDistance * 0.2}`, // Double the distance for slower, complete scroll
//               scrub: 1,
//               pin: true,
//               anticipatePin: 1,
//               invalidateOnRefresh: true,
//               markers: false, // Set to true for debugging
//               onUpdate: (self) => {
//                 // Ensure we complete the full horizontal movement
//                 const progress = Math.min(self.progress, 1);
//                 gsap.set(track, { x: -scrollDistance * progress });
//               },
//               onRefresh: () => {
//                 // Recalculate on refresh
//                 gsap.set(track, { x: 0 });
//               }
//             },
//           });
//         },
//         // mobile - disable horizontal scroll
//         "(max-width: 767px)": function () {
//           gsap.set(track, { x: 0 });
//         }
//       });
//     }, container);

//     // Cleanup
//     return () => {
//       ctx.revert();
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="w-full bg-black relative overflow-hidden"
//       style={{ height: "80vh" }}
//     >
//       <div
//         ref={trackRef}
//         className="flex items-center h-full px-10"
//         style={{ width: "max-content", gap: "2.5rem" }}
//       >
//         {images.map((src, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[70vw] h-[60vh] md:w-[50vw] md:h-[50vh]"
//           >
//             <img
//               src={src}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-full object-cover rounded-2xl shadow-2xl"
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

///////////////////////////////////////////////////////////////////////////////////////////////////
