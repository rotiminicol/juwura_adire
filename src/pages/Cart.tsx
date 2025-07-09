
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    navigate('/confirmation', {
      state: {
        order: {
          items: cartItems,
          total: getCartTotal()
        },
        customer: {}
      }
    });
    
    toast({
      title: "Proceeding to checkout",
      description: "You will be redirected to the payment page.",
      variant: "default",
      duration: 2000,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-juwura-gold/30">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-juwura-brown/50" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-juwura-brown font-playfair">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-8 text-base sm:text-lg">
                Discover our beautiful collection of authentic adire fashion.
              </p>
              <Link to="/products">
                <Button className="bg-juwura-brown text-white px-8 py-4 text-lg font-semibold rounded-xl hover:bg-juwura-terracotta transition-colors shadow-lg w-full sm:w-auto">
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-juwura-brown mb-4 font-playfair">
              Your Shopping Cart
            </h1>
            <p className="text-lg sm:text-xl text-juwura-brown/70">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items - Full width on mobile */}
            <div className="lg:col-span-2 w-full">
              <Card className="bg-white/80 backdrop-blur-sm border border-juwura-gold/30 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6 sm:p-8 bg-juwura-brown text-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-bold font-playfair">Cart Items</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearCart}
                      className="bg-transparent border-white text-white hover:bg-white hover:text-juwura-brown transition-colors"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.name}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 sm:p-8 hover:bg-juwura-cream/20 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        {/* Product Image */}
                        <div className="w-full sm:w-24 lg:w-32 h-32 sm:h-24 lg:h-32 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 w-full">
                          <h3 className="text-lg sm:text-xl font-bold text-juwura-brown mb-2 font-playfair">
                            {item.name}
                          </h3>
                          <p className="text-xl sm:text-2xl font-bold text-juwura-terracotta mb-4">
                            ₦{item.price.toLocaleString()}
                          </p>
                          
                          {/* Quantity Controls */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3 bg-gray-100 rounded-xl p-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.name, Math.max(0, item.quantity - 1))}
                                className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-juwura-brown hover:text-white transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.name, item.quantity + 1)}
                                className="w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-juwura-brown hover:text-white transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                              <p className="text-xl font-bold text-juwura-brown">
                                ₦{(item.price * item.quantity).toLocaleString()}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.id, item.name)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Order Summary - Full width on mobile */}
            <div className="w-full">
              <Card className="bg-white/80 backdrop-blur-sm border border-juwura-gold/30 rounded-3xl shadow-2xl overflow-hidden sticky top-24">
                <div className="p-6 sm:p-8 bg-juwura-brown text-white">
                  <h2 className="text-xl sm:text-2xl font-bold font-playfair">Order Summary</h2>
                </div>
                
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Summary Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-juwura-brown">₦{getCartTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xl sm:text-2xl font-bold">
                        <span className="text-juwura-brown">Total</span>
                        <span className="text-juwura-terracotta">₦{getCartTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-juwura-brown text-white py-4 text-lg font-semibold rounded-xl hover:bg-juwura-terracotta transition-colors shadow-lg"
                      >
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                    
                    <Link to="/products" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-2 border-juwura-brown text-juwura-brown py-4 text-lg font-semibold rounded-xl hover:bg-juwura-brown hover:text-white transition-colors"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>

                  {/* Security Badge */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span>Secure checkout guaranteed</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
