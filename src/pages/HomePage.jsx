import { Link } from "react-router-dom"
import "../LandingPage.css"
import aarp from "../assets/aarp.jpg"
import forbes from "../assets/forbes.jpg"
import ghousekeeping from "../assets/ghousekeeping.jpg"
import mc from "../assets/mc.jpg"
import newyork from "../assets/newyork.jpg"
import hero from "../assets/hero.jpg"
import yahoo from "../assets/yahoo.jpg"
import bd from "../assets/bd.jpg"
import dfpoa from "../assets/dfpoa.jpg"
import lw from "../assets/lw.jpg"
import rlt from "../assets/rlt.jpg"
import trust from "../assets/trust.jpg"
import hundred from "../assets/hundred.jpg"
import support from "../assets/support.jpg"
import pdata from "../assets/pdata.jpg"
import law from "../assets/law.jpg"
import legacyy from "../assets/legacyy.jpg"
import freewill from "../assets/freewill.jpg"
import Footer from "./Footer"

const HomePage = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <img src={freewill} alt="logo" title="logo" className="logo" />
        <nav className="nav">
          <Link to="/individuals" className="nav-link">
            For individuals
          </Link>
          <Link to="/nonprofits" className="nav-link">
            For nonprofits
          </Link>
          <Link to="/advisors" className="nav-link">
            For advisors
          </Link>
          <Link to="/about" className="nav-link">
            About us
          </Link>
          <Link to="/login" className="nav-link">
            Log in
          </Link>
          <Link to="/get-started" className="nav-link button">
            Get Started
          </Link>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span>Get peace of mind</span>
          </h1>
          <p className="hero-subtitle">
            It takes less than 20 minutes to write or update your legal will, for free.{" "}
            <Link to="/why-free">Why is it free?</Link>
          </p>
          <Link to="/make-will" className="hero-button">
            Make my will
          </Link>
          <p className="small-text">
            If you live in California, we also offer a <Link to="/revocable-trust">Revocable Living Trust</Link>.
          </p>
        </div>
        <div className="hero">
          <img src={hero} alt="hero" title="hero" className="hero" />
        </div>
      </main>

      <section className="media-mentions">
        <h2>Media Mentions</h2>
        <div className="media-logos">
          <img src={aarp} alt="aarp" title="aarp" className="aarp" />
          <img src={newyork} alt="newyork" title="newyork" className="newyork" />
          <img src={yahoo} alt="yahoo" title="yahoo" className="yahoo" />
          <img src={forbes} alt="forbes" title="forbes" className="forbes" />
          <img src={ghousekeeping} alt="ghousekeeping" title="ghousekeeping" className="ghousekeeping" />
          <img src={mc} alt="mc" title="mc" className="mc" />
        </div>
      </section>

      <section className="products">
        <h2>Other FreeWill products</h2>
        <div className="product-list">
          <div className="product-item">
            <img src={lw} alt="Living Will" title="Living Will" className="product-icon" />
            <div className="product-item-content">
              <h3>Living Will</h3>
              <p>
                Use an advance healthcare directive, or living will, to specify your healthcare wishes and appoint
                someone to make decisions on your behalf if you’re unable.
              </p>
              <Link to="/living-will" className="product-button">
                Learn about living wills
              </Link>
            </div>
          </div>

          <div className="product-item">
            <img src={dfpoa} alt="DFPOA" title="DFPOA" className="product-icon" />
            <div className="product-item-content">
              <h3>Durable Financial Power of Attorney</h3>
              <p>
                Keep your financial accounts accessible and bills paid by appointing someone to make financial decisions
                on your behalf if you’re unable.
              </p>
              <Link to="/dfpoa" className="product-button">
                Learn about DFPOAs
              </Link>
            </div>
          </div>

          <div className="product-item">
            <img src={bd} alt="Beneficiary Designations" title="Beneficiary Designations" className="product-icon" />
            <div className="product-item-content">
              <h3>Beneficiary Designations</h3>
              <p>
                Document and distribute assets that your last will and testament does not cover, including 401(k)s,
                IRAs, and life insurance policies.
              </p>
              <Link to="/bd" className="product-button">
                Learn about Beneficiary Designations
              </Link>
            </div>
          </div>

          <div className="product-item">
            <img src={rlt} alt="Revocable Living Trusts" title="Revocable Living Trusts" className="product-icon" />
            <div className="product-item-content">
              <span className="only-in-california">Only in California</span>
              <h3>Revocable Living Trusts</h3>
              <p>
                Create a revocable living trust and fulfill many functions of a last will and testament. Also, placing
                assets in a trust can avoid California’s lengthy probate process.
              </p>
              <Link to="/rlt" className="product-button">
                Learn about Revocable Living Trusts
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-content">
          <h2>Trusted by Thousands</h2>
          <p>
            Writing your own will can feel daunting — that’s why we worked with the nation's top legal experts to create
            our interactive online will maker. Enter your information and create a last will and testament customized to
            your wishes.
          </p>
          <p>
            We also have <a href="/estate-planning-products">other estate planning products</a> available to help you
            get all your affairs in order.
          </p>
        </div>
        <div className="trust-image-container">
          <img src={trust} alt="Trusted by Thousands" title="Trusted by Thousands" />
        </div>
      </section>
      <section className="why-free-section">
        <div className="why-free-content">
          <h2>Why is FreeWill free?</h2>
          <p>
            Our mission is to enable you to do the most good for the people and causes you love, by providing free
            access to will-making services. We've partnered with 1900+ nonprofits and businesses who support our mission
            and help ensure you can create a will for free, while raising more than $11.3B+ in bequests to charities.
          </p>
          <p>
            One in six people who use FreeWill choose to leave a bequest to charity. They believe, as we do, that
            leaving a bequest to nonprofit organizations in your will can be an incredibly powerful way to make an
            impact for the causes you support.
          </p>
          <Link to="/make-will" className="cta-button">
            Make your free will today
          </Link>
        </div>

        <div className="why-free-icons">
          <div className="why-item">
            <img src={hundred} alt="100% Free" title="100% Free" className="why-icon" />
            <p>
              <strong>100% free</strong> — no credit card required
            </p>
          </div>
          <div className="why-item">
            <img src={support} alt="Supported by Nonprofits" title="Supported by Nonprofits" className="why-icon" />
            <p>Supported by nonprofits</p>
          </div>
          <div className="why-item">
            <img src={pdata} alt="No Personal Data Sold" title="No Personal Data Sold" className="why-icon" />
            <p>
              We <strong>never</strong> sell your personal data
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How FreeWill Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Fill out online</h3>
            <p>Just follow the step-by-step instructions to fill out the necessary information for your forms.</p>
          </div>
          <div className="step">
            <h3>2. Print out documents</h3>
            <p>
              The information you provided is turned into precise legal language, and provided back to you as a
              printable document.
            </p>
          </div>
          <div className="step">
            <h3>3. Sign and keep safe</h3>
            <p>
              Follow attached instructions to print, sign, and make your document official. Keep it somewhere safe, but
              accessible.
            </p>
          </div>
        </div>

        <div className="law-section">
          <img src={law} alt="Legal" title="Legal" className="law-icon" />
          <p className="law-text">
            We understand that online estate planning isn’t suitable for everyone. If you have complex needs, we
            encourage you to seek legal counsel. As you answer questions on FreeWill, we’ll point out where an attorney
            may be a better fit. We’ll also provide your responses in an easy-to-read summary, which you can print and
            bring to your attorney to save time.
          </p>
        </div>
      </section>

      <section className="legacy">
        <div className="legacy-section">
          <div className="legacy-content">
            <h2 className="legacy-title">
              <strong>Leave a lasting legacy</strong>
            </h2>
            <p className="legacy-text">
              We’re on a mission to help people plan for the future while doing the most good for the people and causes
              they care about.
            </p>
            <p className="legacy-text">
              By using FreeWill, you help keep this service free for everyone no matter their circumstances. If you
              choose to commit a small gift to a nonprofit, you’ll also be helping them continue their work for
              generations to come, all at no cost to you during your lifetime.
            </p>
            <button className="legacy-button">Make my will today</button>
          </div>
          <div className="legacy-image">
            <img src={legacyy} alt="law" title="law" className="law" />
            <div className="legacy-overlay"></div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-item">
          <h2>1.2M+</h2>
          <p>Wills created</p>
        </div>
        <div className="stat-item">
          <h2>$11.3B+</h2>
          <p>Committed to nonprofits</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage

