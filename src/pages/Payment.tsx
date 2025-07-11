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
          <div className="mb-8 text-juwura-brown font-semibold">“Wear your story. Celebrate culture. Shine in Jùwúrà.”</div>
          <div className="text-juwura-brown/70 text-sm">Redirecting to confirmation...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-juwura-brown via-juwura-cream to-juwura-terracotta z-50 flex flex-col min-h-screen w-full animate-fade-in">
      <div className="w-full flex flex-col items-center pt-8 pb-4">
        <img src='/juwura logo.png' alt='Jùwúrà Logo' className='h-20 w-auto md:h-28 mb-2 drop-shadow-xl' style={{maxWidth:'160px'}} />
      </div>
      <div className="flex-1 w-full flex flex-col px-2 sm:px-8 md:px-24 xl:px-64 overflow-y-auto relative">
        <div className="w-full flex flex-col items-center pb-32">
          <h1 className="text-4xl font-extrabold mb-10 text-juwura-brown text-center tracking-tight">Checkout & Payment</h1>
        {step === 1 && (
          <>
            <div className="mb-10 w-full rounded-2xl bg-gradient-to-r from-juwura-cream/60 to-white/80 p-4 sm:p-8 shadow-lg border border-juwura-gold/20">
              <h2 className="text-2xl font-bold mb-4 text-juwura-brown">Order Summary</h2>
              <ul className="mb-4 text-lg">
                {items.map((item, idx) => (
                  <li key={idx} className="flex justify-between border-b-2 border-juwura-gold/20 py-3 font-medium">
                    <span>{item.name} <span className='text-xs text-gray-500'>x{item.quantity || 1}</span></span>
                    <span>₦{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-4 text-xl">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-2 text-lg text-juwura-brown/80">
                <span>Delivery Fee</span>
                <span>₦{DELIVERY_FEE.toLocaleString()} <span className="text-xs">(added for delivery)</span></span>
              </div>
              <div className="flex justify-between mt-2 text-lg text-juwura-brown/80">
                <span>VAT (7.5%)</span>
                <span>₦{vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mt-6 font-bold text-2xl">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
            <div className="mb-10 w-full">
              <h2 className="text-2xl font-bold mb-4 text-juwura-brown">Choose Payment Method</h2>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center w-full">
                <Button size="lg" className={`w-full sm:w-auto text-lg px-8 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-xl border-2 ${paymentMethod === "bank" ? "bg-juwura-brown text-white border-juwura-brown scale-105" : "bg-white text-juwura-brown border-juwura-brown/30 hover:border-juwura-brown"}`} onClick={() => setPaymentMethod("bank")}> <Banknote className="w-6 h-6" /> Bank Transfer</Button>
                <Button size="lg" className={`w-full sm:w-auto text-lg px-8 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-xl border-2 ${paymentMethod === "card" ? "bg-juwura-brown text-white border-juwura-brown scale-105" : "bg-white text-juwura-brown border-juwura-brown/30 hover:border-juwura-brown"}`} onClick={() => setPaymentMethod("card")}> <CreditCard className="w-6 h-6" /> Card Payment</Button>
              </div>
            </div>
          </>
        )}
        {step === 2 && paymentMethod === "bank" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-juwura-brown flex items-center gap-2"><Banknote className="w-7 h-7 text-juwura-gold" /> Bank Transfer Details</h2>
            <div className="mb-8 p-8 bg-juwura-cream/80 rounded-2xl border-2 border-juwura-gold/40 text-xl w-full flex flex-col items-center shadow-lg">
              <div className="mb-3 flex items-center gap-2"><span className="font-bold">Bank:</span> <span>{SPARKLE_ACCOUNT.bank}</span></div>
              <div className="mb-3 flex items-center gap-2"><span className="font-bold">Account Name:</span> <span className="uppercase">{SPARKLE_ACCOUNT.name}</span></div>
              <div className="mb-3 flex items-center gap-2"><span className="font-bold">Account Number:</span> <span>{SPARKLE_ACCOUNT.number}</span></div>
              <div className="text-base text-juwura-brown/70 mt-4 text-center">Please transfer the total amount and upload your payment proof on the next page.</div>
            </div>
          </>
        )}
        {step === 2 && paymentMethod === "card" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-juwura-brown flex items-center gap-2"><CreditCard className="w-7 h-7 text-juwura-gold" /> Card Payment</h2>
            <div className="mb-8 p-8 bg-juwura-cream/80 rounded-2xl border-2 border-juwura-gold/40 text-xl w-full flex flex-col items-center text-center shadow-lg">
              <div className="mb-2">(Card payment integration coming soon)</div>
              <div className="text-base text-juwura-brown/70 mt-2">For now, please use bank transfer.</div>
            </div>
          </>
        )}
        </div>
        {/* Fixed action bar for navigation buttons, always visible at the bottom */}
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white/90 border-t border-juwura-gold/30 flex gap-4 px-4 py-4 justify-between items-center shadow-2xl">
          {step === 1 && <>
            <Button variant="outline" size="lg" className="w-1/2 text-lg px-8 py-5 rounded-2xl font-bold flex items-center gap-2 border-2 border-juwura-brown justify-center" onClick={() => navigate(-1)}><ArrowLeft className="w-5 h-5" /> Back</Button>
            <Button size="lg" className="w-1/2 text-lg px-8 py-5 rounded-2xl font-bold flex items-center gap-2 bg-juwura-gold text-juwura-brown shadow-xl border-2 border-juwura-gold justify-center" onClick={handleNext}>Proceed <ArrowRight className="w-5 h-5" /></Button>
          </>}
          {step === 2 && <>
            <Button variant="outline" size="lg" className="w-1/2 text-lg px-8 py-5 rounded-2xl font-bold flex items-center gap-2 border-2 border-juwura-brown justify-center" onClick={handleBack}><ArrowLeft className="w-5 h-5" /> Back</Button>
            <Button size="lg" className="w-1/2 text-lg px-8 py-5 rounded-2xl font-bold flex items-center gap-2 bg-juwura-gold text-juwura-brown shadow-xl border-2 border-juwura-gold justify-center" onClick={handleNext}>{paymentMethod === 'bank' ? <>I've Paid <CheckCircle className="w-5 h-5 text-green-600" /></> : <>Continue <ArrowRight className="w-5 h-5" /></>}</Button>
          </>}
        </div>
      </div>
    </div>
  );
};

export default Payment; 