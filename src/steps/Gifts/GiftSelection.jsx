"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormContext } from "../formContext"
import freewill from "../../assets/freewill.jpg"

const giftOptions = ["Real Estate", "Vehicle", "Cash", "Jewelry", "Other"]

const GiftSelection = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const [gifts, setGifts] = useState(formData?.gifts?.length > 0 ? formData.gifts : [{ type: "", description: "" }])

  const [errors, setErrors] = useState({})

  useEffect(() => {
    updateFormData("gifts", gifts)
  }, [gifts])

  const handleAddGift = () => {
    setGifts([...gifts, { type: "", description: "" }])
  }

  const handleGiftChange = (index, field, value) => {
    const updatedGifts = [...gifts]
    updatedGifts[index][field] = value
    setGifts(updatedGifts)

    if (errors[`${field}${index}`]) {
      setErrors({ ...errors, [`${field}${index}`]: null })
    }
  }


  const validateForm = () => {
    const newErrors = {}

    gifts.forEach((gift, index) => {
      if (!gift.type) {
        newErrors[`type${index}`] = "Please select a gift type"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePrev = () => {
    updateFormData("gifts", gifts)
    navigate("/get-started/residuary/takers-last-resort")
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onNext()
    }
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
          <h1>Select the gifts you'd like to leave</h1>
          <p>You can specify particular items to be given to specific people.</p>

          {gifts.map((gift, index) => (
            <div key={index} className="form-group">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor={`gift-type-${index}`}>Gift Type*</label>
                  <select
                    id={`gift-type-${index}`}
                    value={gift.type}
                    onChange={(e) => handleGiftChange(index, "type", e.target.value)}
                  >
                    <option value="">Select a gift type</option>
                    {giftOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors[`type${index}`] && <div className="error-message">{errors[`type${index}`]}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor={`gift-description-${index}`}>Description (optional)</label>
                  <input
                    id={`gift-description-${index}`}
                    type="text"
                    placeholder="Description"
                    value={gift.description}
                    onChange={(e) => handleGiftChange(index, "description", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          {gifts[0].type && (
            <button
              onClick={handleAddGift}
              className="back-button"
              style={{ marginBottom: "20px", background: "#f0f0f0" }}
            >
              Add Another Gift
            </button>
          )}

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">
              Back
            </button>

            {!isEditing ? (
              <button onClick={handleSubmit} className="next-button" disabled={gifts.some((g) => !g.type)}>
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

export default GiftSelection

