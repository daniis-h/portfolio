import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, delay: 0.2, type: "spring", stiffness: 100, damping: 10 } }
  };

  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4, staggerChildren: 0.2, delayChildren: 0.6 } }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 10 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.8 } }
  };

  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } }
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.h2
          className="section-title"
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          About Me
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={imageVariants}
          >
            <div className="image-container">
              <div className="image-placeholder">
                <img
                  src="/images/WhatsApp Image 2025-04-10 at 12.12.15 PM.jpeg"
                  alt="About Me"
                  className="profile-image"
                />
              </div>

              <div className="image-overlay">
                <motion.div
                  className="social-icons-overlay"
                  variants={socialVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                >
                  <motion.a
                    href="https://www.linkedin.com/in/muhammad-danish-javaid-3aa69725b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-overlay"
                    variants={iconVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </motion.a>
                  <motion.a
                    href="https://github.com/daniis-h"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-overlay"
                    variants={iconVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                  >
                    <i className="fab fa-github"></i>
                  </motion.a>
                  <motion.a
                    href="daniish007.0@gmail.com"
                    className="social-icon-overlay"
                    variants={iconVariants}
                    whileHover={{
                      y: -5,
                      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
                    }}
                  >
                    <i className="fas fa-envelope"></i>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <motion.p variants={paragraphVariants}>
              I am a passionate Software Engineer with expertise in Artificial Intelligence and Machine Learning.
              With a strong foundation in software development and a keen interest in cutting-edge technologies,
              I specialize in building intelligent systems that solve real-world problems.
            </motion.p>
            <motion.p variants={paragraphVariants}>
              My journey in technology began with a fascination for how software can transform ideas into reality.
              Over the years, I've honed my skills in various programming languages and frameworks, allowing me to
              develop versatile solutions across different domains.
            </motion.p>
            <motion.p variants={paragraphVariants}>
              I thrive in collaborative environments where innovation is encouraged and enjoy tackling complex
              challenges that push the boundaries of what's possible with technology. When I'm not coding,
              you can find me exploring new research papers, contributing to open-source projects, or mentoring
              aspiring developers.
            </motion.p>

            <motion.div
              className="about-stats"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.7
                  }
                }
              }}
            >
              <motion.div
                className="stat"
                variants={statVariants}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <span className="stat-label">Years Experience</span>
              </motion.div>
            </motion.div>

            <motion.a
              href="#contact"
              className="btn primary-btn"
              variants={buttonVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(91, 138, 245, 0.4)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Talk
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;