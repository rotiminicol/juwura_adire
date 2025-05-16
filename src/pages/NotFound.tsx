
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-juwura-cream">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-juwura-brown mb-6">404</h1>
        <div className="w-24 h-1 bg-juwura-brown mx-auto mb-8"></div>
        <p className="text-xl md:text-2xl text-juwura-brown mb-8">
          Oops! We couldn't find the page you're looking for.
        </p>
        <Link to="/">
          <Button className="bg-juwura-brown text-white hover:bg-juwura-terracotta">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
