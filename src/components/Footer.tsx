
import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-juwura-brown text-juwura-cream"
    >
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img 
                src="/lovable-uploads/d669e35d-f019-43a0-a333-cf7ef26df738.png" 
                alt="Jùwúrà Logo" 
                className="h-16 invert transform hover:scale-105 transition-transform duration-300" 
              />
            </Link>
            <p className="text-sm text-juwura-cream/80 leading-relaxed max-w-xs">
              Authentic adire clothing and fashion accessories 
              rooted in Nigerian culture and craftsmanship.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Products', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-juwura-cream/80 hover:text-juwura-gold transition-colors duration-300 flex items-center group"
                  >
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-juwura-cream/80">
                <MapPin className="w-5 h-5 text-juwura-gold" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3 text-juwura-cream/80">
                <Mail className="w-5 h-5 text-juwura-gold" />
                <a href="mailto:info.juwura@gmail.com" className="hover:text-juwura-gold transition-colors duration-300">
                  info.juwura@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-juwura-cream/80">
                <Phone className="w-5 h-5 text-juwura-gold" />
                <a href="tel:+2349160356477" className="hover:text-juwura-gold transition-colors duration-300">
                  +234 9160356477
                </a>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/juwura.ng" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-juwura-gold/10 p-3 rounded-full hover:bg-juwura-gold/20 active:bg-juwura-gold/30 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-juwura-gold"
                aria-label="Follow us on Instagram"
                tabIndex={0}
              >
                <Instagram className="w-6 h-6 text-juwura-gold group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-juwura-cream/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-center text-juwura-cream/60">
            &copy; {currentYear} Jùwúrà by Oreoluwa Obabiyi-Nicol. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
