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

  const socials = [
    { label: 'GitHub', href: contact.github, Icon: GithubIcon, cls: 'hover:text-cobalt-soft hover:border-cobalt-soft/50' },
    { label: 'LinkedIn', href: contact.linkedin, Icon: LinkedinIcon, cls: 'hover:text-violet-soft hover:border-violet-soft/50' },
    { label: 'Dev.to', href: contact.devto, Icon: DevToIcon, cls: 'hover:text-signal hover:border-signal/50' },
    { label: 'X', href: contact.x, Icon: XIcon, cls: 'hover:text-paper hover:border-white/40' },
  ].filter((s) => s.href)

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
              <span className="text-white transition-colors duration-300 hover:text-signal">
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
              <p className="font-mono text-sm font-semibold uppercase tracking-widest text-signal">
                {hero.role}
              </p>
              <p className="max-w-xl text-lg leading-relaxed text-paper/80 md:text-xl">
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
                className="grid max-w-lg grid-cols-3 gap-3 pt-2"
              >
                {hero.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-center backdrop-blur-sm transition-colors hover:border-cobalt-soft/50"
                  >
                    <div className="font-display text-2xl text-signal drop-shadow-[0_0_8px_rgba(46,214,122,0.6)]">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-paper/50">
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
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center gap-2 rounded-lg border border-amber-soft/30 bg-amber-soft/5 px-6 py-3 font-mono text-xs text-amber-soft transition-all hover:bg-amber-soft/15 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] active:scale-95"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download Résumé</span>
                </a>
              )}
            </motion.div>

            {/* Social Channels */}
            {socials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40">
                  Find me
                </span>
                {socials.map(({ label, href, Icon, cls }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-paper/60 transition-all active:scale-95 ${cls}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </a>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right Column: Professional Photo + Interactive CLI Terminal */}
          <div className="flex flex-col items-center gap-8 lg:col-span-5">
            {hero.photoUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto w-full max-w-xs"
              >
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cobalt/30 via-signal/20 to-violet/30 opacity-70 blur-2xl"
                />
                <div className="relative animate-floatSlow overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-surface/80 p-2 backdrop-blur-md">
                  {/* corner brackets */}
                  <span className="absolute left-2 top-2 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-signal/70" />
                  <span className="absolute right-2 top-2 h-5 w-5 rounded-tr-lg border-r-2 border-t-2 border-signal/70" />
                  <span className="absolute bottom-2 left-2 h-5 w-5 rounded-bl-lg border-b-2 border-l-2 border-signal/70" />
                  <span className="absolute bottom-2 right-2 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-signal/70" />
                  <img
                    src={hero.photoUrl}
                    alt={hero.name}
                    className="aspect-[4/5] w-full rounded-[1.2rem] object-cover object-top"
                    loading="eager"
                  />
                  <div className="pointer-events-none absolute inset-2 rounded-[1.2rem] bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-display text-2xl tracking-wide text-paper drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {hero.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
                      {hero.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <InteractiveTerminal />
          </div>
        </div>

        {/* Featured Architectures Teaser */}
        {featuredProjects.length > 0 && (
          <div className="mt-28 space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
              <div>
                <SectionLabel>selected_works.filter(featured)</SectionLabel>
                <h2 className="font-display text-4xl tracking-wide md:text-5xl">
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

        {/* Hobbies Teaser */}
        {hobbies.length > 0 && (
          <div className="mt-28 space-y-8">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
              <div>
                <SectionLabel>cat ./life/beyond_the_terminal</SectionLabel>
                <h2 className="font-display text-4xl tracking-wide md:text-5xl">
                  Hobbies & <span className="neon-gradient-text">Interests</span>
                </h2>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-signal hover:underline"
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group rounded-xl border border-white/10 bg-ink-surface/60 p-5 backdrop-blur-sm transition-all hover:border-signal/40 hover:bg-white/[0.03]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-signal/30 bg-signal/10 text-signal transition-all group-hover:shadow-[0_0_14px_rgba(46,214,122,0.4)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-xl tracking-wide text-paper">
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

        {/* Articles Teaser */}
        {visibleArticles.length > 0 && (
          <div className="mt-28 space-y-8 pb-16">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
              <div>
                <SectionLabel>tail -n 2 ./articles</SectionLabel>
                <h2 className="font-display text-4xl tracking-wide md:text-5xl">
                  Latest <span className="neon-gradient-text">Articles</span>
                </h2>
              </div>
              <Link
                to="/articles"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-signal hover:underline"
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
