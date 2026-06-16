interface Service {
  num: string
  title: string
  desc: string
  items: string[]
  comingSoon?: boolean
}

const services: Service[] = [
  {
    num: '01',
    title: 'Brand Identity\nDesign',
    desc: 'Distinct brand identities from logo to design system — identities that stick and stay consistent across every touchpoint.',
    items: ['Logo & Wordmark', 'Visual Identity', 'Design System', 'Brand Guidelines'],
  },
  {
    num: '02',
    title: 'Website\nDesign',
    desc: 'High-performance websites, landing pages, and corporate sites — built for conversion, speed, and an exceptional user experience.',
    items: ['Landing Pages', 'Corporate Websites', 'UI / UX Design', 'Responsive Design'],
  },
  {
    num: '03',
    title: 'Video\nEditing',
    desc: 'Professional video editing with motion graphics, color grading, and sound design — content that captivates and communicates.',
    items: ['Motion Graphics', 'Color Grading', 'Sound Design', 'Post-Production'],
  },
  {
    num: '04',
    title: 'More coming\nsoon',
    desc: 'New services are in the pipeline. Stay tuned for exciting additions to help your brand grow even further.',
    items: ['Brand Strategy', 'Content Creation', 'SEO Optimization', 'Social Media'],
    comingSoon: true,
  },
]

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconArrow() {
  return (
    <svg viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="12 5 19 12 12 19" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TextRoll({ text, comingSoon }: { text: string; comingSoon?: boolean }) {
  const lines = text.split('\n')
  return (
    <span className="service-card-title-text">
      {lines.map((line, li) => (
        <span key={li} className="text-roll-line">
          {[...line].map((char, ci) => {
            const displayChar = char === ' ' ? '\u00A0' : char
            return (
              <span key={ci} className={`text-roll-char-wrap${comingSoon ? ' no-animate' : ''}`}>
                <span className="text-roll-char-inner" style={{ transitionDelay: `${ci * 25}ms` }}>
                  <span className="text-roll-char">{displayChar}</span>
                  <span className="text-roll-char-clone" aria-hidden="true">{displayChar}</span>
                </span>
              </span>
            )
          })}
        </span>
      ))}
    </span>
  )
}

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-label">01 / Services</div>
        <h2 className="section-title">Three <em>disciplines.</em> One team.</h2>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-card${s.comingSoon ? ' coming-soon' : ''}`}>
              <div className="service-card-number">{s.num}</div>
              <h3 className="service-card-title">
                <TextRoll text={s.title} comingSoon={s.comingSoon} />
              </h3>
              <p className="service-card-desc">{s.desc}</p>
              <span className="service-divider" />
              <ul className="service-card-list">
                {s.items.map((item, j) => (
                  <li key={j}>
                    <IconCheck />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={s.comingSoon ? undefined : '/contact'} className="service-card-arrow" style={s.comingSoon ? { pointerEvents: 'none' } : undefined}>
                <span>{s.comingSoon ? 'Coming soon' : 'Enquire'}</span>
                <IconArrow />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
