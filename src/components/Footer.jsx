import '../styles/Footer.css'

function Footer({ brand, note }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">{brand}</p>
        <p className="footer-note">{note}</p>
      </div>
    </footer>
  )
}

export default Footer
