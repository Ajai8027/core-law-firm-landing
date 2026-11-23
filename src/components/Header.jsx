import logo from '../assets/core-law-logo.svg'
import '../styles/Header.css'

function Header({ brand, nav }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand-link" href="#overview" aria-label={`${brand} home`}>
          <img src={logo} alt="Core Law Firm India" className="brand-logo" width="290" height="56" />
        </a>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {nav.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
