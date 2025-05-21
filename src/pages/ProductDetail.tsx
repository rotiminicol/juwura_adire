import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useParams, Link, useNavigate } from "react-router-dom";
import ParallaxSection from "@/components/ParallaxSection";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";

const products: Product[] = [
 {
    id: "1",
    name: "Adire 1",
    price: 15000,
    images: ["/wed2.png", "/wed2.png", "/wed2.png"],
    description: "Traditional hand-dyed top with authentic adire pattern. This versatile piece features a unique pattern created using the adire eleko technique, where cassava starch is applied by hand to create resist patterns before dyeing.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  },
  {
    id: "2",
    name: "Adire 2",
    price: 25000,
    images: ["/wed3.png", "/wed3.png", "/wed3.png"],
    description: "Modern shift dress with classic adire design. This elegant dress combines traditional adire patterning with a contemporary silhouette, perfect for both casual and semi-formal occasions.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  },
  {
    id: "3",
    name: "Adire 3",
    price: 8000,
    images: ["/wed4.png", "/wed4.png", "/wed4.png"],
    description: "Luxurious silk scarf with traditional indigo pattern. This hand-dyed scarf features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Silk", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Dimensions: 150cm x 30cm"],
    category: "Accessories"
  },
  {
    id: "4",
    name: "Adire 4",
    price: 18000,
    images: ["/wed5.png", "/wed5.png", "/wed5.png"],
    description: "Contemporary shirt with subtle adire detailing. This modern shirt features a unique adire pattern that adds a touch of Nigerian heritage to your wardrobe.",
    details: ["100% Cotton", "Natural indigo dye", "Machine wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Men's Wear"
  },
  {
    id: "5",
    name: "Adire 5",
    price: 6000,
    images: ["/wed6.png", "/wed6.png", "/wed6.png"],
    description: "Hand-dyed pillow cover with traditional pattern. This throw pillow features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Cotton", "Natural indigo dye", "Machine wash cold", "Made in Nigeria", "Dimensions: 45cm x 45cm"],
    category: "Home Décor"
  },
  {
    id: "6",
    name: "Adire 6",
    price: 22000,
    images: ["/wed7.png", "/wed7.png", "/wed7.png"],
    description: "Flowing maxi skirt with bold adire pattern. This elegant skirt combines traditional adire patterning with a contemporary silhouette.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  },
  {
    id: "7",
    name: "Adire 7",
    price: 5000,
    images: ["/wed8.png", "/wed8.png", "/wed8.png"],
    description: "Unique bow tie with intricate adire pattern. This hand-dyed bow tie features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Silk", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Dimensions: 15cm x 7cm"],
    category: "Men's Wear"
  },
  {
    id: "8",
    name: "Adire 8",
    price: 12000,
    images: ["/wed9.png", "/wed9.png", "/wed9.png"],
    description: "Elegant table runner for dining or display. This hand-dyed table runner features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Cotton", "Natural indigo dye", "Machine wash cold", "Made in Nigeria", "Dimensions: 150cm x 40cm"],
    category: "Home Décor"
  },
  {
    id: "9",
    name: "Adire 9",
    price: 14000,
    images: ["/wed2.png", "/wed2.png", "/wed2.png"],
    description: "Stylish clutch with traditional adire pattern. This hand-dyed clutch bag features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Dimensions: 25cm x 15cm"],
    category: "Accessories"
  },
  {
    id: "10",
    name: "Adire 10",
    price: 15000,
    images: ["/wed3.png", "/wed3.png", "/wed3.png"],
    description: "Beautiful adire piece with intricate patterns. This hand-dyed piece features a unique adire pattern created using the tie-dye technique.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  },
  {
    id: "11",
    name: "Adire 11",
    price: 20000,
    images: ["/adire11.png", "/adire11.png", "/adire11.png"],
    description: "Hand-dyed masterpiece with geometric patterns. This unique piece features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Men's Wear"
  },
  {
    id: "12",
    name: "Adire 12",
    price: 18000,
    images: ["/adire12.png", "/adire12.png", "/adire12.png"],
    description: "Modern take on traditional adire design. This contemporary piece combines traditional adire patterning with a modern silhouette.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  },
  {
    id: "13",
    name: "Adire 13",
    price: 16000,
    images: ["/adire13.png", "/adire13.png", "/adire13.png"],
    description: "Classic adire pattern with contemporary twist. This hand-dyed piece features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Accessories"
  },
  {
    id: "14",
    name: "Adire 14",
    price: 19000,
    images: ["/adire14.png", "/adire14.png", "/adire14.png"],
    description: "Elegant adire piece for special occasions. This hand-dyed piece features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  },
  {
    id: "15",
    name: "Adire 15",
    price: 17000,
    images: ["/adire15.png", "/adire15.png", "/adire15.png"],
    description: "Hand-dyed adire with modern elements. This unique piece features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Men's Wear"
  },
  {
    id: "16",
    name: "Adire 16",
    price: 22000,
    images: ["/adire1.png", "/adire1.png", "/adire1.png"],
    description: "Luxury adire piece with premium materials. This hand-dyed piece features a classic adire pattern created using the tie-dye technique.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  },
  {
    id: "17",
    name: "Adire 17",
    price: 18000,
    images: ["/adire18.png", "/adire18.png", "/adire18.png"],
    description: "Hand-dyed adire piece with geometric patterns. This unique piece features a modern take on traditional adire patterns, combining geometric shapes with natural indigo dye.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  },
  {
    id: "18",
    name: "Adire 18",
    price: 25000,
    images: ["/wed.png", "/wed.png", "/wed.png"],
    description: "Elegant adire dress with contemporary design. This stunning dress combines traditional adire patterning with modern fashion sensibilities.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  }
  // ... (other products, ensuring they match Product type)
];

const relatedProducts: Product[] = [
  {
    id: "4",
    name: "Men's Adire Shirt",
    price: 18000,
    images: ["/adire4.png"],
    description: "Contemporary shirt with subtle adire detailing.",
    details: ["100% Cotton", "Natural indigo dye", "Machine wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Men's Wear"
  },
  {
    id: "5",
    name: "Indigo Throw Pillow",
    price: 6000,
    images: ["/adire5.png"],
    description: "Hand-dyed pillow cover with traditional pattern.",
    details: ["100% Cotton", "Natural indigo dye", "Machine wash cold", "Made in Nigeria", "Dimensions: 45cm x 45cm"],
    category: "Home Décor"
  },
  {
    id: "6",
    name: "Adire Maxi Skirt",
    price: 22000,
    images: ["/adire6.png"],
    description: "Flowing maxi skirt with bold adire pattern.",
    details: ["100% Cotton", "Natural indigo dye", "Hand wash cold", "Made in Nigeria", "Available in sizes S-XL"],
    category: "Women's Wear"
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(0);
    }
    window.scrollTo(0, 0);
  }, [id]);

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
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product.id, product.name, product.price, product.images[0], quantity);
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} has been added to your cart.`,
      variant: "default",
      duration: 3000,
    });
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev + 1) % (product?.images.length || 1));
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev - 1 + (product?.images.length || 1)) % (product?.images.length || 1));
  };

  const handleCheckoutSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields before proceeding.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    if (!product) return;
    setIsCheckoutOpen(false);
    navigate('/confirmation', {
      state: {
        order: {
          items: [{
            id: product.id,
            name: product.name,
            image: product.images[0],
            price: product.price,
            quantity: quantity
          }],
          total: product.price * quantity
        },
        customer: formData
      }
    });
    toast({
      title: "Order Placed",
      description: `Your order for ${quantity} x ${product.name} has been placed. Please complete payment.`,
      variant: "default",
      duration: 3000,
    });
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  if (!product) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-juwura-cream">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 font-playfair">Product Not Found</h2>
          <p className="mb-6 text-lg">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/products"
            className="bg-juwura-brown text-white px-6 py-3 rounded-full hover:bg-juwura-terracotta transition-colors"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-juwura-cream">
      <ParallaxSection bgColor="#FEF7E5" speed={0.1} spacing="xl">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 fade-in-element opacity-0"
            aria-label="Breadcrumb"
          >
            <ol className="inline-flex items-center space-x-2 md:space-x-3 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-juwura-brown transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/products" className="text-gray-600 hover:text-juwura-brown transition-colors">
                  Products
                </Link>
              </li>
              <li aria-current="page" className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-juwura-brown font-medium">{product.name}</span>
              </li>
            </ol>
          </motion.nav>

          {/* Product Details */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Carousel */}
            <div className="relative fade-in-element opacity-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden rounded-2xl bg-white shadow-lg"
              >
                <AnimatePresence>
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-[500px] object-cover"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-juwura-brown/80 text-white p-2 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-juwura-brown/80 text-white p-2 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </motion.div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {product.images.map((image: string, index: number) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-juwura-brown" : "border-transparent hover:border-juwura-brown/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-24 object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="fade-in-element opacity-0"
            >
              <h1 className="text-4xl font-bold mb-3 font-playfair">{product.name}</h1>
              <p className="text-juwura-terracotta text-2xl font-medium mb-6">₦{product.price.toLocaleString()}</p>
              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-3">Product Details</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {product.details.map((detail: string, index: number) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-200 px-4 py-2 rounded-l-md"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </motion.button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-16 px-3 py-2 text-center border-y border-gray-200 rounded-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-200 px-4 py-2 rounded-r-md"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="bg-juwura-brown text-white py-4 rounded-full flex-grow hover:bg-juwura-terracotta"
                >
                  Add to Cart
                </motion.button>
                <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                  <DialogTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-juwura-brown text-juwura-brown py-4 rounded-full flex-grow hover:bg-juwura-brown hover:text-white transition-colors"
                    >
                      Buy Now
                    </motion.button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-playfair">Checkout</DialogTitle>
                    </DialogHeader>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid gap-4 py-4"
                    >
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right font-medium">
                          Delivery Address
                        </Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="quantity" className="text-right font-medium">
                          Quantity
                        </Label>
                        <div className="flex items-center space-x-2 col-span-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gray-200 px-4 py-2 rounded-l-md"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            -
                          </motion.button>
                          <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                            className="w-16 px-3 py-2 text-center border-y border-gray-200 rounded-none"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gray-200 px-4 py-2 rounded-r-md"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-medium">Total Amount</Label>
                        <p className="text-juwura-terracotta font-medium col-span-3">
                          ₦{(product.price * quantity).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setIsCheckoutOpen(false)} className="rounded-full">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCheckoutSubmit}
                        className="bg-juwura-brown text-white hover:bg-juwura-terracotta rounded-full"
                      >
                        Proceed to Payment
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          </div>
        </div>
      </ParallaxSection>

      {/* Related Products */}
      <ParallaxSection bgColor="#FFFFFF" speed={0.2} spacing="xl" className="border-t border-gray-200">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12 text-center font-playfair fade-in-element opacity-0"
          >
            You May Also Like
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <motion.div
                key={product.id}
                className="fade-in-element opacity-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/products/${product.id}`} className="block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                    <div className="overflow-hidden h-64 relative">
                      <motion.img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7 }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium mb-2 font-playfair">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <span className="text-juwura-brown font-medium">₦{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default ProductDetail;