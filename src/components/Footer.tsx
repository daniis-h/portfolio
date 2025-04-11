import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };
  
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * i + 0.2,
        duration: 0.5
      }
    })
  };
  
  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.1 * i + 0.3,
        type: "spring",
        stiffness: 200
      }
    })
  };
  
  const footerLinks = [
    { name: 'About', href: '#about' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];
  
  const socialLinks = [
    { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/muhammad-danish-javaid-3aa69725b/' },
    { icon: 'fab fa-github', href: 'https://github.com/daniis-h' },
    { icon: 'fas fa-envelope', href: 'daniish007.0@gmail.com' }
  ];
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-logo"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={logoVariants}
          >
            <motion.a 
              href="#"
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
            >
              Danish.
            </motion.a>
          </motion.div>
          
          <motion.div
            className="footer-links"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            custom={1}
          >
            {footerLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                custom={index}
                variants={linkVariants}
                whileHover={{ 
                  y: -5,
                  color: 'var(--dark-primary)',
                  transition: { duration: 0.2 }
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div
            className="footer-social"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            custom={2}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                variants={socialVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.2,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.div 
          className="footer-bottom"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUpVariants}
          custom={3}
        >
          <p>&copy; {currentYear} Danish. All Rights Reserved.</p>
          <p>
            Designed & Built with <motion.span 
              className="heart"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              ❤️
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;