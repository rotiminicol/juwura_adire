
import { useRef, useEffect, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  bgImage?: string;
  bgColor?: string;
  speed?: number;
  className?: string;
  spacing?: "normal" | "large" | "xl" | "none"; 
}

const ParallaxSection = ({ 
  children, 
  bgImage,
  bgColor = "transparent",
  speed = 0.5,
  className = "",
  spacing = "normal"
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Check if we're on a mobile device (simplified check)
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    // Reduce parallax effect on mobile or disable it completely
    const mobileSpeedFactor = isMobile ? 0.25 : 1;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Check if the section is in the viewport with expanded range for smoother transitions
      if (
        scrollTop + window.innerHeight >= sectionTop - 200 &&
        scrollTop <= sectionTop + sectionHeight + 200
      ) {
        // Calculate the parallax effect but make it more subtle on mobile
        const distanceFromTop = scrollTop - sectionTop;
        const parallaxOffset = distanceFromTop * speed * 0.5 * mobileSpeedFactor;
        
        // Apply transform with easing
        content.style.transform = `translateY(${parallaxOffset}px)`;
        content.style.transition = "transform 0.1s ease-out";
      }
    };

    // Only apply parallax effect if not on a mobile device or use reduced effect
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  // Determine padding based on spacing prop
  const getPadding = () => {
    switch(spacing) {
      case "large": return "py-16 md:py-24 px-4 md:px-12";
      case "xl": return "py-20 md:py-32 px-4 md:px-16";
      case "none": return "";
      default: return "py-12 md:py-16 px-4 md:px-8"; // normal spacing
    }
  };

  const backgroundStyle = bgImage 
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } 
    : { backgroundColor: bgColor };

  return (
    <section 
      ref={sectionRef} 
      className={`parallax-section ${getPadding()} ${className}`}
    >
      <div 
        className="parallax-bg w-full h-full absolute inset-0"
        style={backgroundStyle}
      />
      <div ref={contentRef} className="parallax-content relative z-10 w-full">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
