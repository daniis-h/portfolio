import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoLink: string;
  codeLink: string;
  category: string;
}

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [filter, setFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "TerraVerse 3D",
      description: "TerraVerse 3D transforms drone footage into a 3D VR exploration of real estate and society environments using Gaussian splatting, with a voice chatbot for interacting with society-related queries.",
      technologies: ["Python", "Pinecone", "LangChain", "AWS", "C#", "Gaussian-Splatting"],
      image: "/images/project1.jpg",
      demoLink: "#",
      codeLink: "#",
      category: "AI/ML"
    },
    {
      id: 2,
      title: "Sketch-to-Face Conversion",
      description: "Built a Conditional GAN model to turn sketches into realistic face images using the Person Face Sketches dataset.",
      technologies: ["Python", "Pytorch"],
      image: "/images/project2.jpg",
      demoLink: "#",
      codeLink: "#",
      category: "AI/ML"
    },
    {
      id: 3,
      title: "IMDB Movie Rating Prediction",
      description: "Built an LSTM-based deep learning model to predict IMDB movie ratings from reviews using NLP techniques",
      technologies: ["TensorFlow", "Keras"],
      image: "/images/project3.jpg",
      demoLink: "#",
      codeLink: "#",
      category: "AI/ML"
    },
    
  ];
  
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
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
  
  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        delay: 0.3
      }
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 80,
        damping: 10
      }
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.9,
      transition: { 
        duration: 0.3 
      }
    }
  };
  
  return (
    <section id="projects" className="projects-section" ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          My Projects
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Explore my recent work and creative solutions
        </motion.p>
        
        <motion.div 
          className="project-filters"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={filterVariants}
        >
          {categories.map((category, index) => (
            <motion.button 
              key={index} 
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { delay: 0.1 * index, duration: 0.5 }
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            className="projects-grid"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            exit="exit"
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id} 
                className="project-card"
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ 
                  y: -15,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)' 
                }}
                layoutId={`project-${project.id}`}
              >
                <div className="project-image">
                  <motion.div 
                    className="image-placeholder"
                    animate={{ 
                      scale: hoveredId === project.id ? 1.05 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <span>{project.title}</span>
                  </motion.div>
                  <motion.div 
                    className="project-links"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredId === project.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a 
                      href={project.demoLink} 
                      className="project-link" 
                      title="View Demo"
                      whileHover={{ 
                        scale: 1.2,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)' 
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredId === project.id ? 0 : 20, 
                        opacity: hoveredId === project.id ? 1 : 0,
                        transition: { delay: 0.1 }
                      }}
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </motion.a>
                    <motion.a 
                      href={project.codeLink} 
                      className="project-link" 
                      title="View Code"
                      whileHover={{ 
                        scale: 1.2,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)' 
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredId === project.id ? 0 : 20, 
                        opacity: hoveredId === project.id ? 1 : 0,
                        transition: { delay: 0.2 }
                      }}
                    >
                      <i className="fab fa-github"></i>
                    </motion.a>
                  </motion.div>
                </div>
                <motion.div 
                  className="project-info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.2, duration: 0.5 }
                  }}
                >
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex} 
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          transition: { delay: 0.3 + (techIndex * 0.05) }
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;