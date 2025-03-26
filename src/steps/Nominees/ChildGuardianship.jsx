"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormContext } from "../formContext"
import freewill from "../../assets/freewill.jpg"

const ChildrenGuardianship = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const [details, setDetails] = useState({
    hasMinorChildren: formData.childrenGuardianship?.hasMinorChildren || "",
    numberOfChildren: formData.childrenGuardianship?.numberOfChildren || "",
    guardian: formData.childrenGuardianship?.guardian || { firstName: "", lastName: "", relationship: "" },
    alternateGuardian: formData.childrenGuardianship?.alternateGuardian || {
      firstName: "",
      lastName: "",
      relationship: "",
    },
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }

    if (name === "hasMinorChildren" && value === "no") {
      setDetails({
        ...details,
        hasMinorChildren: "no",
        numberOfChildren: "",
        guardian: { firstName: "", lastName: "", relationship: "" },
        alternateGuardian: { firstName: "", lastName: "", relationship: "" },
      })
    }
  }

  const handleGuardianChange = (type, field, value) => {
    setDetails({
      ...details,
      [type]: {
        ...details[type],
        [field]: value,
      },
    })

    if (errors[`${type}${field}`]) {
      setErrors({ ...errors, [`${type}${field}`]: null })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!details.hasMinorChildren) {
      newErrors.hasMinorChildren = "Please select whether you have minor children"
    }

    if (details.hasMinorChildren === "yes") {
      if (!details.numberOfChildren) {
        newErrors.numberOfChildren = "Please enter the number of minor children"
      }

      if (!details.guardian.firstName) {
        newErrors.guardianFirstName = "Guardian's first name is required"
      }

      if (!details.guardian.lastName) {
        newErrors.guardianLastName = "Guardian's last name is required"
      }

      if (!details.guardian.relationship) {
        newErrors.guardianRelationship = "Relationship to guardian is required"
      }

      if (!details.alternateGuardian.firstName) {
        newErrors.alternateGuardianFirstName = "Alternate guardian's first name is required"
      }

      if (!details.alternateGuardian.lastName) {
        newErrors.alternateGuardianLastName = "Alternate guardian's last name is required"
      }

      if (!details.alternateGuardian.relationship) {
        newErrors.alternateGuardianRelationship = "Relationship to alternate guardian is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData("childrenGuardianship", details)
      onNext()
    }
  }

  const handlePrev = () => {
    updateFormData("childrenGuardianship", details)
    navigate("/get-started/basics/marital-status")
  }

  const handleSave = () => {
    if (validateForm()) {
      updateFormData("childrenGuardianship", details)
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
            <div className="progress-fill" style={{ width: "39%" }}></div>
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
          <h1>Do you have minor children?</h1>
          <p>If you have children under 18, you can name a guardian for them in your will.</p>

          <div className="form-group">
            <label>Do you have minor children (under 18)?*</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="hasMinorChildren"
                  value="yes"
                  checked={details.hasMinorChildren === "yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="hasMinorChildren"
                  value="no"
                  checked={details.hasMinorChildren === "no"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
            {errors.hasMinorChildren && <div className="error-message">{errors.hasMinorChildren}</div>}
          </div>

          {details.hasMinorChildren === "yes" && (
            <>
              <div className="form-group">
                <label htmlFor="numberOfChildren">How many minor children do you have?*</label>
                <input
                  type="number"
                  id="numberOfChildren"
                  name="numberOfChildren"
                  min="1"
                  max="20"
                  value={details.numberOfChildren}
                  onChange={handleChange}
                />
                {errors.numberOfChildren && <div className="error-message">{errors.numberOfChildren}</div>}
              </div>

              <h2 style={{ marginTop: "30px", fontSize: "20px" }}>Guardian Information</h2>
              <p>
                Who should be the legal guardian of your children if you (and their other parent) are unable to care for
                them?
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="guardianFirstName">Guardian's First Name*</label>
                  <input
                    type="text"
                    id="guardianFirstName"
                    value={details.guardian.firstName}
                    onChange={(e) => handleGuardianChange("guardian", "firstName", e.target.value)}
                  />
                  {errors.guardianFirstName && <div className="error-message">{errors.guardianFirstName}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="guardianLastName">Guardian's Last Name*</label>
                  <input
                    type="text"
                    id="guardianLastName"
                    value={details.guardian.lastName}
                    onChange={(e) => handleGuardianChange("guardian", "lastName", e.target.value)}
                  />
                  {errors.guardianLastName && <div className="error-message">{errors.guardianLastName}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="guardianRelationship">Relationship to Guardian*</label>
                <input
                  type="text"
                  id="guardianRelationship"
                  placeholder="e.g., Sister, Brother, Friend"
                  value={details.guardian.relationship}
                  onChange={(e) => handleGuardianChange("guardian", "relationship", e.target.value)}
                />
                {errors.guardianRelationship && <div className="error-message">{errors.guardianRelationship}</div>}
              </div>

              <h2 style={{ marginTop: "30px", fontSize: "20px" }}>Alternate Guardian</h2>
              <p>Choose an alternate guardian in case your first choice is unable to serve.</p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="altGuardianFirstName">Alternate Guardian's First Name*</label>
                  <input
                    type="text"
                    id="altGuardianFirstName"
                    value={details.alternateGuardian.firstName}
                    onChange={(e) => handleGuardianChange("alternateGuardian", "firstName", e.target.value)}
                  />
                  {errors.alternateGuardianFirstName && (
                    <div className="error-message">{errors.alternateGuardianFirstName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="altGuardianLastName">Alternate Guardian's Last Name*</label>
                  <input
                    type="text"
                    id="altGuardianLastName"
                    value={details.alternateGuardian.lastName}
                    onChange={(e) => handleGuardianChange("alternateGuardian", "lastName", e.target.value)}
                  />
                  {errors.alternateGuardianLastName && (
                    <div className="error-message">{errors.alternateGuardianLastName}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="altGuardianRelationship">Relationship to Alternate Guardian*</label>
                <input
                  type="text"
                  id="altGuardianRelationship"
                  placeholder="e.g., Sister, Brother, Friend"
                  value={details.alternateGuardian.relationship}
                  onChange={(e) => handleGuardianChange("alternateGuardian", "relationship", e.target.value)}
                />
                {errors.alternateGuardianRelationship && (
                  <div className="error-message">{errors.alternateGuardianRelationship}</div>
                )}
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

export default ChildrenGuardianship

