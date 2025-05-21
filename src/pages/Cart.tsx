import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import ParallaxSection from '@/components/ParallaxSection';

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
          name: 'Guest', // Could prompt for customer details if needed
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
    <div className="min-h-screen w-full bg-juwura-cream relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button
          variant="outline"
          className="hover:bg-juwura-gold/20 transition-colors duration-300 border-juwura-brown/30"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>
      </div>
      <ParallaxSection bgColor="#FEF7E5" speed={0.1} className="flex-1 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 w-full py-8">
          <h1 className="text-3xl font-bold mb-8 text-center font-playfair">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Button
                onClick={() => navigate('/products')}
                className="bg-juwura-brown text-white hover:bg-juwura-terracotta"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-3 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-gray-600">
                            ₦{item.price.toLocaleString()} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value) || 1)
                            }
                            className="w-16 text-center"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {/* Cart Summary */}
              <div className="space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold text-lg mb-4">Cart Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-juwura-brown text-white hover:bg-juwura-terracotta"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-juwura-brown/30 hover:bg-juwura-gold/20"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </Card>
              </div>
            </div>
          )}
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Cart;