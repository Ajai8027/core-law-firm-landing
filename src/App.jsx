import Header from './components/Header'
import Hero from './components/Hero'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'
import pageCopy from './data/pageCopy.json'

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header brand={pageCopy.brand} nav={pageCopy.nav} />
      <main id="main-content">
        <Hero
          eyebrow={pageCopy.eyebrow}
          headline={pageCopy.headline}
          intro={pageCopy.intro}
          cta={pageCopy.cta}
          points={pageCopy.points}
        />
        <RegistrationForm copy={pageCopy} />
      </main>
      <Footer brand={pageCopy.footer} note={pageCopy.footerNote} />
    </>
  )
}

export default App
