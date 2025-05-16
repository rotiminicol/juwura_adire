
import { useState, useEffect } from "react";
import ParallaxSection from "@/components/ParallaxSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    // Show success toast
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We will get back to you soon.",
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  // Elements entering viewport animation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.add("opacity-100");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".fade-in-element");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="pt-16">
      {/* Header */}
      <ParallaxSection 
        bgImage="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.3}
        className="min-h-[40vh] bg-juwura-brown/60"
      >
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We'd love to hear from you. Reach out to us for inquiries, collaborations, or feedback.
          </p>
        </div>
      </ParallaxSection>

      {/* Contact Form & Info */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.2}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="fade-in-element opacity-0">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-juwura-brown"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-juwura-brown"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-juwura-brown"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-juwura-brown"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="bg-juwura-brown text-white hover:bg-juwura-terracotta w-full py-6"
              >
                Send Message
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="fade-in-element opacity-0">
            <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-juwura-brown text-white p-3 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Address</h3>
                  <p className="text-gray-600">
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-juwura-brown text-white p-3 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Email</h3>
                  <a href="mailto:info@juwura.com" className="text-gray-600 hover:text-juwura-terracotta">
                    info@juwura.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-juwura-brown text-white p-3 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Phone</h3>
                  <a href="tel:+2348000000000" className="text-gray-600 hover:text-juwura-terracotta">
                    +234 800 000 0000
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-juwura-brown text-white p-3 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Map */}
      <ParallaxSection speed={0.1} className="h-[400px]">
        <div className="w-full h-full">
          {/* This is a placeholder for the map. In a real implementation, you'd use Google Maps or similar */}
          <div className="w-full h-full bg-juwura-indigo flex items-center justify-center">
            <div className="text-white text-center">
              <h3 className="text-2xl font-medium mb-4">Find Us in Lagos</h3>
              <p>Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* FAQs */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.2}>
        <h2 className="text-3xl font-bold mb-12 text-center fade-in-element opacity-0">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md fade-in-element opacity-0">
            <h3 className="text-xl font-bold mb-3">Do you ship internationally?</h3>
            <p className="text-gray-600">
              Yes, we ship our products worldwide. International shipping rates and delivery times 
              vary depending on the destination country. Shipping details are calculated at checkout.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md fade-in-element opacity-0">
            <h3 className="text-xl font-bold mb-3">What is your return policy?</h3>
            <p className="text-gray-600">
              We accept returns within 14 days of delivery for items in their original condition. 
              Custom orders are non-refundable. Please contact us for return authorization before sending any items.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md fade-in-element opacity-0">
            <h3 className="text-xl font-bold mb-3">How do I care for my adire garments?</h3>
            <p className="text-gray-600">
              We recommend hand washing your adire pieces in cold water with mild detergent. 
              Avoid direct sunlight when drying and store in a cool, dry place. See our detailed care 
              instructions on the Products page.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md fade-in-element opacity-0">
            <h3 className="text-xl font-bold mb-3">Do you offer custom orders?</h3>
            <p className="text-gray-600">
              Yes, we offer custom-made adire pieces tailored to your specifications. 
              Please contact us with your requirements for a quote and lead time estimate.
            </p>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Contact;
