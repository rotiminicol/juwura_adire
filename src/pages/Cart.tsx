import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Minus, ShoppingBag, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before proceeding to checkout.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    navigate('/payment');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-juwura-gold/30 max-w-md mx-auto"
        >
          <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-juwura-brown/50" />
          <h2 className="text-3xl font-bold mb-4 text-juwura-brown">Your Cart is Empty</h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover our beautiful collection of authentic adire pieces.
          </p>
          <Link to="/products">
            <Button className="bg-juwura-brown text-white px-8 py-4 rounded-xl hover:bg-juwura-terracotta transition-colors shadow-lg text-lg">
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-20">
      {/* Full width on mobile */}
      <div className="w-full px-0 sm:px-4 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <div className="text-center mb-8 sm:mb-12 px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-juwura-brown mb-4 font-playfair">Shopping Cart</h1>
            <p className="text-lg sm:text-xl text-juwura-brown/70">Review your selected items</p>
          </div>

          {/* Full width containers on mobile */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 w-full">
            {/* Cart Items - Full width on mobile */}
            <div className="lg:col-span-2 w-full">
              <div className="bg-white/95 backdrop-blur-sm rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border border-juwura-gold/30 p-4 sm:p-8 w-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-juwura-brown font-playfair">Cart Items</h2>
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-juwura-cream/30 to-white border border-juwura-gold/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="w-full sm:w-32 h-32 bg-juwura-cream rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-juwura-brown font-playfair">{item.name}</h3>
                            <p className="text-base sm:text-lg font-bold text-juwura-terracotta">₦{item.price.toLocaleString()}</p>
                          </div>
                          
                          <div className="flex items-center gap-3 bg-white rounded-lg p-2 shadow-sm">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-juwura-brown hover:text-white transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold text-lg text-juwura-brown">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-juwura-brown hover:text-white transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-juwura-brown">₦{(item.price * item.quantity).toLocaleString()}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary - Full width on mobile */}
            <div className="w-full">
              <div className="bg-white/95 backdrop-blur-sm rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border border-juwura-gold/30 p-4 sm:p-8 sticky top-24 w-full">
                <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-juwura-brown font-playfair">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-juwura-brown">₦{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl sm:text-2xl font-bold">
                      <span className="text-juwura-brown">Total</span>
                      <span className="text-juwura-terracotta">₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <Button 
                    onClick={handleProceedToCheckout}
                    className="w-full bg-juwura-brown text-white py-4 text-lg font-semibold rounded-xl hover:bg-juwura-terracotta transition-colors shadow-lg"
                  >
                    Proceed to Checkout
                  </Button>
                  <Link to="/products" className="block">
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-juwura-brown text-juwura-brown py-4 text-lg font-semibold rounded-xl hover:bg-juwura-brown hover:text-white transition-colors"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="flex justify-end mt-8">
        <Button onClick={() => navigate('/payment')}>Proceed to Payment</Button>
      </div>
    </div>
  );
};

export default Cart;
