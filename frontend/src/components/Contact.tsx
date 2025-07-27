import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();

  const contactInfo: ContactInfo[] = [
    {
      icon: <EnvelopeIcon className="h-6 w-6" />,
      title: 'Email',
      value: 'alex@cyberdev.com',
      link: 'mailto:alex@cyberdev.com'
    },
    {
      icon: <PhoneIcon className="h-6 w-6" />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      title: 'Location',
      value: 'San Francisco, CA'
    }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/username', icon: '🔗' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: '💼' },
    { name: 'Twitter', url: 'https://twitter.com/username', icon: '🐦' },
    { name: 'Discord', url: 'https://discord.gg/username', icon: '💬' }
  ];

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/contact', data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      if (response.data.success) {
        setSubmitStatus('success');
        setSubmitMessage(response.data.message || 'Message sent successfully!');
        reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage(response.data.message || 'Failed to send message. Please try again.');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      if (error.response?.data?.message) {
        setSubmitMessage(error.response.data.message);
      } else if (error.code === 'ECONNABORTED') {
        setSubmitMessage('Request timeout. Please check your connection and try again.');
      } else if (error.code === 'ERR_NETWORK') {
        setSubmitMessage('Network error. Please check your connection and try again.');
      } else {
        setSubmitMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-hover/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-xl text-dark-muted max-w-3xl mx-auto">
            Ready to secure your digital assets or build something amazing? 
            Let's discuss your project and how I can help protect and enhance your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card group hover:border-neon-green/50 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon-green/20 to-neon-blue/20 rounded-lg flex items-center justify-center text-neon-green group-hover:text-neon-blue transition-colors duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark-text">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-neon-green hover:text-neon-blue transition-colors duration-300"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-dark-muted">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="card">
              <h3 className="text-xl font-bold text-gradient mb-6">Connect With Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-dark-hover rounded-lg border border-gray-700 hover:border-neon-green/50 hover:bg-dark-card transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-xl">{social.icon}</span>
                    <span className="text-dark-text font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={itemVariants} className="card">
              <h3 className="text-xl font-bold text-gradient mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-dark-text">Response Time:</span>
                  <span className="text-neon-green font-mono">24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-text">Current Status:</span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-neon-green rounded-full mr-2 animate-pulse"></div>
                    <span className="text-neon-green text-sm">Available for new projects</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-dark-text">Time Zone:</span>
                  <span className="text-dark-muted font-mono">PST (UTC-8)</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card">
              <h3 className="text-xl font-bold text-gradient mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-text mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                      maxLength: { value: 100, message: 'Name must be less than 100 characters' }
                    })}
                    className="input-field"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="form-error">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-text mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    className="input-field"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark-text mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      maxLength: { value: 1000, message: 'Message must be less than 1000 characters' }
                    })}
                    className="input-field resize-none"
                    placeholder="Tell me about your project, security needs, or how I can help..."
                  />
                  {errors.message && (
                    <p className="form-error">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Status */}
                {submitStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border ${
                      submitStatus === 'success'
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {submitStatus === 'success' ? (
                        <CheckCircleIcon className="h-5 w-5" />
                      ) : (
                        <ExclamationCircleIcon className="h-5 w-5" />
                      )}
                      <span>{submitMessage}</span>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary relative ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <span className="flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner w-5 h-5 mr-3"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;