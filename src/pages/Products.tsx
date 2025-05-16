import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParallaxSection from "@/components/ParallaxSection";
import ProductCard from "@/components/ProductCard";

// Define product categories
const categories = [
  "All",
  "Women's Wear",
  "Men's Wear",
  "Accessories",
  "Home Décor",
  "New Arrivals"
];

// Product data with added isNewArrival property
const products = [
  {
    id: 1,
    name: "Adire 1",
    price: 15000,
    image: "/adire1.png",
    description: "Traditional hand-dyed top with authentic adire pattern.",
    category: "Women's Wear",
    isNewArrival: true
  },
  {
    id: 2,
    name: "Adire 2",
    price: 25000,
    image: "/adire2.png",
    description: "Modern shift dress with classic adire design.",
    category: "Women's Wear"
  },
  {
    id: 3,
    name: "Adire 3",
    price: 8000,
    image: "/adire3.png",
    description: "Luxurious silk scarf with traditional indigo pattern.",
    category: "Accessories",
    isNewArrival: true
  },
  {
    id: 4,
    name: "Adire 4",
    price: 18000,
    image: "/adire4.png",
    description: "Contemporary shirt with subtle adire detailing.",
    category: "Men's Wear",
    isNewArrival: true
  },
  {
    id: 5,
    name: "Adire 5",
    price: 6000,
    image: "/adire5.png",
    description: "Hand-dyed pillow cover with traditional pattern.",
    category: "Home Décor"
  },
  {
    id: 6,
    name: "Adire 6",
    price: 22000,
    image: "/adire6.png",
    description: "Flowing maxi skirt with bold adire pattern.",
    category: "Women's Wear"
  },
  {
    id: 7,
    name: "Adire 7",
    price: 5000,
    image: "/adire7.png",
    description: "Unique bow tie with intricate adire pattern.",
    category: "Men's Wear"
  },
  {
    id: 8,
    name: "Adire 8",
    price: 12000,
    image: "/adire8.png",
    description: "Elegant table runner for dining or display.",
    category: "Home Décor"
  },
  {
    id: 9,
    name: "Adire 9",
    price: 14000,
    image: "/adire9.png",
    description: "Stylish clutch with traditional adire pattern.",
    category: "Accessories"
  },
  {
    id: 10,
    name: "Adire 10",
    price: 15000,
    image: "/adire10.png",
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
    image: "/adire16.png",
    description: "Luxury adire piece with premium materials.",
    category: "Women's Wear"
  },
  {
    id: 17,
    name: "Adire 17",
    price: 18000,
    image: "/adire17.png",
    description: "Hand-dyed adire piece with geometric patterns.",
    category: "Women's Wear"
  },
  {
    id: 18,
    name: "Adire 18",
    price: 25000,
    image: "/adire18.png",
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
      const newArrivals = products.filter(product => product.isNewArrival);
      setFilteredProducts(newArrivals);
    } else {
      const filtered = products.filter(product => product.category === activeTab);
      setFilteredProducts(filtered);
    }
  }, [activeTab]);

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
  }, [filteredProducts]);

  return (
    <div className="overflow-hidden">
      {/* Header - adjusted for better spacing */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1613280197550-bca3d1f29454?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.3}
        className="min-h-[40vh] bg-juwura-brown/50"
        spacing="large"
      >
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Collection</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the perfect blend of tradition and contemporary style
          </p>
        </div>
      </ParallaxSection>

      {/* Products Section - improved spacing */}
      <ParallaxSection 
        bgColor="#FEF7E5" 
        speed={0.1}
        spacing="xl"
      >
        {/* Category Tabs */}
        <div className="mb-16 fade-in-element opacity-0">
          <Tabs defaultValue="All" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent w-full flex flex-wrap justify-center gap-4 h-auto mb-12">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeTab === category
                      ? "bg-juwura-brown text-white data-[state=active]:bg-juwura-brown data-[state=active]:text-white"
                      : "bg-white text-juwura-brown hover:bg-juwura-brown/10 data-[state=active]:bg-white"
                  }`}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-12">
                <div className="product-grid">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="fade-in-element opacity-0">
                      <ProductCard {...product} isNewArrival={product.isNewArrival} />
                    </div>
                  ))}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-16 fade-in-element opacity-0">
                    <h3 className="text-2xl font-medium">No products found in this category</h3>
                    <p className="mt-4 text-lg text-gray-600">
                      Please check back later or explore other categories.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </ParallaxSection>

      {/* Custom Orders - improved spacing */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.4}
        spacing="large"
      >
        <div className="bg-juwura-brown/80 text-white p-10 md:p-16 rounded-lg max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 fade-in-element opacity-0">Custom Orders</h2>
          <p className="text-xl mb-10 fade-in-element opacity-0">
            Looking for something unique? We offer bespoke services to create 
            the perfect adire piece tailored specifically to your preferences.
          </p>
          <button className="bg-juwura-cream text-juwura-brown px-8 py-3 rounded-md text-lg font-medium hover:bg-white transition-colors fade-in-element opacity-0">
            Inquire About Custom Orders
          </button>
        </div>
      </ParallaxSection>

      {/* Care Instructions - improved spacing */}
      <ParallaxSection 
        bgColor="#FEF7E5" 
        speed={0.2}
        spacing="xl"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center fade-in-element opacity-0">
            Care Instructions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center fade-in-element opacity-0">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-juwura-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Washing</h3>
              <p>
                Hand wash your adire pieces in cold water with a mild detergent. 
                Avoid harsh chemicals and bleach to maintain the vibrancy of the colors.
              </p>
            </div>
            
            <div className="text-center fade-in-element opacity-0">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-juwura-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Drying</h3>
              <p>
                Dry your adire items in the shade to prevent fading. 
                Avoid direct sunlight and hang or lay flat to preserve the fabric's integrity.
              </p>
            </div>
            
            <div className="text-center fade-in-element opacity-0">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-juwura-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-3">Storage</h3>
              <p>
                Store your adire pieces folded in a cool, dry place away from direct sunlight. 
                Ensure they are completely dry before storing to prevent mildew.
              </p>
            </div>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Products;
