import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  AcademicCapIcon, 
  TrophyIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  CodeBracketIcon,
  ServerIcon,
  BugAntIcon
} from '@heroicons/react/24/outline';

const About: React.FC = () => {
  const skills = [
    { name: 'Penetration Testing', level: 95, color: 'neon-green' },
    { name: 'Full-Stack Development', level: 90, color: 'neon-blue' },
    { name: 'Network Security', level: 88, color: 'neon-purple' },
    { name: 'Cloud Security', level: 85, color: 'neon-green' },
    { name: 'Incident Response', level: 92, color: 'neon-blue' },
    { name: 'DevSecOps', level: 87, color: 'neon-purple' }
  ];

  const certifications = [
    { name: 'CISSP', issuer: 'ISC2', year: '2023' },
    { name: 'CEH', issuer: 'EC-Council', year: '2022' },
    { name: 'AWS Security', issuer: 'Amazon', year: '2023' },
    { name: 'OSCP', issuer: 'Offensive Security', year: '2021' }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Senior Cybersecurity Consultant',
      company: 'CyberSec Solutions',
      description: 'Leading enterprise security assessments and developing secure architectures for Fortune 500 companies.'
    },
    {
      year: '2022',
      title: 'Full-Stack Security Engineer',
      company: 'TechGuard Inc.',
      description: 'Built secure web applications and implemented DevSecOps practices across development teams.'
    },
    {
      year: '2020',
      title: 'Penetration Tester',
      company: 'SecureNet Labs',
      description: 'Conducted comprehensive security testing for web applications, networks, and cloud infrastructure.'
    },
    {
      year: '2019',
      title: 'Junior Security Analyst',
      company: 'CyberDefense Corp',
      description: 'Started career in cybersecurity, focusing on threat detection and incident response.'
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Me</h2>
          <p className="text-xl text-dark-muted max-w-3xl mx-auto">
            Passionate cybersecurity professional with 5+ years of experience in protecting digital assets 
            and building secure, scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Profile Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Profile Image and Bio */}
            <motion.div variants={itemVariants} className="card">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                {/* Profile Image Placeholder */}
                <div className="w-32 h-32 bg-gradient-to-br from-neon-green/20 to-neon-blue/20 rounded-full flex items-center justify-center border-2 border-neon-green/30">
                  <UserIcon className="h-16 w-16 text-neon-green" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gradient mb-2">Alex CyberDev</h3>
                  <p className="text-neon-green font-mono mb-4">Cybersecurity Specialist & Full-Stack Developer</p>
                  <p className="text-dark-muted leading-relaxed">
                    I specialize in building secure digital solutions and protecting organizations from cyber threats. 
                    My unique combination of offensive security expertise and development skills allows me to create 
                    robust, security-first applications.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <ShieldCheckIcon className="h-6 w-6" />, value: '500+', label: 'Security Tests' },
                { icon: <CodeBracketIcon className="h-6 w-6" />, value: '50+', label: 'Projects' },
                { icon: <BugAntIcon className="h-6 w-6" />, value: '1000+', label: 'Vulnerabilities Found' },
                { icon: <ServerIcon className="h-6 w-6" />, value: '5+', label: 'Years Experience' }
              ].map((stat, index) => (
                <div key={index} className="card text-center p-4">
                  <div className="text-neon-green mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-dark-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="card">
              <h3 className="text-xl font-bold text-gradient mb-6 flex items-center">
                <TrophyIcon className="h-6 w-6 text-neon-green mr-2" />
                Core Skills
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-dark-text font-medium">{skill.name}</span>
                      <span className="text-neon-green font-mono text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-hover rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r from-neon-green to-neon-blue`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div variants={itemVariants} className="card">
              <h3 className="text-xl font-bold text-gradient mb-6 flex items-center">
                <AcademicCapIcon className="h-6 w-6 text-neon-blue mr-2" />
                Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="bg-dark-hover p-4 rounded-lg border border-gray-700 hover:border-neon-green/50 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="font-bold text-neon-green">{cert.name}</div>
                    <div className="text-sm text-dark-muted">{cert.issuer}</div>
                    <div className="text-xs text-dark-muted font-mono">{cert.year}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gradient mb-4 flex items-center justify-center">
              <CalendarDaysIcon className="h-8 w-8 text-neon-green mr-3" />
              Professional Journey
            </h3>
            <p className="text-dark-muted max-w-2xl mx-auto">
              My career progression in cybersecurity and software development.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neon-green/30 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-neon-green rounded-full border-4 border-dark-bg transform md:-translate-x-1/2 z-10"></div>

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-neon-green font-mono font-bold">{item.year}</span>
                      </div>
                      <h4 className="text-xl font-bold text-gradient mb-1">{item.title}</h4>
                      <p className="text-neon-blue mb-3">{item.company}</p>
                      <p className="text-dark-muted text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient mb-4">Ready to Secure Your Digital Future?</h3>
            <p className="text-dark-muted mb-6">
              Let's discuss how I can help protect your organization and build secure solutions that scale.
            </p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;