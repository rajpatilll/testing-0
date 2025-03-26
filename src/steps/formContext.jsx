"use client"

import { createContext, useContext, useState } from "react"

const FormContext = createContext()

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    basicDetails: {},
    basics: {},
    childrenGuardianship: {},
    assets: {},
    charitableGifts: {},
    beneficiary: {},
    takersLastResort: "",
    gifts: [],
    beneficiaries: [],
    funeral: {},
    executor: {},
  })

  const updateFormData = (section, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: Array.isArray(data) ? [...data] : { ...prevData[section], ...data },
    }))
  }

  const resetFormData = () => {
    setFormData({
      basicDetails: {},
      basics: {},
      childrenGuardianship: {},
      assets: {},
      charitableGifts: {},
      beneficiary: {},
      takersLastResort: "",
      gifts: [],
      beneficiaries: [],
      funeral: {},
      executor: {},
    })
  }

  return <FormContext.Provider value={{ formData, updateFormData, resetFormData }}>{children}</FormContext.Provider>
}

export const useFormContext = () => useContext(FormContext)

