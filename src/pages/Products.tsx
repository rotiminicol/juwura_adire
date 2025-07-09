
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParallaxSection from "@/components/ParallaxSection";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const categories = [
  "All",
  "Women's Wear",
  "Men's Wear",
  "Accessories",
  "Home Décor",
  "New Arrival"
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
    <div className="min-h-screen bg-juwura-cream">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-juwura-brown/80 via-juwura-gold/10 to-juwura-cream overflow-hidden">
        {/* Animated Layered Images */}
        <motion.img
          src="/wed2.png"
          alt="Adire Hero 1"
          initial={{ opacity: 0, y: 60, scale: 1.1 }}
          animate={{ opacity: 0.18, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute left-0 top-0 w-1/3 max-w-xs sm:max-w-sm md:max-w-md opacity-20 rotate-[-8deg] pointer-events-none select-none"
        />
        <motion.img
          src="/wed3.png"
          alt="Adire Hero 2"
          initial={{ opacity: 0, y: -60, scale: 1.1 }}
          animate={{ opacity: 0.16, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute right-0 top-0 w-1/3 max-w-xs sm:max-w-sm md:max-w-md opacity-20 rotate-[7deg] pointer-events-none select-none"
        />
        <motion.img
          src="/adire1.png"
          alt="Adire Hero 3"
          initial={{ opacity: 0, y: 60, scale: 1.1 }}
          animate={{ opacity: 0.13, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="absolute left-1/4 bottom-0 w-1/4 max-w-xs opacity-20 rotate-[-3deg] pointer-events-none select-none"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 py-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 font-playfair drop-shadow-lg">
            Discover Our Adire Collection
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto drop-shadow">
            Experience the timeless beauty of Nigerian craftsmanship with our hand-dyed adire pieces.
          </p>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="w-full py-12 sm:py-16 bg-juwura-cream">
        <div className="w-full mx-auto px-2 sm:px-6 md:max-w-[1800px]">
          <div className="bg-white/95 border border-juwura-gold/30 rounded-3xl shadow-2xl p-2 sm:p-6 md:p-10 lg:p-12">
            <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList
                className="w-full flex gap-2 sm:gap-4 mb-8 sm:mb-12 px-1 sm:px-0 py-4 min-h-[72px] sticky top-0 z-20 border-b border-juwura-gold/20 bg-white/90 overflow-x-auto whitespace-nowrap md:overflow-x-visible md:whitespace-normal md:justify-center static-tabs-row relative"
                style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
                aria-label="Product categories"
              >
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className={`px-5 sm:px-8 py-4 sm:py-5 rounded-full font-bold uppercase tracking-wider text-base sm:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-juwura-gold ${activeTab === category ? "bg-juwura-brown text-white shadow-md" : "bg-white text-juwura-brown hover:bg-juwura-brown/10 border border-juwura-brown/20"}`}
                    style={{ minWidth: '140px', marginRight: '4px', letterSpacing: '0.08em', minHeight: '56px' }}
                    aria-label={`Show ${category} products`}
                  >
                    {category}
                  </TabsTrigger>
                ))}
                {/* Right gradient fade for mobile scroll hint */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/90 to-transparent hidden md:block" />
              </TabsList>

              <AnimatePresence>
                {categories.map((category) => (
                  <TabsContent key={category} value={category} className="mt-6 sm:mt-8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-14 justify-center items-stretch"
                    >
                      {filteredProducts.map((product, idx) => (
                        <motion.div
                          key={product.id}
                          className="fade-in-element opacity-0 flex justify-center items-stretch"
                          initial={{ y: 30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: idx * 0.08 }}
                        >
                          <ProductCard {...product} isNewArrival={product.isNewArrival} cardClassName="w-[440px] h-[600px] md:w-[440px] md:h-[600px]" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {filteredProducts.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 sm:py-16 fade-in-element opacity-0"
                      >
                        <h3 className="text-xl sm:text-2xl font-medium">No products found in this category</h3>
                        <p className="mt-4 text-base sm:text-lg text-gray-600">
                          Please check back later or explore other categories.
                        </p>
                      </motion.div>
                    )}
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Custom Orders Section */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.4}
        spacing="large"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-juwura-brown/80 text-white p-8 sm:p-12 rounded-2xl max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 font-playfair fade-in-element opacity-0">
            Create Your Unique Adire Piece
          </h2>
          <p className="text-base sm:text-lg mb-8 sm:mb-10 fade-in-element opacity-0">
            Craft a bespoke adire masterpiece tailored to your style. Our artisans bring your vision to life with authentic techniques.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-juwura-cream text-juwura-brown px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:bg-white transition-colors fade-in-element opacity-0"
          >
            Inquire About Custom Orders
          </motion.button>
        </motion.div>
      </ParallaxSection>
      {/* Hide scrollbars for horizontal filter list */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (min-width: 768px) {
          .static-tabs-row {
            overflow-x: visible !important;
            white-space: normal !important;
            justify-content: center !important;
            background: #fff9f2 !important;
            border-radius: 2rem !important;
            box-shadow: 0 2px 16px 0 rgba(80,60,30,0.04);
            margin-left: auto;
            margin-right: auto;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            min-height: 72px !important;
            align-items: center !important;
          }
        }
        @media (max-width: 767px) {
          .static-tabs-row {
            overflow-x: auto !important;
            white-space: nowrap !important;
            justify-content: flex-start !important;
            background: #fff9f2 !important;
            border-radius: 2rem !important;
            box-shadow: 0 2px 16px 0 rgba(80,60,30,0.04);
            margin-left: 0;
            margin-right: 0;
            padding-left: 0.5rem;
            padding-right: 2.5rem;
            min-height: 72px !important;
            align-items: center !important;
            scrollbar-width: none !important;
          }
          .static-tabs-row::-webkit-scrollbar {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
