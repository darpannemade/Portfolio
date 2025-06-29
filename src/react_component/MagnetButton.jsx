// useMagneticEffect.js
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useMagneticEffect = (options = {}) => {
  const elementRef = useRef(null);
  
  const {
    strength = 0.25,
    maxDistance = 80,
    scale = 1.05,
    duration = 0.3,
    returnDuration = 0.5
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance < maxDistance) {
        const moveX = deltaX * strength;
        const moveY = deltaY * strength;
        
        gsap.to(element, {
          x: moveX,
          y: moveY,
          duration,
          ease: "power2.out"
        });
      }
    };

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        scale: 1,
        duration: returnDuration,
        ease: "elastic.out(1, 0.3)"
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, maxDistance, scale, duration, returnDuration]);

  return elementRef;
};

// Alternative: Direct function for vanilla JS
export const applyMagneticEffect = (element, options = {}) => {
  const {
    strength = 0.25,
    maxDistance = 80,
    scale = 1.05,
    duration = 0.3,
    returnDuration = 0.5
  } = options;

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < maxDistance) {
      const moveX = deltaX * strength;
      const moveY = deltaY * strength;
      
      gsap.to(element, {
        x: moveX,
        y: moveY,
        duration,
        ease: "power2.out"
      });
    }
  };

  const handleMouseEnter = () => {
    gsap.to(element, {
      scale,
      duration,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      scale: 1,
      duration: returnDuration,
      ease: "elastic.out(1, 0.3)"
    });
  };

  document.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};


// import React, { useRef, useEffect } from 'react';
// import { gsap } from 'gsap';

// const MagneticButton = () => {
//   const buttonRef = useRef(null);
//   const textRef = useRef(null);

//   useEffect(() => {
//     const button = buttonRef.current;
//     const text = textRef.current;

//     const handleMouseMove = (e) => {
//       const rect = button.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;
      
//       const deltaX = e.clientX - centerX;
//       const deltaY = e.clientY - centerY;
      
//       const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//       const maxDistance = 100; // Maximum distance for magnetic effect
      
//       if (distance < maxDistance) {
//         const strength = 0.3; // Adjust magnetic strength
//         const moveX = deltaX * strength;
//         const moveY = deltaY * strength;
        
//         gsap.to(button, {
//           x: moveX,
//           y: moveY,
//           duration: 0.3,
//           ease: "power2.out"
//         });
        
//         gsap.to(text, {
//           x: moveX * 0.5,
//           y: moveY * 0.5,
//           duration: 0.3,
//           ease: "power2.out"
//         });
//       }
//     };

//     const handleMouseLeave = () => {
//       gsap.to(button, {
//         x: 0,
//         y: 0,
//         duration: 0.5,
//         ease: "elastic.out(1, 0.3)"
//       });
      
//       gsap.to(text, {
//         x: 0,
//         y: 0,
//         duration: 0.5,
//         ease: "elastic.out(1, 0.3)"
//       });
//     };

//     const handleMouseEnter = () => {
//       gsap.to(button, {
//         scale: 1.05,
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     };

//     const handleMouseLeaveScale = () => {
//       gsap.to(button, {
//         scale: 1,
//         duration: 0.3,
//         ease: "power2.out"
//       });
//     };

//     // Add event listeners
//     document.addEventListener('mousemove', handleMouseMove);
//     button.addEventListener('mouseenter', handleMouseEnter);
//     button.addEventListener('mouseleave', () => {
//       handleMouseLeave();
//       handleMouseLeaveScale();
//     });

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       button.removeEventListener('mouseenter', handleMouseEnter);
//       button.removeEventListener('mouseleave', handleMouseLeave);
//     };
//   }, []);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <button
//         ref={buttonRef}
//         className="relative w-32 h-32 bg-white border-2 border-black rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
//       >
//         <div
//           ref={textRef}
//           className="absolute inset-0 flex items-center justify-center"
//         >
//           <div className="relative">
//             {/* Circular text */}
//             <svg className="w-28 h-28 absolute -top-14 -left-14" viewBox="0 0 120 120">
//               <defs>
//                 <path
//                   id="circle"
//                   d="M 60, 60 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
//                 />
//               </defs>
//               <text className="text-xs font-medium fill-black tracking-wider">
//                 <textPath href="#circle" startOffset="0%">
//                   YOU WANT AROUND THIS CIRCLE YOU CAN WRITE WHATEVER TEXT
//                 </textPath>
//               </text>
//             </svg>
            
//             {/* Arrow */}
//             <div className="flex items-center justify-center w-6 h-6">
//               <svg 
//                 className="w-6 h-6" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth={3} 
//                   d="M7 17l9.2-9.2M17 17V7H7" 
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </button>
//     </div>
//   );
// };

// export default MagneticButton;