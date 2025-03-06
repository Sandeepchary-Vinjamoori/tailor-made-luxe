
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const Login = () => {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    // Show toast notification if we have a redirect from category
    if (redirect === "category") {
      toast.info("Please sign in to explore our collections.", {
        duration: 5000,
      });
    }
  }, [redirect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-soft p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-navy-dark text-2xl font-playfair font-bold">
            TailorMade<span className="text-gold">Luxe</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2 font-playfair">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to access your account</p>
        </div>
        
        <form className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-navy-dark">
              Email
            </label>
            <Input 
              id="email" 
              placeholder="Enter your email" 
              type="email" 
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium text-navy-dark">
                Password
              </label>
              <a href="#" className="text-xs text-gold hover:underline">
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              placeholder="Enter your password" 
              type="password" 
              className="w-full"
              required 
            />
          </div>
          
          <Button className="w-full bg-navy-dark hover:bg-navy text-white hover:text-white py-5">
            Sign In
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-gold hover:underline font-medium">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
