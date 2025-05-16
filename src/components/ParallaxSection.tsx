
import { useRef, useEffect, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  bgImage?: string;
  bgColor?: string;
  speed?: number;
  className?: string;
}

const ParallaxSection = ({ 
  children, 
  bgImage,
  bgColor = "transparent",
  speed = 0.5,
  className = ""
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Check if the section is in the viewport
      if (
        scrollTop + window.innerHeight >= sectionTop &&
        scrollTop <= sectionTop + sectionHeight
      ) {
        // Calculate the parallax effect
        const distanceFromTop = scrollTop - sectionTop;
        const parallaxOffset = distanceFromTop * speed;
        
        // Apply transform to the content
        content.style.transform = `translateY(${parallaxOffset}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const backgroundStyle = bgImage 
    ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } 
    : { backgroundColor: bgColor };

  return (
    <section 
      ref={sectionRef} 
      className={`parallax-section ${className}`}
    >
      <div 
        className="parallax-bg w-full h-full absolute inset-0"
        style={backgroundStyle}
      />
      <div ref={contentRef} className="parallax-content relative z-10">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
