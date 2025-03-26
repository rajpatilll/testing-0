"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormContext } from "../formContext"
import freewill from "../../assets/freewill.jpg"

const CharitableGifts = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const charityCategories = [
    "Army",
    "Non-profits",
    "Animal Welfare",
    "Religious Organizations",
    "Education",
    "Healthcare",
  ]

  const [charities, setCharities] = useState(
    formData.charitableGifts?.charities?.length > 0
      ? formData.charitableGifts.charities
      : [{ category: "", percentage: "" }],
  )

  const [errors, setErrors] = useState({})

  useEffect(() => {
    updateFormData("charitableGifts", { charities })
  }, [charities])

  const addCharity = () => {
    setCharities([...charities, { category: "", percentage: "" }])
  }

  const updateCharity = (index, field, value) => {
    const updatedCharities = [...charities]

    if (field === "percentage") {
      const percentValue = Math.max(0, Math.min(100, Number(value)))
      updatedCharities[index][field] = percentValue

      if (errors[`percentage${index}`]) {
        setErrors({ ...errors, [`percentage${index}`]: null })
      }
    } else {
      updatedCharities[index][field] = value

      if (errors[`category${index}`]) {
        setErrors({ ...errors, [`category${index}`]: null })
      }
    }

    setCharities(updatedCharities)
    updateFormData("charitableGifts", { charities: updatedCharities })
  }

  const validateForm = () => {
    const newErrors = {}

    charities.forEach((charity, index) => {
      if (!charity.category) {
        newErrors[`category${index}`] = "Please select a charity type"
      }

      if (!charity.percentage) {
        newErrors[`percentage${index}`] = "Please enter a percentage"
      } else if (charity.percentage > 100) {
        newErrors[`percentage${index}`] = "Percentage cannot exceed 100%"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const handlePrev = () => {
    updateFormData("charitableGifts", { charities })
    navigate("/get-started/assets/estimations")
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
            <div className="progress-fill" style={{ width: "60%" }}></div>
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
          <h1>Would you like to donate part of your estate to charity?</h1>
          <p>You can leave a portion of your estate to charitable organizations.</p>

          {charities.map((charity, index) => (
            <div key={index} className="form-group">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`charity-category-${index}`}>Charity Type</label>
                  <select
                    id={`charity-category-${index}`}
                    value={charity.category}
                    onChange={(e) => updateCharity(index, "category", e.target.value)}
                  >
                    <option value="">Select Charity Type</option>
                    {charityCategories.map((category, i) => (
                      <option key={i} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors[`category${index}`] && <div className="error-message">{errors[`category${index}`]}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor={`charity-percentage-${index}`}>Percentage (%)</label>
                  <input
                    id={`charity-percentage-${index}`}
                    type="number"
                    placeholder="Percentage"
                    value={charity.percentage}
                    onChange={(e) => updateCharity(index, "percentage", e.target.value)}
                    min="0"
                    max="100"
                  />
                  {errors[`percentage${index}`] && <div className="error-message">{errors[`percentage${index}`]}</div>}
                </div>
              </div>
            </div>
          ))}

          {charities[0].category && charities[0].percentage && (
            <button
              onClick={addCharity}
              className="back-button"
              style={{ marginBottom: "20px", background: "#f0f0f0" }}
            >
              Add Another Charity
            </button>
          )}

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">
              Back
            </button>

            {!isEditing ? (
              <button
                onClick={handleSubmit}
                className="next-button"
                disabled={!charities[0].category || !charities[0].percentage}
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

export default CharitableGifts

