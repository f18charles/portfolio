export default function StatusBadge({ label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-4 py-1.5 font-mono text-xs text-paper/85">
      <span className="h-1.5 w-1.5 rounded-full bg-signal" />
      {label}
    </span>
  )
}
