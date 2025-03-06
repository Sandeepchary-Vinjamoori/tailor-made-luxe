
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user, signOut, getProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch profile data if we don't have first_name yet
    const fetchProfile = async () => {
      if (user && !user.first_name) {
        await getProfile();
      }
      setIsLoading(false);
    };
    
    fetchProfile();
  }, [user, getProfile]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy-dark" />
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
            <Button 
              variant="ghost" 
              onClick={signOut}
              className="text-navy-dark hover:text-gold"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-soft p-8">
          <h1 className="text-3xl font-playfair font-bold mb-6">
            Welcome, {user?.first_name || user?.email?.split('@')[0] || "User"}
          </h1>
          <p className="text-muted-foreground mb-8">
            Your personalized dashboard is ready. Explore our collections and start designing your custom clothes.
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Link 
              to="/collections/shirts" 
              className="block p-6 bg-cream-light rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-lg mb-2">Shirts</h3>
              <p className="text-sm text-muted-foreground">Explore our custom shirt collection</p>
            </Link>
            
            <Link 
              to="/collections/pants" 
              className="block p-6 bg-cream-light rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-lg mb-2">Pants</h3>
              <p className="text-sm text-muted-foreground">Discover perfectly fitted pants</p>
            </Link>
            
            <Link 
              to="/collections/sherwani" 
              className="block p-6 bg-cream-light rounded-lg hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium text-lg mb-2">Sherwani</h3>
              <p className="text-sm text-muted-foreground">Elegant sherwani designs awaits</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
