import { Link } from "react-router-dom"
import "../Footer.css"
import freewill from "../assets/freewill.jpg"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <img src={freewill} alt="logo" title="logo" className="logo" />
        <h2>Try FreeWill today</h2>
        <p>✓ 100% free | ✓ Done in under 20 minutes</p>
        <Link to="/get-started" className="footer-button">
          Create a will now—it's free!
        </Link>
      </div>

      <div className="footer-nav">
        <div className="footer-column">
          <h3>For Individuals</h3>
          <Link to="/products">Products</Link>
          <Link to="/donate-stock">Donate stock</Link>
          <Link to="/donate-crypto">Donate crypto</Link>
        </div>
        <div className="footer-column">
          <h3>For Nonprofits</h3>
          <Link to="/nonprofits">For nonprofits</Link>
          <Link to="/resources">Resources</Link>
        </div>
        <div className="footer-column">
          <h3>About Us</h3>
          <Link to="/who-we-are">Who we are</Link>
          <Link to="/careers">Careers</Link>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <Link to="/help">Help center</Link>
          <Link to="/contact">Contact us</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

