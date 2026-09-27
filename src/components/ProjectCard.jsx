import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Layers, ChevronDown, ChevronUp, CheckCircle2, User, Building2 } from 'lucide-react'
import { GithubIcon } from './Icons.jsx'

const typeStyles = {
  Personal: {
    Icon: User,
    cls: 'border-white/15 bg-white/5 text-paper/70',
  },
  Team: {
    Icon: Building2,
    cls: 'border-cobalt-soft/30 bg-cobalt/10 text-cobalt-soft',
  },
  Internal: {
    Icon: Building2,
    cls: 'border-cobalt-soft/30 bg-cobalt/10 text-cobalt-soft',
  },
}

export default function ProjectCard({ project, index }) {
  const [showDetails, setShowDetails] = useState(false)

  const typeMeta = project.type ? typeStyles[project.type] : null
  const TypeIcon = typeMeta?.Icon

  const githubLink = project.githubUrl || (project.link?.includes('github.com') ? project.link : null)
  const liveLink = project.liveUrl || (project.link && !project.link.includes('github.com') ? project.link : null)

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="card flex flex-col justify-between rounded-xl p-6"
    >
      <div>
        {/* Meta Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-paper/35">0{index + 1}</span>
            {typeMeta && (
              <span
                className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 font-mono text-[11px] ${typeMeta.cls}`}
              >
                <TypeIcon className="h-3 w-3" />
                {project.type}
              </span>
            )}
            {project.category && (
              <span className="rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] text-paper/60">
                {project.category}
              </span>
            )}
          </div>

          {project.featured && (
            <span className="rounded-full border border-signal/30 bg-signal/10 px-2.5 py-0.5 font-mono text-[11px] text-signal">
              Featured
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-paper">
          {project.title}
        </h3>

        {(project.period || project.role) && (
          <p className="mt-1 font-mono text-xs text-paper/45">
            {[project.period, project.role].filter(Boolean).join(' · ')}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-paper/70">{project.description}</p>

        {project.metrics?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-paper/75"
              >
                {metric}
              </span>
            ))}
          </div>
        )}

        {/* Expandable Architecture Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 font-mono text-xs text-paper/50 transition-colors hover:text-paper/80"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{showDetails ? 'Hide highlights' : 'View engineering highlights'}</span>
              {showDetails ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>

            {showDetails && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 space-y-1.5 border-l-2 border-white/10 pl-3"
              >
                {project.highlights.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-xs leading-relaxed text-paper/70">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-paper/40" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        )}

        {/* Tech Tags */}
        {project.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-paper/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Links */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
        {githubLink && (
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 font-mono text-xs text-paper/80 transition-colors hover:border-white/30 hover:text-paper"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>Source</span>
          </a>
        )}

        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-cobalt px-3 py-1.5 font-mono text-xs font-medium text-paper transition-colors hover:bg-cobalt-soft"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Live demo</span>
          </a>
        )}

        {!githubLink && !liveLink && (
          <span className="font-mono text-xs italic text-paper/40">
            Repository private / in development
          </span>
        )}
      </div>
    </motion.div>
  )
}
