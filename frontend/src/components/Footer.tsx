import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  HeartIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/username', icon: '🔗' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: '💼' },
    { name: 'Twitter', url: 'https://twitter.com/username', icon: '🐦' },
    { name: 'Email', url: 'mailto:alex@cyberdev.com', icon: '📧' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-dark-card border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-8 w-8 text-neon-green" />
              <span className="text-xl font-cyber font-bold text-gradient">
                CyberDev
              </span>
            </div>
            <p className="text-dark-muted text-sm leading-relaxed">
              Securing the digital future through innovative cybersecurity solutions 
              and cutting-edge web development. Building trust through technology.
            </p>
            <div className="flex items-center space-x-2 text-sm text-dark-muted">
              <span>Made with</span>
              <HeartIcon className="h-4 w-4 text-neon-green animate-pulse" />
              <span>and lots of ☕</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gradient">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-dark-muted hover:text-neon-green transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <button
                onClick={() => scrollToSection('admin')}
                className="text-xs text-dark-muted hover:text-neon-green transition-colors duration-300"
              >
                Admin Dashboard
              </button>
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gradient">Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-dark-muted hover:text-neon-green transition-colors duration-300 text-sm"
                  whileHover={{ x: 3 }}
                >
                  <span>{social.icon}</span>
                  <span>{social.name}</span>
                </motion.a>
              ))}
            </div>
            
            {/* Newsletter Signup */}
            <div className="pt-4">
              <h4 className="text-sm font-medium text-dark-text mb-2">Security Updates</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-3 py-2 bg-dark-hover border border-gray-700 rounded text-sm text-dark-text placeholder-dark-muted focus:outline-none focus:border-neon-green"
                />
                <motion.button
                  className="px-4 py-2 bg-neon-green text-black rounded text-sm font-medium hover:bg-neon-blue transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
        >
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-dark-muted text-sm">
              © {currentYear} CyberDev Portfolio. All rights reserved.
            </p>
            <p className="text-dark-muted text-xs mt-1">
              Built with React, TypeScript, Tailwind CSS & Node.js
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center space-x-6 text-xs text-dark-muted">
            <button className="hover:text-neon-green transition-colors duration-300">
              Privacy Policy
            </button>
            <button className="hover:text-neon-green transition-colors duration-300">
              Terms of Service
            </button>
            <button className="hover:text-neon-green transition-colors duration-300">
              Security
            </button>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="p-2 bg-dark-hover hover:bg-neon-green hover:text-black rounded-lg transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpIcon className="h-5 w-5 text-neon-green group-hover:text-black" />
          </motion.button>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 p-4 bg-dark-hover/50 rounded-lg border border-gray-800"
        >
          <div className="flex items-center justify-center space-x-2 text-xs text-dark-muted">
            <ShieldCheckIcon className="h-4 w-4 text-neon-green" />
            <span>This site is secured with industry-standard encryption and security practices</span>
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>

      {/* Matrix particles effect for footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-green/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;