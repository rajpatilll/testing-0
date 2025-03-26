"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormContext } from "../formContext"
import freewill from "../../assets/freewill.jpg"

const BasicDetails = ({ onNext }) => {
  const { formData, updateFormData } = useFormContext()
  const navigate = useNavigate()
  const location = useLocation()
  const isEditing = location.state?.isEditing || false


  const [details, setDetails] = useState({
    firstName: formData.basicDetails?.firstName || "",
    lastName: formData.basicDetails?.lastName || "",
    dob: formData.basicDetails?.dob || "",
    email: formData.basicDetails?.email || "",
    phone: formData.basicDetails?.phone || "",
    address: formData.basicDetails?.address || "",
    city: formData.basicDetails?.city || "",
    state: formData.basicDetails?.state || "",
    zipcode: formData.basicDetails?.zipcode || "",
  })

  const [errors, setErrors] = useState({})


  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails({ ...details, [name]: value })

    if (errors[name]) {
      setErrors({ ...errors, [name]: null })
    }
  }

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "") 
    if (value.length > 10) value = value.slice(0, 10) 
    setDetails({ ...details, phone: value })

    if (errors.phone) {
      setErrors({ ...errors, phone: null })
    }
  }


  const validateForm = () => {
    const newErrors = {}

    if (!details.firstName.trim()) newErrors.firstName = "First name is required"
    if (!details.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!details.dob) newErrors.dob = "Date of birth is required"
    if (!details.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!details.phone) newErrors.phone = "Phone number is required"
    if (!details.address.trim()) newErrors.address = "Address is required"
    if (!details.city.trim()) newErrors.city = "City is required"
    if (!details.state.trim()) newErrors.state = "State is required"
    if (!details.zipcode.trim()) newErrors.zipcode = "Zip code is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData("basicDetails", details)
      onNext()
    }
  }

  const handlePrev = () => {
    navigate("/get-started")
  }
  const handleSave = () => {
    if (validateForm()) {
      updateFormData("basicDetails", details)
      navigate("/get-started/review")
    }
  }
  const formatPhoneForDisplay = (phone) => {
    if (!phone) return ""
    if (phone.length <= 3) return phone
    if (phone.length <= 6) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`
  }

  //States for dropdown
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];
  const unionTerritories = [
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Jammu and Kashmir",
    "Ladakh"
  ];
  
  

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
            <div className="progress-fill" style={{ width: "14%" }}></div>
          </div>
          <div className="progress-steps">
            <div className="progress-step">Get Started</div>
            <div className="progress-step active">Personal Info</div>
            <div className="progress-step">Family</div>
            <div className="progress-step">Assets</div>
            <div className="progress-step">Beneficiaries</div>
            <div className="progress-step">Executor</div>
            <div className="progress-step">Review</div>
          </div>
        </div>
      </div>

      <div className="get-started-content">
        <div className="get-started-card">
          <h1>Tell us about yourself</h1>
          <p>This information will be used to create your legal will document.</p>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name*</label>
              <input type="text" id="firstName" name="firstName" value={details.firstName} onChange={handleChange} />
              {errors.firstName && <div className="error-message">{errors.firstName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name*</label>
              <input type="text" id="lastName" name="lastName" value={details.lastName} onChange={handleChange} />
              {errors.lastName && <div className="error-message">{errors.lastName}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth*</label>
            <input type="date" id="dob" name="dob" value={details.dob} onChange={handleChange} max="2005-12-31" />
            {errors.dob && <div className="error-message">{errors.dob}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address*</label>
            <input type="email" id="email" name="email" value={details.email} onChange={handleChange} />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="(555) 555-5555"
              value={formatPhoneForDisplay(details.phone)}
              onChange={handlePhoneChange}
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address*</label>
            <input type="text" id="address" name="address" value={details.address} onChange={handleChange} />
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City*</label>
              <input type="text" id="city" name="city" value={details.city} onChange={handleChange} />
              {errors.city && <div className="error-message">{errors.city}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="state">State/Union Territory*</label>
                <select id="state" name="state" value={details.state} onChange={handleChange}>
                  <option value="">Select State/UT</option>
                  <optgroup label="States">
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Union Territories">
                    {unionTerritories.map((ut) => (
                      <option key={ut} value={ut}>
                        {ut}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.state && <div className="error-message">{errors.state}</div>}
              </div>

            <div className="form-group">
              <label htmlFor="zipcode">Zip Code*</label>
              <input type="text" id="zipcode" name="zipcode" value={details.zipcode} onChange={handleChange} />
              {errors.zipcode && <div className="error-message">{errors.zipcode}</div>}
            </div>
          </div>

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

export default BasicDetails

