import { motion } from 'framer-motion'
import { useContent } from '../context/ContentContext.jsx'
import SectionLabel from '../components/SectionLabel.jsx'
import AnimatedReveal from '../components/AnimatedReveal.jsx'
import PageWrapper from '../components/PageWrapper.jsx'
import {
  GraduationCap,
  Compass,
  CheckCircle2,
  Code2,
  FileText,
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

const categoryAccent = {
  cobalt: 'text-cobalt-soft',
  violet: 'text-violet-soft',
  signal: 'text-signal',
  cyan: 'text-cyan-soft',
}

export default function About() {
  const { content } = useContent()
  const { about } = content

  const resumeUrl = content.contact?.resumeUrl || content.hero?.resumeUrl
  const photoUrl = about.photoUrl || content.hero?.photoUrl || '/me.png'

  return (
    <PageWrapper className="mx-auto max-w-5xl px-6 py-20 md:py-24">
      {/* Header */}
      <SectionLabel>profile</SectionLabel>
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Engineering profile
      </h1>

      {/* Narrative + photo */}
      <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:items-start">
        <AnimatedReveal className="space-y-5 text-base leading-relaxed text-paper/80 lg:col-span-2">
          <p className="border-l-2 border-cobalt/60 pl-4 text-paper/90">{about.intro}</p>
          <p>{about.bio}</p>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 font-mono text-xs text-paper/80 transition-colors hover:border-white/30 hover:text-paper"
            >
              <FileText className="h-3.5 w-3.5" />
              Download résumé (PDF)
            </a>
          )}
        </AnimatedReveal>

        {photoUrl && (
          <AnimatedReveal delay={0.1} className="w-full max-w-xs">
            <div className="rounded-2xl border border-white/10 bg-ink-surface p-2">
              <img
                src={photoUrl}
                alt={content.hero?.name || 'Professional photo'}
                className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                loading="lazy"
              />
            </div>
          </AnimatedReveal>
        )}
      </div>

      {/* Skills */}
      <AnimatedReveal delay={0.15} className="mt-16 space-y-6">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Code2 className="h-5 w-5 text-paper/50" />
          <h2 className="font-display text-2xl font-semibold tracking-tight">Technical skills</h2>
        </div>

        {about.skillCategories ? (
          <div className="grid gap-5 md:grid-cols-2">
            {about.skillCategories.map((category) => (
              <div key={category.name} className="card rounded-xl p-5">
                <h3
                  className={`mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wide ${
                    categoryAccent[category.color] || 'text-paper/70'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-paper/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {(about.skills || []).map((skill) => (
              <span
                key={skill}
                className="rounded border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-paper/70"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </AnimatedReveal>

      {/* Education */}
      {about.education && (
        <AnimatedReveal delay={0.2} className="mt-16 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <GraduationCap className="h-5 w-5 text-paper/50" />
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Education & training
            </h2>
          </div>

          <div className="space-y-4">
            {about.education.map((edu, idx) => (
              <div key={idx} className="card rounded-xl p-6">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-display text-lg font-semibold tracking-tight text-paper">
                      {edu.degree}
                    </span>
                    <span className="rounded border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-paper/60">
                      {edu.status}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-paper/40">{edu.period}</span>
                </div>

                <div className="mt-1 font-mono text-xs text-paper/55">{edu.institution}</div>

                {edu.description && (
                  <p className="mt-3 text-sm leading-relaxed text-paper/70">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </AnimatedReveal>
      )}

      {/* Attributes */}
      {about.attributes && (
        <AnimatedReveal delay={0.25} className="mt-16 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Compass className="h-5 w-5 text-paper/50" />
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Working principles
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {about.attributes.map((attr, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-paper/45" />
                <span className="text-sm leading-relaxed text-paper/75">{attr}</span>
              </div>
            ))}
          </div>
        </AnimatedReveal>
      )}

      {/* Hobbies */}
      {about.hobbies && about.hobbies.length > 0 && (
        <AnimatedReveal delay={0.3} className="mt-16 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <BookOpen className="h-5 w-5 text-paper/50" />
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Hobbies & interests
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {about.hobbies.map((hobby, idx) => {
              const Icon = hobbyIcons[hobby.icon]
              return (
                <motion.div
                  key={hobby.name || idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
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
        </AnimatedReveal>
      )}
    </PageWrapper>
  )
}
