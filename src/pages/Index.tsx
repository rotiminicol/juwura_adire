import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ParallaxSection from "@/components/ParallaxSection";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

const products = [
  {
    id: "1",
    name: "Adire 1",
    price: 15000,
    image: "/wed2.png",
    description: "Traditional hand-dyed top with authentic adire pattern.",
    category: "Women's Wear",
    isNewArrival: true
  },
  {
    id: "2",
    name: "Adire 2",
    price: 25000,
    image: "/wed3.png",
    description: "Modern shift dress with classic adire design.",
    category: "Women's Wear"
  },
  {
    id: "3",
    name: "Adire 3",
    price: 8000,
    image: "/wed4.png",
    description: "Luxurious silk scarf with traditional indigo pattern.",
    category: "Accessories",
    isNewArrival: true
  },
  {
    id: "4",
    name: "Adire 4",
    price: 18000,
    image: "/wed5.png",
    description: "Contemporary shirt with subtle adire detailing.",
    category: "Men's Wear",
    isNewArrival: true
  },
  {
    id: "5",
    name: "Adire 5",
    price: 6000,
    image: "/wed6.png",
    description: "Hand-dyed pillow cover with traditional pattern.",
    category: "Home Décor"
  },
  {
    id: "6",
    name: "Adire 6",
    price: 22000,
    image: "/wed7.png",
    description: "Flowing maxi skirt with bold adire pattern.",
    category: "Women's Wear"
  },
  {
    id: "7",
    name: "Adire 7",
    price: 5000,
    image: "/wed8.png",
    description: "Unique bow tie with intricate adire pattern.",
    category: "Men's Wear"
  },
  {
    id: "8",
    name: "Adire 8",
    price: 12000,
    image: "/wed9.png",
    description: "Elegant table runner for dining or display.",
    category: "Home Décor"
  },
  {
    id: "9",
    name: "Adire 9",
    price: 14000,
    image: "/wed2.png",
    description: "Stylish clutch with traditional adire pattern.",
    category: "Accessories"
  },
  {
    id: "10",
    name: "Adire 10",
    price: 15000,
    image: "/wed3.png",
    description: "Beautiful adire piece with intricate patterns.",
    category: "Women's Wear"
  },
  {
    id: "11",
    name: "Adire 11",
    price: 20000,
    image: "/adire11.png",
    description: "Hand-dyed masterpiece with geometric patterns.",
    category: "Men's Wear"
  },
  {
    id: "12",
    name: "Adire 12",
    price: 18000,
    image: "/adire12.png",
    description: "Modern take on traditional adire design.",
    category: "Women's Wear"
  },
  {
    id: "13",
    name: "Adire 13",
    price: 16000,
    image: "/adire13.png",
    description: "Classic adire pattern with contemporary twist.",
    category: "Accessories"
  },
  {
    id: "14",
    name: "Adire 14",
    price: 19000,
    image: "/adire14.png",
    description: "Elegant adire piece for special occasions.",
    category: "Women's Wear"
  },
  {
    id: "15",
    name: "Adire 15",
    price: 17000,
    image: "/adire15.png",
    description: "Hand-dyed adire with modern elements.",
    category: "Men's Wear"
  },
  {
    id: "16",
    name: "Adire 16",
    price: 22000,
    image: "/adire1.png",
    description: "Luxury adire piece with premium materials.",
    category: "Women's Wear"
  },
  {
    id: "17",
    name: "Adire 17",
    price: 18000,
    image: "/adire18.png",
    description: "Hand-dyed adire piece with geometric patterns.",
    category: "Women's Wear"
  },
  {
    id: "18",
    name: "Adire 18",
    price: 25000,
    image: "/wed.png",
    description: "Elegant adire dress with contemporary design.",
    category: "Women's Wear"
  }
];

const featuredProducts = products.slice(0, 4);

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const heroImages = [
    { src: "/wed.png", alt: "Adire Collection 1" },
    { src: "/wed2.png", alt: "Adire Collection 2" },
    { src: "/wed3.png", alt: "Adire Collection 3" },
    { src: "/adire1.png", alt: "Adire Collection 4" }
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
      setIsAnimating(false);
    }, 800);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide - 1 + heroImages.length) % heroImages.length);
      setIsAnimating(false);
    }, 800);
  };

  const goToSlide = (slideIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(slideIndex);
      setIsAnimating(false);
    }, 800);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
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
    <div className="min-h-screen bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ scale: 1.1 }}
              animate={{ scale: index === currentSlide ? 1 : 1.1 }}
              transition={{ duration: 1.5 }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 font-playfair drop-shadow-2xl">
              Authentic Nigerian Adire
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-12 leading-relaxed drop-shadow-lg max-w-3xl mx-auto">
              Discover the beauty of traditional hand-dyed fabrics with modern elegance
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products">
                <Button className="bg-juwura-brown text-white px-8 sm:px-12 py-4 sm:py-6 rounded-xl hover:bg-juwura-terracotta transition-all shadow-2xl text-lg sm:text-xl font-bold border-2 border-white/20">
                  Shop Now
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 sm:p-4 rounded-full hover:bg-white/30 transition-all shadow-lg z-20 disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 sm:p-4 rounded-full hover:bg-white/30 transition-all shadow-lg z-20 disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Slide Indicators - Moved to bottom center with proper spacing */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-juwura-cream/30">
        <div className="w-full px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-juwura-brown mb-6 font-playfair fade-in-element opacity-0">
              Featured Collection
            </h2>
            <p className="text-xl text-juwura-brown/80 max-w-3xl mx-auto fade-in-element opacity-0">
              Handpicked pieces showcasing the finest traditional adire craftsmanship
            </p>
          </motion.div>

          {/* Desktop: 4 cards per row, full width */}
          <div className="hidden md:block w-full">
            <div className="bg-white/95 backdrop-blur-sm border border-juwura-gold/30 rounded-none shadow-2xl p-8">
              <div className="grid grid-cols-4 gap-8 max-w-none">
                {featuredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    className="fade-in-element opacity-0"
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <div className="border-4 border-juwura-gold/30 rounded-2xl shadow-lg hover:shadow-2xl hover:border-juwura-gold/60 transition-all duration-300 bg-white h-full">
                      <ProductCard 
                        {...product} 
                        isNewArrival={product.isNewArrival} 
                        cardClassName="w-full h-[500px] border-0 shadow-none rounded-2xl" 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: 1 card per row, full width */}
          <div className="block md:hidden w-full">
            <div className="bg-white/95 backdrop-blur-sm border-0 rounded-none shadow-none p-0">
              <div className="flex flex-col gap-6 px-4">
                {featuredProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    className="fade-in-element opacity-0 w-full"
                    initial={{ y: 40, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-full border-4 border-juwura-gold/30 rounded-2xl shadow-lg hover:shadow-2xl hover:border-juwura-gold/60 transition-all duration-300 bg-white">
                      <ProductCard 
                        {...product} 
                        isNewArrival={product.isNewArrival} 
                        cardClassName="w-full h-[420px] border-0 shadow-none rounded-2xl" 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12 sm:mt-16 px-4"
          >
            <Link to="/products">
              <Button className="bg-juwura-brown text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl hover:bg-juwura-terracotta transition-colors shadow-xl text-lg sm:text-xl font-bold">
                View All Products
                <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Custom Orders Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.4}
        spacing="large"
        className="py-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-juwura-brown/90 to-juwura-terracotta/80 backdrop-blur-sm text-white p-12 sm:p-16 rounded-3xl max-w-4xl mx-auto text-center shadow-2xl border border-juwura-gold/30"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 font-playfair fade-in-element opacity-0">
            Create Your Unique Adire Piece
          </h2>
          <p className="text-xl sm:text-2xl mb-12 sm:mb-16 fade-in-element opacity-0 leading-relaxed">
            Craft a bespoke adire masterpiece tailored to your style. Our artisans bring your vision to life with authentic techniques.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-juwura-cream to-white text-juwura-brown px-10 sm:px-12 py-4 sm:py-6 rounded-xl text-xl sm:text-2xl font-bold hover:from-white hover:to-juwura-cream transition-all shadow-xl fade-in-element opacity-0"
          >
            Inquire About Custom Orders
          </motion.button>
        </motion.div>
      </ParallaxSection>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-juwura-cream/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <Star className="w-10 h-10 text-juwura-brown mx-auto mb-4" />
            <h2 className="text-4xl sm:text-5xl font-bold text-juwura-brown mb-6 font-playfair fade-in-element opacity-0">
              What Our Customers Say
            </h2>
            <p className="text-xl text-juwura-brown/80 max-w-3xl mx-auto fade-in-element opacity-0">
              Real stories from satisfied customers who have experienced the beauty of Juwura Adire
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-juwura-gold/30 fade-in-element opacity-0"
            >
              <p className="text-lg text-gray-700 mb-4 italic">
                "I absolutely love my new adire dress! The colors are so vibrant and the fabric feels amazing. I get compliments every time I wear it."
              </p>
              <div className="flex items-center mt-4">
                <img
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXxwcmluZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                  alt="Sarah J."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-juwura-brown font-semibold">Sarah J.</h4>
                  <p className="text-sm text-gray-500">Fashion Enthusiast</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-juwura-gold/30 fade-in-element opacity-0"
            >
              <p className="text-lg text-gray-700 mb-4 italic">
                "The quality of the adire fabric is exceptional. I bought a table runner and it has completely transformed my dining room. Highly recommend!"
              </p>
              <div className="flex items-center mt-4">
                <img
                  src="https://images.unsplash.com/photo-1573496876036-1c44cf64dd87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByaW5ldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt="David L."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-juwura-brown font-semibold">David L.</h4>
                  <p className="text-sm text-gray-500">Home Decorator</p>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-juwura-gold/30 fade-in-element opacity-0"
            >
              <p className="text-lg text-gray-700 mb-4 italic">
                "I purchased a custom-made adire shirt and the fit is perfect. The attention to detail is incredible. I will definitely be ordering again!"
              </p>
              <div className="flex items-center mt-4">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d674c8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByaW5ldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Emily K."
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-juwura-brown font-semibold">Emily K.</h4>
                  <p className="text-sm text-gray-500">Adire Enthusiast</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
