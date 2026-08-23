import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Layers, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from './Icons.jsx'

export default function ProjectCard({ project, index }) {
  const [showDetails, setShowDetails] = useState(false)

  // Neon accent color palettes per card index or category
  const accents = [
    {
      border: 'border-cobalt-soft/40',
      hoverBorder: 'hover:border-cobalt-soft/70',
      tagText: 'text-cobalt-soft',
      tagBg: 'hover:bg-cobalt/10 hover:border-cobalt-soft/40',
      glow: 'shadow-[0_0_20px_-5px_rgba(62,92,240,0.2)]',
    },
    {
      border: 'border-violet-soft/40',
      hoverBorder: 'hover:border-violet-soft/70',
      tagText: 'text-violet-soft',
      tagBg: 'hover:bg-violet/10 hover:border-violet-soft/40',
      glow: 'shadow-[0_0_20px_-5px_rgba(168,85,247,0.2)]',
    },
    {
      border: 'border-signal/40',
      hoverBorder: 'hover:border-signal/70',
      tagText: 'text-signal',
      tagBg: 'hover:bg-signal/10 hover:border-signal/40',
      glow: 'shadow-[0_0_20px_-5px_rgba(46,214,122,0.2)]',
    },
    {
      border: 'border-cyan-soft/40',
      hoverBorder: 'hover:border-cyan-soft/70',
      tagText: 'text-cyan-soft',
      tagBg: 'hover:bg-cyan/10 hover:border-cyan-soft/40',
      glow: 'shadow-[0_0_20px_-5px_rgba(56,189,248,0.2)]',
    },
  ]

  const accent = accents[index % accents.length]

  // Resolve links (both live demo and github repo)
  const githubLink = project.githubUrl || (project.link?.includes('github.com') ? project.link : null)
  const liveLink = project.liveUrl || (project.link && !project.link.includes('github.com') ? project.link : null)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`group flex flex-col justify-between rounded-xl border ${accent.border} ${accent.hoverBorder} bg-ink-surface/80 p-6 backdrop-blur-md transition-all duration-300 ${accent.glow}`}
    >
      <div>
        {/* Top Header / Meta Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-paper/40">0{index + 1}</span>
            {project.category && (
              <span className="rounded bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-paper/70">
                {project.category}
              </span>
            )}
          </div>

          {project.featured && (
            <span className="inline-flex items-center rounded-full bg-signal/10 border border-signal/30 px-2.5 py-0.5 font-mono text-[10px] text-signal font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-wide text-paper transition-colors group-hover:text-white">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="mt-3 text-sm leading-relaxed text-paper/70">
          {project.description}
        </p>

        {/* Expandable Architecture Highlights (from CV) */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 font-mono text-[11px] text-paper/50 hover:text-paper/90 transition-colors"
            >
              <Layers className="h-3.5 w-3.5 text-cobalt-soft" />
              <span>{showDetails ? 'Hide technical highlights' : 'View engineering highlights'}</span>
              {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>

            {showDetails && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-1.5 border-l-2 border-white/10 pl-3 font-mono text-xs text-paper/75"
              >
                {project.highlights.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-signal mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        )}

        {/* Tech Stack Tags */}
        {project.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-paper/70 transition-all duration-200 ${accent.tagBg} hover:text-white`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dual Link Actions Footer (Live Link & GitHub Link) */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* GitHub Repository Link */}
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs text-paper/90 transition-all hover:border-cobalt-soft/60 hover:bg-cobalt/15 hover:text-cobalt-soft active:scale-95"
              title="Inspect source code on GitHub"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>Source Code</span>
            </a>
          )}

          {/* Live Deployed Link */}
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-signal/30 bg-signal/10 px-3 py-1.5 font-mono text-xs text-signal transition-all hover:border-signal/70 hover:bg-signal/20 hover:shadow-[0_0_12px_rgba(46,214,122,0.4)] active:scale-95"
              title="Open deployed live demo"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Demo</span>
            </a>
          )}

          {!githubLink && !liveLink && (
            <span className="font-mono text-xs text-paper/40 italic">
              Repository private / in development
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
