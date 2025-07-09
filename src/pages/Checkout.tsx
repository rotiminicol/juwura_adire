
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  CreditCard, 
  Building2, 
  Smartphone,
  Shield,
  CheckCircle
} from "lucide-react";

interface CheckoutItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<CheckoutItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    // Customer Info
    name: '',
    email: '',
    phone: '',
    address: '',
    // Card Details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    // Bank Transfer
    bankName: '',
    accountNumber: ''
  });

  useEffect(() => {
    if (location.state?.item) {
      setCheckoutData(location.state.item);
    } else {
      navigate('/products');
    }
  }, [location.state, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone && formData.address;
      case 2:
        return paymentMethod === "transfer" || 
               (formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardName);
      case 3:
        return paymentMethod === "card" || 
               (paymentMethod === "transfer" && formData.bankName && formData.accountNumber);
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const completePayment = () => {
    if (!checkoutData) return;
    
    navigate('/confirmation', {
      state: {
        order: {
          items: [checkoutData],
          total: checkoutData.price * checkoutData.quantity
        },
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        },
        paymentMethod: paymentMethod
      }
    });
  };

  if (!checkoutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: "Shipping Info", icon: "📋" },
    { number: 2, title: "Payment Method", icon: "💳" },
    { number: 3, title: "Payment Details", icon: "🔒" },
    { number: 4, title: "Confirmation", icon: "✅" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center text-juwura-brown hover:text-juwura-terracotta mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-juwura-brown font-playfair">Secure Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                  currentStep >= step.number 
                    ? 'bg-juwura-brown text-white' 
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="w-5 h-5" /> : step.number}
                </div>
                <div className="ml-2 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-juwura-brown' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-20 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-juwura-brown' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-juwura-gold/30">
              <CardContent className="p-6">
                {/* Step 1: Shipping Information */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-juwura-brown mb-6">Shipping Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="address">Delivery Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment Method */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-juwura-brown mb-6">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-juwura-brown/50">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                            <CreditCard className="w-5 h-5 mr-3 text-juwura-brown" />
                            <div>
                              <p className="font-semibold">Credit/Debit Card</p>
                              <p className="text-sm text-gray-600">Pay securely with your card</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-juwura-brown/50">
                          <RadioGroupItem value="transfer" id="transfer" />
                          <Label htmlFor="transfer" className="flex items-center cursor-pointer flex-1">
                            <Building2 className="w-5 h-5 mr-3 text-juwura-brown" />
                            <div>
                              <p className="font-semibold">Bank Transfer</p>
                              <p className="text-sm text-gray-600">Direct bank transfer</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-juwura-brown/50 opacity-50">
                          <RadioGroupItem value="mobile" id="mobile" disabled />
                          <Label htmlFor="mobile" className="flex items-center cursor-pointer flex-1">
                            <Smartphone className="w-5 h-5 mr-3 text-gray-400" />
                            <div>
                              <p className="font-semibold text-gray-400">Mobile Money</p>
                              <p className="text-sm text-gray-400">Coming soon</p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </motion.div>
                )}

                {/* Step 3: Payment Details */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-juwura-brown mb-6">Payment Details</h2>
                    
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Shield className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-600">Secured by SSL encryption</span>
                        </div>
                        <div>
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date *</Label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={formData.expiryDate}
                              onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                              className="mt-1"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name *</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange('cardName', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "transfer" && (
                      <div className="space-y-4">
                        <div className="bg-juwura-cream/30 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">Bank Transfer Details</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Please transfer the exact amount to the following account:
                          </p>
                          <div className="space-y-1 text-sm">
                            <p><strong>Account Name:</strong> Juwura Adire Collections</p>
                            <p><strong>Account Number:</strong> 1234567890</p>
                            <p><strong>Bank:</strong> First Bank of Nigeria</p>
                            <p><strong>Amount:</strong> ₦{(checkoutData.price * checkoutData.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="bankName">Your Bank Name *</Label>
                          <Input
                            id="bankName"
                            placeholder="e.g., Access Bank"
                            value={formData.bankName}
                            onChange={(e) => handleInputChange('bankName', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountNumber">Your Account Number *</Label>
                          <Input
                            id="accountNumber"
                            placeholder="1234567890"
                            value={formData.accountNumber}
                            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-juwura-brown">Review Your Order</h2>
                    <p className="text-gray-600">
                      Please review your order details before completing the purchase.
                    </p>
                    
                    <div className="text-left bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Order Summary</h3>
                      <p><strong>Item:</strong> {checkoutData.name}</p>
                      <p><strong>Quantity:</strong> {checkoutData.quantity}</p>
                      <p><strong>Total:</strong> ₦{(checkoutData.price * checkoutData.quantity).toLocaleString()}</p>
                      <Separator className="my-2" />
                      <p><strong>Payment Method:</strong> {paymentMethod === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'}</p>
                      <p><strong>Delivery Address:</strong> {formData.address}</p>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  {currentStep > 1 && (
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {currentStep < 4 ? (
                      <Button
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                        className="bg-juwura-brown hover:bg-juwura-terracotta flex items-center"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={completePayment}
                        className="bg-green-600 hover:bg-green-700 flex items-center"
                      >
                        Complete Order
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-juwura-gold/30 sticky top-24">
              <CardHeader>
                <CardTitle className="text-juwura-brown">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <img 
                    src={checkoutData.image} 
                    alt={checkoutData.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{checkoutData.name}</h3>
                    {checkoutData.size && (
                      <p className="text-sm text-gray-600">Size: {checkoutData.size}</p>
                    )}
                    <p className="text-sm text-gray-600">Qty: {checkoutData.quantity}</p>
                    <p className="font-bold text-juwura-terracotta">₦{checkoutData.price.toLocaleString()}</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₦{(checkoutData.price * checkoutData.quantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-juwura-terracotta">₦{(checkoutData.price * checkoutData.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
