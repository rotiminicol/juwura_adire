
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-juwura-cream/95 shadow-lg backdrop-blur-xl py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="relative z-50 group select-none flex items-center gap-2">
            <img src="/juwura logo.png" alt="Jùwúrà Logo" className="h-16 w-auto sm:h-20 md:h-24 drop-shadow-xl scale-125" style={{maxWidth:'240px'}} />
            <span className="sr-only">Jùwúrà</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/products", label: "Products" },
              { to: "/contact", label: "Contact" }
            ].map((item) => (
              <motion.div key={item.to} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link 
                  to={item.to} 
                  className="relative font-medium text-lg tracking-wide text-juwura-brown hover:text-juwura-terracotta transition-all duration-300 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-juwura-terracotta transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/cart" 
                className="group relative flex items-center justify-center p-3 hover:text-juwura-terracotta transition-all duration-300 hover:bg-juwura-gold/10 rounded-full"
              >
                <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
                {cartItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className="absolute -top-1 -right-1 bg-juwura-terracotta text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link 
              to="/cart" 
              className="relative flex items-center justify-center p-2 hover:bg-juwura-gold/10 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-juwura-brown" />
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  className="absolute -top-1 -right-1 bg-juwura-terracotta text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                >
                  {cartItems.length}
                </motion.span>
              )}
            </Link>
            <motion.button 
              data-menu-button
              className="z-50 text-juwura-brown p-2 hover:bg-juwura-gold/10 rounded-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="text-2xl block"
                animate={{ rotate: mobileMenuOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </motion.span>
            </motion.button>
          </div>

          {/* Mobile Navigation Overlay - Much darker background */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 z-40 md:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Mobile Navigation - Better styling and contrast */}
          <motion.div
            data-menu-content
            initial={{ x: "100%" }}
            animate={{ x: mobileMenuOpen ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 left-0 w-full h-full bg-juwura-brown z-50 transform transition-transform duration-500 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
          >
            <div className="flex flex-col p-8 pt-24 space-y-6 bg-juwura-brown h-full w-full items-center justify-center">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About" },
                { to: "/products", label: "Products" },
                { to: "/contact", label: "Contact" }
              ].map((item) => (
                <motion.div
                  key={item.to}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={item.to} 
                    className="text-xl font-semibold p-4 text-white hover:bg-juwura-terracotta hover:text-juwura-cream rounded-lg transition-all duration-200 block border border-transparent hover:border-juwura-cream/30"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};

export default Navbar;
