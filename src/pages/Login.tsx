
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
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

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      const redirectPath = sessionStorage.getItem("redirectPath");
      if (redirectPath) {
        sessionStorage.removeItem("redirectPath");
        navigate(redirectPath);
      } else {
        navigate("/dashboard"); // Default redirect for logged in users
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    const [formData, setFormData] = useState({
      email: email,
      password: password
    });
    try {
      
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      navigate("/dashboard");
     
    } catch (error) {
      // Error is handled in the auth context

      navigate("/register")
      console.error(error);
    }
  };

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
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-navy-dark">
              Email
            </label>
            <Input 
              id="email" 
              placeholder="Enter your email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-sm font-medium text-navy-dark">
                Password
              </label>
              <a href="google.com" className="text-xs text-gold hover:underline">
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              placeholder="Enter your password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required 
            />
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-navy-dark hover:bg-navy text-white hover:text-white py-5"
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
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
