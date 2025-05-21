
import { useEffect } from "react";
import ParallaxSection from "@/components/ParallaxSection";

const About = () => {
  // Elements entering viewport animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.add("opacity-100");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".fade-in-element");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="pt-16">
      {/* 1. The Birth of Jùwúrà */}
      <ParallaxSection 
        bgImage="/wed6.png"
        speed={0.3}
        className="min-h-[60vh] bg-juwura-brown/50"
      >
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-juwura-gold fade-in-element opacity-0">
              The Birth of Jùwúrà
            </h1>
            <div className="text-white mb-8 fade-in-element opacity-0">
              <p className="text-xl md:text-2xl mb-6">
                JÙWÚRÀ is a fashion-forward clothing brand that blends contemporary design with cultural identity and streetwear influence. Our mission is to empower individuals through style, authenticity, and storytelling in fashion.
              </p>
              <p className="text-lg md:text-xl">
                The name "Jùwúrà" draws inspiration from Yoruba language, embodying the essence of elegance and cultural pride that defines our brand. Each syllable carries with it the weight of tradition and the promise of innovation.
              </p>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* 2. Our Process */}
      <ParallaxSection bgImage="/wed7.png" speed={0.2}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="fade-in-element opacity-0">
            <h2 className="text-3xl font-bold mb-6">Our Process</h2>
            <p className="text-lg mb-6">
              At Jùwúrà, we honor traditional adire techniques while incorporating modern innovations. Our process begins with sourcing high-quality natural fabrics, primarily cotton and occasionally silk.
            </p>
            <p className="text-lg mb-6">
              Skilled artisans then apply resist patterns using traditional starch paste or modern resistants. The fabric is dipped in indigo dye derived from natural sources, creating the characteristic blue hues of adire.
            </p>
            <p className="text-lg">
              After dyeing, the fabric undergoes a meticulous finishing process before being transformed into beautiful garments by our talented tailors.
            </p>
          </div>
          <div className="fade-in-element opacity-0">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/wed7.png" 
                alt="Our Process" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* 3. Our Craftsmanship */}
      <ParallaxSection bgImage="/wed8.png" speed={0.3}>
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div className="fade-in-element opacity-0">
            <h2 className="text-3xl font-bold mb-6">Our Craftsmanship</h2>
            <p className="text-lg mb-6">
              Each Jùwúrà piece is a labor of love, crafted by skilled artisans who have perfected their techniques over years of dedicated practice. We honor the traditional methods of adire making while embracing innovation.
            </p>
            <p className="text-lg">
              From carefully selected fabrics to the meticulous application of resist patterns and natural indigo dyeing, our process preserves the soul of adire while creating garments that are both timeless and contemporary.
            </p>
          </div>
          <div className="fade-in-element opacity-0">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/wed8.png" 
                alt="Our Craftsmanship" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
        {/* The Art of Adire image (keep as requested) */}
        <div className="flex justify-center mt-12 fade-in-element opacity-0">
          <img 
            src="/machine.png" 
            alt="The Art of Adire" 
            className="rounded-lg shadow-lg w-full max-w-2xl object-cover"
          />
        </div>
      </ParallaxSection>

      {/* 4. Our Story */}
      <ParallaxSection bgImage="/wed9.png" speed={0.3}>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-juwura-gold fade-in-element opacity-0">
              Our Story
            </h2>
            <div className="text-white fade-in-element opacity-0">
              <p className="text-xl md:text-2xl mb-6">
                Jùwúrà is more than a brand—it's a movement to celebrate and preserve the beauty of Nigerian heritage through authentic adire fashion.
              </p>
              <p className="text-lg md:text-xl">
                Our journey is one of passion, creativity, and a deep respect for tradition, woven into every piece we create.
              </p>
            </div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default About;
