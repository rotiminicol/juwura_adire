
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
      variant: "default",
      duration: 3000,
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "info.juwura@gmail.com",
      action: "mailto:info.juwura@gmail.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "+234 9160356477",
      action: "tel:+2349160356477",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Lagos, Nigeria",
      action: "#",
    },
    {
      icon: Instagram,
      title: "Follow Us",
      description: "@juwura",
      action: "https://instagram.com/juwura",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-juwura-cream via-white to-juwura-beige/50 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-juwura-brown/10 to-juwura-gold/10"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <MessageCircle className="w-16 h-16 mx-auto mb-6 text-juwura-brown" />
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-juwura-brown mb-6 font-playfair">
                Get in Touch
              </h1>
              <p className="text-xl sm:text-2xl text-juwura-brown/80 max-w-2xl mx-auto leading-relaxed">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border border-juwura-gold/30 rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6 sm:p-8 bg-juwura-brown text-white">
                  <h2 className="text-2xl sm:text-3xl font-bold font-playfair mb-2">Send us a Message</h2>
                  <p className="text-juwura-cream/90">We'll get back to you within 24 hours</p>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-juwura-brown font-semibold mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white/50 border-2 border-juwura-brown/20 rounded-xl py-3 px-4 text-lg focus:border-juwura-brown focus:ring-2 focus:ring-juwura-gold/20 transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-juwura-brown font-semibold mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white/50 border-2 border-juwura-brown/20 rounded-xl py-3 px-4 text-lg focus:border-juwura-brown focus:ring-2 focus:ring-juwura-gold/20 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-juwura-brown font-semibold mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-white/50 border-2 border-juwura-brown/20 rounded-xl py-3 px-4 text-lg focus:border-juwura-brown focus:ring-2 focus:ring-juwura-gold/20 transition-all"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-juwura-brown font-semibold mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="bg-white/50 border-2 border-juwura-brown/20 rounded-xl py-3 px-4 text-lg focus:border-juwura-brown focus:ring-2 focus:ring-juwura-gold/20 transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      className="w-full bg-juwura-brown text-white py-4 text-lg font-semibold rounded-xl hover:bg-juwura-terracotta transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-juwura-brown mb-6 font-playfair">
                  Let's Connect
                </h2>
                <p className="text-lg text-juwura-brown/80 leading-relaxed">
                  Whether you have questions about our products, need styling advice, 
                  or want to discuss custom orders, we're here to help. Reach out through 
                  any of the channels below.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border border-juwura-gold/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                      <a
                        href={item.action}
                        target={item.action.startsWith('http') ? '_blank' : '_self'}
                        rel={item.action.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="block p-6 hover:bg-juwura-cream/20 transition-colors rounded-2xl"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="bg-juwura-brown/10 p-3 rounded-xl">
                            <item.icon className="w-6 h-6 text-juwura-brown" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-juwura-brown">{item.title}</h3>
                            <p className="text-juwura-brown/70">{item.description}</p>
                          </div>
                        </div>
                      </a>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Card className="bg-gradient-to-br from-juwura-brown to-juwura-terracotta text-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-4 font-playfair">Business Hours</h3>
                    <div className="space-y-2 text-juwura-cream/90">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-transparent to-juwura-cream/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-juwura-brown mb-6 font-playfair">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-juwura-brown/80 max-w-2xl mx-auto">
              Quick answers to common questions about our products and services.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid gap-6">
            {[
              {
                question: "What is adire?",
                answer: "Adire is a traditional Nigerian textile art that involves resist-dyeing techniques to create beautiful patterns on fabric, typically using indigo dye."
              },
              {
                question: "How do I care for my adire garments?",
                answer: "We recommend hand washing in cold water with mild detergent and air drying to preserve the colors and patterns."
              },
              {
                question: "Do you offer custom designs?",
                answer: "Yes! We offer custom adire pieces. Contact us to discuss your vision and we'll work with our artisans to create something unique for you."
              },
              {
                question: "What are your shipping options?",
                answer: "We offer nationwide delivery within Nigeria. Shipping costs vary by location. Contact us for international shipping inquiries."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border border-juwura-gold/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-juwura-brown mb-3">{faq.question}</h3>
                    <p className="text-juwura-brown/80 leading-relaxed">{faq.answer}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
