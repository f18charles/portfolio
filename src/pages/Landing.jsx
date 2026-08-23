import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import InteractiveTerminal from '../components/InteractiveTerminal.jsx'
import PageWrapper from '../components/PageWrapper.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { ArrowRight, Terminal, Code2, Cpu, Database, Award } from 'lucide-react'

export default function Landing() {
  const { content } = useContent()
  const { hero, projects = [] } = content

  // Filter only visible/non-hidden projects
  const visibleProjects = projects.filter((p) => !p.hidden)
  const featuredProjects = visibleProjects.filter((p) => p.featured).slice(0, 2)

  return (
    <PageWrapper className="relative overflow-hidden px-6">
      {/* Signature ambient glowing color orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cobalt/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-signal/15 blur-[120px]"
      />

      {/* Hero Section */}
      <div className="mx-auto max-w-6xl py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Hero Text & Call to Actions */}
          <div className="space-y-6 lg:col-span-7">
            <SectionLabel>whoami --verbose</SectionLabel>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[15vw] leading-[0.88] tracking-tight sm:text-7xl md:text-8xl lg:text-[6.2rem]"
            >
              <span className="text-white hover:text-signal transition-colors duration-300">
                {hero.name.split(' ')[0]}
              </span>{' '}
              <span className="neon-gradient-text">
                {hero.name.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-1.5 w-48 origin-left rounded-full beam-underline animate-beam"
            />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="space-y-3"
            >
              <p className="font-mono text-sm uppercase tracking-widest text-signal font-semibold">
                {hero.role}
              </p>
              <p className="max-w-xl text-lg text-paper/80 md:text-xl leading-relaxed">
                {hero.tagline}
              </p>
            </motion.div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex flex-wrap items-center gap-4"
            >
              <StatusBadge label={hero.status} />
            </motion.div>

            {/* Stats Row */}
            {hero.stats && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="grid grid-cols-3 gap-3 max-w-lg pt-2"
              >
                {hero.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-center backdrop-blur-sm hover:border-cobalt-soft/50 transition-colors"
                  >
                    <div className="font-display text-2xl text-signal drop-shadow-[0_0_8px_rgba(46,214,122,0.6)]">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-paper/50 mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/projects"
                className="group flex items-center gap-2 rounded-lg bg-cobalt px-6 py-3 font-mono text-xs font-semibold text-paper shadow-[0_0_20px_rgba(30,63,224,0.4)] transition-all hover:bg-cobalt-soft hover:shadow-[0_0_25px_rgba(96,122,254,0.6)] active:scale-95"
              >
                <span>View Architectures</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs text-paper/90 transition-all hover:border-signal/70 hover:text-signal hover:shadow-[0_0_15px_rgba(46,214,122,0.3)] active:scale-95"
              >
                <span>Explore CV & Background</span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Interactive CLI Terminal */}
          <div className="lg:col-span-5 flex justify-center">
            <InteractiveTerminal />
          </div>
        </div>

        {/* Featured Architectures Teaser */}
        {featuredProjects.length > 0 && (
          <div className="mt-28 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <SectionLabel>selected_works.filter(featured)</SectionLabel>
                <h2 className="font-display text-4xl md:text-5xl tracking-wide">
                  Featured Systems & Architectures
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-signal hover:underline"
              >
                <span>View all {visibleProjects.length} projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project.id || project.title} project={project} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
