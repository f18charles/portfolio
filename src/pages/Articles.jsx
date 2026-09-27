import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../context/ContentContext.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import PageWrapper from '../components/PageWrapper.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import { PenLine, ArrowUpRight, Search } from 'lucide-react'
import { DevToIcon } from '../components/Icons.jsx'

export default function Articles() {
  const { content } = useContent()
  const { articles = [], contact = {} } = content

  const [selectedTag, setSelectedTag] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.title = 'Articles — Favor Charles Owuor'
    return () => {
      document.title = 'Favor Charles Owuor — Software Developer & Systems Architect'
    }
  }, [])

  const visibleArticles = useMemo(() => articles.filter((a) => !a.hidden), [articles])

  const tags = useMemo(() => {
    const set = new Set(['All'])
    visibleArticles.forEach((a) => a.tags?.forEach((t) => set.add(t)))
    return Array.from(set)
  }, [visibleArticles])

  const filteredArticles = useMemo(() => {
    return visibleArticles.filter((a) => {
      const matchesTag = selectedTag === 'All' || a.tags?.includes(selectedTag)
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        searchQuery === '' ||
        a.title?.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
      return matchesTag && matchesSearch
    })
  }, [visibleArticles, selectedTag, searchQuery])

  return (
    <PageWrapper className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <SectionLabel>cat ./articles/*.md</SectionLabel>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-6xl tracking-wide md:text-7xl">
            Writing & <span className="neon-gradient-text">Articles</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-paper/70">
            Engineering notes, architecture deep-dives, and lessons from building distributed systems,
            AI products, and privacy-first software.
          </p>
        </div>

        {contact.devto && (
          <a
            href={contact.devto}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-cobalt-soft/40 bg-cobalt/10 px-4 py-2.5 font-mono text-xs font-semibold text-cobalt-soft transition-all hover:bg-cobalt/20 hover:shadow-[0_0_15px_rgba(96,122,254,0.4)] active:scale-95"
          >
            <DevToIcon className="h-4 w-4" />
            <span>Follow on dev.to</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {visibleArticles.length > 0 && (
        <div className="mt-10 flex flex-col gap-4 border-y border-white/10 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => {
              const isSelected = selectedTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all ${
                    isSelected
                      ? 'border-signal/40 bg-signal/15 font-semibold text-signal shadow-[0_0_12px_rgba(46,214,122,0.3)]'
                      : 'border-white/10 bg-white/[0.02] text-paper/60 hover:border-white/20 hover:text-paper'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-paper/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-1.5 pl-9 pr-4 font-mono text-xs text-paper placeholder-paper/40 outline-none focus:border-cobalt-soft/60 focus:shadow-[0_0_12px_rgba(96,122,254,0.3)]"
            />
          </div>
        </div>
      )}

      {filteredArticles.length === 0 ? (
        <div className="mt-16 rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <PenLine className="mx-auto mb-3 h-8 w-8 text-paper/30" />
          <p className="font-mono text-sm text-paper/60">
            {visibleArticles.length === 0
              ? 'Articles are managed live from the CMS at /admin — add your first one there.'
              : `No articles matched "${searchQuery || selectedTag}".`}
          </p>
        </div>
      ) : (
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {filteredArticles.map((article, i) => (
              <ArticleCard
                key={article.id || article.title}
                article={article}
                index={i}
                featured={article.featured && i === 0}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </PageWrapper>
  )
}
