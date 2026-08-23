export default function SectionLabel({ children }) {
  return (
    <p className="eyebrow mb-3 flex items-center gap-2 select-none">
      <span className="text-signal font-bold drop-shadow-[0_0_6px_rgba(46,214,122,0.7)]">$</span>
      <span className="tracking-widest text-cobalt-soft font-mono text-xs font-semibold uppercase">{children}</span>
      <span className="inline-block w-[8px] h-[14px] bg-signal shadow-[0_0_8px_#2ED67A] animate-blink" />
    </p>
  )
}
