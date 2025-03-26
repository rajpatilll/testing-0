"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormContext } from "../formContext"
import freewill from "../../assets/freewill.jpg"

const Beneficiary = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const [beneficiaries, setBeneficiaries] = useState(
    formData.beneficiary?.beneficiaries?.length > 0
      ? formData.beneficiary.beneficiaries
      : [{ name: "", percentage: "" }],
  )

  const [errors, setErrors] = useState({})
  const [totalPercentage, setTotalPercentage] = useState(0)

  useEffect(() => {
    const total = beneficiaries.reduce((sum, b) => sum + Number(b.percentage || 0), 0)
    setTotalPercentage(total)
  }, [beneficiaries])


  useEffect(() => {
    updateFormData("beneficiary", { beneficiaries })
  }, [beneficiaries])

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { name: "", percentage: "" }])
  }

  const updateBeneficiary = (index, field, value) => {
    const updatedBeneficiaries = [...beneficiaries]

    if (field === "percentage") {
      const percentValue = Math.max(0, Math.min(100, Number(value)))
      updatedBeneficiaries[index][field] = percentValue

      if (errors[`percentage${index}`]) {
        setErrors({ ...errors, [`percentage${index}`]: null })
      }
    } else {
      updatedBeneficiaries[index][field] = value

      if (errors[`name${index}`]) {
        setErrors({ ...errors, [`name${index}`]: null })
      }
    }

    setBeneficiaries(updatedBeneficiaries)
  }

  const validateForm = () => {
    const newErrors = {}

    beneficiaries.forEach((beneficiary, index) => {
      if (!beneficiary.name.trim()) {
        newErrors[`name${index}`] = "Beneficiary name is required"
      }

      if (!beneficiary.percentage) {
        newErrors[`percentage${index}`] = "Percentage is required"
      } else if (beneficiary.percentage > 100) {
        newErrors[`percentage${index}`] = "Percentage cannot exceed 100%"
      }
    })

    if (totalPercentage !== 100) {
      newErrors.total = "Total percentage must equal 100%"
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
    updateFormData("beneficiary", { beneficiaries })
    navigate("/get-started/residuary/charitable-gifts")
  }

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
            <div className="progress-fill" style={{ width: "65%" }}></div>
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
          <h1>Who should receive the remainder of your estate?</h1>
          <p>These beneficiaries will receive the remaining assets after specific gifts are distributed.</p>

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
                    onChange={(e) => updateBeneficiary(index, "name", e.target.value)}
                  />
                  {errors[`name${index}`] && <div className="error-message">{errors[`name${index}`]}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor={`beneficiary-percentage-${index}`}>Percentage (%)*</label>
                  <input
                    id={`beneficiary-percentage-${index}`}
                    type="number"
                    placeholder="Percentage"
                    value={beneficiary.percentage}
                    onChange={(e) => updateBeneficiary(index, "percentage", e.target.value)}
                    min="0"
                    max="100"
                  />
                  {errors[`percentage${index}`] && <div className="error-message">{errors[`percentage${index}`]}</div>}
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginBottom: "20px" }}>
            <p style={{ fontWeight: "600" }}>Total: {totalPercentage}%</p>
            {errors.total && <div className="error-message">{errors.total}</div>}
          </div>
          <div style={{ marginBottom: "20px" }}>
          {totalPercentage !== 100 && (
            <p style={{ color: "red", fontWeight:"lighter", marginTop: "5px" }}>
              Total percentage must equal 100% before proceeding.
            </p>
          )}
        </div>
          {beneficiaries[0].name && beneficiaries[0].percentage && (
            <button
              onClick={addBeneficiary}
              className="back-button"
              style={{ marginBottom: "20px", background: "#f0f0f0" }}
            >
              Add Another Beneficiary
            </button>
          )}

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">
              Back
            </button>

            {!isEditing ? (
  <button
    onClick={() => {
      if (totalPercentage !== 100) {
        alert("⚠️ Total percentage must equal 100% before proceeding.");
        return; 
      }
      handleSubmit();
    }}
    className="next-button"
    disabled={!beneficiaries[0].name || !beneficiaries[0].percentage} 
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

export default Beneficiary

