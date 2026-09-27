import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Articles from './pages/Articles.jsx'
import Contact from './pages/Contact.jsx'
import Resume from './pages/Resume.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <div className="relative flex min-h-screen flex-col bg-ink text-paper">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {!isAdmin && <Navbar />}

      <main id="main" className="relative flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && <Footer />}
    </div>
  )
}
