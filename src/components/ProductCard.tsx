
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

const ProductCard = ({ id, name, price, image, description }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100">
      <div className="overflow-hidden h-64 relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-medium mb-2 font-playfair">{name}</h3>
        {description && <p className="text-gray-600 mb-3 text-sm">{description}</p>}
        <div className="flex justify-between items-center">
          <span className="text-juwura-indigo font-medium">₦{price.toLocaleString()}</span>
          <Link 
            to={`/products/${id}`}
            className="bg-juwura-indigo text-white px-4 py-2 rounded text-sm hover:bg-opacity-80 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
