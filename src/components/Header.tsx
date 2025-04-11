import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  scrollY: number;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, scrollY }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (menuOpen && !target.closest('.nav-menu') && !target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);
  
  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);
  
  const sections = ['About', 'Tech Stack', 'Projects', 'Contact'];
  
  // Animation variants
  const logoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };
  
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut" 
      }
    }),
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };
  
  const themeToggleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };
  
  const menuVariants = {
    closed: {
      opacity: 0,
      x: 300,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <motion.header 
      className={`header ${scrollY > 50 ? 'header-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container header-container">
        <motion.a 
          href="#" 
          className="logo"
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          Portfolio
        </motion.a>
        
        <motion.div 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <ul>
            {sections.map((section, index) => (
              <motion.li 
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
                whileHover="hover"
              >
                <a 
                  href={`#${section.toLowerCase().replace(' ', '-')}`} 
                  onClick={() => setMenuOpen(false)}
                >
                  {section}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              className="mobile-nav"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <ul>
                {sections.map((section, index) => (
                  <motion.li 
                    key={index}
                    variants={menuItemVariants}
                  >
                    <a 
                      href={`#${section.toLowerCase().replace(' ', '-')}`} 
                      onClick={() => setMenuOpen(false)}
                    >
                      {section}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button 
          className="theme-toggle" 
          onClick={toggleDarkMode}
          initial="hidden"
          animate="visible"
          variants={themeToggleVariants}
          whileHover={{ 
            rotate: 180,
            scale: 1.1,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          {darkMode ? '☀️' : '🌙'}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;