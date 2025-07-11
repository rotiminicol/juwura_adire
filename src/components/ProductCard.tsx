import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: number | string;
  name: string;
  price: number;
  image: string;
  description?: string;
  isNewArrival?: boolean;
  onAddToCart?: () => void; // for home page if needed
  cardClassName?: string; // for grid control
}

const ProductCard = ({ id, name, price, image, description, isNewArrival = false, onAddToCart, cardClassName }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const elements = document.querySelectorAll('.tilt-card');
    elements.forEach((element) => {
      VanillaTilt.init(element as HTMLElement, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
      });
    });
  }, []);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
      return;
    }
    addToCart(String(id), name, price, image, 1);
  };

  return (
    <Link
      to={`/products/${id}`}
      className={`group tilt-card bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl border border-juwura-gold/20 h-full relative product-card flex flex-col cursor-pointer w-full md:w-[420px] md:h-[520px] xl:w-[480px] xl:h-[600px] mb-10 ring-4 ring-juwura-gold/30 hover:ring-8 hover:ring-juwura-gold/60 focus:ring-8 focus:ring-juwura-gold/80`}
      tabIndex={0}
      aria-label={`View details for ${name}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={undefined}
    >
      <div className="relative overflow-hidden aspect-[3/4] flex items-center justify-center bg-juwura-cream md:h-auto">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110 md:p-4"
          animate={{ scale: isHovered ? 1.08 : 1 }}
        />
        {isNewArrival && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 bg-juwura-gold text-juwura-brown px-3 py-1 rounded-full font-medium text-xs shadow-lg tracking-wide z-10"
          >
            New Arrival
          </motion.div>
        )}
        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          className="absolute inset-0 bg-juwura-brown pointer-events-none transition-all duration-500 z-10"
        />
      </div>
      <div className="p-4 sm:p-6 flex flex-col gap-2 sm:gap-4 flex-1 md:gap-3 md:p-5">
        <h3 className="text-lg sm:text-xl font-semibold mb-1 font-playfair text-juwura-brown line-clamp-2 md:text-lg md:mb-0">{name}</h3>
        {description && <p className="text-gray-600 mb-2 text-xs sm:text-sm line-clamp-2 md:mb-1">{description}</p>}
        <div className="flex flex-wrap justify-between items-center gap-2 sm:gap-3 mt-auto md:mt-2">
          <span className="text-juwura-indigo font-bold text-base sm:text-lg md:text-base">₦{price.toLocaleString()}</span>
        </div>
        <div className="flex gap-2 mt-3 w-full md:mt-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); handleAddToCart(); }}
            className="flex-[2] min-w-[70%] bg-juwura-brown text-white py-4 rounded-full font-semibold text-base hover:bg-juwura-terracotta focus:outline-none focus:ring-2 focus:ring-juwura-gold transition-colors shadow-md md:py-4 md:text-lg md:min-w-[70%]"
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-5 w-5 inline-block mr-2" /> Add to Cart
          </motion.button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

