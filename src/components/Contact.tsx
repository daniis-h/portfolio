import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const handleFocus = (field: string) => {
    setActiveField(field);
  };
  
  const handleBlur = () => {
    setActiveField(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    // For demo purposes, we'll just simulate a successful submission
    
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Your message has been sent successfully! I\'ll get back to you soon.'
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const leftColumnVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const rightColumnVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.7,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };
  
  const infoItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.5 + (i * 0.1),
        duration: 0.5
      }
    })
  };
  
  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.8 + (i * 0.1),
        type: "spring",
        stiffness: 200
      }
    })
  };
  
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.5 + (i * 0.1),
        duration: 0.5
      }
    }),
    focused: { 
      scale: 1.02,
      boxShadow: '0 0 20px rgba(91, 138, 245, 0.3)',
      borderColor: 'var(--dark-primary)',
      transition: { duration: 0.3 }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.9,
        duration: 0.5
      }
    }
  };
  
  const socialLinks = [
    { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/muhammad-danish-javaid-3aa69725b/' },
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/daniis-h' },
    { name: 'Gmail', icon: 'fas fa-envelope', url: 'daniish007.0@gmail.com' },
  ];
  
  const contactInfo = [
    { type: 'Email', value: 'daniish007.0@gmail.com', icon: 'fas fa-envelope' },
    { type: 'Location', value: 'Rawalpindi', icon: 'fas fa-map-marker-alt' },
  ];
  
  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          Get In Touch
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a question or want to work together? Feel free to reach out!
        </motion.p>
        
        <div className="contact-container">
          <motion.div 
            className="contact-info"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={leftColumnVariants}
          >
            <h3>Contact Information</h3>
            
            <div className="info-items">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="info-item"
                  custom={index}
                  variants={infoItemVariants}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="info-icon"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1, 
                      transition: { duration: 0.5 } 
                    }}
                  >
                    <i className={item.icon}></i>
                  </motion.div>
                  <div className="info-content">
                    <h4>{item.type}</h4>
                    <p>{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="social-links">
              <h4>Connect With Me</h4>
              <div className="social-icons">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    custom={index}
                    variants={socialIconVariants}
                    whileHover={{ 
                      y: -8,
                      boxShadow: '0 8px 25px rgba(91, 138, 245, 0.4)'
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={link.icon}></i>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="contact-form-container"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={rightColumnVariants}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <motion.div 
                className="form-group"
                custom={0}
                variants={inputVariants}
              >
                <label htmlFor="name">Your Name</label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  animate={activeField === 'name' ? 'focused' : ''}
                  required
                />
              </motion.div>
              
              <motion.div 
                className="form-group"
                custom={1}
                variants={inputVariants}
              >
                <label htmlFor="email">Your Email</label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  animate={activeField === 'email' ? 'focused' : ''}
                  required
                />
              </motion.div>
              
              <motion.div 
                className="form-group"
                custom={2}
                variants={inputVariants}
              >
                <label htmlFor="subject">Subject</label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  animate={activeField === 'subject' ? 'focused' : ''}
                  required
                />
              </motion.div>
              
              <motion.div 
                className="form-group"
                custom={3}
                variants={inputVariants}
              >
                <label htmlFor="message">Your Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  animate={activeField === 'message' ? 'focused' : ''}
                  rows={5}
                  required
                ></motion.textarea>
              </motion.div>
              
              <motion.button
                type="submit"
                className="btn primary-btn submit-btn"
                variants={buttonVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 10px 30px rgba(91, 138, 245, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
              
              <AnimatePresence>
                {formStatus.submitted && (
                  <motion.div 
                    className={`form-message ${formStatus.success ? 'success' : 'error'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    {formStatus.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;