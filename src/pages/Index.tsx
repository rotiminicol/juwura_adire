import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ParallaxSection from "@/components/ParallaxSection";
import ProductCard from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const heroImages = [
  "/wed2.png",
  "/wed3.png",
  "/wed4.png",
  "/wed5.png",
];

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
  {
    id: 7,
    name: "Traditional Agbada",
    price: 45000,
    image: "/wed5.png",
    description: "Classic Nigerian agbada with modern adire touches.",
  },
  {
    id: 8,
    name: "Adire Home Set",
    price: 28000,
    image: "/wed6.png",
    description: "Beautiful home décor set with traditional patterns.",
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, []);

  const goToSlide = (idx: number) => setCurrentSlide(idx);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-white scroll-smooth"
    >
      {/* HERO SLIDESHOW */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full min-h-[70vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white/0 z-20" />
        
        {/* Move dots below shop now button */}
        <div className="absolute bottom-2 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-white transition-all duration-300 ${
                idx === currentSlide ? "bg-white" : "bg-transparent"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
        
        <div className="relative z-30 w-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <img
            src="/juwura logo.png"
            alt="Jùwúrà Logo"
            className="h-12 sm:h-16 md:h-20 mb-6 sm:mb-8 drop-shadow-lg mt-8 sm:mt-0"
            draggable={false}
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
            Discover Authentic Adire Fashion
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-12 sm:mb-8 max-w-md sm:max-w-xl mx-auto">
            Shop unique, handcrafted pieces inspired by Nigerian heritage.
          </p>
          <Link to="/products">
            <Button className="bg-juwura-gold text-juwura-brown px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg shadow-md hover:bg-juwura-cream transition">
              Shop Now
            </Button>
          </Link>
        </div>
      </motion.div>

      <ParallaxSection
  bgColor="#FEF7E5"
  speed={0.25}
  spacing="xl"
  className="relative py-24 sm:py-32"
>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.1 }}
    className="text-center mb-12 sm:mb-16"
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-juwura-brown font-playfair">
      Featured Collection
    </h2>
    <p className="text-lg sm:text-xl md:text-2xl text-juwura-brown/80 max-w-3xl mx-auto">
      Explore our bestsellers and new arrivals
    </p>
  </motion.div>

  {/* Wider, rectangular container */}
  <div className="w-full mx-auto">
    <div className="w-full">
      {/* Sexy slide prompt */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-10"
      >
        <p className="text-juwura-brown text-sm sm:text-base lg:text-lg font-playfair italic font-semibold bg-juwura-gold/20 px-4 py-2 rounded-full shadow-md">
          Slide to unveil more elegance
        </p>
      </motion.div>
      {/* Carousel layout with wider cards */}
      <motion.div
        className="flex flex-row gap-8 sm:gap-12 lg:gap-24 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {sampleProducts.slice(0, 8).map((product, idx) => (
          <motion.div
            key={product.id}
            className="flex-none snap-start"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
          >
            <div className="relative w-[360px] sm:w-[420px] lg:w-[520px] h-[500px] sm:h-[560px] lg:h-[680px] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border-2 border-juwura-gold/30 hover:border-juwura-gold/60">
              <ProductCard
                {...product}
                cardClassName="w-full h-full rounded-2xl border-0 shadow-none"
              />
              <motion.div
                className="absolute inset-0 bg-juwura-brown/10 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-2xl"
                whileHover={{ opacity: 1 }}
              >
                <Button className="bg-juwura-gold text-juwura-brown px-6 py-3 text-base sm:text-lg font-semibold rounded-lg shadow-md hover:bg-juwura-cream transition">
                  View Details
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>

  <div className="text-center mt-12 sm:mt-16">
    <Link to="/products">
      <Button className="bg-juwura-brown text-juwura-cream px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-semibold rounded-xl hover:bg-juwura-terracotta transition shadow-lg">
        View All Products
      </Button>
    </Link>
  </div>
</ParallaxSection>
    </motion.div>
  );
};

export default Index;