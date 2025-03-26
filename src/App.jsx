import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import GetStartedForm from "./pages/GetStarted"
import { FormProvider } from "./steps/formContext"

const App = () => {
  return (
    <FormProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started/*" element={<GetStartedForm />} />
      </Routes>
    </FormProvider>
  )
}

export default App

