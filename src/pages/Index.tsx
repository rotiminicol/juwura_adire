
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ParallaxSection from "@/components/ParallaxSection";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

// Hero slideshow images (landscape, from public folder)
const heroImages = [
  "/wed2.png",
  "/wed3.png",
  "/wed4.png",
  "/wed5.png",
];

// Sample products (expand as needed)
const sampleProducts = [
  {
    id: 1,
    name: "Adire Eleko Top",
    price: 15000,
    image: "/adire1.png",
    description: "Traditional hand-dyed top with authentic adire pattern.",
  },
  {
    id: 2,
    name: "Kampala Shift Dress",
    price: 25000,
    image: "/adire3.png",
    description: "Modern shift dress with classic adire design.",
  },
  {
    id: 3,
    name: "Adire Silk Scarf",
    price: 8000,
    image: "/adire4.png",
    description: "Luxurious silk scarf with traditional indigo pattern.",
  },
  {
    id: 4,
    name: "Adire Maxi Gown",
    price: 32000,
    image: "/wed2.png",
    description: "Elegant maxi gown with bold adire motifs.",
  },
  {
    id: 5,
    name: "Adire Kimono",
    price: 18000,
    image: "/wed3.png",
    description: "Chic kimono jacket with contemporary adire print.",
  },
  {
    id: 6,
    name: "Adire Wrap Skirt",
    price: 12000,
    image: "/wed4.png",
    description: "Versatile wrap skirt in vibrant adire fabric.",
  },
];

const Index = () => {
  // Hero slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Auto-advance hero slideshow
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  // Manual navigation for slideshow
  const goToSlide = (idx: number) => setCurrentSlide(idx);

  // Animate fade-in for product cards
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
    <div className="min-h-screen bg-white scroll-smooth">
      {/* HERO SLIDESHOW */}
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Slideshow Images */}
        {heroImages.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`Featured product ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              transitionProperty: "opacity",
            }}
            draggable={false}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-white/0 z-20" />
        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${
                idx === currentSlide ? "bg-white" : "bg-transparent"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
        {/* Hero Content */}
        <div className="relative z-30 w-full flex flex-col items-center justify-center text-center">
          <img
            src="/lovable-uploads/d669e35d-f019-43a0-a333-cf7ef26df738.png"
            alt="Jùwúrà Logo"
            className="h-16 md:h-24 mb-8 drop-shadow-lg mt-12 md:mt-0"
            draggable={false}
          />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Discover Authentic Adire Fashion
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-xl mx-auto">
            Shop unique, handcrafted pieces inspired by Nigerian heritage.
          </p>
          <Link to="/products">
            <Button className="bg-juwura-gold text-juwura-brown px-8 py-4 text-lg font-semibold rounded-md shadow-lg hover:bg-juwura-cream transition">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      {/* FEATURED COLLECTION */}
      <ParallaxSection
        bgColor="#FEF7E5"
        speed={0.25}
        spacing="xl"
        className="relative"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-juwura-brown">
            Featured Collection
          </h2>
          <p className="text-lg md:text-xl text-juwura-brown/80">
            Explore our bestsellers and new arrivals
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-2 md:px-8">
          {sampleProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="fade-in-element opacity-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/products">
            <Button className="bg-juwura-brown text-juwura-cream px-8 py-4 text-lg font-semibold rounded-md hover:bg-juwura-terracotta transition">
              View All Products
            </Button>
          </Link>
        </div>
      </ParallaxSection>

      {/* NEWSLETTER SIGNUP - Brand Consistent, No Mismatched Background */}
      <section className="bg-juwura-brown py-16">
        <div className="max-w-xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-juwura-cream mb-4">
            Join the Jùwúrà Community
          </h2>
          <p className="text-lg text-juwura-cream/90 mb-8">
            Be the first to know about new collections, exclusive events, and special offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </section>
    </div>
  );
};

export default Index;
