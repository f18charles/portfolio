import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Send, Check, ArrowRight, Code } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext.jsx'

export default function InteractiveTerminal() {
  const { content } = useContent()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Favor Charles Owuor Terminal [v2.4.0-neon]. Type "help" or click below to inspect subsystems.',
    },
  ])
  const scrollRef = useRef(null)

  const quickCommands = ['whoami', 'skills', 'projects', 'education', 'contact', 'clear']

  const handleCommand = (cmdStr) => {
    const rawCmd = (cmdStr || input).trim()
    if (!rawCmd) return

    const clean = rawCmd.toLowerCase()
    const newHistory = [...history, { type: 'input', text: `$ ${rawCmd}` }]

    if (clean === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    if (clean === 'help') {
      newHistory.push({
        type: 'output',
        content: (
          <div className="space-y-1 text-xs">
            <p className="text-paper/80 font-semibold">Available Commands:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 text-paper/70 font-mono">
              <div><span className="text-signal font-bold">whoami</span> — Overview & bio</div>
              <div><span className="text-cobalt-soft font-bold">skills</span> — Tech stack matrix</div>
              <div><span className="text-violet-soft font-bold">projects</span> — Key architectures</div>
              <div><span className="text-cyan-soft font-bold">education</span> — Academic & Zone01</div>
              <div><span className="text-amber-soft font-bold">contact</span> — Get in touch</div>
              <div><span className="text-paper/40 font-bold">clear</span> — Wipe terminal output</div>
            </div>
          </div>
        ),
      })
    } else if (clean === 'whoami') {
      newHistory.push({
        type: 'output',
        content: (
          <div className="space-y-2 text-xs leading-relaxed text-paper/80">
            <p><span className="text-signal font-bold">{content.hero.name}</span> — <span className="text-paper/60">{content.hero.role}</span></p>
            <p className="text-paper/70">{content.hero.tagline}</p>
            <p className="text-paper/60">{content.about.intro}</p>
            <div className="pt-1">
              <Link to="/about" className="inline-flex items-center gap-1 font-mono text-xs text-cobalt-soft hover:underline">
                Read full profile <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ),
      })
    } else if (clean === 'skills') {
      newHistory.push({
        type: 'output',
        content: (
          <div className="space-y-2 text-xs">
            <p className="text-paper/80 font-semibold">Core Technical Stack:</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {content.about.skills.map((s, idx) => (
                <span
                  key={s}
                  className={`rounded px-2 py-0.5 font-mono text-[11px] border border-white/10 ${
                    idx % 3 === 0
                      ? 'text-signal bg-signal/5 border-signal/30'
                      : idx % 3 === 1
                      ? 'text-cobalt-soft bg-cobalt/10 border-cobalt-soft/30'
                      : 'text-violet-soft bg-violet/10 border-violet-soft/30'
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ),
      })
    } else if (clean === 'projects') {
      const visibleProjects = (content.projects || []).filter((p) => !p.hidden)
      newHistory.push({
        type: 'output',
        content: (
          <div className="space-y-2 text-xs">
            <p className="text-paper/80 font-semibold">Featured Architectures:</p>
            <div className="space-y-2 pt-1">
              {visibleProjects.slice(0, 3).map((p) => (
                <div key={p.id} className="border-l-2 border-cobalt-soft/60 pl-2">
                  <div className="font-semibold text-paper/90">{p.title}</div>
                  <div className="text-[11px] text-paper/60 line-clamp-1">{p.description}</div>
                </div>
              ))}
            </div>
            <div className="pt-1">
              <Link to="/projects" className="inline-flex items-center gap-1 font-mono text-xs text-signal hover:underline">
                Explore all {visibleProjects.length} projects <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ),
      })
    } else if (clean === 'education') {
      newHistory.push({
        type: 'output',
        content: (
          <div className="space-y-2 text-xs">
            <p className="text-paper/80 font-semibold">Education & Training:</p>
            <div className="space-y-1.5 text-paper/70 font-mono">
              {content.about.education?.map((e, idx) => (
                <div key={idx} className="flex justify-between items-baseline gap-2">
                  <span>{e.degree} <span className="text-paper/40">({e.institution.split('·')[0]})</span></span>
                  <span className="text-[10px] text-signal font-semibold">{e.status}</span>
                </div>
              )) || <p>Zone01 Kisumu & BSc Statistics and Programming</p>}
            </div>
          </div>
        ),
      })
    } else if (clean === 'contact') {
      newHistory.push({
        type: 'output',
        content: (
          <div className="space-y-1.5 text-xs text-paper/80 font-mono">
            <div><span className="text-paper/40">Email:</span> <a href={`mailto:${content.contact.email}`} className="text-signal hover:underline">{content.contact.email}</a></div>
            <div><span className="text-paper/40">GitHub:</span> <a href={content.contact.github} target="_blank" rel="noreferrer" className="text-cobalt-soft hover:underline">{content.contact.github}</a></div>
            <div><span className="text-paper/40">LinkedIn:</span> <a href={content.contact.linkedin} target="_blank" rel="noreferrer" className="text-violet-soft hover:underline">linkedin.com/in/favorowuor</a></div>
          </div>
        ),
      })
    } else {
      newHistory.push({
        type: 'error',
        text: `Command not found: "${rawCmd}". Type "help" to see available instructions.`,
      })
    }

    setHistory(newHistory)
    setInput('')
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="w-full max-w-2xl rounded-lg border border-white/10 bg-ink-surface/90 shadow-2xl backdrop-blur-md overflow-hidden neon-card"
    >
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          </div>
          <span className="ml-2 flex items-center gap-1.5 font-mono text-[11px] text-paper/50">
            <Terminal className="h-3.5 w-3.5 text-cobalt-soft" />
            guest@favor-dev: ~
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-signal/80 font-semibold">Active CLI</span>
        </div>
      </div>

      {/* Terminal Screen Output */}
      <div
        ref={scrollRef}
        className="max-h-60 overflow-y-auto p-4 font-mono text-xs space-y-2.5 scrollbar-thin"
      >
        <AnimatePresence>
          {history.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.type === 'system' && (
                <p className="text-paper/50 leading-relaxed">{item.text}</p>
              )}
              {item.type === 'input' && (
                <p className="text-cobalt-soft font-semibold">{item.text}</p>
              )}
              {item.type === 'output' && (
                <div className="pl-3 border-l border-white/15 my-1 text-paper/90">{item.content}</div>
              )}
              {item.type === 'error' && (
                <p className="text-rose-400 pl-3 border-l border-rose-500/40">{item.text}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Quick Action Chips */}
      <div className="border-t border-white/10 px-4 py-2 bg-white/[0.01] flex flex-wrap items-center gap-1.5">
        <span className="font-mono text-[10px] text-paper/40 flex items-center gap-1 mr-1">
          <Code className="h-3 w-3 text-signal" />
          Quick:
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-paper/70 transition-all hover:border-signal/50 hover:bg-signal/10 hover:text-signal active:scale-95"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Input Prompt */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleCommand(input)
        }}
        className="flex items-center gap-2 border-t border-white/10 px-4 py-2.5 bg-white/[0.02]"
      >
        <span className="font-mono text-xs text-signal font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type a command (e.g. whoami, skills, projects)..."
          className="flex-1 bg-transparent font-mono text-xs text-paper placeholder-paper/30 outline-none"
        />
        <button
          type="submit"
          className="rounded p-1 text-paper/40 hover:text-signal transition-colors"
          title="Run command"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </motion.div>
  )
}
