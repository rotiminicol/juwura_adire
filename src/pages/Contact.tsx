import { useState, useEffect } from "react";
import ParallaxSection from "@/components/ParallaxSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Instagram, Clock, Send } from "lucide-react";

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
      className="bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/40 min-h-screen"
    >
      {/* Enhanced Header */}
      <ParallaxSection
        bgImage="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
        speed={0.3}
        className="min-h-[50vh] bg-juwura-brown/70 flex items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center text-white max-w-4xl mx-auto fade-in-element opacity-0"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg font-playfair">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out to us for inquiries, collaborations, or feedback.
          </p>
        </motion.div>
      </ParallaxSection>

      {/* Enhanced Contact Form & Info */}
      <ParallaxSection bgColor="#FEF7E5" speed={0.2} className="py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="fade-in-element opacity-0"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-juwura-gold/30">
              <h2 className="text-4xl font-bold mb-8 text-juwura-brown font-playfair">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                {[
                  { label: "Full Name", name: "name", type: "text", icon: "👤" },
                  { label: "Email Address", name: "email", type: "email", icon: "📧" },
                  { label: "Subject", name: "subject", type: "text", icon: "📝" }
                ].map((field) => (
                  <div key={field.name} className="relative group">
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className="peer w-full px-6 py-4 rounded-xl border-2 border-juwura-brown/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-juwura-gold focus:border-juwura-brown placeholder-transparent transition-all text-lg group-hover:border-juwura-brown/40"
                      placeholder={field.label}
                      required
                    />
                    <label
                      htmlFor={field.name}
                      className="absolute left-6 top-4 text-juwura-brown/70 text-lg transition-all duration-300 pointer-events-none
                        peer-focus:-top-3 peer-focus:text-sm peer-focus:text-juwura-brown peer-focus:font-semibold
                        peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg
                        -top-3 text-sm font-semibold bg-white px-2 rounded"
                    >
                      {field.icon} {field.label}
                    </label>
                  </div>
                ))}
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="peer w-full px-6 py-4 rounded-xl border-2 border-juwura-brown/20 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-juwura-gold focus:border-juwura-brown placeholder-transparent transition-all text-lg resize-none group-hover:border-juwura-brown/40"
                    placeholder="Message"
                    required
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-6 top-4 text-juwura-brown/70 text-lg transition-all duration-300 pointer-events-none
                      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-juwura-brown peer-focus:font-semibold
                      peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg
                      -top-3 text-sm font-semibold bg-white px-2 rounded"
                  >
                    💬 Message
                  </label>
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-juwura-brown to-juwura-terracotta text-white hover:from-juwura-terracotta hover:to-juwura-brown w-full py-6 text-xl font-bold shadow-xl transition-all duration-300 rounded-xl"
                >
                  <Send className="w-6 h-6 mr-3" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Enhanced Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="fade-in-element opacity-0"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 border border-juwura-gold/30">
              <h2 className="text-4xl font-bold mb-8 text-juwura-brown font-playfair">Get In Touch</h2>
              <div className="space-y-8">
                {[
                  { icon: MapPin, title: "Address", content: "Lagos, Nigeria", color: "text-red-500" },
                  { icon: Mail, title: "Email", content: "info.juwura@gmail.com", color: "text-blue-500", href: "mailto:info.juwura@gmail.com" },
                  { icon: Phone, title: "Phone", content: "+234 9160356477", color: "text-green-500", href: "tel:+2349160356477" },
                  { icon: Instagram, title: "Instagram", content: "@juwura.ng", color: "text-pink-500", href: "https://instagram.com/juwura.ng" },
                  { icon: Clock, title: "Business Hours", content: "Monday - Friday: 9am - 6pm\nSaturday: 10am - 4pm\nSunday: Closed", color: "text-purple-500" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-6 group p-4 rounded-xl hover:bg-juwura-gold/10 transition-colors">
                    <div className={`${item.color} p-4 rounded-full bg-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-juwura-brown">{item.title}</h3>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-gray-700 hover:text-juwura-terracotta transition-colors text-lg whitespace-pre-line"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-700 text-lg whitespace-pre-line">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Enhanced FAQs */}
      <ParallaxSection bgColor="#FFFFFF" speed={0.2} className="py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold mb-16 text-center text-juwura-brown font-playfair fade-in-element opacity-0"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="max-w-4xl mx-auto space-y-8">
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
              className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl fade-in-element opacity-0 transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 border border-juwura-gold/20"
            >
              <h3 className="text-2xl font-bold mb-4 text-juwura-brown">{faq.q}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </ParallaxSection>
    </motion.div>
  );
};

export default Contact;
