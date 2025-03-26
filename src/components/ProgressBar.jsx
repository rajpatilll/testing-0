import "./ProgressBar.css"

const ProgressBar = ({ currentStep = 1, totalSteps = 1 }) => {
  const progressPercentage = totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0

  console.log("Current Step:", currentStep, "Total Steps:", totalSteps, "Progress:", progressPercentage)

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
      </div>
    </div>
  )
}

export default ProgressBar

