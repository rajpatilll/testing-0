"use client"

import { useState, useEffect } from "react"
import { useFormContext } from "../formContext"
import { useNavigate, useLocation } from "react-router-dom"
import freewill from "../../assets/freewill.jpg"

const AssignBeneficiaries = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const [beneficiaries, setBeneficiaries] = useState(() =>
    formData.beneficiaries?.length > 0 ? [...formData.beneficiaries] : [{ name: "", share: "" }],
  )

  const [errors, setErrors] = useState({})
  const [totalShare, setTotalShare] = useState(0)

  useEffect(() => {
    const total = beneficiaries.reduce((sum, b) => sum + Number(b.share || 0), 0)
    setTotalShare(total)

    if (total !== 100 && beneficiaries.some((b) => b.name && b.share)) {
      setErrors((prev) => ({ ...prev, total: "Total percentage must equal 100%" }))
    } else {
      setErrors((prev) => ({ ...prev, total: null }))
    }
  }, [beneficiaries])

  const handleAddBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { name: "", share: "" }])
  }

  const handleRemoveBeneficiary = (index) => {
    setBeneficiaries(beneficiaries.filter((_, i) => i !== index))
  }

  const handleBeneficiaryChange = (index, field, value) => {
    const updatedBeneficiaries = [...beneficiaries]
    updatedBeneficiaries[index][field] = field === "share" ? Number(value) || "" : value
    setBeneficiaries(updatedBeneficiaries)

    if (errors[`${field}${index}`]) {
      setErrors({ ...errors, [`${field}${index}`]: null })
    }
  }
  const validateForm = () => {
    const newErrors = {}

    beneficiaries.forEach((beneficiary, index) => {
      if (!beneficiary.name.trim()) {
        newErrors[`name${index}`] = "Beneficiary name is required"
      }

      if (!beneficiary.share) {
        newErrors[`share${index}`] = "Percentage share is required"
      }
    })

    if (totalShare !== 100) {
      newErrors.total = "Total percentage must equal 100%"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData("beneficiaries", beneficiaries)
      onNext()
    }
  }

  const handlePrev = () => {
    updateFormData("beneficiaries", beneficiaries)
    navigate("/get-started/gifts/selection")
  }

  const handleSave = () => {
    if (validateForm()) {
      updateFormData("beneficiaries", beneficiaries)
      navigate("/get-started/review", { replace: true })
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
            <div className="progress-fill" style={{ width: "74%" }}></div>
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
          <h1>Assign Beneficiaries to Your Gifts</h1>
          <p>Specify who should receive the gifts you've selected and what percentage each person should get.</p>

          {beneficiaries.map((beneficiary, index) => (
            <div key={index} className="form-group">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`beneficiary-name-${index}`}>Beneficiary Name*</label>
                  <input
                    id={`beneficiary-name-${index}`}
                    type="text"
                    placeholder="Full Name"
                    value={beneficiary.name}
                    onChange={(e) => handleBeneficiaryChange(index, "name", e.target.value)}
                  />
                  {errors[`name${index}`] && <div className="error-message">{errors[`name${index}`]}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor={`beneficiary-share-${index}`}>Percentage Share (%)*</label>
                  <input
                    id={`beneficiary-share-${index}`}
                    type="number"
                    placeholder="Percentage"
                    value={beneficiary.share}
                    onChange={(e) => handleBeneficiaryChange(index, "share", e.target.value)}
                    min="0"
                    max="100"
                  />
                  {errors[`share${index}`] && <div className="error-message">{errors[`share${index}`]}</div>}
                </div>

                {beneficiaries.length > 1 && (
                  <button
                    onClick={() => handleRemoveBeneficiary(index)}
                    className="back-button"
                    style={{
                      marginTop: "24px",
                      background: "#f8d7da",
                      color: "#721c24",
                      border: "1px solid #f5c6cb",
                      padding: "8px 12px",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontWeight: "600" }}>Total: {totalShare}%</p>
            {errors.total && <div className="error-message">{errors.total}</div>}
          </div>

          <button
            onClick={handleAddBeneficiary}
            className="back-button"
            style={{ marginBottom: "20px", background: "#f0f0f0" }}
          >
            Add Beneficiary
          </button>

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">
              Back
            </button>

            {!isEditing ? (
              <button
                onClick={handleSubmit}
                className="next-button"
                disabled={!beneficiaries[0].name || !beneficiaries[0].share || totalShare !== 100}
              >
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

export default AssignBeneficiaries

