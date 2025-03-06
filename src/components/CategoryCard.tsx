
import { useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface CategoryCardProps {
  category: Category;
  index: number;
  onClick: () => void;
}

const CategoryCard = ({ category, index, onClick }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-soft group cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name} 
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/40 to-transparent">
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <div className={`transition-all duration-500 ${isHovered ? 'transform -translate-y-4' : ''}`}>
            <h3 className="text-white text-xl font-bold mb-2">{category.name}</h3>
            <p className={`text-cream-light/80 text-sm transform transition-all duration-500 ${isHovered ? 'opacity-100 h-auto' : 'opacity-0 h-0'}`}>
              {category.description}
            </p>
            <div className={`mt-4 inline-block transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-gold text-sm flex items-center">
                Explore Collection
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
