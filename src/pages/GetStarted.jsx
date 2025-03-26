"use client"

import { useState, useEffect } from "react"
import { FormProvider } from "../steps/formContext"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import ProgressBar from "../components/ProgressBar"
import LoadingSpinner from "../components/LoadingSpinner"
import GettingStarted from "../steps/Basics/GettingStarted"
import BasicDetails from "../steps/Basics/BasicDetails"
import MaritalStatus from "../steps/Basics/MaritalStatus"
import ChildGuardianship from "../steps/Nominees/ChildGuardianship"
import AssetOptions from "../steps/Assets/AssetOptions"
import AssetEstimations from "../steps/Assets/AssetEstimations"
import CharitableGifts from "../steps/Residuary/CharitableGifts"
import Beneficiary from "../steps/Residuary/Beneficiary"
import TakersLastResort from "../steps/Residuary/TakersLastResort"
import GiftSelection from "../steps/Gifts/GiftSelection"
import AssignBeneficiaries from "../steps/Gifts/AssignBeneficiaries"
import FuneralPreferences from "../steps/Funeral/FuneralPreferences"
import ExecutorDetails from "../steps/Executor/ExecutorDetails"
import ReviewForm from "../steps/Review/ReviewForm"
import "../GetStarted.css"
import "../components/LoadingSpinner.css"
import "../components/ProgressBar.css"

const GetStarted = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [loading,] = useState(false)
  const [formData, setFormData] = useState({})
  const [step, setStep] = useState(1) 
  

  const updateFormData = (step, data) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }))
  }

  const stepsOrder = [
    "basics/basic-details",
    "basics/marital-status",
    "nominees/children",
    "assets/options",
    "assets/estimations",
    "residuary/charitable-gifts",
    "residuary/beneficiary",
    "residuary/takers-last-resort",
    "gifts/selection",
    "gifts/assign-beneficiaries",
    "funeral/funeral-preferences",
    "executor/details",
    "review",
  ]

  useEffect(() => {
    const currentPath = location.pathname.split("/").slice(2).join("/")
    const currentStepIndex = stepsOrder.indexOf(currentPath) + 1
    if (currentStepIndex > 0) {
      setStep(currentStepIndex)
    }
  }, [location.pathname])

  const handleNext = (nextStep) => {
    const nextStepIndex = stepsOrder.indexOf(nextStep) + 1
    if (nextStepIndex > 0) {
      setStep(nextStepIndex)
    }
    navigate(`/get-started/${nextStep}`)
  }

  return (
    <div className="form-container">
      <FormProvider>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Routes>
            <Route index element={<GettingStarted onNext={() => handleNext("basics/basic-details")} />} />
            <Route
              path="basics/basic-details"
              element={
                <BasicDetails
                  onNext={() => handleNext("basics/marital-status")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="basics/marital-status"
              element={
                <MaritalStatus
                  onNext={() => handleNext("nominees/children")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="nominees/children"
              element={
                <ChildGuardianship
                  onNext={() => handleNext("assets/options")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="assets/options"
              element={
                <AssetOptions
                  onNext={() => handleNext("assets/estimations")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="assets/estimations"
              element={
                <AssetEstimations
                  onNext={() => handleNext("residuary/charitable-gifts")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="residuary/charitable-gifts"
              element={
                <CharitableGifts
                  onNext={() => handleNext("residuary/beneficiary")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="residuary/beneficiary"
              element={
                <Beneficiary
                  onNext={() => handleNext("residuary/takers-last-resort")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="residuary/takers-last-resort"
              element={
                <TakersLastResort
                  onNext={() => handleNext("gifts/selection")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="gifts/selection"
              element={
                <GiftSelection
                  onNext={() => handleNext("gifts/assign-beneficiaries")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="gifts/assign-beneficiaries"
              element={
                <AssignBeneficiaries
                  onNext={() => handleNext("funeral/funeral-preferences")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="funeral/funeral-preferences"
              element={
                <FuneralPreferences
                  onNext={() => handleNext("executor/details")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route
              path="executor/details"
              element={
                <ExecutorDetails
                  onNext={() => handleNext("review")}
                  updateFormData={updateFormData}
                  formData={formData}
                />
              }
            />
            <Route path="review" element={<ReviewForm formData={formData} />} />
          </Routes>
        )}
      </FormProvider>
    </div>
  )
}

export default GetStarted

