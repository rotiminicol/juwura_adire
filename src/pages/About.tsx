import { useEffect } from "react";
import ParallaxSection from "@/components/ParallaxSection";
import { motion } from "framer-motion";

const About = () => {
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
        className="min-h-[50vh] sm:min-h-[60vh] bg-juwura-brown/60"
      >
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-juwura-gold fade-in-element opacity-0"
            >
              The Birth of Jùwúrà
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white mb-6 sm:mb-8 fade-in-element opacity-0"
            >
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
                JÙWÚRÀ is a fashion-forward clothing brand that blends contemporary design with cultural identity and streetwear influence. Our mission is to empower individuals through style, authenticity, and storytelling in fashion.
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                The name "Jùwúrà" draws inspiration from Yoruba language, embodying the essence of elegance and cultural pride that defines our brand. Each syllable carries with it the weight of tradition and the promise of innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* 2. Our Process */}
      <ParallaxSection bgImage="/wed7.png" speed={0.2}>
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="fade-in-element opacity-0"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-juwura-brown">
                Our Process
              </h2>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                At Jùwúrà, we honor traditional adire techniques while incorporating modern innovations. Our process begins with sourcing high-quality natural fabrics, primarily cotton and occasionally silk.
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                Skilled artisans then apply resist patterns using traditional starch paste or modern resistants. The fabric is dipped in indigo dye derived from natural sources, creating the characteristic blue hues of adire.
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                After dyeing, the fabric undergoes a meticulous finishing process before being transformed into beautiful garments by our talented tailors.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="fade-in-element opacity-0"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/wed7.png" 
                  alt="Our Process" 
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* 3. Our Craftsmanship */}
      <ParallaxSection bgImage="/wed8.png" speed={0.3}>
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="fade-in-element opacity-0"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-juwura-brown">
                Our Craftsmanship
              </h2>
              <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                Each Jùwúrà piece is a labor of love, crafted by skilled artisans who have perfected their techniques over years of dedicated practice. We honor the traditional methods of adire making while embracing innovation.
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                From carefully selected fabrics to the meticulous application of resist patterns and natural indigo dyeing, our process preserves the soul of adire while creating garments that are both timeless and contemporary.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="fade-in-element opacity-0"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="/wed8.png" 
                  alt="Our Craftsmanship" 
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex justify-center mt-8 sm:mt-12 fade-in-element opacity-0"
          >
            <img 
              src="/machine.png" 
              alt="The Art of Adire" 
              className="rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl object-cover"
            />
          </motion.div>
        </div>
      </ParallaxSection>

      {/* 4. Our Story */}
      <ParallaxSection bgImage="/wed9.png" speed={0.3}>
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-2xl sm:max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-juwura-gold fade-in-element opacity-0"
            >
              Our Story
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white fade-in-element opacity-0"
            >
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">
                Jùwúrà is more than a brand—it's a movement to celebrate and preserve the beauty of Nigerian heritage through authentic adire fashion.
              </p>
              <p className="text-sm sm:text-base md:text-lg">
                Our journey is one of passion, creativity, and a deep respect for tradition, woven into every piece we create.
              </p>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default About;