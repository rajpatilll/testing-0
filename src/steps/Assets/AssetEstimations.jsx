"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormContext } from "../formContext"
import freewill from "../../assets/freewill.jpg"

const AssetEstimations = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const [estimatedValue, setEstimatedValue] = useState(formData.assets?.estimatedValue || "")

  useEffect(() => {
    updateFormData("assets", { ...formData.assets, estimatedValue })
  }, [estimatedValue])

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "")
    setEstimatedValue(value)
  }

  const handleSubmit = () => {
    onNext()
  }

  const handlePrev = () => {
    navigate("/get-started/assets/options")
  }

  const handleSave = () => {
    navigate("/get-started/review")
  }

  return (
    <div className="get-started-container">
      <header className="get-started-header">
        <img src={freewill || "/placeholder.svg"} alt="FreeWill" className="get-started-logo" />
        <div className="get-started-header-right">
          <a href="#">Help Center</a>
          <a href="#">Log In</a>
        </div>
      </header>

      <div className="progress-container">
        <div className="progress-bar-wrapper">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "54%" }}></div>
          </div>
          <div className="progress-steps">
            <div className="progress-step">Get Started</div>
            <div className="progress-step">Personal Info</div>
            <div className="progress-step active">Family</div>
            <div className="progress-step">Assets</div>
            <div className="progress-step">Beneficiaries</div>
            <div className="progress-step">Executor</div>
            <div className="progress-step">Review</div>
          </div>
        </div>
      </div>

      <div className="get-started-content">
        <div className="get-started-card">
          <h1>How much are your assets worth?</h1>
          <p>Please enter an estimated total value.</p>

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter amount in INR"
              value={estimatedValue}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">Back</button>
            {!isEditing && (
              <button onClick={handleSubmit} disabled={!estimatedValue} className="next-button">
                Continue
              </button>
            )}
            {isEditing && <button onClick={handleSave} className="next-button">Save</button>}
          </div>
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

export default AssetEstimations
