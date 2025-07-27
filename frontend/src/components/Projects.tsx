import React from 'react';
import { motion } from 'framer-motion';
import { 
  CodeBracketIcon, 
  EyeIcon, 
  ShieldCheckIcon,
  ServerIcon,
  CpuChipIcon,
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  category: 'cybersecurity' | 'web-dev' | 'tools';
  featured: boolean;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'SecureVault',
      description: 'Enterprise-grade password manager with end-to-end encryption, multi-factor authentication, and advanced threat detection.',
      image: '/api/placeholder/400/250',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'AES-256', 'PBKDF2'],
      githubUrl: 'https://github.com/username/securevault',
      demoUrl: 'https://securevault-demo.com',
      category: 'cybersecurity',
      featured: true
    },
    {
      id: 2,
      title: 'ThreatHunter',
      description: 'Real-time network monitoring and intrusion detection system with AI-powered threat analysis and automated response.',
      image: '/api/placeholder/400/250',
      techStack: ['Python', 'TensorFlow', 'Docker', 'Redis', 'Wireshark'],
      githubUrl: 'https://github.com/username/threathunter',
      demoUrl: 'https://threathunter-demo.com',
      category: 'cybersecurity',
      featured: true
    },
    {
      id: 3,
      title: 'CyberDash',
      description: 'Modern cybersecurity dashboard for SOC teams with real-time threat visualization and incident management.',
      image: '/api/placeholder/400/250',
      techStack: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io', 'D3.js'],
      githubUrl: 'https://github.com/username/cyberdash',
      demoUrl: 'https://cyberdash-demo.com',
      category: 'web-dev',
      featured: false
    },
    {
      id: 4,
      title: 'PenTest Toolkit',
      description: 'Comprehensive penetration testing suite with automated vulnerability scanning and reporting capabilities.',
      image: '/api/placeholder/400/250',
      techStack: ['Python', 'Bash', 'Nmap', 'Metasploit', 'OWASP ZAP'],
      githubUrl: 'https://github.com/username/pentest-toolkit',
      demoUrl: 'https://pentest-demo.com',
      category: 'tools',
      featured: true
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cybersecurity':
        return <ShieldCheckIcon className="h-5 w-5" />;
      case 'web-dev':
        return <GlobeAltIcon className="h-5 w-5" />;
      case 'tools':
        return <CpuChipIcon className="h-5 w-5" />;
      default:
        return <CodeBracketIcon className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cybersecurity':
        return 'text-neon-green bg-neon-green/10 border-neon-green/30';
      case 'web-dev':
        return 'text-neon-blue bg-neon-blue/10 border-neon-blue/30';
      case 'tools':
        return 'text-neon-purple bg-neon-purple/10 border-neon-purple/30';
      default:
        return 'text-neon-green bg-neon-green/10 border-neon-green/30';
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-xl text-dark-muted max-w-3xl mx-auto">
            Explore my latest cybersecurity tools, web applications, and security research projects.
            Each project showcases different aspects of modern security practices and development.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className={`card project-card group relative overflow-hidden ${
                project.featured ? 'border-neon-green/50' : ''
              }`}
              whileHover={{ y: -5 }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-neon-green text-black text-xs font-bold px-2 py-1 rounded-full">
                    FEATURED
                  </span>
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 bg-dark-hover rounded-lg mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/20 to-neon-blue/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ServerIcon className="h-20 w-20 text-neon-green/60" />
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-dark-card rounded-full text-neon-green hover:bg-neon-green hover:text-black transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <CodeBracketIcon className="h-6 w-6" />
                  </motion.a>
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-dark-card rounded-full text-neon-blue hover:bg-neon-blue hover:text-black transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <EyeIcon className="h-6 w-6" />
                  </motion.a>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                    {getCategoryIcon(project.category)}
                    <span className="capitalize">{project.category.replace('-', ' ')}</span>
                  </span>
                </div>

                {/* Title and Description */}
                <div>
                  <h3 className="text-2xl font-bold text-gradient mb-3 group-hover:text-neon-green transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-dark-muted leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold text-dark-text mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-dark-hover text-neon-green text-sm rounded-full border border-gray-700 hover:border-neon-green/50 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-secondary text-center py-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CodeBracketIcon className="h-4 w-4 inline mr-2" />
                    Source Code
                  </motion.a>
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary text-center py-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <EyeIcon className="h-4 w-4 inline mr-2" />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;