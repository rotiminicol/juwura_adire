
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
      {/* Hero */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1517840545241-b491010a8af4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.3}
        className="min-h-[60vh] bg-juwura-brown/50"
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Celebrating Nigerian heritage through authentic adire fashion
          </p>
        </div>
      </ParallaxSection>

      {/* Brand Story */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.2}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="fade-in-element opacity-0">
            <h2 className="text-3xl font-bold mb-6">The Birth of Jùwúrà</h2>
            <p className="text-lg mb-6">
              Founded by Oreoluwa Obabiyi-Nicol in Lagos, Nigeria, Jùwúrà emerged from a profound love 
              for Nigerian cultural heritage and a vision to share this rich legacy with the world.
            </p>
            <p className="text-lg mb-6">
              The name "Jùwúrà" draws inspiration from Yoruba language, embodying the essence of 
              elegance and cultural pride that defines our brand. Each syllable carries with it 
              the weight of tradition and the promise of innovation.
            </p>
            <p className="text-lg">
              Our journey began with a simple mission: to preserve the art of adire cloth-making 
              while reimagining it for contemporary fashion. Today, we stand at the intersection 
              of tradition and modernity, creating pieces that honor our past while embracing the future.
            </p>
          </div>

          <div className="fade-in-element opacity-0">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1489367874814-f5d040621dd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Founder of Jùwúrà" 
                className="w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-juwura-brown/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold">Oreoluwa Obabiyi-Nicol</h3>
                  <p className="text-juwura-cream/90">Founder & Creative Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Our Philosophy */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1517928260182-5688aead3066?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.4}
      >
        <div className="bg-juwura-brown/70 text-white p-8 md:p-16 rounded-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center fade-in-element opacity-0">Our Philosophy</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center fade-in-element opacity-0">
              <div className="w-20 h-20 rounded-full bg-juwura-gold flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-juwura-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Heritage</h3>
              <p>Preserving and celebrating the rich cultural legacy of Nigerian adire craftsmanship.</p>
            </div>
            
            <div className="text-center fade-in-element opacity-0">
              <div className="w-20 h-20 rounded-full bg-juwura-gold flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-juwura-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p>Reimagining traditional techniques to create contemporary designs that resonate globally.</p>
            </div>
            
            <div className="text-center fade-in-element opacity-0">
              <div className="w-20 h-20 rounded-full bg-juwura-gold flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-juwura-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p>Embracing ethical practices and environmental consciousness throughout our creative process.</p>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Craftsmanship */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.3}>
        <h2 className="text-3xl font-bold mb-12 text-center fade-in-element opacity-0">
          Our Craftsmanship
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <div className="fade-in-element opacity-0">
            <h3 className="text-2xl font-bold mb-4">The Art of Adire</h3>
            <p className="text-lg mb-6">
              Adire textile art is a resist-dyeing technique indigenous to the Yoruba people of 
              southwestern Nigeria. The word "adire" comes from Yoruba language, meaning "tie and dye."
            </p>
            <p className="text-lg">
              This ancient craft involves creating patterns on fabric by preventing dye from 
              reaching certain areas, either through tying and stitching (adire oniko), 
              starch paste (adire eleko), or hand-painting designs (adire alabere).
            </p>
          </div>

          <div className="fade-in-element opacity-0">
            <img 
              src="https://images.unsplash.com/photo-1593344484962-796055d4a3a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Adire craftsmanship" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 fade-in-element opacity-0">
            <img 
              src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Adire dyeing process" 
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="order-1 md:order-2 fade-in-element opacity-0">
            <h3 className="text-2xl font-bold mb-4">Our Process</h3>
            <p className="text-lg mb-6">
              At Jùwúrà, we honor traditional adire techniques while incorporating modern 
              innovations. Our process begins with sourcing high-quality natural fabrics, 
              primarily cotton and occasionally silk.
            </p>
            <p className="text-lg mb-6">
              Skilled artisans then apply resist patterns using traditional starch paste 
              or modern resistants. The fabric is dipped in indigo dye derived from natural 
              sources, creating the characteristic blue hues of adire.
            </p>
            <p className="text-lg">
              After dyeing, the fabric undergoes a meticulous finishing process before being 
              transformed into beautiful garments by our talented tailors.
            </p>
          </div>
        </div>
      </ParallaxSection>

      {/* Team */}
      <ParallaxSection 
        bgColor="#1A365D" 
        speed={0.2}
        className="text-white"
      >
        <h2 className="text-3xl font-bold mb-12 text-center fade-in-element opacity-0">
          Meet Our Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center fade-in-element opacity-0">
            <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-6">
              <img 
                src="https://images.unsplash.com/photo-1550945771-515f118cef86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Oreoluwa Obabiyi-Nicol" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Oreoluwa Obabiyi-Nicol</h3>
            <p className="text-juwura-cream/80 mb-4">Founder & Creative Director</p>
            <p className="text-sm">
              With a background in fashion design and a deep connection to her Nigerian heritage, 
              Oreoluwa brings passion and vision to every aspect of Jùwúrà.
            </p>
          </div>

          <div className="text-center fade-in-element opacity-0">
            <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-6">
              <img 
                src="https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Team member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Adewale Johnson</h3>
            <p className="text-juwura-cream/80 mb-4">Master Dyer</p>
            <p className="text-sm">
              With over 25 years of experience in traditional adire dyeing techniques, 
              Adewale leads our production team with unparalleled expertise.
            </p>
          </div>

          <div className="text-center fade-in-element opacity-0">
            <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-6">
              <img 
                src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Team member" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold">Amina Bello</h3>
            <p className="text-juwura-cream/80 mb-4">Design Lead</p>
            <p className="text-sm">
              A graduate of Lagos Fashion School, Amina brings contemporary design sensibilities 
              while maintaining deep respect for traditional adire patterns.
            </p>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default About;
