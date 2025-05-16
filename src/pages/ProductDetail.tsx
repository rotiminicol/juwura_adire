
import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useParams, Link } from "react-router-dom";
import ParallaxSection from "@/components/ParallaxSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Sample product data
const products = [
  {
    id: "1",
    name: "Adire 1",
    price: 15000,
    images: [
      "/adire1.png",
      "/adire1.png",
      "/adire1.png"
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
    name: "Adire 2",
    price: 25000,
    images: [
      "/adire2.png",
      "/adire2.png",
      "/adire2.png"
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
    name: "Adire 3",
    price: 8000,
    images: [
      "/adire3.png",
      "/adire3.png",
      "/adire3.png"
    ],
    description: "Luxurious silk scarf with traditional indigo pattern. This hand-dyed scarf features a classic adire pattern created using the tie-dye technique. The soft silk fabric drapes beautifully and the natural indigo dye ensures the colors remain vibrant over time.",
    details: [
      "100% Silk",
      "Natural indigo dye",
      "Hand wash cold",
      "Made in Nigeria",
      "Dimensions: 150cm x 30cm"
    ],
    category: "Accessories"
  },
  {
    id: "4",
    name: "Adire 4",
    price: 18000,
    images: [
      "/adire4.png",
      "/adire4.png",
      "/adire4.png"
    ],
    description: "Contemporary shirt with subtle adire detailing. This modern shirt features a unique adire pattern that adds a touch of Nigerian heritage to your wardrobe. The pattern is created using the tie-dye technique, ensuring each shirt is one-of-a-kind.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Machine wash cold",
      "Made in Nigeria",
      "Available in sizes S-XL"
    ],
    category: "Men's Wear"
  },
  {
    id: "5",
    name: "Adire 5",
    price: 6000,
    images: [
      "/adire5.png",
      "/adire5.png",
      "/adire5.png"
    ],
    description: "Hand-dyed pillow cover with traditional pattern. This throw pillow features a classic adire pattern created using the tie-dye technique. The natural indigo dye gives the pillow a rich, deep blue color that adds a touch of elegance to any room.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Machine wash cold",
      "Made in Nigeria",
      "Dimensions: 45cm x 45cm"
    ],
    category: "Home Décor"
  },
  {
    id: "6",
    name: "Adire 6",
    price: 22000,
    images: [
      "/adire6.png",
      "/adire6.png",
      "/adire6.png"
    ],
    description: "Flowing maxi skirt with bold adire pattern. This elegant skirt combines traditional adire patterning with a contemporary silhouette. The breathable cotton fabric ensures comfort in warm weather while the unique pattern tells the story of Nigerian textile heritage.",
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
    id: "7",
    name: "Adire 7",
    price: 5000,
    images: [
      "/adire7.png",
      "/adire7.png",
      "/adire7.png"
    ],
    description: "Unique bow tie with intricate adire pattern. This hand-dyed bow tie features a classic adire pattern created using the tie-dye technique. The natural indigo dye ensures the colors remain vibrant over time.",
    details: [
      "100% Silk",
      "Natural indigo dye",
      "Hand wash cold",
      "Made in Nigeria",
      "Dimensions: 15cm x 7cm"
    ],
    category: "Men's Wear"
  },
  {
    id: "8",
    name: "Adire 8",
    price: 12000,
    images: [
      "/adire8.png",
      "/adire8.png",
      "/adire8.png"
    ],
    description: "Elegant table runner for dining or display. This hand-dyed table runner features a classic adire pattern created using the tie-dye technique. The natural indigo dye gives the runner a rich, deep blue color that adds a touch of elegance to any dining table.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Machine wash cold",
      "Made in Nigeria",
      "Dimensions: 150cm x 40cm"
    ],
    category: "Home Décor"
  },
  {
    id: "9",
    name: "Adire 9",
    price: 14000,
    images: [
      "/adire9.png",
      "/adire9.png",
      "/adire9.png"
    ],
    description: "Stylish clutch with traditional adire pattern. This hand-dyed clutch bag features a classic adire pattern created using the tie-dye technique. The natural indigo dye ensures the colors remain vibrant over time.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Hand wash cold",
      "Made in Nigeria",
      "Dimensions: 25cm x 15cm"
    ],
    category: "Accessories"
  },
  {
    id: "10",
    name: "Adire 10",
    price: 15000,
    images: [
      "/adire10.png",
      "/adire10.png",
      "/adire10.png"
    ],
    description: "Beautiful adire piece with intricate patterns. This hand-dyed piece features a unique adire pattern created using the tie-dye technique. The natural indigo dye ensures the colors remain vibrant over time.",
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
    id: "11",
    name: "Adire 11",
    price: 20000,
    images: [
      "/adire11.png",
      "/adire11.png",
      "/adire11.png"
    ],
    description: "Hand-dyed masterpiece with geometric patterns. This unique piece features a classic adire pattern created using the tie-dye technique. The natural indigo dye ensures the colors remain vibrant over time.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Hand wash cold",
      "Made in Nigeria",
      "Available in sizes S-XL"
    ],
    category: "Men's Wear"
  },
  {
    id: "12",
    name: "Adire 12",
    price: 18000,
    images: [
      "/adire12.png",
      "/adire12.png",
      "/adire12.png"
    ],
    description: "Modern take on traditional adire design. This contemporary piece combines traditional adire patterning with a modern silhouette. The breathable cotton fabric ensures comfort in warm weather while the unique pattern tells the story of Nigerian textile heritage.",
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
    id: "13",
    name: "Adire 13",
    price: 16000,
    images: [
      "/adire13.png",
      "/adire13.png",
      "/adire13.png"
    ],
    description: "Classic adire pattern with contemporary twist. This hand-dyed piece features a classic adire pattern created using the tie-dye technique. The natural indigo dye ensures the colors remain vibrant over time.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Hand wash cold",
      "Made in Nigeria",
      "Available in sizes S-XL"
    ],
    category: "Accessories"
  },
  {
    id: "14",
    name: "Adire 14",
    price: 19000,
    images: [
      "/adire14.png",
      "/adire14.png",
      "/adire14.png"
    ],
    description: "Elegant adire piece for special occasions. This hand-dyed piece features a classic adire pattern created using the tie-dye technique. The natural indigo dye ensures the colors remain vibrant over time.",
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
    id: "15",
    name: "Adire 15",
    price: 17000,
    images: [
      "/adire15.png",
      "/adire15.png",
      "/adire15.png"
    ],
    description: "Hand-dyed adire with modern elements. This unique piece features a classic adire pattern created using the tie-dye technique. The natural indigo dye ensures the colors remain vibrant over time.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Hand wash cold",
      "Made in Nigeria",
      "Available in sizes S-XL"
    ],
    category: "Men's Wear"
  },
  {
    id: "16",
    name: "Adire 16",
    price: 22000,
    images: [
      "/adire16.png",
      "/adire16.png",
      "/adire16.png"
    ],
    description: "Luxury adire piece with premium materials. This hand-dyed piece features a classic adire pattern created using the tie-dye technique. The natural indigo dye ensures the colors remain vibrant over time.",
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
    id: "17",
    name: "Adire 17",
    price: 18000,
    images: [
      "/adire17.png",
      "/adire17.png",
      "/adire17.png"
    ],
    description: "Hand-dyed adire piece with geometric patterns. This unique piece features a modern take on traditional adire patterns, combining geometric shapes with natural indigo dye. The cotton fabric ensures comfort while showcasing the craftsmanship of Nigerian artisans.",
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
    id: "18",
    name: "Adire 18",
    price: 25000,
    images: [
      "/adire18.png",
      "/adire18.png",
      "/adire18.png"
    ],
    description: "Elegant adire dress with contemporary design. This stunning dress combines traditional adire patterning with modern fashion sensibilities. The flowing silhouette and vibrant indigo dye make it perfect for special occasions.",
    details: [
      "100% Cotton",
      "Natural indigo dye",
      "Hand wash cold",
      "Made in Nigeria",
      "Available in sizes S-XL"
    ],
    category: "Women's Wear"
  }
];

// Sample related products
const relatedProducts = [
  {
    id: 4,
    name: "Men's Adire Shirt",
    price: 18000,
    image: "/adire4.png",
    description: "Contemporary shirt with subtle adire detailing.",
    category: "Men's Wear"
  },
  {
    id: 5,
    name: "Indigo Throw Pillow",
    price: 6000,
    image: "/adire5.png",
    description: "Hand-dyed pillow cover with traditional pattern.",
    category: "Home Décor"
  },
  {
    id: 6,
    name: "Adire Maxi Skirt",
    price: 22000,
    image: "/adire6.png",
    description: "Flowing maxi skirt with bold adire pattern.",
    category: "Women's Wear"
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

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
    
    addToCart(
      product.id,
      product.name,
      product.price,
      product.images[0],
      quantity
    );
    
    toast({
      title: "Item Added to Cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
      variant: "default",
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
              <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline"
                    className="border-juwura-brown text-juwura-brown hover:bg-juwura-brown hover:text-white py-6 flex-grow"
                  >
                    Buy Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">
                        Delivery Address
                      </Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
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
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">
                        Total Amount
                      </Label>
                      <p className="text-juwura-terracotta font-medium">
                        ₦{(product?.price * quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => {
                        // Here you would typically make an API call to process the order
                        toast({
                          title: "Order Placed Successfully",
                          description: `Your order for ${quantity} x ${product?.name} has been placed. We will contact you shortly for confirmation.`,
                          variant: "default",
                        });
                        setIsCheckoutOpen(false);
                      }}
                    >
                      Place Order
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
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
