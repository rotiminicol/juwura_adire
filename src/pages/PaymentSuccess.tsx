import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ShoppingBag, Home, Phone } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const orderData = location.state;

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-juwura-brown mb-4">No Order Data Found</h1>
          <Link to="/products">
            <Button className="bg-juwura-brown hover:bg-juwura-terracotta text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-juwura-brown mb-4 font-playfair">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your order. Your payment has been processed successfully.
          </p>
          
          <p className="text-sm text-gray-500">
            Order Number: <span className="font-semibold text-juwura-brown">#{orderData.orderNumber}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-juwura-brown">Order Details</h2>
            
            <div className="space-y-4">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Paid:</span>
                <span className="text-xl font-bold text-juwura-brown">
                  ₦{orderData.finalTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-juwura-brown">What's Next?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-juwura-brown text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Order Confirmation</p>
                  <p className="text-sm text-gray-600">You'll receive an email confirmation shortly with your order details.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-juwura-brown text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Processing</p>
                  <p className="text-sm text-gray-600">Our team will prepare your handcrafted items with care.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-juwura-brown text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-sm text-gray-600">Your order will be delivered to your specified address within 3-7 business days.</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-juwura-cream to-juwura-beige/50 border-juwura-gold/30">
            <h3 className="text-xl font-bold text-juwura-brown mb-3 font-playfair">
              Thank You for Choosing Jùwúrà!
            </h3>
            <p className="text-gray-700 mb-6">
              We're honored to share our authentic Nigerian fashion with you. 
              Each piece is handcrafted with love and tells a story of our rich cultural heritage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button className="bg-juwura-brown hover:bg-juwura-terracotta text-white">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="outline" className="border-juwura-brown text-juwura-brown hover:bg-juwura-brown hover:text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 pt-4 border-t border-juwura-gold/30">
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Need help? Contact us at support@juwura.com
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;