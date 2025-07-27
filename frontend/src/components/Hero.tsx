import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronDownIcon, 
  ShieldCheckIcon, 
  CodeBracketIcon,
  ServerIcon 
} from '@heroicons/react/24/outline';

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Cybersecurity Specialist',
    'Full-Stack Developer',
    'Penetration Tester',
    'Security Researcher'
  ];

  useEffect(() => {
    const currentRole = roles[currentIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentIndex, isDeleting, roles]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              y: [0, -30, 0],
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-cyber font-bold text-dark-text"
              whileHover={{ scale: 1.02 }}
            >
              Securing the{' '}
              <span className="text-gradient glitch" data-text="Digital">
                Digital
              </span>
              <br />
              <span className="text-gradient">Future</span>
            </motion.h1>
            
            <div className="h-16 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-mono text-neon-green">
                &gt; {displayText}
                <span className="terminal-cursor">|</span>
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-dark-muted max-w-3xl mx-auto leading-relaxed"
          >
            Combining cutting-edge cybersecurity expertise with full-stack development skills
            to build secure, scalable, and innovative digital solutions.
          </motion.p>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto my-12"
          >
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <ShieldCheckIcon className="h-12 w-12 text-neon-green mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-2xl font-bold text-gradient mb-2">5+</h3>
              <p className="text-dark-muted">Years Experience</p>
            </div>
            
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <CodeBracketIcon className="h-12 w-12 text-neon-blue mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-2xl font-bold text-gradient mb-2">50+</h3>
              <p className="text-dark-muted">Projects Completed</p>
            </div>
            
            <div className="card text-center group hover:scale-105 transition-transform duration-300">
              <ServerIcon className="h-12 w-12 text-neon-purple mx-auto mb-4 group-hover:animate-pulse" />
              <h3 className="text-2xl font-bold text-gradient mb-2">99.9%</h3>
              <p className="text-dark-muted">Security Rate</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="btn-primary group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">View My Work</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer"
              onClick={() => scrollToSection('projects')}
            >
              <ChevronDownIcon className="h-8 w-8 text-neon-green" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;