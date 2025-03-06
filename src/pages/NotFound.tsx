
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-navy-dark mb-6 font-playfair">404</h1>
        <p className="text-xl text-navy mb-8">We couldn't find the page you're looking for.</p>
        <Link to="/">
          <Button className="bg-navy-dark hover:bg-navy text-white transition-custom">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
