
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X, ShoppingBag, User } from "lucide-react";
import CategoryCard from "@/components/CategoryCard";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Categories for our clothing
  const categories = [
    {
      id: 1,
      name: "Shirts",
      description: "Tailor-made shirts for every occasion",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      name: "Pants",
      description: "Custom-fit pants for ultimate comfort",
      image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80"
    },
    {
      id: 3,
      name: "Suits",
      description: "Elegant suits crafted to perfection",
      image: "https://images.unsplash.com/photo-1553484771-047a44eee7a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80"
    },
    {
      id: 4,
      name: "Sherwani",
      description: "Traditional elegance with modern fit",
      image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    }
  ];

  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle category click
  const handleCategoryClick = (categoryId: number) => {
    // Show login prompt - this would normally navigate to the category page if logged in
    document.getElementById("login-prompt")?.classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("login-prompt")?.classList.add("hidden");
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-10 ${
          isScrolled ? "py-4 bg-blur shadow-soft" : "py-6"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-navy-dark text-xl md:text-2xl font-playfair font-bold">
                TailorMade<span className="text-gold">Luxe</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-navy-dark hover:text-gold transition-custom link-hover">Home</a>
              <a href="#" className="text-navy-dark hover:text-gold transition-custom link-hover">Collections</a>
              <a href="#" className="text-navy-dark hover:text-gold transition-custom link-hover">About</a>
              <a href="#" className="text-navy-dark hover:text-gold transition-custom link-hover">Contact</a>
            </nav>

            {/* Desktop Auth/Cart Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="flex items-center text-navy-dark hover:text-gold hover:bg-transparent"
                onClick={() => navigate("/login")}
              >
                <User size={18} className="mr-1" />
                Login
              </Button>
              <Button 
                className="bg-navy-dark hover:bg-navy text-cream-light hover:text-white transition-custom"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
              <Button variant="outline" className="border-navy-light text-navy-dark hover:bg-navy-dark hover:text-white transition-custom">
                <ShoppingBag size={18} />
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button 
                variant="ghost" 
                className="p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-cream-light transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden pt-24`}
      >
        <div className="container mx-auto px-6 py-8 flex flex-col h-full">
          <nav className="flex flex-col space-y-6 text-lg">
            <a 
              href="#" 
              className="text-navy-dark hover:text-gold transition-custom pb-2 border-b border-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#" 
              className="text-navy-dark hover:text-gold transition-custom pb-2 border-b border-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </a>
            <a 
              href="#" 
              className="text-navy-dark hover:text-gold transition-custom pb-2 border-b border-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#" 
              className="text-navy-dark hover:text-gold transition-custom pb-2 border-b border-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </nav>
          
          <div className="mt-auto flex flex-col space-y-4 pb-8">
            <Button 
              className="w-full bg-navy-dark text-cream-light hover:bg-navy transition-custom"
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
            >
              Login
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-navy-dark text-navy-dark hover:bg-navy-dark hover:text-white transition-custom"
              onClick={() => {
                navigate("/register");
                setIsMobileMenuOpen(false);
              }}
            >
              Register
            </Button>
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-center text-navy-dark"
            >
              <ShoppingBag size={18} className="mr-2" /> View Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Login Prompt Toast (shows when clicking category without login) */}
      <div 
        id="login-prompt"
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-navy-dark text-white px-6 py-4 rounded-lg shadow-lg z-50 hidden animate-fade-in max-w-md"
      >
        <p className="text-center">Please sign in to personalize your fit!</p>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="space-y-6 max-w-xl">
                <div className="inline-block px-3 py-1 bg-cream-dark text-navy-dark rounded-full text-sm font-medium animate-slide-in" style={{ animationDelay: "0.1s" }}>
                  Luxury Custom Clothing
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-in" style={{ animationDelay: "0.2s" }}>
                  Perfect Fit, <span className="text-gradient-gold">Personalized</span> for You
                </h1>
                <p className="text-muted-foreground text-lg animate-slide-in" style={{ animationDelay: "0.3s" }}>
                  Experience the luxury of custom-tailored clothing designed to embrace your unique style and measurements.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 animate-slide-in" style={{ animationDelay: "0.4s" }}>
                  <Button 
                    className="bg-navy-dark hover:bg-navy text-white hover:text-white px-8 py-6 rounded-md transition-custom"
                    onClick={() => navigate("/collections")}
                  >
                    Explore Collections <ArrowRight size={16} className="ml-2" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-navy-dark text-navy-dark hover:bg-navy-dark hover:text-white px-8 py-6 rounded-md transition-custom"
                    onClick={() => navigate("/how-it-works")}
                  >
                    How It Works
                  </Button>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 overflow-hidden rounded-xl animate-image-reveal shadow-soft">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Tailored Clothing" 
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider with quote */}
      <section className="py-16 bg-cream-dark">
        <div className="container mx-auto px-6 lg:px-10 max-w-4xl text-center">
          <blockquote className="text-2xl md:text-3xl font-playfair text-navy-dark italic leading-relaxed">
            "Style is a way to say who you are without having to speak."
          </blockquote>
          <p className="mt-4 text-gold font-medium">— Rachel Zoe</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-cream-dark text-navy-dark rounded-full text-sm font-medium mb-4">
              Explore our collections
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">
              Tailored to Your Unique Style
            </h2>
            <p className="text-muted-foreground text-lg">
              Browse our categories and discover clothing designed to fit perfectly. Every piece is crafted with attention to detail and your personal measurements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <CategoryCard 
                key={category.id}
                category={category}
                index={index}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-navy-dark text-white">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 bg-navy text-gold rounded-full text-sm font-medium mb-4">
              Why choose us
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              The Perfect Fit, Every Time
            </h2>
            <p className="text-lg text-cream-light/80">
              Our personalized approach ensures that every garment fits perfectly, looks exceptional, and feels comfortable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-navy p-8 rounded-xl shadow-soft border border-navy-light/10 transition-custom hover:transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M5.2 6.2l1.4 1.4"></path>
                  <path d="M2 12h2"></path>
                  <path d="M6.2 18.8l-1.4-1.4"></path>
                  <path d="M12 22v-2"></path>
                  <path d="M17.8 18.8l1.4-1.4"></path>
                  <path d="M20 12h2"></path>
                  <path d="M17.8 5.2l1.4 1.4"></path>
                  <path d="M12 2v2"></path>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Precise Measurements</h3>
              <p className="text-cream-light/70">Our digital measuring technology ensures accuracy down to the millimeter for your perfect fit.</p>
            </div>

            <div className="bg-navy p-8 rounded-xl shadow-soft border border-navy-light/10 transition-custom hover:transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Fabrics</h3>
              <p className="text-cream-light/70">Choose from our curated selection of the finest fabrics sourced from premium mills worldwide.</p>
            </div>

            <div className="bg-navy p-8 rounded-xl shadow-soft border border-navy-light/10 transition-custom hover:transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Craftsmanship</h3>
              <p className="text-cream-light/70">Each garment is handcrafted by skilled artisans with decades of tailoring experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="bg-cream-dark rounded-2xl p-8 md:p-12 overflow-hidden relative shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">
                  Ready to Experience Custom-Fitted Luxury?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Join thousands of satisfied customers who've discovered the perfect fit. Create your account today to start your personalized fashion journey.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    className="bg-navy-dark hover:bg-navy text-white hover:text-white px-8 py-6 rounded-md transition-custom"
                    onClick={() => navigate("/register")}
                  >
                    Create Your Account
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-navy-dark text-navy-dark hover:bg-navy-dark hover:text-white px-8 py-6 rounded-md transition-custom"
                    onClick={() => navigate("/about")}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1542060748-10c28b62716f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Elegant Tailored Suit" 
                  className="rounded-xl shadow-md transform -rotate-2 hover:rotate-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-dark text-cream-light pt-16 pb-8">
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <a href="/" className="text-xl md:text-2xl font-playfair font-bold mb-6 inline-block">
                TailorMade<span className="text-gold">Luxe</span>
              </a>
              <p className="text-cream-light/70 mt-4">
                Premium custom clothing, tailored to perfection for your unique style and measurements.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-cream-light/70 hover:text-gold transition-custom">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-cream-light/70 hover:text-gold transition-custom">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="text-cream-light/70 hover:text-gold transition-custom">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">Home</a></li>
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">Men's Collection</a></li>
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">Women's Collection</a></li>
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">How It Works</a></li>
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">Contact Us</a></li>
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">FAQ</a></li>
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">Shipping & Returns</a></li>
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">Size Guide</a></li>
                <li><a href="#" className="text-cream-light/70 hover:text-gold transition-custom">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-cream-light/70 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <div className="flex mt-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-l-md bg-navy border border-navy-light/30 text-cream-light focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <Button className="rounded-l-none bg-gold hover:bg-gold-dark text-navy-dark">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-navy-light/20 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-cream-light/50 text-sm">
                © {new Date().getFullYear()} TailorMadeLuxe. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-cream-light/50 hover:text-gold text-sm transition-custom">Terms of Service</a>
                <a href="#" className="text-cream-light/50 hover:text-gold text-sm transition-custom">Privacy Policy</a>
                <a href="#" className="text-cream-light/50 hover:text-gold text-sm transition-custom">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
