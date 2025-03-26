"use client"
import { useNavigate } from "react-router-dom"
import { useFormContext } from "../formContext"
import freewill from "../../assets/freewill.jpg"

const ReviewForm = () => {
  const navigate = useNavigate()
  const { formData, resetFormData } = useFormContext()

  const handleSubmit = () => {
    alert("Will Submitted Successfully! You are being redirected to the beginning")
    resetFormData()
    navigate("/get-started")
  }

  const formatDate = (dateString) => {
    if (!dateString) return "(Not Entered)"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
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
            <div className="progress-fill" style={{ width: "100%" }}></div>
          </div>
          <div className="progress-steps">
            <div className="progress-step">Get Started</div>
            <div className="progress-step">Personal Info</div>
            <div className="progress-step">Family</div>
            <div className="progress-step">Assets</div>
            <div className="progress-step">Beneficiaries</div>
            <div className="progress-step">Executor</div>
            <div className="progress-step active">Review</div>
          </div>
        </div>
      </div>

      <div className="get-started-content">
        <div className="get-started-card">
          <h1>Review Your Will</h1>
          <p>Please review all details before finalizing your will.</p>

          {/* Basics */}
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Personal Information</h2>
              <button
                onClick={() => navigate("/get-started/basics/basic-details", { state: { isEditing: true } })}
                className="back-button"
                style={{ padding: "8px 15px", margin: 0 }}
              >
                Edit
              </button>
            </div>
            <p>
              <strong>Full Name:</strong> {formData?.basicDetails?.firstName}{" "}
              {formData?.basicDetails?.lastName ?? "(Not Entered)"}
            </p>
            <p>
              <strong>Date of Birth:</strong> {formatDate(formData?.basicDetails?.dob)}
            </p>
            <p>
              <strong>Email:</strong> {formData?.basicDetails?.email || "(Not Entered)"}
            </p>
            <p>
              <strong>Phone:</strong> {formData?.basicDetails?.phone || "(Not Entered)"}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {formData?.basicDetails?.address
                ? `${formData.basicDetails.address}, ${formData.basicDetails.city}, ${formData.basicDetails.state} ${formData.basicDetails.zipcode}`
                : "(Not Entered)"}
            </p>
          </div>

          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Marital Status</h2>
              <button
                onClick={() => navigate("/get-started/basics/marital-status", { state: { isEditing: true } })}
                className="back-button"
                style={{ padding: "8px 15px", margin: 0 }}
              >
                Edit
              </button>
            </div>
            <p>
              <strong>Status:</strong> {formData?.basics?.maritalStatus || "(Not Entered)"}
            </p>
            {formData?.basics?.maritalStatus === "Married" && formData?.basics?.spouseDetails && (
              <>
                <p>
                  <strong>Spouse Name:</strong> {formData.basics.spouseDetails.firstName}{" "}
                  {formData.basics.spouseDetails.lastName}
                </p>
                <p>
                  <strong>Spouse Date of Birth:</strong> {formatDate(formData.basics.spouseDetails.dob)}
                </p>
              </>
            )}
          </div>

          {/* Nominees */}
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Children & Guardianship</h2>
              <button
                onClick={() => navigate("/get-started/nominees/children", { state: { isEditing: true } })}
                className="back-button"
                style={{ padding: "8px 15px", margin: 0 }}
              >
                Edit
              </button>
            </div>
            {formData?.childrenGuardianship?.hasMinorChildren === "yes" ? (
              <>
                <p>
                  <strong>Number of Minor Children:</strong> {formData.childrenGuardianship.numberOfChildren}
                </p>
                <p>
                  <strong>Guardian:</strong> {formData.childrenGuardianship.guardian.firstName}{" "}
                  {formData.childrenGuardianship.guardian.lastName} (
                  {formData.childrenGuardianship.guardian.relationship})
                </p>
                <p>
                  <strong>Alternate Guardian:</strong> {formData.childrenGuardianship.alternateGuardian.firstName}{" "}
                  {formData.childrenGuardianship.alternateGuardian.lastName} (
                  {formData.childrenGuardianship.alternateGuardian.relationship})
                </p>
              </>
            ) : (
              <p>No minor children</p>
            )}
          </div>

          {/* Assets */}
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Assets</h2>
              <div>
                <button
                  onClick={() => navigate("/get-started/assets/options", { state: { isEditing: true } })}
                  className="back-button"
                  style={{ padding: "8px 15px", margin: "0 5px" }}
                >
                  Edit Assets
                </button>
                <button
                  onClick={() => navigate("/get-started/assets/estimations", { state: { isEditing: true } })}
                  className="back-button"
                  style={{ padding: "8px 15px", margin: 0 }}
                >
                  Edit Value
                </button>
              </div>
            </div>
            <p>
              <strong>Estimated Value:</strong>{" "}
              {formData?.assets?.estimatedValue ? `₹${formData.assets.estimatedValue}` : "(Not Entered)"}
            </p>
            <p>
              <strong>Selected Assets:</strong>{" "}
              {formData?.assets?.selectedAssets?.length > 0
                ? formData.assets.selectedAssets.join(", ")
                : "(No Assets Selected)"}
            </p>
          </div>

          {/* Residuary Section */}
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Residuary Estate</h2>
              <div>
                <button
                  onClick={() => navigate("/get-started/residuary/charitable-gifts", { state: { isEditing: true } })}
                  className="back-button"
                  style={{ padding: "8px 15px", margin: "0 5px" }}
                >
                  Edit Charities
                </button>
                <button
                  onClick={() => navigate("/get-started/residuary/beneficiary", { state: { isEditing: true } })}
                  className="back-button"
                  style={{ padding: "8px 15px", margin: 0 }}
                >
                  Edit Beneficiaries
                </button>
              </div>
            </div>
            <p>
              <strong>Charitable Gifts:</strong>{" "}
              {formData?.charitableGifts?.charities?.length > 0
                ? formData.charitableGifts.charities
                    .map((charity) => `${charity.category} (${charity.percentage}%)`)
                    .join(", ")
                : "(No Charitable Gifts)"}
            </p>
            <p>
              <strong>Beneficiaries:</strong>{" "}
              {formData?.beneficiary?.beneficiaries?.length > 0
                ? formData.beneficiary.beneficiaries.map((b) => `${b.name} (${b.percentage}%)`).join(", ")
                : "(No Beneficiaries)"}
            </p>
          </div>

          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Taker of Last Resort</h2>
              <button
                onClick={() => navigate("/get-started/residuary/takers-last-resort", { state: { isEditing: true } })}
                className="back-button"
                style={{ padding: "8px 15px", margin: 0 }}
              >
                Edit
              </button>
            </div>
            <p>
              <strong>Who will receive the remaining assets if no one else can:</strong>{" "}
              {formData?.takersLastResort?.name ? formData.takersLastResort.name : "Not specified"}
            </p>
          </div>

          {/* Gifts Section */}
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Specific Gifts</h2>
              <button
                onClick={() => navigate("/get-started/gifts/selection", { state: { isEditing: true } })}
                className="back-button"
                style={{ padding: "8px 15px", margin: 0 }}
              >
                Edit
              </button>
            </div>
            {formData?.gifts?.length > 0 ? (
              <ul style={{ paddingLeft: "20px" }}>
                {formData.gifts.map((gift, index) => (
                  <li key={index}>
                    <strong>{gift.type}</strong>
                    {gift.description ? `: ${gift.description}` : ""}
                  </li>
                ))}
              </ul>
            ) : (
              <p>(No Specific Gifts)</p>
            )}
          </div>

          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Gift Beneficiaries</h2>
              <button
                onClick={() => navigate("/get-started/gifts/assign-beneficiaries", { state: { isEditing: true } })}
                className="back-button"
                style={{ padding: "8px 15px", margin: 0 }}
              >
                Edit
              </button>
            </div>
            {formData?.beneficiaries?.length > 0 ? (
              <ul style={{ paddingLeft: "20px" }}>
                {formData.beneficiaries.map((beneficiary, index) => (
                  <li key={index}>
                    <strong>{beneficiary.name}</strong>: {beneficiary.share}%
                  </li>
                ))}
              </ul>
            ) : (
              <p>(No Gift Beneficiaries)</p>
            )}
          </div>

          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Funeral Preferences</h2>
              <button
                onClick={() => navigate("/get-started/funeral/funeral-preferences", { state: { isEditing: true } })}
                className="back-button"
                style={{ padding: "8px 15px", margin: 0 }}
              >
                Edit
              </button>
            </div>
            <p>
              <strong>Handler:</strong>{" "}
              {formData?.funeral?.handler === "someoneElse"
                ? formData.funeral.customHandler || "(Not Specified)"
                : "The executor of my will"}
            </p>
            <p>
              <strong>Final Wish:</strong>{" "}
              {formData?.funeral?.finalWish ? formData.funeral.finalWish : "(Not Specified)"}
            </p>
          </div>

          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>Executor Details</h2>
              <button
                onClick={() => navigate("/get-started/executor/details", { state: { isEditing: true } })}
                className="back-button"
                style={{ padding: "8px 15px", margin: 0 }}
              >
                Edit
              </button>
            </div>
            <p>
              <strong>Executor:</strong>{" "}
              {formData?.executor?.firstName
                ? `${formData.executor.firstName} ${formData.executor.lastName} (${formData.executor.relationship})`
                : "(Not Specified)"}
            </p>
            <p>
              <strong>Alternate Executor:</strong>{" "}
              {formData?.executor?.altFirstName
                ? `${formData.executor.altFirstName} ${formData.executor.altLastName} (${formData.executor.altRelationship})`
                : "(Not Specified)"}
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="next-button"
            style={{ marginTop: "20px", fontSize: "18px", padding: "15px" }}
          >
            Finalize and Submit Will
          </button>
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

export default ReviewForm

