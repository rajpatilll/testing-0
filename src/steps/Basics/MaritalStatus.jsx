"use client"

import { useState, useEffect } from "react"
import { useFormContext } from "../formContext"
import { useNavigate, useLocation } from "react-router-dom"
import freewill from "../../assets/freewill.jpg"

const MaritalStatus = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const [status, setStatus] = useState(formData?.basics?.maritalStatus || "")
  const [spouseDetails, setSpouseDetails] = useState(
    formData?.basics?.spouseDetails || { firstName: "", lastName: "", dob: "" },
  )
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (status === "Single") {
      setSpouseDetails({ firstName: "", lastName: "", dob: "" })
    }
    updateFormData("basics", { ...formData.basics, maritalStatus: status })
  }, [status])


  useEffect(() => {
    if (["Married", "Divorced", "Widowed"].includes(status)) {
      updateFormData("basics", { ...formData.basics, spouseDetails })
    }
  }, [spouseDetails])

  const handleSpouseChange = (e) => {
    const { name, value } = e.target
    setSpouseDetails({ ...spouseDetails, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!status) newErrors.status = "Please select your marital status"

    if (status === "Married") {
      if (!spouseDetails.firstName.trim()) newErrors.spouseFirstName = "Spouse's first name is required"
      if (!spouseDetails.lastName.trim()) newErrors.spouseLastName = "Spouse's last name is required"
      if (!spouseDetails.dob) newErrors.spouseDob = "Spouse's date of birth is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const handlePrev = () => {
    updateFormData("basics", { maritalStatus: status, spouseDetails })
    navigate("/get-started/basics/basic-details")
  }

  //Saving data & re-driected to Review Page
  const handleSave = () => {
    if (validateForm()) {
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
            <div className="progress-fill" style={{ width: "32%" }}></div>
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
          <h1>What is your marital status?</h1>
          <p>This information helps us create the appropriate will for your situation.</p>

          <div className="form-group">
            <label>Select your current marital status*</label>
            <div className="radio-group">
              {["Single", "Married", "Divorced", "Widowed"].map((option) => (
                <label key={option} className="radio-option">
                  <input
                    type="radio"
                    name="maritalStatus"
                    value={option}
                    checked={status === option}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.status && <div className="error-message">{errors.status}</div>}
          </div>

          {status === "Married" && (
            <>
              <h2 style={{ marginTop: "30px", fontSize: "20px" }}>Spouse Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="spouseFirstName">Spouse's First Name*</label>
                  <input
                    type="text"
                    id="spouseFirstName"
                    name="firstName"
                    value={spouseDetails.firstName}
                    onChange={handleSpouseChange}
                  />
                  {errors.spouseFirstName && <div className="error-message">{errors.spouseFirstName}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="spouseLastName">Spouse's Last Name*</label>
                  <input
                    type="text"
                    id="spouseLastName"
                    name="lastName"
                    value={spouseDetails.lastName}
                    onChange={handleSpouseChange}
                  />
                  {errors.spouseLastName && <div className="error-message">{errors.spouseLastName}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="spouseDob">Spouse's Date of Birth*</label>
                <input
                  type="date"
                  id="spouseDob"
                  name="dob"
                  value={spouseDetails.dob}
                  onChange={handleSpouseChange}
                  max="2005-12-31"
                />
                {errors.spouseDob && <div className="error-message">{errors.spouseDob}</div>}
              </div>
            </>
          )}

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">
              Back
            </button>

            {!isEditing ? (
              <button onClick={handleSubmit} className="next-button">
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

export default MaritalStatus

