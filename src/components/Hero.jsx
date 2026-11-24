import illustration from '../assets/clarity-illustration.svg'
import '../styles/Hero.css'

function Hero({ eyebrow, headline, intro, cta, points }) {
  return (
    <section id="overview" className="section hero-section" aria-labelledby="hero-heading">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">{eyebrow}</p>
          <h1 id="hero-heading" className="section-title hero-title">
            {headline}
          </h1>
          <p className="hero-intro">{intro}</p>
          <a className="button button-primary hero-cta" href="#register">
            {cta}
          </a>
          <ul className="hero-points" aria-label="Key points">
            {points.map((point) => (
              <li key={point} className="hero-point">
                <span className="hero-point-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                    <circle cx="8" cy="8" r="7.25" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M4.75 8.2 7 10.45l4.25-4.9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-media">
          <img
            src={illustration}
            alt="Illustration of a courthouse with a document, representing clear legal guidance."
            className="hero-illustration"
            width="640"
            height="480"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
