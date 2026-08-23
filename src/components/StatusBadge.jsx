export default function StatusBadge({ label }) {
  return (
    <span className="inline-flex items-center rounded-full border border-signal/30 bg-signal/10 px-4 py-1.5 font-mono text-xs text-paper/90 shadow-[0_0_15px_-3px_rgba(46,214,122,0.3)] backdrop-blur-sm transition-all hover:border-signal/50">
      <span className="text-paper/90 font-medium">{label}</span>
    </span>
  )
}
