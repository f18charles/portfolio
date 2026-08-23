import { motion } from 'framer-motion'

// A small, reusable scroll-reveal wrapper. Keeping this in one place means
// every page animates consistently instead of scattering random effects.
export default function AnimatedReveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
