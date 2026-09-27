export default function SectionLabel({ children }) {
  return (
    <p className="eyebrow mb-3 flex items-center gap-2 select-none">
      <span className="font-mono text-paper/40">$</span>
      <span className="font-mono text-xs tracking-wide text-paper/55">{children}</span>
      <span className="inline-block h-[12px] w-[7px] animate-blink bg-paper/30" />
    </p>
  )
}
