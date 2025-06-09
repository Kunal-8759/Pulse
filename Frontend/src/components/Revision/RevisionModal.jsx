"use client"

import { useState } from "react"
import "./RevisionModal.css"
import welcomeImage from "./images/1st.png";
import megaPhone from "./images/2nd.png";
import workSpace from "./images/3rd.png";
import reminderImage from "./images/4th.png";
import notesImage from "./images/5th.png";

const RevisionModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: "Welcome to Revision Tracker",
      description: "Let’s explore what’s coming soon in less than a minute!",
      image: welcomeImage,
      alt: "Welcome Image",
      type: "welcome",
    },
    {
      title: "Did You Know?",
      description:
        "Most students face interview rejections, even for questions they've solved before, due to poor tracking of questions and approaches. This results in inadequate revision.",
      image: megaPhone,
      alt: "Did You Know Image",
      type: "info",
    },
    {
      title: "Introducing Revision Workspace",
      description: "Your go-to place for fast, effective revision:",
      image: workSpace,
      alt: "Revision Workspace Image",
      type: "feature",
      features: [
        "Add solved or planned questions from popular coding platforms.",
        "Create custom sheets for more focused practice sessions.",
      ],
    },
    {
        title: "Set Reminders for Coding Practice",
        description:
            "Never miss a practice session! Set reminders for specific questions or algorithms directly from the platform. These reminders will sync with your Google Calendar and notify you on your chosen date and time, helping you stay consistent and organized.",
        image: reminderImage,
        alt: "Set Reminders Image",
        type: "feature",
    },
    {
      title: "Add Notes for Quick Revision",
      description: "Create strong revision material with the Enhanced Notes feature.",
      image: notesImage,
      alt: "Add Notes Image",
      type: "feature",
      features: [
        "Add multiple notes per question to capture different approaches.",
        "Create general notes to save key concepts and patterns.",
      ],
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGetStarted = () => {
    setCurrentStep(1)
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  if (!isOpen) return null

  const currentStepData = steps[currentStep]

  return (
    <div className="modal-overlay-rev" onClick={onClose}>
      <div className="modal-container-rev" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
        </div>

        <div className="modal-content-rev">
          <div className="step-content">
            <div className="step-image-container">
              <img
                src={currentStepData.image || "/placeholder.svg"}
                alt={currentStepData.title}
                className="step-image"
              />
            </div>

            <div className="step-text-content">
              <h2 className="step-title">{currentStepData.title}</h2>

              {currentStepData.type === "feature" && currentStepData.features ? (
                <>
                  <p className="step-description">{currentStepData.description}</p>
                  <ul className="step-list">
                    {currentStepData.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="step-description">{currentStepData.description}</p>
              )}
            </div>
          </div>

          <div className="navigation-buttons">
            {currentStep === 0 ? (
              <button className="btn btn-primary btn-full-width" onClick={handleGetStarted}>
                Get Started
              </button>
            ) : (
              <>
                <button className="btn btn-secondary" onClick={handlePrevious}>
                  Previous
                </button>
                <button className="btn btn-primary" onClick={currentStep === steps.length - 1 ? onClose : handleNext}>
                  {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevisionModal;
