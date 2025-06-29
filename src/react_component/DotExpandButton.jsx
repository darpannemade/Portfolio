import { useState } from "react";
import { ArrowRight } from "lucide-react";

const DotExpandButton = ({
  text = "Download Resume",
  onClick,
  bgColor = "rgb(255, 255, 255)",           // white
  hoverBgColor = "rgb(229, 231, 235)",       // gray-200
  dotColor = "rgb(0, 0, 0)",                 // black
  arrowColor = "rgb(255, 255, 255)",         // white
  textColor = "rgb(0, 0, 0)",                // black
  hoverTextColor = "rgb(0, 0, 0)"            // black on hover
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex items-center gap-4 px-8 py-8 w-50 h-10 rounded-full shadow-lg transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: hovered ? hoverBgColor : bgColor,
        color: hovered ? hoverTextColor : textColor,
        justifyContent:"center"
        
      }}
    >
      <span
  className="flex items-center justify-center rounded-full transition-all duration-500 ease-in-out"
  style={{
    width: hovered ? "28px" : "12px",
    height: hovered ? "28px" : "12px",
    backgroundColor: dotColor,
  }}
>
  {hovered && <ArrowRight size={16} style={{ color: arrowColor }} />}
</span>

      <span className="transition-all duration-500 ease-in-out">{text}</span>
    </button>
  );
};

export default DotExpandButton;
