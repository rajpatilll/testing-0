"use client"

import { useState, useEffect } from "react"
import { useFormContext } from "../formContext"
import { useNavigate, useLocation } from "react-router-dom"
import freewill from "../../assets/freewill.jpg"

const FuneralPreferences = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const [funeral, setFuneral] = useState({
    handler: "executor",
    customHandler: "",
    finalWish: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing && formData.funeral) {
      setFuneral(formData.funeral)
    }
  }, [formData.funeral, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFuneral({ ...funeral, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }
  const validateForm = () => {
    const newErrors = {}

    if (!funeral.finalWish) {
      newErrors.finalWish = "Please select your final wishes"
    }

    if (funeral.handler === "someoneElse" && !funeral.customHandler.trim()) {
      newErrors.customHandler = "Please enter the name of the person who will handle your funeral"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData("funeral", funeral)
      if (isEditing) {
        navigate("/get-started/review", { replace: true })
      } else {
        onNext()
      }
    }
  }

  const handlePrev = () => {
    updateFormData("funeral", funeral)
    navigate("/get-started/gifts/assign-beneficiaries")
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
            <div className="progress-fill" style={{ width: "84%" }}></div>
          </div>
          <div className="progress-steps">
            <div className="progress-step">Get Started</div>
            <div className="progress-step">Personal Info</div>
            <div className="progress-step">Family</div>
            <div className="progress-step">Assets</div>
            <div className="progress-step">Beneficiaries</div>
            <div className="progress-step active">Executor</div>
            <div className="progress-step">Review</div>
          </div>
        </div>
      </div>

      <div className="get-started-content">
        <div className="get-started-card">
          <h1>Funeral Preferences</h1>
          <p>Specify your wishes for your funeral arrangements.</p>

          <div className="form-group">
            <label>Who will handle your funeral arrangements?*</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="handler"
                  value="executor"
                  checked={funeral.handler === "executor"}
                  onChange={handleChange}
                />
                The executor of my will
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="handler"
                  value="someoneElse"
                  checked={funeral.handler === "someoneElse"}
                  onChange={handleChange}
                />
                Someone else
              </label>
            </div>
          </div>

          {funeral.handler === "someoneElse" && (
            <div className="form-group">
              <label htmlFor="custom-handler">Name of person handling funeral*</label>
              <input
                id="custom-handler"
                type="text"
                name="customHandler"
                placeholder="Full Name"
                value={funeral.customHandler}
                onChange={handleChange}
              />
              {errors.customHandler && <div className="error-message">{errors.customHandler}</div>}
            </div>
          )}

          <div className="form-group">
            <label>What are your final wishes?*</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="finalWish"
                  value="burial"
                  checked={funeral.finalWish === "burial"}
                  onChange={handleChange}
                />
                Burial
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="finalWish"
                  value="cremation"
                  checked={funeral.finalWish === "cremation"}
                  onChange={handleChange}
                />
                Cremation
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="finalWish"
                  value="donation"
                  checked={funeral.finalWish === "donation"}
                  onChange={handleChange}
                />
                Donate my body to science
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="finalWish"
                  value="other"
                  checked={funeral.finalWish === "other"}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
            {errors.finalWish && <div className="error-message">{errors.finalWish}</div>}
          </div>

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">
              Back
            </button>

            <button
              onClick={handleSubmit}
              className="next-button"
              disabled={!funeral.finalWish || (funeral.handler === "someoneElse" && !funeral.customHandler)}
            >
              {isEditing ? "Save Changes" : "Continue"}
            </button>
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

export default FuneralPreferences

