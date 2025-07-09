import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CartItem } from '@/types';

const BANK_DETAILS = {
  bank: "Sparkle",
  accountNumber: "1002826361",
  accountName: "Juwura",
  contactPhone: "+234 812 345 6789",
};

const PAYMENT_WINDOW = 600; // 10 minutes in seconds

const Confirmation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  const { order, customer } = location.state || { order: { items: [], total: 0 }, customer: {} };

  const [timeLeft, setTimeLeft] = useState(PAYMENT_WINDOW);
  const [copied, setCopied] = useState<{ field: string; value: string } | null>(null);
  const [hasSentMoney, setHasSentMoney] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopied({ field, value });
    toast({
      title: "Copied!",
      description: `${field} copied to clipboard.`,
      variant: "default",
      duration: 2000,
    });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleConfirmPayment = () => {
    if (!hasSentMoney) {
      toast({
        title: "Action Required",
        description: "Please confirm that you have sent the money before proceeding.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    toast({
      title: "Payment Confirmation Received",
      description: `We have received your payment confirmation. Your order will be processed once the payment is verified. Contact ${BANK_DETAILS.contactPhone} for issues.`,
      variant: "default",
      duration: 4000,
    });
    navigate('/');
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const transactionStatus = timeLeft > 0 ? "Transaction In Progress" : "Transaction Window Expired";
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = (timeLeft / PAYMENT_WINDOW) * 100;

  if (!order || order.items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="min-h-screen w-full bg-juwura-cream flex items-center justify-center p-4"
      >
        <Card className="p-6 sm:p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-juwura-brown">No Order Found</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">It seems you haven't placed an order yet.</p>
          <Button
            onClick={() => navigate('/products')}
            className="w-full bg-juwura-brown text-white hover:bg-juwura-terracotta py-3 text-base sm:text-lg rounded-lg"
          >
            Shop Now
          </Button>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen w-full bg-juwura-cream flex items-center justify-center p-4 sm:p-6"
    >
      <Card className="w-full max-w-3xl p-6 sm:p-8 rounded-2xl shadow-lg bg-white/95 border border-juwura-gold/20 relative overflow-hidden">
        {/* Animated Transaction Status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className={`inline-block w-3 h-3 rounded-full ${timeLeft > 0 ? "bg-green-400 animate-pulse" : "bg-red-400"}`}></span>
          <span className={`font-semibold text-lg sm:text-xl ${timeLeft > 0 ? "text-juwura-brown" : "text-red-600"}`}>
            {transactionStatus}
          </span>
        </motion.div>

        {/* Timer Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex justify-between text-sm sm:text-base text-gray-600 mb-2">
            <span>Time left to pay</span>
            <span className="font-mono">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
          <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className={`h-full transition-all duration-500 ${timeLeft > 0 ? "bg-juwura-brown" : "bg-red-400"}`}
              style={{ width: `${progressPercent}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
            />
          </div>
        </motion.div>

        {/* Purchase Summary */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold mb-6 text-juwura-brown font-playfair"
        >
          Payment Confirmation
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6 mb-8"
        >
          <p className="text-green-600 font-semibold text-base sm:text-lg">Thank you for your purchase!</p>
          <div className="bg-juwura-cream/50 p-4 sm:p-6 rounded-xl shadow-sm border border-juwura-gold/20">
            <p className="font-bold text-lg sm:text-xl text-juwura-brown mb-4">Bank Details</p>
            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-gray-600 w-28 sm:w-32 shrink-0">Bank:</span>
                <span className="font-medium">{BANK_DETAILS.bank}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-gray-600 w-28 sm:w-32 shrink-0">Account Number:</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="font-mono font-semibold">{BANK_DETAILS.accountNumber}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="px-3 py-1 text-sm hover:bg-juwura-gold/20 transition-colors rounded-lg"
                    onClick={() => handleCopy(BANK_DETAILS.accountNumber, "Account Number")}
                  >
                    {copied?.field === "Account Number" ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-gray-600 w-28 sm:w-32 shrink-0">Account Name:</span>
                <span className="font-medium">{BANK_DETAILS.accountName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-gray-600 w-28 sm:w-32 shrink-0">Amount to Pay:</span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="font-bold text-juwura-terracotta text-base sm:text-lg">
                    ₦{order.total.toLocaleString()}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="px-3 py-1 text-sm hover:bg-juwura-gold/20 transition-colors rounded-lg"
                    onClick={() => handleCopy(order.total.toLocaleString(), "Amount")}
                  >
                    {copied?.field === "Amount" ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>
            </div>
            {/* Payment Instructions */}
            <div className="mt-6">
              <p className="font-semibold text-base sm:text-lg text-juwura-brown">Payment Instructions:</p>
              <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base mt-2 space-y-2">
                <li>Make a bank transfer to the account details provided above.</li>
                <li>Include your order ID or name in the payment reference.</li>
                <li>Payment must be completed within the 10-minute window.</li>
                <li>Check the box below once you have sent the money.</li>
                <li>Call {BANK_DETAILS.contactPhone} to confirm your payment.</li>
                <li>Your order will be processed after payment verification.</li>
                <li>Contact support at support@juwura.com or {BANK_DETAILS.contactPhone} for issues.</li>
              </ul>
            </div>
            {/* Payment Confirmation Checkbox */}
            <div className="mt-6 flex items-center gap-2">
              <Checkbox
                id="hasSentMoney"
                checked={hasSentMoney}
                onCheckedChange={(checked) => setHasSentMoney(checked as boolean)}
              />
              <Label htmlFor="hasSentMoney" className="text-gray-700 text-sm sm:text-base">
                I have sent the money
              </Label>
            </div>
          </div>
        </motion.div>

        {/* Purchased Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-juwura-brown font-playfair">Your Order</h3>
          <div className="divide-y divide-gray-200">
            {order.items.map((item: CartItem) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-gray-200 shadow-sm"
                />
                <div className="flex-1">
                  <div className="font-semibold text-base sm:text-lg text-juwura-brown">{item.name}</div>
                  <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                </div>
                <div className="font-bold text-base sm:text-lg text-juwura-terracotta">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <span className="font-bold text-lg sm:text-xl text-juwura-brown">Total</span>
            <span className="font-bold text-lg sm:text-xl text-juwura-terracotta">
              ₦{order.total.toLocaleString()}
            </span>
          </div>
        </motion.div>

        {/* Customer Details */}
        {customer.name && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-juwura-brown font-playfair">Customer Details</h3>
            <div className="space-y-2 text-sm sm:text-base text-gray-600">
              <p><span className="font-semibold">Name:</span> {customer.name}</p>
              <p><span className="font-semibold">Email:</span> {customer.email}</p>
              <p><span className="font-semibold">Phone:</span> {customer.phone}</p>
              <p><span className="font-semibold">Address:</span> {customer.address}</p>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col gap-3 sm:gap-4"
        >
          <Button 
            onClick={handleConfirmPayment} 
            disabled={!hasSentMoney}
            className={`w-full bg-juwura-brown hover:bg-juwura-terracotta text-white text-base sm:text-lg py-3 sm:py-4 rounded-lg transition-colors ${
              !hasSentMoney ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Confirm Payment
          </Button>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleContinueShopping} 
              variant="outline" 
              className="flex-1 text-base sm:text-lg py-3 sm:py-4 border-juwura-brown/30 hover:bg-juwura-gold/20 rounded-lg transition-colors"
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={handleReturnHome} 
              variant="outline" 
              className="flex-1 text-base sm:text-lg py-3 sm:py-4 border-juwura-brown/30 hover:bg-juwura-gold/20 rounded-lg transition-colors"
            >
              Return to Home
            </Button>
          </div>
        </motion.div>

        {/* Subtle Animation */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-juwura-gold/50 via-juwura-cream/0 to-juwura-brown/50 animate-gradient-x" />

        <style>{`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 4s linear infinite;
          }
        `}</style>
      </Card>
    </motion.div>
  );
};

export default Confirmation;