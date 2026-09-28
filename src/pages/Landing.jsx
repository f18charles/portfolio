import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import InteractiveTerminal from '../components/InteractiveTerminal.jsx'
import PageWrapper from '../components/PageWrapper.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import { GithubIcon, LinkedinIcon, DevToIcon, XIcon } from '../components/Icons.jsx'
import {
  ArrowRight,
  Code2,
  Crown,
  Mic,
  Activity,
  BookOpen,
  Music,
  FileText,
  Sparkles,
} from 'lucide-react'

const hobbyIcons = {
  code: Code2,
  crown: Crown,
  mic: Mic,
  activity: Activity,
  book: BookOpen,
  music: Music,
}

export default function Landing() {
  const { content } = useContent()
  const { hero, about = {}, projects = [], articles = [], contact = {} } = content

  const visibleProjects = projects.filter((p) => !p.hidden)
  const featuredProjects = visibleProjects.filter((p) => p.featured).slice(0, 2)
  const visibleArticles = articles.filter((a) => !a.hidden).slice(0, 2)
  const hobbies = (about.hobbies || []).slice(0, 6)
  const resumeUrl = contact.resumeUrl || hero.resumeUrl
  const photoUrl = hero.photoUrl || '/me.png'

  const socials = [
    { label: 'GitHub', href: contact.github, Icon: GithubIcon },
    { label: 'LinkedIn', href: contact.linkedin, Icon: LinkedinIcon },
    { label: 'Dev.to', href: contact.devto, Icon: DevToIcon },
    { label: 'X', href: contact.x, Icon: XIcon },
  ].filter((s) => s.href)

  const nameParts = hero.name.split(' ')
  const firstName = nameParts[0]
  const restName = nameParts.slice(1).join(' ')

  return (
    <PageWrapper className="px-6">
      <div className="mx-auto max-w-6xl py-16 md:py-24">
        {/* Hero */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left: intro */}
          <div className="space-y-6 lg:col-span-7">
            <SectionLabel>whoami</SectionLabel>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
            >
              <span className="text-paper">{firstName}</span>{' '}
              <span className="text-paper/60">{restName}</span>
            </motion.h1>

            <div className="h-0.5 w-16 rounded-full bg-cobalt" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="space-y-3"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-cobalt-soft">
                {hero.role}
              </p>
              <p className="max-w-xl text-lg leading-relaxed text-paper/80">{hero.tagline}</p>
            </motion.div>

            <StatusBadge label={hero.status} />

            {/* Stats */}
            {/* {hero.stats && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="grid max-w-lg grid-cols-3 gap-3 pt-1"
              >
                {hero.stats.map((stat, i) => (
                  <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                    <div className="font-display text-xl font-semibold tracking-tight text-paper">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[11px] leading-snug text-paper/50">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            )} */}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/projects"
                className="group flex items-center gap-2 rounded-lg bg-cobalt px-5 py-2.5 font-mono text-xs font-medium text-paper transition-colors hover:bg-cobalt-soft"
              >
                <span>View projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 font-mono text-xs text-paper/80 transition-colors hover:border-white/30 hover:text-paper"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download résumé</span>
                </a>
              )}
              <Link
                to="/contact"
                className="flex items-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 font-mono text-xs text-paper/80 transition-colors hover:border-white/30 hover:text-paper"
              >
                <span>Contact</span>
              </Link>
            </div>

            {/* Socials */}
            {socials.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-[11px] text-paper/40">Find me</span>
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-paper/60 transition-colors hover:border-white/25 hover:text-paper"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right: photo */}
          <div className="flex justify-center lg:col-span-5">
            {photoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-full max-w-sm"
              >
                <div className="rounded-2xl border border-white/10 bg-ink-surface p-2">
                  <img
                    src={photoUrl}
                    alt={hero.name}
                    className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                    loading="eager"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Featured projects */}
        {featuredProjects.length > 0 && (
          <div className="mt-24 space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end">
              <div>
                <SectionLabel>featured</SectionLabel>
                <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Featured work
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-cobalt-soft hover:underline"
              >
                <span>All {visibleProjects.length} projects</span>
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

        {/* Interactive terminal */}
        {/* <div className="mt-24 space-y-8">
          <div className="border-b border-white/10 pb-5">
            <SectionLabel>shell</SectionLabel>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Prefer a terminal?
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-paper/65">
              The same projects, skills, and contact details — queryable. Type{' '}
              <span className="font-mono text-paper/80">help</span> to list commands.
            </p>
          </div>
          <div className="flex justify-center">
            <InteractiveTerminal />
          </div>
        </div> */}

        {/* Hobbies */}
        {hobbies.length > 0 && (
          <div className="mt-24 space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end">
              <div>
                <SectionLabel>beyond the terminal</SectionLabel>
                <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Hobbies & interests
                </h2>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-cobalt-soft hover:underline"
              >
                <span>More about me</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hobbies.map((hobby, i) => {
                const Icon = hobbyIcons[hobby.icon] || Sparkles
                return (
                  <motion.div
                    key={hobby.name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="card rounded-xl p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-paper/70">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-paper">
                      {hobby.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper/65">
                      {hobby.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* Articles */}
        {visibleArticles.length > 0 && (
          <div className="mt-24 space-y-8 pb-16">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-end">
              <div>
                <SectionLabel>writing</SectionLabel>
                <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Latest articles
                </h2>
              </div>
              <Link
                to="/articles"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-cobalt-soft hover:underline"
              >
                <span>Read all articles</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {visibleArticles.map((article, i) => (
                <ArticleCard key={article.id || article.title} article={article} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
