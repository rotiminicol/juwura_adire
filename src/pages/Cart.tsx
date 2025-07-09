
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import ParallaxSection from '@/components/ParallaxSection';
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    navigate('/confirmation', {
      state: {
        order: {
          items: cartItems,
          total: total
        },
        customer: {
          name: 'Guest',
          email: '',
          phone: '',
          address: ''
        }
      }
    });
    toast({
      title: "Proceeding to Payment",
      description: "Your order has been prepared for payment confirmation.",
      variant: "default",
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen w-full bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50"
    >
      <ParallaxSection bgColor="#FEF7E5" speed={0.1} className="flex-1 flex flex-col justify-center">
        <div className="w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-juwura-brown" />
            <h1 className="text-4xl sm:text-5xl font-bold text-juwura-brown font-playfair">Shopping Cart</h1>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 sm:py-20"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md mx-auto border border-juwura-gold/30">
                <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-juwura-brown/50" />
                <p className="text-gray-600 text-xl mb-8">Your cart is empty</p>
                <Button
                  onClick={() => navigate('/products')}
                  className="bg-juwura-brown text-white hover:bg-juwura-terracotta px-8 py-4 text-lg rounded-xl shadow-lg"
                >
                  Continue Shopping
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="w-full max-w-none">
              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-8 xl:gap-12">
                {/* Cart Items - Desktop */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-juwura-gold/30">
                    <h2 className="text-2xl font-bold mb-6 text-juwura-brown">Cart Items ({cartItems.length})</h2>
                    {cartItems.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="flex items-center justify-between p-6 border-b border-juwura-gold/20 last:border-b-0"
                      >
                        <div className="flex items-center space-x-6">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-xl shadow-md"
                          />
                          <div>
                            <h3 className="font-bold text-xl text-juwura-brown">{item.name}</h3>
                            <p className="text-juwura-terracotta text-lg font-semibold">
                              ₦{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 bg-juwura-gold/10 rounded-xl p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-10 w-10 rounded-lg hover:bg-juwura-brown hover:text-white"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-10 w-10 rounded-lg hover:bg-juwura-brown hover:text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 hover:bg-red-600 rounded-xl px-4 py-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cart Summary - Desktop */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-juwura-gold/30 sticky top-24">
                    <h3 className="font-bold text-2xl mb-6 text-juwura-brown">Order Summary</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold">₦{total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-semibold text-green-600">Free</span>
                      </div>
                      <div className="border-t border-juwura-gold/30 pt-4">
                        <div className="flex justify-between font-bold text-xl text-juwura-brown">
                          <span>Total</span>
                          <span>₦{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <Button
                        className="w-full bg-gradient-to-r from-juwura-brown to-juwura-terracotta text-white hover:from-juwura-terracotta hover:to-juwura-brown py-4 text-lg font-bold rounded-xl shadow-lg"
                        onClick={handleCheckout}
                      >
                        Proceed to Checkout
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-2 border-juwura-brown/30 hover:bg-juwura-gold/20 py-4 text-lg rounded-xl"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden space-y-6">
                {/* Cart Items - Mobile */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-juwura-gold/30">
                  <h2 className="text-xl font-bold mb-6 text-juwura-brown">Cart Items ({cartItems.length})</h2>
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white/80 p-4 rounded-2xl shadow-md border border-juwura-gold/20"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-juwura-brown">{item.name}</h3>
                            <p className="text-juwura-terracotta font-semibold">
                              ₦{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 bg-juwura-gold/10 rounded-xl p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-9 w-9 rounded-lg"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-9 w-9 rounded-lg"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 hover:bg-red-600 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cart Summary - Mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-juwura-gold/30 min-h-[300px]"
                >
                  <h3 className="font-bold text-xl mb-6 text-juwura-brown">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₦{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="border-t border-juwura-gold/30 pt-4">
                      <div className="flex justify-between font-bold text-lg text-juwura-brown">
                        <span>Total</span>
                        <span>₦{total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-juwura-brown to-juwura-terracotta text-white hover:from-juwura-terracotta hover:to-juwura-brown py-4 text-base font-bold rounded-xl shadow-lg"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-juwura-brown/30 hover:bg-juwura-gold/20 py-4 text-base rounded-xl"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </ParallaxSection>
    </motion.div>
  );
};

export default Cart;
