
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ParallaxSection from "@/components/ParallaxSection";
import RotatingCube from "@/components/RotatingCube";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

const sampleProducts = [
  {
    id: 1,
    name: "Adire Eleko Top",
    price: 15000,
    image: "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Traditional hand-dyed top with authentic adire pattern."
  },
  {
    id: 2,
    name: "Kampala Shift Dress",
    price: 25000,
    image: "https://images.unsplash.com/photo-1503160865267-3e277ffb3ff0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Modern shift dress with classic adire design."
  },
  {
    id: 3,
    name: "Adire Silk Scarf",
    price: 8000,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
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
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-juwura-cream"
        style={{ 
          backgroundImage: "url(https://images.unsplash.com/photo-1633934542430-0a33652c58c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover", 
          backgroundPosition: "center"
        }}
      >
        <div 
          className="absolute inset-0 bg-juwura-brown/40"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="mb-8">
            <img 
              src="/lovable-uploads/d669e35d-f019-43a0-a333-cf7ef26df738.png" 
              alt="Jùwúrà Logo" 
              className="h-32 md:h-40 mx-auto mb-8 invert"
              style={{
                transform: `translateY(${scrollY * -0.2}px) scale(${1 - scrollY * 0.0005})`,
              }}
            />
          </div>
          
          <h1 
            className="text-4xl md:text-7xl font-bold mb-4"
            style={{
              transform: `translateY(${scrollY * -0.3}px)`,
            }}
          >
            Authentic Adire Fashion
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            Traditional Nigerian craftsmanship reimagined for the modern world
          </p>
          
          <div
            style={{
              transform: `translateY(${scrollY * -0.15}px)`,
            }}
          >
            <Link 
              to="/products" 
              className="bg-juwura-brown text-juwura-cream border-2 border-juwura-cream px-8 py-3 rounded-md text-lg font-medium hover:bg-juwura-cream hover:text-juwura-brown transition-all duration-300"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          style={{
            opacity: Math.max(0, 1 - scrollY * 0.005),
          }}
        >
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
        </div>
      </div>

      {/* Story Section */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.3}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in-element opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-6">
              Jùwúrà is an authentic adire clothing brand founded by Oreoluwa Obabiyi-Nicol
              in Lagos, Nigeria. Our mission is to preserve the rich cultural heritage of adire 
              textile art while creating contemporary fashion that resonates with the modern world.
            </p>
            <p className="text-lg mb-6">
              Every piece in our collection is meticulously crafted using traditional techniques 
              passed down through generations, ensuring the authenticity and quality that 
              adire is known for.
            </p>
            <Link 
              to="/about" 
              className="inline-block text-juwura-brown border-b-2 border-juwura-brown hover:text-juwura-terracotta hover:border-juwura-terracotta transition-colors"
            >
              Learn more about our journey
            </Link>
          </div>

          <div className="fade-in-element opacity-0">
            <RotatingCube />
          </div>
        </div>
      </ParallaxSection>
      
      {/* Collection Preview */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1517928260182-5688aead3066?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.5}
      >
        <div className="text-center text-white mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 fade-in-element opacity-0">
            Featured Collection
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 fade-in-element opacity-0">
            Discover our curated selection of handcrafted adire garments and accessories, 
            each telling a unique story of Nigerian artistry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleProducts.map((product) => (
            <div key={product.id} className="fade-in-element opacity-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 fade-in-element opacity-0">
          <Link
            to="/products"
            className="bg-juwura-cream text-juwura-brown px-8 py-3 rounded-md inline-block text-lg font-medium hover:bg-white transition-colors"
          >
            View All Products
          </Link>
        </div>
      </ParallaxSection>

      {/* Craftsmanship Section */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.2}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 fade-in-element opacity-0">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586015075099-d36c315ccbe5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Adire craftsmanship"
                className="rounded-lg shadow-xl"
              />
              <div className="adire-pattern adire-pattern-1 absolute inset-0 mix-blend-overlay"></div>
            </div>
          </div>

          <div className="order-1 md:order-2 fade-in-element opacity-0">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Artisanal Craftsmanship</h2>
            <p className="text-lg mb-6">
              Each Jùwúrà piece is a labor of love, crafted by skilled artisans who have 
              perfected their techniques over years of dedicated practice. We honor 
              the traditional methods of adire making while embracing innovation.
            </p>
            <p className="text-lg mb-6">
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

      {/* Call to Action */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.4}
        className="bg-gradient-to-r from-juwura-brown/80 to-juwura-indigo/80"
      >
        <div className="text-center text-white py-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 fade-in-element opacity-0">
            Join the Jùwúrà Community
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 fade-in-element opacity-0">
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
