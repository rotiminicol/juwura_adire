import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ParallaxSection from "@/components/ParallaxSection";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Users, User, Gift, Home, Star, ChevronDown } from "lucide-react";

const categories = [
  { name: "All", icon: Sparkles },
  { name: "Women's Wear", icon: Users },
  { name: "Men's Wear", icon: User },
  { name: "Accessories", icon: Gift },
  { name: "Home Décor", icon: Home },
  { name: "New Arrival", icon: Star }
];

const products = [
  {
    id: 1,
    name: "Adire 1",
    price: 15000,
    image: "/wed2.png",
    description: "Traditional hand-dyed top with authentic adire pattern.",
    category: "Women's Wear",
    isNewArrival: true
  },
  {
    id: 2,
    name: "Adire 2",
    price: 25000,
    image: "/wed3.png",
    description: "Modern shift dress with classic adire design.",
    category: "Women's Wear"
  },
  {
    id: 3,
    name: "Adire 3",
    price: 8000,
    image: "/wed4.png",
    description: "Luxurious silk scarf with traditional indigo pattern.",
    category: "Accessories",
    isNewArrival: true
  },
  {
    id: 4,
    name: "Adire 4",
    price: 18000,
    image: "/wed5.png",
    description: "Contemporary shirt with subtle adire detailing.",
    category: "Men's Wear",
    isNewArrival: true
  },
  {
    id: 5,
    name: "Adire 5",
    price: 6000,
    image: "/wed6.png",
    description: "Hand-dyed pillow cover with traditional pattern.",
    category: "Home Décor"
  },
  {
    id: 6,
    name: "Adire 6",
    price: 22000,
    image: "/wed7.png",
    description: "Flowing maxi skirt with bold adire pattern.",
    category: "Women's Wear"
  },
  {
    id: 7,
    name: "Adire 7",
    price: 5000,
    image: "/wed8.png",
    description: "Unique bow tie with intricate adire pattern.",
    category: "Men's Wear"
  },
  {
    id: 8,
    name: "Adire 8",
    price: 12000,
    image: "/wed9.png",
    description: "Elegant table runner for dining or display.",
    category: "Home Décor"
  },
  {
    id: 9,
    name: "Adire 9",
    price: 14000,
    image: "/wed2.png",
    description: "Stylish clutch with traditional adire pattern.",
    category: "Accessories"
  },
  {
    id: 10,
    name: "Adire 10",
    price: 15000,
    image: "/wed3.png",
    description: "Beautiful adire piece with intricate patterns.",
    category: "Women's Wear"
  },
  {
    id: 11,
    name: "Adire 11",
    price: 20000,
    image: "/adire11.png",
    description: "Hand-dyed masterpiece with geometric patterns.",
    category: "Men's Wear"
  },
  {
    id: 12,
    name: "Adire 12",
    price: 18000,
    image: "/adire12.png",
    description: "Modern take on traditional adire design.",
    category: "Women's Wear"
  },
  {
    id: 13,
    name: "Adire 13",
    price: 16000,
    image: "/adire13.png",
    description: "Classic adire pattern with contemporary twist.",
    category: "Accessories"
  },
  {
    id: 14,
    name: "Adire 14",
    price: 19000,
    image: "/adire14.png",
    description: "Elegant adire piece for special occasions.",
    category: "Women's Wear"
  },
  {
    id: 15,
    name: "Adire 15",
    price: 17000,
    image: "/adire15.png",
    description: "Hand-dyed adire with modern elements.",
    category: "Men's Wear"
  },
  {
    id: 16,
    name: "Adire 16",
    price: 22000,
    image: "/adire1.png",
    description: "Luxury adire piece with premium materials.",
    category: "Women's Wear"
  },
  {
    id: 17,
    name: "Adire 17",
    price: 18000,
    image: "/adire18.png",
    description: "Hand-dyed adire piece with geometric patterns.",
    category: "Women's Wear"
  },
  {
    id: 18,
    name: "Adire 18",
    price: 25000,
    image: "/wed.png",
    description: "Elegant adire dress with contemporary design.",
    category: "Women's Wear"
  }
];

const Products = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredProducts(products);
    } else if (activeTab === "New Arrival") {
      setFilteredProducts(products.filter(product => product.isNewArrival));
    } else {
      setFilteredProducts(products.filter(product => product.category === activeTab));
    }
  }, [activeTab]);

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
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-20">
      {/* Enhanced Hero Section without gradient overlay */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Clean Background Images */}
        <motion.div
          className="absolute inset-0 opacity-30"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.img
            src="/wed2.png"
            alt="Adire Hero 1"
            initial={{ opacity: 0, y: 60, rotate: -8 }}
            animate={{ opacity: 0.4, y: 0, rotate: -5 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute left-0 top-0 w-1/3 max-w-sm pointer-events-none object-cover"
          />
          <motion.img
            src="/wed3.png"
            alt="Adire Hero 2"
            initial={{ opacity: 0, y: -60, rotate: 8 }}
            animate={{ opacity: 0.35, y: 0, rotate: 5 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="absolute right-0 top-0 w-1/3 max-w-sm pointer-events-none object-cover"
          />
          <motion.img
            src="/adire1.png"
            alt="Adire Hero 3"
            initial={{ opacity: 0, y: 60, rotate: -3 }}
            animate={{ opacity: 0.3, y: 0, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="absolute left-1/4 bottom-0 w-1/4 max-w-xs pointer-events-none object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center text-juwura-brown max-w-5xl mx-auto px-4 sm:px-6 py-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 sm:mb-8 font-playfair drop-shadow-lg">
              Discover Our Adire Collection
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Experience the timeless beauty of Nigerian craftsmanship with our hand-dyed adire pieces.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Products Section - Full width */}
      <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-juwura-cream to-white">
        <div className="w-full px-0">
          {/* Full width container on mobile, with background on desktop */}
          <div className="md:bg-white/95 md:backdrop-blur-sm md:border md:border-juwura-gold/30 md:rounded-none md:shadow-2xl md:p-6 sm:md:p-8 lg:md:p-12 xl:md:p-16">
            <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
              
              {/* Desktop Category Filters */}
              <div className="mb-12 sm:mb-16">
                {/* Desktop Tabs */}
                <div className="hidden md:block">
                  <TabsList className="w-full flex flex-wrap justify-center gap-3 mb-8 sm:mb-12 p-3 min-h-[60px] bg-gradient-to-r from-juwura-gold/20 to-juwura-cream/40 backdrop-blur-sm rounded-2xl border border-juwura-gold/30 shadow-xl">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <TabsTrigger
                          key={category.name}
                          value={category.name}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-juwura-gold shadow-md hover:shadow-lg h-12 ${
                            activeTab === category.name
                              ? "bg-gradient-to-r from-juwura-brown to-juwura-terracotta text-white shadow-xl scale-105"
                              : "bg-white/90 text-juwura-brown hover:bg-juwura-brown/10 border border-juwura-brown/20 hover:scale-102"
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span>{category.name}</span>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>

                {/* Mobile Dropdown */}
                <div className="md:hidden mb-8">
                  <Select value={activeTab} onValueChange={setActiveTab}>
                    <SelectTrigger className="w-full bg-white/90 border-2 border-juwura-brown/30 rounded-xl p-4 text-lg font-semibold text-juwura-brown h-14 shadow-lg">
                      <div className="flex items-center gap-3">
                        {(() => {
                          const category = categories.find(cat => cat.name === activeTab);
                          const IconComponent = category?.icon || Sparkles;
                          return (
                            <>
                              <IconComponent className="w-5 h-5" />
                              <SelectValue placeholder="Select Category" />
                            </>
                          );
                        })()}
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border border-juwura-gold/30 rounded-xl shadow-2xl">
                      {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <SelectItem 
                            key={category.name} 
                            value={category.name}
                            className="flex items-center gap-3 p-4 text-lg font-medium text-juwura-brown hover:bg-juwura-brown/10 rounded-lg cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <IconComponent className="w-5 h-5" />
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <AnimatePresence>
                {categories.map((category) => (
                  <TabsContent key={category.name} value={category.name} className="mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Category Header */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                      >
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <category.icon className="w-8 h-8 text-juwura-brown" />
                          <h2 className="text-3xl sm:text-4xl font-bold text-juwura-brown font-playfair">
                            {category.name === "All" ? "All Products" : category.name}
                          </h2>
                        </div>
                        <p className="text-lg text-juwura-brown/70 max-w-2xl mx-auto">
                          {category.name === "All" ? "Explore our complete collection of authentic adire pieces" :
                           category.name === "Women's Wear" ? "Elegant dresses, tops, and skirts with traditional patterns" :
                           category.name === "Men's Wear" ? "Contemporary shirts and accessories with subtle adire detailing" :
                           category.name === "Accessories" ? "Beautiful scarves, bags, and jewelry to complement your style" :
                           category.name === "Home Décor" ? "Transform your space with handcrafted adire home accessories" :
                           "Discover our latest arrivals and trending pieces"}
                        </p>
                      </motion.div>

                      {/* Products Grid - Full width */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full"
                      >
                        {/* Mobile Grid - Full width, single card per row */}
                        <div className="block md:hidden w-full">
                          <div className="flex flex-col gap-6 px-4">
                            {filteredProducts.map((product, idx) => (
                              <motion.div
                                key={product.id}
                                className="fade-in-element opacity-0 w-full"
                                initial={{ y: 40, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: idx * 0.08 }}
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

                        {/* Desktop Grid - Increased card width */}
                        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-center items-stretch px-8">
                          {filteredProducts.map((product, idx) => (
                            <motion.div
                              key={product.id}
                              className="fade-in-element opacity-0 flex justify-center items-stretch"
                              initial={{ y: 40, opacity: 0, scale: 0.9 }}
                              animate={{ y: 0, opacity: 1, scale: 1 }}
                              transition={{ duration: 0.6, delay: idx * 0.08 }}
                              whileHover={{ y: -5 }}
                            >
                              <ProductCard 
                                {...product} 
                                isNewArrival={product.isNewArrival} 
                                cardClassName="w-full max-w-[420px] h-[520px] bg-white/95 backdrop-blur-sm shadow-xl hover:shadow-2xl border border-juwura-gold/30 rounded-2xl transition-all duration-300" 
                              />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {filteredProducts.length === 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-center py-16 sm:py-20 fade-in-element opacity-0"
                        >
                          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-juwura-gold/30 max-w-md mx-auto">
                            <category.icon className="w-16 h-16 mx-auto mb-6 text-juwura-brown/50" />
                            <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-juwura-brown">No products found</h3>
                            <p className="text-lg text-gray-600">
                              Please check back later or explore other categories.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </div>
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
    </div>
  );
};

export default Products;
