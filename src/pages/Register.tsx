
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

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
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!termsAccepted) {
      toast.error("Please accept the Terms of Service");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await signUp(email, password, firstName, lastName);
      
      // The redirect will be handled in the useEffect above
    } catch (error) {
      // Error is handled in the auth context
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-soft p-8">
        <div className="text-center mb-8">
          <Link to="/" className="text-navy-dark text-2xl font-playfair font-bold">
            TailorMade<span className="text-gold">Luxe</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2 font-playfair">Create an Account</h1>
          <p className="text-muted-foreground">Get started with your personalized shopping experience</p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-navy-dark">
                First Name
              </label>
              <Input 
                id="firstName" 
                placeholder="Enter your first name" 
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-navy-dark">
                Last Name
              </label>
              <Input 
                id="lastName" 
                placeholder="Enter your last name" 
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>
          
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
            <label htmlFor="password" className="text-sm font-medium text-navy-dark">
              Password
            </label>
            <Input 
              id="password" 
              placeholder="Create a password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-navy-dark">
              Confirm Password
            </label>
            <Input 
              id="confirmPassword" 
              placeholder="Confirm your password" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
              required 
            />
          </div>
          
          <div className="flex items-start space-x-2">
            <Input 
              id="terms" 
              type="checkbox" 
              className="mt-1" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required 
            />
            <label htmlFor="terms" className="text-xs text-muted-foreground">
              I agree to the <a href="#" className="text-gold hover:underline">Terms of Service</a> and <a href="#" className="text-gold hover:underline">Privacy Policy</a>
            </label>
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-navy-dark hover:bg-navy text-white hover:text-white py-5"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-gold hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
