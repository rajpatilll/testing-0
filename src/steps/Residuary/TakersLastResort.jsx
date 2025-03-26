"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormContext } from "../formContext"
import freewill from "../../assets/freewill.jpg"

const TakersLastResort = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  //options for fallback heir
  const predefinedOptions = ["Charity Organization", "Religious Institution", "Distant Relative", "Close Friend"]

  const [fallback, setFallback] = useState(
    typeof formData.takersLastResort === "string"
      ? { name: formData.takersLastResort, isOther: false }
      : formData.takersLastResort || { name: "", isOther: false },
  )

  const [errors, setErrors] = useState({})

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value

    if (selectedValue === "other") {
      setFallback({ name: "", isOther: true })
    } else {
      setFallback({ name: selectedValue, isOther: false })
    }

    if (errors.fallback) {
      setErrors({ ...errors, fallback: null })
    }
  }

  const handleInputChange = (e) => {
    setFallback({ ...fallback, name: e.target.value })

    if (errors.fallback) {
      setErrors({ ...errors, fallback: null })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!fallback.name) {
      newErrors.fallback = "Please select or enter a fallback heir"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData("takersLastResort", fallback)
      onNext()
    }
  }

  const handlePrev = () => {
    updateFormData("takersLastResort", fallback)
    navigate("/get-started/residuary/beneficiary")
  }

  const handleSave = () => {
    if (validateForm()) {
      updateFormData("takersLastResort", fallback)
      navigate("/get-started/review")
    }
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
            <div className="progress-fill" style={{ width: "70%" }}></div>
          </div>
          <div className="progress-steps">
            <div className="progress-step">Get Started</div>
            <div className="progress-step">Personal Info</div>
            <div className="progress-step">Family</div>
            <div className="progress-step">Assets</div>
            <div className="progress-step active">Beneficiaries</div>
            <div className="progress-step">Executor</div>
            <div className="progress-step">Review</div>
          </div>
        </div>
      </div>

      <div className="get-started-content">
        <div className="get-started-card">
          <h1>Who should receive your estate if all other beneficiaries are unavailable?</h1>
          <p>This is your fallback option if none of your named beneficiaries can receive your assets.</p>

          <div className="form-group">
            <label htmlFor="fallback-heir">Select a fallback heir*</label>
            <select id="fallback-heir" value={fallback.isOther ? "other" : fallback.name} onChange={handleSelectChange}>
              <option value="">Select an option</option>
              {predefinedOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
            {errors.fallback && <div className="error-message">{errors.fallback}</div>}
          </div>

          {fallback.isOther && (
            <div className="form-group">
              <label htmlFor="custom-fallback">Specify fallback heir*</label>
              <input
                id="custom-fallback"
                type="text"
                placeholder="Enter fallback heir"
                value={fallback.name}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">
              Back
            </button>

            {!isEditing ? (
              <button onClick={handleSubmit} className="next-button" disabled={!fallback.name}>
                Continue
              </button>
            ) : (
              <button onClick={handleSave} className="next-button">
                Save Changes
              </button>
            )}
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

export default TakersLastResort

