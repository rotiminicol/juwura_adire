
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParallaxSection from "@/components/ParallaxSection";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

// Define product categories
const categories = [
  "All",
  "Women's Wear",
  "Men's Wear",
  "Accessories",
  "Home Décor",
  "New Arrivals"
];

// Product data

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
    } else if (activeTab === "New Arrivals") {
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
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1613280197550-bca3d1f29454?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.3}
        className="min-h-[60vh] flex items-center justify-center bg-juwura-brown/60"
        spacing="large"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-white max-w-5xl mx-auto px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair">
            Discover Our Adire Collection
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Experience the timeless beauty of Nigerian craftsmanship with our hand-dyed adire pieces.
          </p>
        </motion.div>
      </ParallaxSection>

      {/* Products Section */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.1} spacing="xl">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent w-full flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={`px-6 py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                    activeTab === category
                      ? "bg-juwura-brown text-white shadow-lg"
                      : "bg-white text-juwura-brown hover:bg-juwura-brown/10"
                  }`}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence>
              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        className="fade-in-element opacity-0"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ProductCard {...product} isNewArrival={product.isNewArrival} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {filteredProducts.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16 fade-in-element opacity-0"
                    >
                      <h3 className="text-2xl font-medium">No products found in this category</h3>
                      <p className="mt-4 text-lg text-gray-600">
                        Please check back later or explore other categories.
                      </p>
                    </motion.div>
                  )}
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </div>
      </ParallaxSection>

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
          className="bg-juwura-brown/80 text-white p-10 md:p-16 rounded-2xl max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-8 font-playfair fade-in-element opacity-0">
            Create Your Unique Adire Piece
          </h2>
          <p className="text-xl mb-10 fade-in-element opacity-0">
            Craft a bespoke adire masterpiece tailored to your style. Our artisans bring your vision to life with authentic techniques.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-juwura-cream text-juwura-brown px-8 py-3 rounded-full text-lg font-medium hover:bg-white transition-colors fade-in-element opacity-0"
          >
            Inquire About Custom Orders
          </motion.button>
        </motion.div>
      </ParallaxSection>
    </div>
  );
};

export default Products;


