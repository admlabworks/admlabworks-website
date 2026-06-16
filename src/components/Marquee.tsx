'use client'

export default function Marquee() {
  const items = [
    'Ready to bring your project to life?',
    "Let's talk.",
    'Every great project starts with a conversation.',
    "Let's talk.",
    'Ready to make your brand shine?',
    "Let's talk.",
    'When do we start?',
    "Let's talk.",
  ]

  return (
    <section className="marquee-section">
      <div className="marquee-track">
        <div className="marquee-content">
          {items.map((text, i) => (
            <span key={i} className={i % 2 === 0 ? 'marquee-item' : 'marquee-item marquee-item-alt'}>{text}</span>
          ))}
          {items.map((text, i) => (
            <span key={`dup-${i}`} className={i % 2 === 0 ? 'marquee-item' : 'marquee-item marquee-item-alt'}>{text}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
