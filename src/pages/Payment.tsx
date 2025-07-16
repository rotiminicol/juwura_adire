
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Banknote, CreditCard, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

const SPARKLE_ACCOUNT = {
  number: "1002826361",
  name: "juwura",
  bank: "Sparkle"
};
const DELIVERY_FEE = 4000;
const VAT_RATE = 0.075; // 7.5% VAT

const Payment = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  // If coming from Buy Now, get product from location.state
  const singleProduct = location.state?.product;
  const items = singleProduct ? [singleProduct] : cartItems;
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + DELIVERY_FEE + vat;
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [paid, setPaid] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  if (step === 3) {
    setTimeout(() => {
      navigate('/confirmation', {
        state: {
          order: {
            items: items.map(item => ({
              ...item,
              quantity: item.quantity || 1
            })),
            total: total
          },
          customer: {} // You can add customer info if collected
        }
      });
    }, 1200);
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-juwura-brown via-juwura-cream to-juwura-terracotta z-50 px-4 py-16 text-center">
        <div className="bg-white/95 shadow-2xl rounded-3xl p-10 max-w-lg w-full border-4 border-juwura-gold/40 flex flex-col items-center animate-fade-in">
          <svg className="w-20 h-20 text-green-500 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4" /></svg>
          <h2 className="text-3xl font-bold mb-4 text-juwura-brown">Payment Successful!</h2>
          <p className="mb-6 text-lg text-juwura-brown/80">Thank you for shopping with Jùwúrà. Your order has been received.</p>
          <div className="mb-8 text-juwura-brown font-semibold">"Wear your story. Celebrate culture. Shine in Jùwúrà."</div>
          <div className="text-juwura-brown/70 text-sm">Redirecting to confirmation...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-juwura-brown via-juwura-cream to-juwura-terracotta z-50 flex flex-col min-h-screen w-full animate-fade-in">
      <div className="w-full flex flex-col items-center pt-4 sm:pt-8 pb-4">
        <img src='/juwura logo.png' alt='Jùwúrà Logo' className='h-16 w-auto md:h-24 mb-2 drop-shadow-xl' style={{maxWidth:'140px'}} />
      </div>
      <div className="flex-1 w-full flex flex-col px-2 sm:px-4 md:px-8 lg:px-16 overflow-y-auto relative">
        <div className="w-full flex flex-col items-center pb-32 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 sm:mb-10 text-juwura-brown text-center tracking-tight">Checkout & Payment</h1>
        {step === 1 && (
          <>
            <div className="mb-6 sm:mb-10 w-full rounded-2xl bg-gradient-to-r from-juwura-cream/60 to-white/80 p-4 sm:p-6 lg:p-8 shadow-lg border border-juwura-gold/20">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-juwura-brown">Order Summary</h2>
              <ul className="mb-4 text-base sm:text-lg">
                {items.map((item, idx) => (
                  <li key={idx} className="flex justify-between border-b-2 border-juwura-gold/20 py-3 font-medium">
                    <span className="flex-1 pr-4">{item.name} <span className='text-xs text-gray-500'>x{item.quantity || 1}</span></span>
                    <span className="text-right">₦{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <div className="space-y-2">
                <div className="flex justify-between text-lg sm:text-xl">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg text-juwura-brown/80">
                  <span>Delivery Fee</span>
                  <span>₦{DELIVERY_FEE.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg text-juwura-brown/80">
                  <span>VAT (7.5%)</span>
                  <span>₦{vat.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-4 sm:mt-6 font-bold text-xl sm:text-2xl border-t border-juwura-gold/20 pt-4">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="mb-6 sm:mb-10 w-full">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-juwura-brown">Choose Payment Method</h2>
              <div className="flex flex-col gap-4 w-full">
                <Button 
                  size="lg" 
                  className={`w-full text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-bold flex items-center gap-3 shadow-xl border-2 ${paymentMethod === "bank" ? "bg-juwura-brown text-white border-juwura-brown scale-105" : "bg-white text-juwura-brown border-juwura-brown/30 hover:border-juwura-brown"}`} 
                  onClick={() => setPaymentMethod("bank")}
                > 
                  <Banknote className="w-5 h-5 sm:w-6 sm:h-6" /> Bank Transfer
                </Button>
                <Button 
                  size="lg" 
                  className={`w-full text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-bold flex items-center gap-3 shadow-xl border-2 ${paymentMethod === "card" ? "bg-juwura-brown text-white border-juwura-brown scale-105" : "bg-white text-juwura-brown border-juwura-brown/30 hover:border-juwura-brown"}`} 
                  onClick={() => setPaymentMethod("card")}
                > 
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" /> Card Payment
                </Button>
              </div>
            </div>
          </>
        )}
        {step === 2 && paymentMethod === "bank" && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-juwura-brown flex items-center gap-2">
              <Banknote className="w-6 h-6 sm:w-7 sm:h-7 text-juwura-gold" /> Bank Transfer Details
            </h2>
            <div className="mb-8 p-6 sm:p-8 bg-juwura-cream/80 rounded-2xl border-2 border-juwura-gold/40 text-lg sm:text-xl w-full flex flex-col items-center shadow-lg">
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-center sm:text-left">
                <span className="font-bold">Bank:</span> 
                <span>{SPARKLE_ACCOUNT.bank}</span>
              </div>
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-center sm:text-left">
                <span className="font-bold">Account Name:</span> 
                <span className="uppercase">{SPARKLE_ACCOUNT.name}</span>
              </div>
              <div className="mb-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-center sm:text-left">
                <span className="font-bold">Account Number:</span> 
                <span className="text-2xl font-mono">{SPARKLE_ACCOUNT.number}</span>
              </div>
              <div className="text-sm sm:text-base text-juwura-brown/70 mt-4 text-center">
                Please transfer ₦{total.toLocaleString()} and take a screenshot as proof of payment.
              </div>
            </div>
          </>
        )}
        {step === 2 && paymentMethod === "card" && (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-juwura-brown flex items-center gap-2">
              <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-juwura-gold" /> Card Payment
            </h2>
            <div className="mb-8 p-6 sm:p-8 bg-juwura-cream/80 rounded-2xl border-2 border-juwura-gold/40 w-full flex flex-col items-center text-center shadow-lg">
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Card Payment Available</h3>
                <p className="text-blue-700">Pay securely with your debit or credit card.</p>
              </div>
              <div className="text-base sm:text-lg text-juwura-brown/80 mt-2">
                Amount to pay: ₦{total.toLocaleString()}
              </div>
            </div>
          </>
        )}
        </div>
        {/* Fixed action bar for navigation buttons, always visible at the bottom */}
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white/90 border-t border-juwura-gold/30 flex gap-2 sm:gap-4 px-4 py-4 justify-between items-center shadow-2xl">
          {step === 1 && <>
            <Button variant="outline" size="lg" className="flex-1 text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-5 rounded-2xl font-bold flex items-center gap-2 border-2 border-juwura-brown justify-center" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back
            </Button>
            <Button size="lg" className="flex-1 text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-5 rounded-2xl font-bold flex items-center gap-2 bg-juwura-gold text-juwura-brown shadow-xl border-2 border-juwura-gold justify-center" onClick={handleNext}>
              Proceed <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </>}
          {step === 2 && <>
            <Button variant="outline" size="lg" className="flex-1 text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-5 rounded-2xl font-bold flex items-center gap-2 border-2 border-juwura-brown justify-center" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back
            </Button>
            <Button size="lg" className="flex-1 text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-5 rounded-2xl font-bold flex items-center gap-2 bg-juwura-gold text-juwura-brown shadow-xl border-2 border-juwura-gold justify-center" onClick={handleNext}>
              {paymentMethod === 'bank' ? <>I've Paid <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" /></> : <>Pay Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" /></>}
            </Button>
          </>}
        </div>
      </div>
    </div>
  );
};

export default Payment; 
