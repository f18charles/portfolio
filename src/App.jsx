import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './pages/Admin.jsx'
import CursorSpotlight from './components/CursorSpotlight.jsx'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <div className="relative flex min-h-screen flex-col bg-ink text-paper selection:bg-cobalt selection:text-paper">
      {/* Interactive Cursor Spotlight Glow */}
      <CursorSpotlight />

      {/* Cyber Grid Background Texture */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-cyber-grid opacity-30" />

      {/* Top Animated Laser Beam */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] beam-underline animate-beam opacity-80" />

      {!isAdmin && <Navbar />}

      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && <Footer />}
    </div>
  )
}
