import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useContent } from '../context/ContentContext.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import PageWrapper from '../components/PageWrapper.jsx'
import { Code2, Filter, Search } from 'lucide-react'

export default function Projects() {
  const { content } = useContent()
  const { projects = [] } = content

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Only include non-hidden projects on public page
  const visibleProjects = useMemo(() => {
    return projects.filter((p) => !p.hidden)
  }, [projects])

  // Derive categories dynamically from visible projects
  const categories = useMemo(() => {
    const set = new Set(['All'])
    visibleProjects.forEach((p) => {
      if (p.category) {
        set.add(p.category)
      }
    })
    return Array.from(set)
  }, [visibleProjects])

  // Filter projects by active category and search keyword
  const filteredProjects = useMemo(() => {
    return visibleProjects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [visibleProjects, selectedCategory, searchQuery])

  return (
    <PageWrapper className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      {/* Header */}
      <SectionLabel>ls -la ./architectures</SectionLabel>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-6xl tracking-wide md:text-7xl">
            Featured <span className="neon-gradient-text">Projects</span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-paper/70">
            A curated portfolio of production-ready systems, distributed backends, AI applications, and developer utilities built with end-to-end ownership.
          </p>
        </div>
      </div>

      {/* Interactive Filter & Search Toolbar */}
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-y border-white/10 py-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat
            const count =
              cat === 'All'
                ? visibleProjects.length
                : visibleProjects.filter((p) => p.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-xs transition-all ${
                  isSelected
                    ? 'bg-signal/15 text-signal font-semibold border border-signal/40 shadow-[0_0_12px_rgba(46,214,122,0.3)]'
                    : 'border border-white/10 bg-white/[0.02] text-paper/60 hover:border-white/20 hover:text-paper'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isSelected ? 'bg-signal/20 text-signal' : 'bg-white/10 text-paper/40'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-paper/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by tech (Go, AI, React)..."
            className="w-full rounded-full border border-white/10 bg-white/5 pl-9 pr-4 py-1.5 font-mono text-xs text-paper placeholder-paper/40 outline-none focus:border-cobalt-soft/60 focus:shadow-[0_0_12px_rgba(96,122,254,0.3)]"
          />
        </div>
      </div>

      {/* Projects Grid with Motion Transitions */}
      {filteredProjects.length === 0 ? (
        <div className="mt-16 rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <Code2 className="mx-auto h-8 w-8 text-paper/30 mb-3" />
          <p className="font-mono text-sm text-paper/60">
            {visibleProjects.length === 0
              ? 'Projects are currently being polished. Check back shortly!'
              : `No projects matched "${searchQuery || selectedCategory}".`}
          </p>
          {visibleProjects.length > 0 && (
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-signal hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>
      ) : (
        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id || project.title}
                project={project}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </PageWrapper>
  )
}
