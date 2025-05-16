import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const Confirmation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Payment Confirmation</h2>
        <div className="space-y-4">
          <p className="text-green-600">Thank you for your purchase!</p>
          <p>Please make payment to:</p>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-bold">Bank Details</p>
            <p>Bank: Kuda Bank</p>
            <p>Account Number: 0244660477</p>
            <p>Account Name: Jùwúrà Limited</p>
          </div>
          <p className="text-sm">
            You have {Math.floor(timeLeft / 60)} minutes and {timeLeft % 60} seconds to complete the payment.
          </p>
          <div className="flex gap-4">
            <Button onClick={handleReturnHome}>
              Return to Home
            </Button>
            <Button onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Confirmation;
