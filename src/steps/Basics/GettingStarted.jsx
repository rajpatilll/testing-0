"use client"
import freewill from "../../assets/freewill.jpg"
import { useNavigate } from "react-router-dom"

const GettingStarted = ({ onNext }) => {
  const navigate = useNavigate();
  return (
    <div className="get-started-container">
      <header className="get-started-header">
        <img src={freewill || "/placeholder.svg"} alt="FreeWill" className="get-started-logo" />
        <div className="get-started-header-right">
          <a href="#">Help Center</a>
          <a href="#">Log In</a>
          <button className="landing-page-button" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      </header>

      <div className="progress-container">
        <div className="progress-bar-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "0%" }}></div>
          </div>
          <div className="progress-steps">
            <div className="progress-step active">Get Started</div>
            <div className="progress-step">Personal Info</div>
            <div className="progress-step">Family</div>
            <div className="progress-step">Assets</div>
            <div className="progress-step">Beneficiaries</div>
            <div className="progress-step">Executor</div>
            <div className="progress-step">Review</div>
          </div>
        </div>
      </div>

      <div className="get-started-content">
        <div className="get-started-card">
          <h1>Welcome to FreeWill</h1>
          <p>
            Creating a legally valid will is one of the most important things you can do for yourself and your loved
            ones. We'll guide you through the process step by step.
          </p>
          <p>
            It takes about <span className="highlight">20 minutes</span> to complete your will, and you can save your
            progress and return anytime.
          </p>
          <button onClick={onNext} className="get-started-button">
            Let's Get Started
          </button>
        </div>
      </div>

      <footer className="get-started-footer">
        <p>
          Have questions? Visit our <a href="#">Help Center</a> or <a href="#">contact us</a>.
        </p>
        <p>© 2023 FreeWill Co. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default GettingStarted

