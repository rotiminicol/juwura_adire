
import { useState, useEffect } from "react";
import ParallaxSection from "@/components/ParallaxSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

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
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We will get back to you soon.",
      variant: "default",
    });
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  // Animate fade-in for elements
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-b from-juwura-cream/60 via-white to-juwura-cream/30 min-h-screen"
    >
      {/* Header */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.3}
        className="min-h-[40vh] bg-juwura-brown/60 flex items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-white max-w-2xl mx-auto fade-in-element opacity-0"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We'd love to hear from you. Reach out to us for inquiries, collaborations, or feedback.
          </p>
        </motion.div>
      </ParallaxSection>

      {/* Contact Form & Info */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.2}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="fade-in-element opacity-0"
          >
            <h2 className="text-3xl font-bold mb-8 text-juwura-brown">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-8 bg-white/80 rounded-2xl shadow-2xl p-8 backdrop-blur-md border border-juwura-brown/10">
              {/* Floating label fields */}
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email Address", name: "email", type: "email" },
                { label: "Subject", name: "subject", type: "text" }
              ].map((field) => (
                <div key={field.name} className="relative">
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="peer w-full px-4 py-4 rounded-md border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-juwura-brown placeholder-transparent"
                    placeholder={field.label}
                    required
                  />
                  <label
                    htmlFor={field.name}
                    className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none
                      peer-focus:-top-3 peer-focus:text-xs peer-focus:text-juwura-brown
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                      -top-3 text-xs bg-white/80 px-1"
                  >
                    {field.label}
                  </label>
                </div>
              ))}
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="peer w-full px-4 py-4 rounded-md border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-juwura-brown placeholder-transparent"
                  placeholder="Message"
                  required
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 pointer-events-none
                    peer-focus:-top-3 peer-focus:text-xs peer-focus:text-juwura-brown
                    peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                    -top-3 text-xs bg-white/80 px-1"
                >
                  Message
                </label>
              </div>
              <Button
                type="submit"
                className="bg-juwura-brown text-white hover:bg-juwura-terracotta w-full py-6 text-lg font-bold shadow-lg transition-all duration-300"
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Message
                </span>
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="fade-in-element opacity-0"
          >
            <h2 className="text-3xl font-bold mb-8 text-juwura-brown">Get In Touch</h2>
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4 group">
                <div className="bg-juwura-brown text-white p-3 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Address</h3>
                  <p className="text-gray-600">Lagos, Nigeria</p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="bg-juwura-brown text-white p-3 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Email</h3>
                  <a href="mailto:info.juwura@gmail.com" className="text-gray-600 hover:text-juwura-terracotta transition-colors">
                    info.juwura@gmail.com
                  </a>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-4 group">
                <div className="bg-juwura-brown text-white p-3 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-wiggle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Phone</h3>
                  <a href="tel:+2349160356477" className="text-gray-600 hover:text-juwura-terracotta transition-colors">
                    +234 9160356477
                  </a>
                </div>
              </div>
              {/* Instagram */}
              <div className="flex items-start gap-4 group">
                <div className="bg-juwura-brown text-white p-3 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {/* Instagram SVG icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
                    <circle cx="17" cy="7" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Instagram</h3>
                  <a href="https://instagram.com/juwura.ng" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-juwura-terracotta transition-colors">
                    @juwura.ng
                  </a>
                </div>
              </div>
              {/* Business Hours */}
              <div className="flex items-start gap-4 group">
                <div className="bg-juwura-brown text-white p-3 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          </motion.div>
        </div>
      </ParallaxSection>

      {/* FAQs */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.2}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl font-bold mb-12 text-center text-juwura-brown fade-in-element opacity-0"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              q: "Do you ship internationally?",
              a: "Yes, we ship our products worldwide. International shipping rates and delivery times vary depending on the destination country. Shipping details are calculated at checkout."
            },
            {
              q: "What is your return policy?",
              a: "We accept returns within 14 days of delivery for items in their original condition. Custom orders are non-refundable. Please contact us for return authorization before sending any items."
            },
            {
              q: "How do I care for my adire garments?",
              a: "We recommend hand washing your adire pieces in cold water with mild detergent. Avoid direct sunlight when drying and store in a cool, dry place. See our detailed care instructions on the Products page."
            },
            {
              q: "Do you offer custom orders?",
              a: "Yes, we offer custom-made adire pieces tailored to your specifications. Please contact us with your requirements for a quote and lead time estimate."
            }
          ].map((faq, idx) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 + idx * 0.08 }}
              className={`bg-white/90 p-6 rounded-xl shadow-md fade-in-element opacity-0 transition-all duration-700 ${idx % 2 === 0 ? "hover:scale-[1.02] hover:shadow-xl" : "hover:-translate-y-1 hover:shadow-2xl"}`}
            >
              <h3 className="text-xl font-bold mb-3 text-juwura-brown">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </ParallaxSection>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(.4,2,.3,1) both;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg);}
          50% { transform: rotate(5deg);}
        }
        .animate-wiggle {
          animation: wiggle 1.2s infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes bounceIn {
          0% { transform: scale(0.8);}
          60% { transform: scale(1.1);}
          100% { transform: scale(1);}
        }
        .animate-bounceIn {
          animation: bounceIn 0.7s cubic-bezier(.4,2,.3,1) both;
        }
      `}</style>
    </motion.div>
  );
};

export default Contact;
