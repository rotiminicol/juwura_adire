import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import { useEffect } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  isNewArrival?: boolean;
}

const ProductCard = ({ id, name, price, image, description, isNewArrival = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <motion.div
      className="tilt-card bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl border border-gray-100 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="relative overflow-hidden h-80">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-contain transition-transform duration-1000"
          animate={{ scale: isHovered ? 1.1 : 1 }}
        />
        {isNewArrival && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 bg-juwura-gold text-juwura-brown px-3 py-1 rounded-full font-medium text-sm shadow"
          >
            New Arrival
          </motion.div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-3 font-playfair">{name}</h3>
        {description && <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>}
        <div className="flex flex-wrap justify-between items-center gap-3">
          <span className="text-juwura-indigo font-medium text-base">₦{price.toLocaleString()}</span>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-juwura-brown text-white p-2 rounded-full hover:bg-juwura-brown/80 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
            </motion.button>
            <Link
              to={`/products/${id}`}
              className="bg-juwura-indigo text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-80 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

