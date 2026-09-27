import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react'
import { DevToIcon, XIcon } from './Icons.jsx'

const sourceStyles = {
  'dev.to': {
    Icon: DevToIcon,
    label: 'dev.to',
    accent: 'text-cobalt-soft',
    badge: 'border-cobalt-soft/30 bg-cobalt/10 text-cobalt-soft',
  },
  x: {
    Icon: XIcon,
    label: 'X',
    accent: 'text-paper',
    badge: 'border-white/15 bg-white/5 text-paper/80',
  },
}

const fallbackSource = {
  Icon: BookOpen,
  label: 'Article',
  accent: 'text-paper',
  badge: 'border-white/15 bg-white/5 text-paper/80',
}

export default function ArticleCard({ article, index = 0, featured = false }) {
  const source = sourceStyles[article.source] || fallbackSource
  const SourceIcon = source.Icon

  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`card group flex flex-col justify-between rounded-xl p-6 ${featured ? 'md:col-span-2' : ''}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-0.5 font-mono text-[11px] ${source.badge}`}
          >
            <SourceIcon className="h-3 w-3" />
            {source.label}
          </span>
          <span className="font-mono text-[11px] text-paper/35">0{index + 1}</span>
        </div>

        <h3
          className={`mt-4 font-display font-semibold tracking-tight text-paper ${
            featured ? 'text-2xl' : 'text-xl'
          }`}
        >
          {article.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-paper/70">{article.excerpt}</p>

        {article.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-paper/55"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-[11px] text-paper/50">
        <div className="flex items-center gap-4">
          {article.date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 opacity-60" />
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          {article.readTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 opacity-60" />
              {article.readTime}
            </span>
          )}
        </div>

        <span className={`inline-flex items-center gap-1 ${source.accent}`}>
          Read
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  )
}
