import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileMenuOpen) return;
    
    const handleClickOutside = (e) => {
      const target = e.target;
      const isMenuButton = target.closest('[data-menu-button]');
      const isMenuContent = target.closest('[data-menu-content]');
      
      if (!isMenuButton && !isMenuContent) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-juwura-cream/95 shadow-lg backdrop-blur-xl py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="relative z-50">
          <img 
            src="/lovable-uploads/d669e35d-f019-43a0-a333-cf7ef26df738.png" 
            alt="Jùwúrà Logo" 
            className="h-10 md:h-12 lg:h-16" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/" className="font-medium text-lg tracking-wide hover:text-juwura-terracotta transition-all duration-300 transform hover:translate-y-0.5 hover:scale-105">
            Home
          </Link>
          <Link to="/about" className="font-medium text-lg tracking-wide hover:text-juwura-terracotta transition-all duration-300 transform hover:translate-y-0.5 hover:scale-105">
            About
          </Link>
          <Link to="/products" className="font-medium text-lg tracking-wide hover:text-juwura-terracotta transition-all duration-300 transform hover:translate-y-0.5 hover:scale-105">
            Products
          </Link>
          <Link to="/contact" className="font-medium text-lg tracking-wide hover:text-juwura-terracotta transition-all duration-300 transform hover:translate-y-0.5 hover:scale-105">
            Contact
          </Link>
          <Link 
            to="/cart" 
            className="group relative flex items-center justify-center p-2 hover:text-juwura-terracotta transition-all duration-300"
          >
            <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-juwura-terracotta text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <Link 
            to="/cart" 
            className="relative flex items-center justify-center p-2"
          >
            <ShoppingCart className="w-6 h-6 text-juwura-brown" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-juwura-terracotta text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button 
            data-menu-button
            className="z-50 text-juwura-brown p-2"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            {mobileMenuOpen ? (
              <span className="text-2xl">✕</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          data-menu-content
          className={`fixed top-0 right-0 h-full w-3/4 sm:w-64 bg-juwura-cream/95 backdrop-blur-md shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-8 pt-24 space-y-6 bg-juwura-cream">
            <Link 
              to="/" 
              className="text-xl font-semibold p-3 text-juwura-brown hover:bg-juwura-terracotta/10 hover:text-juwura-terracotta rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-xl font-semibold p-3 text-juwura-brown hover:bg-juwura-terracotta/10 hover:text-juwura-terracotta rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/products" 
              className="text-xl font-semibold p-3 text-juwura-brown hover:bg-juwura-terracotta/10 hover:text-juwura-terracotta rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/contact" 
              className="text-xl font-semibold p-3 text-juwura-brown hover:bg-juwura-terracotta/10 hover:text-juwura-terracotta rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;