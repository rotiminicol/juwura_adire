
import { useState, useEffect } from "react";

interface RotatingCubeProps {
  images?: string[];
  texts?: string[];
}

const RotatingCube = ({ 
  images = [], 
  texts = ["Craft", "Elegance", "Culture", "Style", "Heritage", "Tradition"] 
}: RotatingCubeProps) => {
  const [rotation, setRotation] = useState({ x: -15, y: 15 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate rotation based on mouse position
      const x = (e.clientY / window.innerHeight - 0.5) * -30;
      const y = (e.clientX / window.innerWidth - 0.5) * 30;
      
      setRotation({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cubeStyle = {
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
  };

  const renderFace = (index: number) => {
    if (images && images[index]) {
      return (
        <img 
          src={images[index]} 
          alt={`Cube face ${index}`} 
          className="w-full h-full object-cover" 
        />
      );
    }
    return <span className="text-xl">{texts[index]}</span>;
  };

  return (
    <div className="scene flex items-center justify-center py-16">
      <div className="cube" style={cubeStyle}>
        <div className="cube-face cube-face-front">{renderFace(0)}</div>
        <div className="cube-face cube-face-back">{renderFace(1)}</div>
        <div className="cube-face cube-face-right">{renderFace(2)}</div>
        <div className="cube-face cube-face-left">{renderFace(3)}</div>
        <div className="cube-face cube-face-top">{renderFace(4)}</div>
        <div className="cube-face cube-face-bottom">{renderFace(5)}</div>
      </div>
    </div>
  );
};

export default RotatingCube;
