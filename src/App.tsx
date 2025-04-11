import { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const loadingVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <AnimatePresence>
        {loading && (
          <motion.div 
            className="loader"
            variants={loadingVariants}
            initial="initial"
            exit="exit"
            key="loader"
          >
            <div className="spinner"></div>
            <h2>Loading...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="content"
            variants={contentVariants}
            initial="initial"
            animate="animate"
          >
            <Header darkMode={darkMode} setDarkMode={setDarkMode} scrollY={scrollY} />
            <main>
              <Hero />
              <About />
              <TechStack />
              <Projects />
              <Contact />
            </main>
            <Footer />
            
            {/* Scroll to top button */}
            {scrollY > 500 && (
              <motion.button 
                className="scroll-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 5px 15px rgba(91, 138, 245, 0.4)' 
                }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-arrow-up"></i>
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;