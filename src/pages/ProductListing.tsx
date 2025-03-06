
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

// Product type definition
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  colors: string[];
  images: string[];
}

// Mock data function - replace with Supabase query
const fetchProducts = async (category: string): Promise<Product[]> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Placeholder product data
  const products = [
    {
      id: 1,
      name: "Classic Oxford Shirt",
      price: 89.99,
      description: "Premium cotton oxford shirt with a modern fit",
      category: "shirts",
      colors: ["White", "Blue", "Black", "Pink"],
      images: [
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
      ]
    },
    {
      id: 2,
      name: "Slim Fit Dress Shirt",
      price: 99.99,
      description: "Tailored slim fit dress shirt for a sharp look",
      category: "shirts",
      colors: ["White", "Blue", "Black", "Navy Blue"],
      images: [
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
      ]
    },
    {
      id: 3,
      name: "Designer Slim Pants",
      price: 129.99,
      description: "Premium slim fit pants with a comfortable stretch",
      category: "pants",
      colors: ["Black", "Navy", "Gray", "Khaki"],
      images: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80"
      ]
    },
    {
      id: 4,
      name: "Luxury Wedding Sherwani",
      price: 599.99,
      description: "Handcrafted luxury sherwani for special occasions",
      category: "sherwani",
      colors: ["Gold", "Maroon", "Navy", "Royal Blue"],
      images: [
        "https://images.unsplash.com/photo-1585486386884-46be29d80766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
      ]
    }
  ];
  
  return products.filter(product => product.category === category);
};

const ProductListing = () => {
  const { category } = useParams<{ category: string }>();
  
  // Use React Query for data fetching and caching
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category || 'shirts'),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    enabled: !!category
  });

  // Format category name for display
  const formatCategoryName = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy-dark" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-soft p-8 max-w-md">
          <h1 className="text-2xl font-playfair font-bold text-navy-dark mb-4">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mb-4">
            We couldn't load the products. Please try again later.
          </p>
          <Link to="/dashboard" className="text-gold hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-light">
      <header className="bg-white shadow-soft py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-navy-dark text-2xl font-playfair font-bold">
            TailorMade<span className="text-gold">Luxe</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-navy-dark hover:text-gold">
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-playfair font-bold text-navy-dark mb-2">
          {formatCategoryName(category || 'Products')}
        </h1>
        <p className="text-muted-foreground mb-8">
          Explore our custom {category} collection tailored to your preferences
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products?.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-soft overflow-hidden transition-all duration-300 group-hover:shadow-md">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy" // Add lazy loading for performance
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
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      Customize now →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
