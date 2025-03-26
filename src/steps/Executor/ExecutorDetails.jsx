"use client"

import { useState, useEffect } from "react"
import { useFormContext } from "../formContext"
import { useNavigate, useLocation } from "react-router-dom"
import freewill from "../../assets/freewill.jpg"

const ExecutorDetails = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const [executor, setExecutor] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    altFirstName: "",
    altLastName: "",
    altRelationship: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEditing && formData.executor) {
      setExecutor(formData.executor)
    }
  }, [formData.executor, isEditing])

  const handleChange = (e) => {
    const { name, value } = e.target
    setExecutor({ ...executor, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!executor.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!executor.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!executor.relationship.trim()) {
      newErrors.relationship = "Relationship is required"
    }

    if (executor.altFirstName || executor.altLastName || executor.altRelationship) {
      if (!executor.altFirstName.trim()) {
        newErrors.altFirstName = "First name is required"
      }

      if (!executor.altLastName.trim()) {
        newErrors.altLastName = "Last name is required"
      }

      if (!executor.altRelationship.trim()) {
        newErrors.altRelationship = "Relationship is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData("executor", executor)
      if (isEditing) {
        navigate("/get-started/review", { replace: true })
      } else {
        onNext()
      }
    }
  }

  const handlePrev = () => {
    updateFormData("executor", executor)
    navigate("/get-started/funeral/funeral-preferences")
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
            <div className="progress-fill" style={{ width: "80%" }}></div>
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
          <h1>Who will be the executor of your will?</h1>
          <p>This is the person who will carry out the instructions in your will.</p>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="executor-first-name">First Name*</label>
              <input
                id="executor-first-name"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={executor.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="executor-last-name">Last Name*</label>
              <input
                id="executor-last-name"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={executor.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="executor-relationship">Relationship*</label>
            <input
              id="executor-relationship"
              type="text"
              name="relationship"
              placeholder="e.g., Spouse, Sibling, Friend"
              value={executor.relationship}
              onChange={handleChange}
            />
            {errors.relationship && <div className="error-message">{errors.relationship}</div>}
          </div>

          <h2 style={{ marginTop: "30px", fontSize: "20px" }}>Alternate Executor (Optional)</h2>
          <p>If your first choice is unable to serve, this person will take over.</p>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="alt-executor-first-name">First Name</label>
              <input
                id="alt-executor-first-name"
                type="text"
                name="altFirstName"
                placeholder="First Name"
                value={executor.altFirstName}
                onChange={handleChange}
              />
              {errors.altFirstName && <div className="error-message">{errors.altFirstName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="alt-executor-last-name">Last Name</label>
              <input
                id="alt-executor-last-name"
                type="text"
                name="altLastName"
                placeholder="Last Name"
                value={executor.altLastName}
                onChange={handleChange}
              />
              {errors.altLastName && <div className="error-message">{errors.altLastName}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="alt-executor-relationship">Relationship</label>
            <input
              id="alt-executor-relationship"
              type="text"
              name="altRelationship"
              placeholder="e.g., Spouse, Sibling, Friend"
              value={executor.altRelationship}
              onChange={handleChange}
            />
            {errors.altRelationship && <div className="error-message">{errors.altRelationship}</div>}
          </div>

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">
              Back
            </button>

            <button
              onClick={handleSubmit}
              className="next-button"
              disabled={!executor.firstName || !executor.lastName || !executor.relationship}
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

export default ExecutorDetails

