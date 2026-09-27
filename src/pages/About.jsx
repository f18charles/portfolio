import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import AnimatedReveal from '../components/AnimatedReveal.jsx'
import PageWrapper from '../components/PageWrapper.jsx'
import {
  GraduationCap,
  Award,
  Terminal,
  Cpu,
  Database,
  Layers,
  Compass,
  CheckCircle2,
  Code2,
  FileText,
  Sparkles,
  Crown,
  Mic,
  Activity,
  BookOpen,
  Music,
} from 'lucide-react'

const hobbyIcons = {
  code: Code2,
  crown: Crown,
  mic: Mic,
  activity: Activity,
  book: BookOpen,
  music: Music,
}

export default function About() {
  const { content } = useContent()
  const { about } = content

  // Category neon color mapper
  const getCategoryStyles = (colorName) => {
    switch (colorName) {
      case 'cobalt':
        return {
          title: 'text-cobalt-soft',
          badge: 'border-cobalt-soft/30 bg-cobalt/10 text-cobalt-soft hover:border-cobalt-soft/60 hover:shadow-[0_0_12px_rgba(96,122,254,0.4)]',
          icon: 'text-cobalt-soft',
        }
      case 'violet':
        return {
          title: 'text-violet-soft',
          badge: 'border-violet-soft/30 bg-violet/10 text-violet-soft hover:border-violet-soft/60 hover:shadow-[0_0_12px_rgba(192,132,252,0.4)]',
          icon: 'text-violet-soft',
        }
      case 'signal':
        return {
          title: 'text-signal',
          badge: 'border-signal/30 bg-signal/10 text-signal hover:border-signal/60 hover:shadow-[0_0_12px_rgba(46,214,122,0.4)]',
          icon: 'text-signal',
        }
      case 'cyan':
        return {
          title: 'text-cyan-soft',
          badge: 'border-cyan-soft/30 bg-cyan/10 text-cyan-soft hover:border-cyan-soft/60 hover:shadow-[0_0_12px_rgba(56,189,248,0.4)]',
          icon: 'text-cyan-soft',
        }
      default:
        return {
          title: 'text-signal',
          badge: 'border-signal/30 bg-signal/10 text-signal hover:border-signal/60',
          icon: 'text-signal',
        }
    }
  }

  const resumeUrl = content.contact?.resumeUrl || content.hero?.resumeUrl
  const photoUrl = about.photoUrl || content.hero?.photoUrl

  return (
    <PageWrapper className="mx-auto max-w-5xl px-6 py-20 md:py-24">
      {/* Header Section */}
      <SectionLabel>cat ./profile.md</SectionLabel>
      <h1 className="font-display text-6xl tracking-wide md:text-7xl">
        Engineering <span className="neon-gradient-text">Profile</span>
      </h1>

      {/* Profile Narrative + Professional Photo */}
      <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:items-start">
        <AnimatedReveal className="space-y-6 text-lg leading-relaxed text-paper/85 lg:col-span-2">
          <p className="border-l-2 border-signal/60 pl-4 font-medium text-paper/90">
            {about.intro}
          </p>
          <p className="text-paper/75">{about.bio}</p>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-amber-soft/30 bg-amber-soft/5 px-5 py-2.5 font-mono text-xs text-amber-soft transition-all hover:bg-amber-soft/15 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] active:scale-95"
            >
              <FileText className="h-3.5 w-3.5" />
              Download Résumé (DOCX)
            </a>
          )}
        </AnimatedReveal>

        {photoUrl && (
          <AnimatedReveal delay={0.1} className="relative mx-auto w-full max-w-xs">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cobalt/30 via-violet/20 to-signal/30 opacity-70 blur-2xl"
            />
            <div className="relative animate-floatSlow overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-surface/80 p-2 backdrop-blur-md">
              <span className="absolute left-2 top-2 h-5 w-5 rounded-tl-lg border-l-2 border-t-2 border-cobalt-soft/70" />
              <span className="absolute bottom-2 right-2 h-5 w-5 rounded-br-lg border-b-2 border-r-2 border-signal/70" />
              <img
                src={photoUrl}
                alt={content.hero?.name || 'Professional photo'}
                className="aspect-[4/5] w-full rounded-[1.2rem] object-cover object-top"
                loading="lazy"
              />
            </div>
          </AnimatedReveal>
        )}
      </div>

      {/* Technical Skill Matrix Grouped by Domain */}
      <AnimatedReveal delay={0.15} className="mt-16 space-y-8">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Code2 className="h-5 w-5 text-signal" />
          <h2 className="font-display text-3xl tracking-wide">
            Technical Competencies & Stack
          </h2>
        </div>

        {about.skillCategories ? (
          <div className="grid gap-6 md:grid-cols-2">
            {about.skillCategories.map((category) => {
              const styles = getCategoryStyles(category.color)
              return (
                <div
                  key={category.name}
                  className="rounded-xl border border-white/10 bg-ink-surface/70 p-5 backdrop-blur-sm neon-card"
                >
                  <h3 className={`font-mono text-xs uppercase tracking-widest font-semibold mb-3.5 flex items-center gap-2 ${styles.title}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_6px_currentColor]" />
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-all duration-200 cursor-default ${styles.badge}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {about.skills.map((skill, i) => {
              const colors = ['text-cobalt-soft', 'text-violet-soft', 'text-signal', 'text-cyan-soft']
              return (
                <span
                  key={skill}
                  className={`rounded border border-white/15 bg-white/5 px-4 py-2 font-mono text-sm ${colors[i % colors.length]}`}
                >
                  {skill}
                </span>
              )
            })}
          </div>
        )}
      </AnimatedReveal>

      {/* Education & Peer Engineering Background */}
      {about.education && (
        <AnimatedReveal delay={0.25} className="mt-16 space-y-8">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <GraduationCap className="h-5 w-5 text-cobalt-soft" />
            <h2 className="font-display text-3xl tracking-wide">
              Education & Engineering Formation
            </h2>
          </div>

          <div className="space-y-4">
            {about.education.map((edu, idx) => (
              <div
                key={idx}
                className="group rounded-xl border border-white/10 bg-ink-surface/60 p-6 backdrop-blur-sm transition-all hover:border-cobalt-soft/40 hover:bg-white/[0.03]"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-2xl text-paper group-hover:text-white">
                      {edu.degree}
                    </span>
                    <span className="rounded bg-signal/10 border border-signal/30 px-2 py-0.5 font-mono text-[10px] text-signal font-semibold">
                      {edu.status}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-paper/40">{edu.period}</span>
                </div>

                <div className="mt-1 font-mono text-xs text-cobalt-soft">
                  {edu.institution}
                </div>

                {edu.description && (
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </AnimatedReveal>
      )}

      {/* Core Engineering Attributes */}
      {about.attributes && (
        <AnimatedReveal delay={0.35} className="mt-16 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Compass className="h-5 w-5 text-violet-soft" />
            <h2 className="font-display text-3xl tracking-wide">
              Core Attributes & Engineering Principles
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {about.attributes.map((attr, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm hover:border-violet-soft/40 transition-colors"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-signal mt-0.5" />
                <span className="text-sm leading-relaxed text-paper/80 font-medium">
                  {attr}
                </span>
              </div>
            ))}
          </div>
        </AnimatedReveal>
      )}

      {/* Hobbies & Interests */}
      {about.hobbies && about.hobbies.length > 0 && (
        <AnimatedReveal delay={0.45} className="mt-16 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Sparkles className="h-5 w-5 text-signal" />
            <h2 className="font-display text-3xl tracking-wide">
              Hobbies & Life Beyond the Terminal
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.hobbies.map((hobby, idx) => {
              const Icon = hobbyIcons[hobby.icon] || Sparkles
              return (
                <motion.div
                  key={hobby.name || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
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
        </AnimatedReveal>
      )}
    </PageWrapper>
  )
}
