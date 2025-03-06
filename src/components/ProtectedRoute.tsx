
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Store the current location if user is not authenticated
    if (!loading && !user) {
      sessionStorage.setItem("redirectPath", location.pathname);
    }
    
    // Set ready state when loading is done without delay for better performance
    if (!loading) {
      setIsReady(true);
    }
  }, [user, loading, location]);

  // Simple loading indicator with reduced state changes
  if (loading || !isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-light">
        <Loader2 className="h-8 w-8 animate-spin text-navy-dark" />
        <p className="mt-4 text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
