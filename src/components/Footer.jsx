import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>
            Made with <FaHeart className="heart" /> by Your Name
          </p>
          <p>&copy; 2024 Your Portfolio. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
