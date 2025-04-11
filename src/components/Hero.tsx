import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
  delay: number;
}

const Hero = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const phrases = ["Hi, I'm Danish Javaid"];
  // Using number type instead of NodeJS.Timeout to fix the error
  const typingRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Generate particles
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ['#5b8af5', '#4fd1c5', '#9d4edd'];
      
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 60 + 40,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.05 + 0.02,
          speed: Math.random() * 10 + 15,
          delay: Math.random() * 5
        });
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  // Typing animation
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullPhrase = phrases[i];
      
      setText(
        isDeleting 
        ? fullPhrase.substring(0, text.length - 1) 
        : fullPhrase.substring(0, text.length + 1)
      );
      
      // Set typing speed
      setTypingSpeed(isDeleting ? 75 : 150);
      
      // If completed typing phrase
      if (!isDeleting && text === fullPhrase) {
        // Pause at the end of phrase
        setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } 
      // If deleted phrase
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        // Pause before typing next phrase
        setTypingSpeed(500);
      }
    };
    
    // Using window.setTimeout to fix the TypeScript error
    typingRef.current = window.setTimeout(handleTyping, typingSpeed);
    
    return () => {
      if (typingRef.current) window.clearTimeout(typingRef.current);
    };
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <section id="hero" className="hero-section">
      {/* Animated Background */}
      <div className="animated-bg">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="bubble"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: `${particle.speed}s`,
              animationDelay: `${particle.delay}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            className="typing-text"
          >
            <span className="typing-cursor">{text}</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6, 
              duration: 0.6,
              ease: "easeOut" 
            }}
          >
            Software Engineer & AI/ML Specialist
          </motion.h2>
          
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.a 
              href="#contact" 
              className="btn primary-btn"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(91, 138, 245, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
            <motion.a 
              href="#projects" 
              className="btn secondary-btn"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 5px 15px rgba(91, 138, 245, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div 
          className="mouse"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut"
          }}
        ></motion.div>
        <p>Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;