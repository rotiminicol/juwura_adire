
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Clock, Truck, X } from "lucide-react";
import { motion } from "framer-motion";

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  items: OrderItem[];
  total: number;
}

interface Customer {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

const Confirmation = () => {
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    }
    if (location.state?.customer) {
      setCustomer(location.state.customer);
    }
  }, [location.state]);

  if (!order) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-juwura-brown">No Order Found</h2>
          <p className="mb-6 text-lg">Please place an order first.</p>
          <Link to="/products">
            <Button className="bg-juwura-brown text-white px-6 py-3 rounded-full hover:bg-juwura-terracotta transition-colors">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-juwura-gold/30 p-6 sm:p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl sm:text-4xl font-bold text-juwura-brown mb-4 font-playfair">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
          </div>

          {/* Order Status */}
          <div className="mb-8 p-6 bg-juwura-cream/30 rounded-2xl border border-juwura-gold/20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-juwura-brown" />
                <div>
                  <p className="font-semibold text-juwura-brown">Processing</p>
                  <p className="text-sm text-gray-600">We're preparing your order</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <Package className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-400">Packed</p>
                  <p className="text-sm text-gray-400">Ready for shipping</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <Truck className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-400">Shipped</p>
                  <p className="text-sm text-gray-400">On the way to you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-juwura-brown mb-6 font-playfair">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white rounded-xl border border-juwura-gold/20 shadow-sm">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-juwura-brown">{item.name}</h3>
                      <p className="text-juwura-terracotta font-bold">₦{item.price.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-juwura-brown mb-6 font-playfair">Order Summary</h2>
              <div className="bg-white rounded-xl border border-juwura-gold/20 shadow-sm p-6 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₦{order.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-juwura-brown">Total</span>
                    <span className="text-juwura-terracotta">₦{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {customer && (customer.name || customer.email) && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-juwura-brown mb-4">Delivery Information</h3>
                  <div className="bg-white rounded-xl border border-juwura-gold/20 shadow-sm p-6 space-y-2">
                    {customer.name && <p><strong>Name:</strong> {customer.name}</p>}
                    {customer.email && <p><strong>Email:</strong> {customer.email}</p>}
                    {customer.phone && <p><strong>Phone:</strong> {customer.phone}</p>}
                    {customer.address && <p><strong>Address:</strong> {customer.address}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/products">
              <Button className="bg-juwura-brown text-white px-8 py-4 rounded-xl hover:bg-juwura-terracotta transition-colors shadow-lg text-lg mr-4">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="border-2 border-juwura-brown text-juwura-brown px-8 py-4 rounded-xl hover:bg-juwura-brown hover:text-white transition-colors text-lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Payment Confirmation Modal with close button */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-juwura-brown mb-4">Payment Confirmation</h2>
              <p className="text-gray-600 mb-6">
                Your payment has been received! We'll process your order and send you tracking information soon.
              </p>
              <Button
                onClick={() => setShowModal(false)}
                className="bg-juwura-brown text-white px-6 py-3 rounded-xl hover:bg-juwura-terracotta transition-colors"
              >
                Got it, thanks!
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
