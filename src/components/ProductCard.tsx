
import { useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  colors: string[];
  images: string[];
}

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/product/${product.id}`}
      className="block group animate-fade-in"
      style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-soft overflow-hidden transition-all duration-300 group-hover:shadow-md">
        <div className="aspect-[3/4] overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
            loading="lazy"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium text-navy-dark mb-2">{product.name}</h3>
          <p className="text-gold font-medium mb-3">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Available colors:</span>
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((color, idx) => (
                <span 
                  key={idx}
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ 
                    backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                      color.toLowerCase() === 'blue' ? '#3b82f6' :
                      color.toLowerCase() === 'black' ? '#000000' :
                      color.toLowerCase() === 'pink' ? '#ec4899' :
                      color.toLowerCase() === 'navy' || color.toLowerCase() === 'navy blue' ? '#1e3a8a' :
                      color.toLowerCase() === 'gray' ? '#6b7280' :
                      color.toLowerCase() === 'khaki' ? '#d1b464' :
                      color.toLowerCase() === 'gold' ? '#d4af37' :
                      color.toLowerCase() === 'maroon' ? '#800000' :
                      color.toLowerCase() === 'royal blue' ? '#4169e1' :
                      '#888888'
                  }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
          
          <div className="text-sm text-navy-dark/70">
            <span className={`inline-block transition-all duration-300 ${isHovered ? 'transform translate-x-1 text-gold' : ''}`}>
              Customize now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
