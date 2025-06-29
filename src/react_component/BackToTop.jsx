// BackToTopButton.jsx
import React from 'react';
import { useMagneticEffect } from './MagnetButton';

const BackToTopButton = () => {
  const magneticRef = useMagneticEffect();

  return (
    <button
      ref={magneticRef}
      type="button"
      id="up"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 px-4 py-2 bg-black-600 text-white rounded-lg hover:bg-white-700 transition-colors"
    >
      BACK TO TOP 
    </button>
  );
};

export default BackToTopButton;