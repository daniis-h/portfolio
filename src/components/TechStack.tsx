import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TechItem {
  name: string;
  icon: string;
  category: string;
}

const TechStack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const techItems: TechItem[] = [
    // Languages
    { name: 'JavaScript', icon: 'devicon-javascript-plain', category: 'Languages' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain', category: 'Languages' },
    { name: 'Python', icon: 'devicon-python-plain', category: 'Languages' },
    { name: 'Java', icon: 'devicon-java-plain', category: 'Languages' },
    
    // Frontend
    { name: 'React', icon: 'devicon-react-original', category: 'Frontend' },
    { name: 'Next.js', icon: 'devicon-nextjs-original', category: 'Frontend' },
    { name: 'Vue.js', icon: 'devicon-vuejs-plain', category: 'Frontend' },
    { name: 'HTML5', icon: 'devicon-html5-plain', category: 'Frontend' },
    { name: 'CSS3', icon: 'devicon-css3-plain', category: 'Frontend' },
    { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain', category: 'Frontend' },
    
    // Backend
    { name: 'Node.js', icon: 'devicon-nodejs-plain', category: 'Backend' },
    { name: 'Express', icon: 'devicon-express-original', category: 'Backend' },
    { name: 'MongoDB', icon: 'devicon-mongodb-plain', category: 'Backend' },
    { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', category: 'Backend' },
    
    // AI/ML
    { name: 'TensorFlow', icon: 'devicon-tensorflow-original', category: 'AI/ML' },
    { name: 'PyTorch', icon: 'devicon-pytorch-original', category: 'AI/ML' },
    { name: 'Pandas', icon: 'devicon-pandas-original', category: 'AI/ML' },
    { name: 'NumPy', icon: 'devicon-numpy-original', category: 'AI/ML' },
    
    // DevOps/Tools
    { name: 'Git', icon: 'devicon-git-plain', category: 'DevOps/Tools' },
    { name: 'Docker', icon: 'devicon-docker-plain', category: 'DevOps/Tools' },
    { name: 'AWS', icon: 'devicon-amazonwebservices-original', category: 'DevOps/Tools' },
    { name: 'GitHub', icon: 'devicon-github-original', category: 'DevOps/Tools' },
  ];

  const categories = [...new Set(techItems.map(item => item.category))];

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        duration: 0.5
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="tech-stack" className="tech-stack-section" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          Tech Stack
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Technologies I work with to create exceptional digital experiences
        </motion.p>
        
        <motion.div 
          className="tech-categories"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          {categories.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex} 
              className="tech-category"
              variants={categoryVariants}
              custom={categoryIndex}
            >
              <motion.h3
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.5, 
                      delay: 0.1 * categoryIndex 
                    }
                  }
                }}
              >
                {category}
              </motion.h3>
              
              <motion.div 
                className="tech-grid"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                {techItems
                  .filter(tech => tech.category === category)
                  .map((tech, techIndex) => (
                    <motion.div 
                      key={techIndex} 
                      className="tech-item"
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                        y: -10
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.i 
                        className={tech.icon}
                        animate={{ rotateY: [0, 360] }}
                        transition={{ 
                          duration: 1.2,
                          delay: 0.5 + (techIndex * 0.05),
                          ease: "easeInOut"
                        }}
                      ></motion.i>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 + (techIndex * 0.05), duration: 0.5 }}
                      >
                        {tech.name}
                      </motion.span>
                    </motion.div>
                  ))
                }
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;