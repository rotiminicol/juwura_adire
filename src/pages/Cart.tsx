import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import ParallaxSection from '@/components/ParallaxSection';
import { motion } from "framer-motion";

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
      className="min-h-screen w-full bg-juwura-cream relative"
    >
      <ParallaxSection bgColor="#FEF7E5" speed={0.1} className="flex-1 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-10 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center font-playfair">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <p className="text-gray-600 text-lg sm:text-xl mb-6">Your cart is empty</p>
              <Button
                onClick={() => navigate('/products')}
                className="bg-juwura-brown text-white hover:bg-juwura-terracotta px-6 py-3 text-base sm:text-lg rounded-lg"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-col md:grid md:grid-cols-4 gap-6 sm:gap-8">
              {/* Cart Items */}
              <div className="md:col-span-3 space-y-4 sm:space-y-6">
                {cartItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                  >
                    <Card className="p-4 sm:p-6 bg-white/95 shadow-md rounded-xl">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4 w-full">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg sm:text-xl">{item.name}</h3>
                            <p className="text-gray-600 text-sm sm:text-base">
                              ₦{item.price.toLocaleString()} × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-10 w-10 border-juwura-brown/30 hover:bg-juwura-gold/20"
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.id, parseInt(e.target.value) || 1)
                              }
                              className="w-16 sm:w-20 h-10 text-center text-sm sm:text-base"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-10 w-10 border-juwura-brown/30 hover:bg-juwura-gold/20"
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white py-2"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {/* Cart Summary */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-4 sm:space-y-6"
              >
                <Card className="p-4 sm:p-6 bg-white/95 shadow-md rounded-xl sticky top-4">
                  <h3 className="font-semibold text-lg sm:text-xl mb-4">Cart Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Subtotal</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold text-base sm:text-lg">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 sm:mt-6 bg-juwura-brown text-white hover:bg-juwura-terracotta py-3 text-base sm:text-lg rounded-lg"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2 sm:mt-3 border-juwura-brown/30 hover:bg-juwura-gold/20 py-3 text-base sm:text-lg rounded-lg"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </ParallaxSection>
    </motion.div>
  );
};

export default Cart;