import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  CodeBracketIcon, 
  CursorArrowRaysIcon,
  ServerIcon,
  BugAntIcon,
  AcademicCapIcon,
  CloudIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  popular: boolean;
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      title: 'Cybersecurity Consulting',
      description: 'Comprehensive security assessments and strategic guidance to protect your digital assets.',
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      features: [
        'Security Risk Assessment',
        'Compliance Auditing',
        'Incident Response Planning',
        'Security Policy Development',
        'Employee Security Training'
      ],
      price: 'From $2,500',
      popular: true
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Modern, secure, and scalable web applications built with cutting-edge technologies.',
      icon: <CodeBracketIcon className="h-8 w-8" />,
      features: [
        'Full-Stack Development',
        'Responsive Design',
        'API Development',
        'Database Design',
        'Performance Optimization'
      ],
      price: 'From $5,000',
      popular: false
    },
    {
      id: 3,
      title: 'Penetration Testing',
      description: 'Comprehensive security testing to identify vulnerabilities before malicious actors do.',
      icon: <BugAntIcon className="h-8 w-8" />,
      features: [
        'Network Penetration Testing',
        'Web Application Testing',
        'Social Engineering Tests',
        'Wireless Security Testing',
        'Detailed Reporting'
      ],
      price: 'From $3,500',
      popular: true
    },
    {
      id: 4,
      title: 'Cloud Security',
      description: 'Secure cloud infrastructure setup and monitoring for AWS, Azure, and Google Cloud.',
      icon: <CloudIcon className="h-8 w-8" />,
      features: [
        'Cloud Architecture Review',
        'IAM Configuration',
        'Compliance Monitoring',
        'Security Automation',
        'Cost Optimization'
      ],
      price: 'From $4,000',
      popular: false
    },
    {
      id: 5,
      title: 'Security Training',
      description: 'Hands-on cybersecurity training and workshops for teams and individuals.',
      icon: <AcademicCapIcon className="h-8 w-8" />,
      features: [
        'Security Awareness Training',
        'Technical Skills Development',
        'Certification Preparation',
        'Custom Workshops',
        'Online Course Creation'
      ],
      price: 'From $1,500',
      popular: false
    },
    {
      id: 6,
      title: 'Web Scraping & Automation',
      description: 'Ethical data extraction and process automation solutions for business intelligence.',
      icon: <CursorArrowRaysIcon className="h-8 w-8" />,
      features: [
        'Custom Scraping Solutions',
        'Data Pipeline Creation',
        'API Integration',
        'Process Automation',
        'Data Analysis & Reporting'
      ],
      price: 'From $2,000',
      popular: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-hover/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Services & Expertise</h2>
          <p className="text-xl text-dark-muted max-w-3xl mx-auto">
            Comprehensive cybersecurity and development services to secure and enhance your digital presence.
            From penetration testing to full-stack development, I provide end-to-end solutions.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className={`card group relative overflow-hidden hover:scale-105 transition-all duration-300 ${
                service.popular ? 'border-neon-green/50 shadow-lg shadow-neon-green/20' : ''
              }`}
              whileHover={{ y: -5 }}
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-neon-green text-black text-xs font-bold px-2 py-1 rounded-full">
                    POPULAR
                  </span>
                </div>
              )}

              {/* Service Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-neon-green/20 to-neon-blue/20 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-neon-green group-hover:text-neon-blue transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gradient mb-2 group-hover:text-neon-green transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-dark-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mb-6">
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center text-sm text-dark-text"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <LockClosedIcon className="h-4 w-4 text-neon-green mr-3 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="mt-auto">
                <div className="text-center mb-6">
                  <span className="text-2xl font-bold text-gradient">{service.price}</span>
                  <span className="text-dark-muted text-sm ml-1">per project</span>
                </div>

                {/* CTA Button */}
                <motion.button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    service.popular
                      ? 'btn-primary'
                      : 'btn-secondary'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get Started
                </motion.button>
              </div>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 to-neon-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gradient mb-4">My Process</h3>
            <p className="text-dark-muted max-w-2xl mx-auto">
              A systematic approach to delivering high-quality security and development solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your requirements and security posture' },
              { step: '02', title: 'Analysis', desc: 'Comprehensive assessment and planning' },
              { step: '03', title: 'Implementation', desc: 'Executing solutions with best practices' },
              { step: '04', title: 'Delivery', desc: 'Testing, documentation, and knowledge transfer' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-dark-card border-2 border-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-neon-green font-mono font-bold">{item.step}</span>
                </div>
                <h4 className="text-lg font-semibold text-dark-text mb-2">{item.title}</h4>
                <p className="text-dark-muted text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;