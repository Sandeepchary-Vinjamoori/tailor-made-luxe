
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

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
const fetchProduct = async (id: string): Promise<Product> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Placeholder product data
  const products = [
    {
      id: 1,
      name: "Classic Oxford Shirt",
      price: 89.99,
      description: "Premium cotton oxford shirt with a modern fit. Our signature oxford shirts are crafted from the finest Egyptian cotton for breathability and comfort. Perfect for both formal and casual occasions.",
      category: "shirts",
      colors: ["White", "Blue", "Black", "Pink"],
      images: [
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
      ]
    },
    {
      id: 2,
      name: "Slim Fit Dress Shirt",
      price: 99.99,
      description: "Tailored slim fit dress shirt for a sharp look. Made with premium cotton-blend fabric that offers a slight stretch for comfort while maintaining a crisp appearance throughout the day.",
      category: "shirts",
      colors: ["White", "Blue", "Black", "Navy Blue"],
      images: [
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
      ]
    },
    {
      id: 3,
      name: "Designer Slim Pants",
      price: 129.99,
      description: "Premium slim fit pants with a comfortable stretch. Featuring a modern tapered design and crafted from a luxurious wool blend that provides both comfort and durability.",
      category: "pants",
      colors: ["Black", "Navy", "Gray", "Khaki"],
      images: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
      ]
    },
    {
      id: 4,
      name: "Luxury Wedding Sherwani",
      price: 599.99,
      description: "Handcrafted luxury sherwani for special occasions. This exquisite piece features intricate handmade embroidery with gold thread work and premium silk fabric for a truly regal appearance.",
      category: "sherwani",
      colors: ["Gold", "Maroon", "Navy", "Royal Blue"],
      images: [
        "https://images.unsplash.com/photo-1585486386884-46be29d80766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
        "https://images.unsplash.com/photo-1601159964152-55ea4d8c9d00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
      ]
    }
  ];
  
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    throw new Error("Product not found");
  }
  
  return product;
};

// Form schema for measurements
const measurementFormSchema = z.object({
  color: z.string({
    required_error: "Please select a color.",
  }),
  waist: z.string().optional(),
  length: z.string().optional(),
  chest: z.string().optional(),
  shoulder: z.string().optional(),
  sleeve: z.string().optional(),
  collar: z.string().optional(),
  hip: z.string().optional(),
  inseam: z.string().optional(),
});

type MeasurementFormValues = z.infer<typeof measurementFormSchema>;

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  
  // React Query for data fetching with caching
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id || '1'),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    enabled: !!id,
  });

  // Form setup with validation
  const form = useForm<MeasurementFormValues>({
    resolver: zodResolver(measurementFormSchema),
    defaultValues: {
      color: "",
      waist: "",
      length: "",
      chest: "",
      shoulder: "",
      sleeve: "",
      collar: "",
      hip: "",
      inseam: "",
    },
  });

  // Function to handle form submission
  const onSubmit = (data: MeasurementFormValues) => {
    console.log("Form submitted:", data);
    
    toast({
      title: "Order Customized!",
      description: `Your customized ${product?.name} has been added to your cart.`,
    });
    
    // Navigate back to product listing
    setTimeout(() => {
      navigate(`/collections/${product?.category}`);
    }, 1500);
  };

  // Get required measurement fields based on category
  const getMeasurementFields = (category?: string) => {
    switch (category) {
      case 'shirts':
        return ['chest', 'shoulder', 'sleeve', 'collar'];
      case 'pants':
        return ['waist', 'length', 'hip', 'inseam'];
      case 'sherwani':
        return ['chest', 'shoulder', 'sleeve', 'length', 'waist'];
      default:
        return ['chest', 'waist', 'length'];
    }
  };

  const requiredFields = product ? getMeasurementFields(product.category) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy-dark" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-soft p-8 max-w-md">
          <h1 className="text-2xl font-playfair font-bold text-navy-dark mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            We couldn't find the product you're looking for.
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-soft overflow-hidden aspect-[4/5]">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-auto pb-2">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 transition-all ${selectedImage === idx ? 'ring-2 ring-gold' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details and Customization Form */}
          <div>
            <div className="mb-8">
              <Link 
                to={`/collections/${product.category}`}
                className="text-sm text-navy-dark/70 hover:text-gold mb-4 inline-block"
              >
                ← Back to {product.category}
              </Link>
              
              <h1 className="text-3xl md:text-4xl font-playfair font-bold text-navy-dark mb-2">
                {product.name}
              </h1>
              
              <p className="text-2xl text-gold font-medium mb-4">
                ${product.price.toFixed(2)}
              </p>
              
              <p className="text-muted-foreground mb-8">
                {product.description}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-xl font-playfair font-bold text-navy-dark mb-6">
                Customize Your {product.name}
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Color Selection */}
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {product.colors.map((color) => (
                              <SelectItem key={color} value={color}>
                                <div className="flex items-center gap-2">
                                  <span 
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
                                  {color}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Dynamic Measurement Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requiredFields.includes('chest') && (
                      <FormField
                        control={form.control}
                        name="chest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chest (inches)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 40" {...field} />
                            </FormControl>
                            <FormDescription>
                              Measure around the fullest part of your chest
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {requiredFields.includes('waist') && (
                      <FormField
                        control={form.control}
                        name="waist"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Waist (inches)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 32" {...field} />
                            </FormControl>
                            <FormDescription>
                              Measure around your natural waistline
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {requiredFields.includes('shoulder') && (
                      <FormField
                        control={form.control}
                        name="shoulder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shoulder (inches)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 18" {...field} />
                            </FormControl>
                            <FormDescription>
                              Measure from shoulder point to shoulder point
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {requiredFields.includes('sleeve') && (
                      <FormField
                        control={form.control}
                        name="sleeve"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sleeve Length (inches)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 24" {...field} />
                            </FormControl>
                            <FormDescription>
                              Measure from shoulder to wrist
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {requiredFields.includes('length') && (
                      <FormField
                        control={form.control}
                        name="length"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Length (inches)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 30" {...field} />
                            </FormControl>
                            <FormDescription>
                              Measure from top to bottom
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {requiredFields.includes('collar') && (
                      <FormField
                        control={form.control}
                        name="collar"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Collar (inches)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 16" {...field} />
                            </FormControl>
                            <FormDescription>
                              Measure around your neck
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {requiredFields.includes('hip') && (
                      <FormField
                        control={form.control}
                        name="hip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hip (inches)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 40" {...field} />
                            </FormControl>
                            <FormDescription>
                              Measure around the fullest part of your hips
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {requiredFields.includes('inseam') && (
                      <FormField
                        control={form.control}
                        name="inseam"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Inseam (inches)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 32" {...field} />
                            </FormControl>
                            <FormDescription>
                              Measure from crotch to bottom of leg
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-white">
                    Add to Cart
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
