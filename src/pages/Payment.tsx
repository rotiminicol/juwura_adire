import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Building2, Shield, Truck, Calculator } from 'lucide-react';

interface PaymentProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  total: number;
}

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });

  const orderData = location.state as PaymentProps;
  
  useEffect(() => {
    if (!orderData) {
      navigate('/products');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const deliveryFee = 4000;
  const subtotal = orderData.total;
  const vat = Math.round(subtotal * 0.075); // 7.5% VAT
  const finalTotal = subtotal + deliveryFee + vat;

  const handlePayment = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process payment
      navigate('/payment-success', {
        state: {
          ...orderData,
          paymentMethod,
          finalTotal,
          orderNumber: `JUW${Date.now().toString().slice(-6)}`
        }
      });
    }
  };

  const stepTitles = [
    'Order Review',
    'Payment Method',
    'Confirm Payment'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step > index + 1 ? 'bg-green-500 text-white' : 
                  step === index + 1 ? 'bg-juwura-brown text-white' : 
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                {index < stepTitles.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-juwura-brown">{stepTitles[step - 1]}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <Card className="p-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Delivery Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p><strong>Name:</strong> {orderData.customer.name}</p>
                      <p><strong>Email:</strong> {orderData.customer.email}</p>
                      <p><strong>Phone:</strong> {orderData.customer.phone}</p>
                      <p><strong>Address:</strong> {orderData.customer.address}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <label htmlFor="card" className="flex items-center gap-3 flex-1 cursor-pointer">
                          <CreditCard className="w-5 h-5 text-juwura-brown" />
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-gray-600">Pay securely with your card</p>
                          </div>
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <label htmlFor="transfer" className="flex items-center gap-3 flex-1 cursor-pointer">
                          <Building2 className="w-5 h-5 text-juwura-brown" />
                          <div>
                            <p className="font-medium">Bank Transfer</p>
                            <p className="text-sm text-gray-600">Transfer to our Sparkle account</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 mt-6"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardHolder">Card Holder Name</Label>
                          <Input
                            id="cardHolder"
                            value={cardDetails.cardHolder}
                            onChange={(e) => setCardDetails({...cardDetails, cardHolder: e.target.value})}
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            value={cardDetails.expiryDate}
                            onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === 'transfer' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-blue-50 p-4 rounded-lg mt-6"
                    >
                      <h3 className="font-semibold mb-3">Bank Transfer Details</h3>
                      <div className="space-y-2">
                        <p><strong>Bank:</strong> Sparkle Bank</p>
                        <p><strong>Account Number:</strong> 1002826361</p>
                        <p><strong>Account Name:</strong> Juwura</p>
                        <p className="text-sm text-blue-600 mt-3">
                          Please transfer the exact amount and send proof of payment to our WhatsApp.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Confirm Payment</h2>
                  
                  <div className="bg-green-50 p-4 rounded-lg flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Secure Payment</p>
                      <p className="text-sm text-green-600">Your payment information is encrypted and secure.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Payment Summary</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span>Payment Method:</span>
                        <span className="font-medium">
                          {paymentMethod === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'}
                        </span>
                      </div>
                      {paymentMethod === 'transfer' && (
                        <div className="text-sm text-gray-600">
                          Transfer to Sparkle Bank - Account: 1002826361
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={handlePayment}
                  className="bg-juwura-brown hover:bg-juwura-terracotta text-white ml-auto"
                >
                  {step === 3 ? 'Complete Payment' : 'Continue'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    Delivery Fee
                  </span>
                  <span>₦{deliveryFee.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <Calculator className="w-4 h-4" />
                    VAT (7.5%)
                  </span>
                  <span>₦{vat.toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Delivery Fee:</strong> ₦4,000 flat rate for all orders
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;