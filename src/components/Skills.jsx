import { motion } from 'framer-motion'
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaNode, FaGit } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si'
import './Skills.css'

const Skills = () => {
  const skills = [
    { name: 'React', icon: FaReact, level: 90, color: '#61DAFB' },
    { name: 'JavaScript', icon: FaJs, level: 85, color: '#F7DF1E' },
    { name: 'TypeScript', icon: SiTypescript, level: 80, color: '#3178C6' },
    { name: 'HTML5', icon: FaHtml5, level: 95, color: '#E34F26' },
    { name: 'CSS3', icon: FaCss3Alt, level: 90, color: '#1572B6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, level: 85, color: '#06B6D4' },
    { name: 'Node.js', icon: FaNode, level: 75, color: '#339933' },
    { name: 'Express', icon: SiExpress, level: 70, color: '#000000' },
    { name: 'MongoDB', icon: SiMongodb, level: 75, color: '#47A248' },
    { name: 'Git', icon: FaGit, level: 85, color: '#F05032' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>My Skills</h2>
          <p>Technologies I work with</p>
        </motion.div>

        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="skill-icon" style={{ color: skill.color }}>
                <skill.icon />
              </div>
              <h3>{skill.name}</h3>
              <div className="skill-progress">
                <motion.div 
                  className="progress-bar"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ backgroundColor: skill.color }}
                />
              </div>
              <span className="skill-level">{skill.level}%</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
