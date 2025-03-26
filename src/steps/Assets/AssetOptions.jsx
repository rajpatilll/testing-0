"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormContext } from "../formContext"
import freewill from "../../assets/freewill.jpg"

const AssetOptions = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false

  const assetChoices = [
    "Home",
    "Bank Accounts",
    "Investments",
    "Vehicles",
    "Life Insurance",
    "Business Interests",
    "Personal Belongings",
    "Other",
  ]

  const [selectedAssets, setSelectedAssets] = useState(formData.assets?.selectedAssets || [])

  useEffect(() => {
    updateFormData("assets", { ...formData.assets, selectedAssets })
  }, [selectedAssets])

  const toggleAsset = (asset) => {
    setSelectedAssets((prev) => (prev.includes(asset) ? prev.filter((item) => item !== asset) : [...prev, asset]))
  }

  const handleSubmit = () => {
    onNext()
  }

  const handlePrev = () => {
    navigate("/get-started/nominees/children")
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
            <div className="progress-fill" style={{ width: "48%" }}></div>
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
          <h1>What types of assets do you own?</h1>
          <p>Select all that apply.</p>

          <div className="form-group checkbox-group">
            {assetChoices.map((asset) => (
              <label key={asset} className="checkbox-option">
                <input
                  type="checkbox"
                  checked={selectedAssets.includes(asset)}
                  onChange={() => toggleAsset(asset)}
                  style={{width: "18px", height: "18px", borderRadius: "50%"}}
                />
                <span className="custom-checkbox"></span>
                <span className="checkbox-label">{asset}</span>
              </label>
            ))}
          </div>

          <div className="button-group">
            <button onClick={handlePrev} className="back-button">Back</button>
            {!isEditing && (
              <button onClick={handleSubmit} disabled={selectedAssets.length === 0} className="next-button">
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

export default AssetOptions