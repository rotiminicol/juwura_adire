
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';

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
  
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl border border-gray-100 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden h-64 relative">
        <img 
          src={image} 
          alt={name} 
          className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-105' : ''}`} 
        />
        {isNewArrival && (
          <div className="absolute top-0 left-0 bg-juwura-gold text-juwura-brown px-3 py-1 m-4 rounded-md font-medium text-sm">
            New Arrival
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-3 font-playfair">{name}</h3>
        {description && <p className="text-gray-600 mb-4 text-sm">{description}</p>}
        <div className="flex justify-between items-center mt-4">
          <span className="text-juwura-indigo font-medium">₦{price.toLocaleString()}</span>
          <div className="flex space-x-3">
            <button className="bg-juwura-brown text-white p-2 rounded-md hover:bg-juwura-brown/80 transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <Link 
              to={`/products/${id}`}
              className="bg-juwura-indigo text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-80 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
