
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ParallaxSection from "@/components/ParallaxSection";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const sampleProducts = [
  {
    id: 1,
    name: "Adire Eleko Top",
    price: 15000,
    image: "/adire1.png",
    description: "Traditional hand-dyed top with authentic adire pattern."
  },
  {
    id: 2,
    name: "Kampala Shift Dress",
    price: 25000,
    image: "/adire3.png",
    description: "Modern shift dress with classic adire design."
  },
  {
    id: 3,
    name: "Adire Silk Scarf",
    price: 8000,
    image: "/adire4.png",
    description: "Luxurious silk scarf with traditional indigo pattern."
  }
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen">
      {/* Hero Section - enhanced with cultural elements */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1574272106748-009d64305b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover", 
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          transform: "translateZ(0)",
          willChange: "transform"
        }}
      >
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-lg" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574272106748-009d64305b52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <div 
            className="absolute inset-0 bg-juwura-brown/40"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white py-16 max-w-4xl">
          <div className="mb-12">
            <img 
              src="/lovable-uploads/d669e35d-f019-43a0-a333-cf7ef26df738.png" 
              alt="Jùwúrà Logo" 
              className="h-12 md:h-16 lg:h-24 mx-auto mb-12"
              style={{
                transform: `translateY(${scrollY * -0.2}px) scale(${1 - scrollY * 0.0005})`,
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            />
          </div>
          
          <div className="space-y-8">
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-juwura-brown to-juwura-terracotta">
                Jùwúrà NG
              </h1>
              <div className="absolute top-0 left-0 w-full h-1 bg-juwura-brown/50" />
              <div className="absolute bottom-0 right-0 w-1/2 h-1 bg-juwura-terracotta/50" />
            </div>
            
            <p className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto opacity-90">
              Discover the beauty of Nigerian heritage through our styles
            </p>
            
            <div className="relative">
              <Link 
                to="/products" 
                className="relative inline-flex items-center justify-center px-8 py-4 rounded-md text-lg font-medium group"
              >
                <span className="absolute inset-0 bg-juwura-brown/50 rounded-md transition-all duration-300 group-hover:bg-juwura-brown/70" />
                <span className="relative text-juwura-cream border-2 border-juwura-cream px-8 py-4 rounded-md text-lg font-medium transition-all duration-300 group-hover:bg-juwura-cream group-hover:text-juwura-brown">
                  Explore Our Collection
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Cultural Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="hidden md:block">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-12">
              <img 
                src="/adire1.png" 
                alt="Adire Pattern" 
                className="w-48 h-48 object-cover opacity-20"
                style={{
                  transform: `translateX(${scrollY * 0.1}px)`,
                  transition: "transform 0.3s ease-out"
                }}
              />
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-12">
              <img 
                src="/adire2.png" 
                alt="Adire Pattern" 
                className="w-48 h-48 object-cover opacity-20"
                style={{
                  transform: `translateX(${-scrollY * 0.1}px)`,
                  transition: "transform 0.3s ease-out"
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce"
          style={{
            opacity: Math.max(0, 1 - scrollY * 0.003),
          }}
        >
          <div className="relative">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="32" 
              height="32" 
              fill="white" 
              viewBox="0 0 16 16"
            >
              <path d="M8 15a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 1 0v9a.5.5 0 0 1-.5.5z" />
              <path d="M8 5a.5.5 0 0 1-.5-.5V2.707l-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 1 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-.5.5z" />
            </svg>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-juwura-brown" />
          </div>
        </div>
      </div>

      {/* Story Section - improved spacing */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.3} spacing="xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="fade-in-element opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">About Us</h2>
            <p className="text-lg mb-8">
             JÙWÚRÀ is a fashion-forward clothing brand that blends contemporary design with cultural identity and streetwear influence. Our mission is to empower individuals through style, authenticity, and storytelling in fashion.
            </p>
            <p className="text-lg mb-8">
             The name "Jùwúrà" draws inspiration from Yoruba language, embodying the essence of elegance and cultural pride that defines our brand. Each syllable carries with it the weight of tradition and the promise of innovation.
            </p>
            <Link 
              to="/about" 
              className="inline-block text-juwura-brown border-b-2 border-juwura-brown hover:text-juwura-terracotta hover:border-juwura-terracotta transition-colors"
            >
              Learn more about our journey
            </Link>
          </div>

          <div className="fade-in-element opacity-0">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/about.png" 
                alt="Traditional Adire Textile" 
                className="w-full h-96 object-cover transform transition-all duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 transition-all duration-1000 hover:bg-black/20" />
            </div>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Collection Preview - improved spacing */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1517928260182-5688aead3066?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.5}
        spacing="large"
      >
        <div className="text-center text-white mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 fade-in-element opacity-0">
            Featured Collection
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-16 fade-in-element opacity-0">
            Discover our curated selection of handcrafted adire garments and accessories, 
            each telling a unique story of Nigerian artistry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {sampleProducts.map((product) => (
            <div key={product.id} className="fade-in-element opacity-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 fade-in-element opacity-0">
          <Link
            to="/products"
            className="bg-juwura-cream text-juwura-brown px-8 py-4 rounded-md inline-block text-lg font-medium hover:bg-white transition-colors"
          >
            View All Products
          </Link>
        </div>
      </ParallaxSection>

      {/* Craftsmanship Section - improved spacing */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.2} spacing="large">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 fade-in-element opacity-0">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/adire6.png" 
                  alt="Adire craftsmanship" 
                  className="w-full h-96 object-cover transform transition-all duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 transition-all duration-1000 hover:bg-black/20" />
              </div>
          </div>

          <div className="order-1 md:order-2 fade-in-element opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Artisanal Craftsmanship</h2>
            <p className="text-lg mb-8">
              Each Jùwúrà piece is a labor of love, crafted by skilled artisans who have 
              perfected their techniques over years of dedicated practice. We honor 
              the traditional methods of adire making while embracing innovation.
            </p>
            <p className="text-lg mb-8">
              From carefully selected fabrics to the meticulous application of resist 
              patterns and natural indigo dyeing, our process preserves the soul of 
              adire while creating garments that are both timeless and contemporary.
            </p>
            <Button 
              variant="outline"
              className="border-2 border-juwura-brown text-juwura-brown hover:bg-juwura-brown hover:text-juwura-cream"
            >
              Explore Our Process
            </Button>
          </div>
        </div>
      </ParallaxSection>

      {/* Call to Action - improved spacing */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.4}
        className="bg-gradient-to-r from-juwura-brown/80 to-juwura-indigo/80"
        spacing="large"
      >
        <div className="text-center text-white py-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 fade-in-element opacity-0">
            Join the Jùwúrà Community
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-16 fade-in-element opacity-0">
            Be the first to know about new collections, exclusive events, and special offers.
          </p>
          <div className="max-w-md mx-auto fade-in-element opacity-0">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md flex-grow bg-white/90 text-juwura-brown"
              />
              <Button className="bg-juwura-gold text-juwura-brown hover:bg-juwura-cream">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );

};

export default Index;
