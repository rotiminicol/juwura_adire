
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ParallaxSection from "@/components/ParallaxSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Sample product data
const products = [
  {
    id: "1",
    name: "Adire Eleko Top",
    price: 15000,
    images: [
      "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Traditional hand-dyed top with authentic adire pattern. This versatile piece features a unique pattern created using the adire eleko technique, where cassava starch is applied by hand to create resist patterns before dyeing. The result is a one-of-a-kind garment that celebrates Nigerian heritage while offering contemporary style.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Hand wash cold",
      "Made in Nigeria",
      "Available in sizes S-XL"
    ],
    category: "Women's Wear"
  },
  {
    id: "2",
    name: "Kampala Shift Dress",
    price: 25000,
    images: [
      "https://images.unsplash.com/photo-1503160865267-3e277ffb3ff0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503160865267-3e277ffb3ff0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503160865267-3e277ffb3ff0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Modern shift dress with classic adire design. This elegant dress combines traditional adire patterning with a contemporary silhouette, perfect for both casual and semi-formal occasions. The breathable cotton fabric ensures comfort in warm weather while the unique pattern tells the story of Nigerian textile heritage.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Hand wash cold",
      "Made in Nigeria",
      "Available in sizes S-XL"
    ],
    category: "Women's Wear"
  },
  {
    id: "3",
    name: "Adire Silk Scarf",
    price: 8000,
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Luxurious silk scarf with traditional indigo pattern. This versatile accessory can be worn in numerous ways - as a headwrap, neck scarf, or even as a bag accessory. The premium silk material gives a luxurious sheen to the traditional adire patterns, creating a beautiful blend of heritage and luxury.",
    details: [
      "100% Silk",
      "Natural indigo dye",
      "Dry clean only",
      "Made in Nigeria",
      "Size: 90cm x 90cm"
    ],
    category: "Accessories"
  }
];

// Sample related products
const relatedProducts = [
  {
    id: 4,
    name: "Men's Adire Shirt",
    price: 18000,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Contemporary shirt with subtle adire detailing.",
    category: "Men's Wear"
  },
  {
    id: 5,
    name: "Indigo Throw Pillow",
    price: 6000,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Hand-dyed pillow cover with traditional pattern.",
    category: "Home Décor"
  },
  {
    id: 6,
    name: "Adire Maxi Skirt",
    price: 22000,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Flowing maxi skirt with bold adire pattern.",
    category: "Women's Wear"
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Find the product that matches the ID
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(0); // Reset selected image when product changes
    }
    
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    toast({
      title: "Item Added to Cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
      variant: "default",
    });
    
    console.log("Added to cart:", { 
      product: product.name, 
      quantity, 
      price: product.price 
    });
  };
  
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
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-juwura-cream pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="bg-juwura-brown text-white px-6 py-2 rounded-md hover:bg-opacity-90"
          >
            View All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <ParallaxSection bgColor="#FEF7E5" speed={0.1}>
        {/* Breadcrumb Navigation */}
        <div className="mb-8 fade-in-element opacity-0">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 hover:text-juwura-brown">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link to="/products" className="text-gray-600 hover:text-juwura-brown">
                    Products
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-juwura-brown font-medium">
                    {product.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4 fade-in-element opacity-0">
            <div className="overflow-hidden rounded-lg bg-white">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? "border-juwura-brown" 
                      : "border-transparent hover:border-juwura-brown/50"
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="fade-in-element opacity-0">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-juwura-terracotta text-xl font-medium mb-4">
              ₦{product.price.toLocaleString()}
            </p>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-3">Product Details</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {product.details.map((detail: string, index: number) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-gray-200 px-3 py-2 rounded-l-md"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-16 px-3 py-2 text-center border-y border-gray-200"
                />
                <button
                  type="button"
                  className="bg-gray-200 px-3 py-2 rounded-r-md"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleAddToCart}
                className="bg-juwura-brown text-white hover:bg-juwura-terracotta py-6 flex-grow"
              >
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                className="border-juwura-brown text-juwura-brown hover:bg-juwura-brown hover:text-white py-6 flex-grow"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Related Products */}
      <ParallaxSection 
        bgColor="#FFFFFF" 
        speed={0.2}
        className="border-t border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-12 text-center fade-in-element opacity-0">
          You May Also Like
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((product) => (
            <div key={product.id} className="fade-in-element opacity-0">
              <Link to={`/products/${product.id}`} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                  <div className="overflow-hidden h-64 relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <span className="text-juwura-brown font-medium">₦{product.price.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </ParallaxSection>
    </div>
  );
};

export default ProductDetail;
