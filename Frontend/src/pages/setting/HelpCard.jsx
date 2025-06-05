"use client"

import { useState } from "react"
import "./HelpCard.css"
import toast, { Toaster } from "react-hot-toast";
import { AlertCircle, LifeBuoy, LoaderCircle } from "lucide-react";

const HelpCard = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Toast notification function
  const showToast = (message, type = "success") => {
    switch (type) {
      case "success":
        return toast.success(message)
      case "error":
        return toast.error(message)
      case "loading":
        return toast.loading(message)
      default:
        return toast(message)
    }
  }

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Form validation
    if (!name.trim() || !email.trim() || !description.trim()) {
      showToast("Please fill out all fields in the help form", "error")
      return
    }

    if (!validateEmail(email)) {
      showToast("Please enter a valid email address", "error")
      return
    }

    // Show loading toast and store the toast ID
    const loadingToastId = showToast("Sending your request...", "loading")
    setIsSubmitting(true)

    try {
      const webhookUrl = import.meta.env.VITE_Discord_URL;

      if (!webhookUrl) {
        throw new Error("Discord webhook URL not configured")
      }

      const payload = {
        embeds: [
          {
            title: "Help/Feedback Request",
            color: 3447003,
            fields: [
              { name: "Name", value: name, inline: false },
              { name: "Email", value: email, inline: false },
              { name: "Description", value: description },
            ],
            footer: { text: "Sent from Pulse App" },
            timestamp: new Date().toISOString(),    
          },
        ],
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Dismiss loading toast and show success
      toast.dismiss(loadingToastId)
      showToast("Your request has been submitted! I'll get back to you soon.", "success")

      // Reset form
      setName("")
      setEmail("")
      setDescription("")
    } catch (error) {
      console.error("Error sending help request:", error)
      // Dismiss loading toast and show error
      toast.dismiss(loadingToastId)
      showToast("Unable to send your help request. Please try again later.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="help-container">
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
        }}
      />

      <div className="help-card">
        <div className="help-card-header">
          <div className="help-header-title">
            <LifeBuoy className="h-5 w-5" />
            <h2>Get Help / Provide Feedback</h2>
          </div>
          <div className="card-description">
            <p>
              Hello! I'm Kunal, the developer of Pulse. If you have any questions, feedback, or need assistance
              with the app, please fill out the form below.
            </p>
            <div className="social-links">
              <span>Connect with me on:</span>
              <a
                href="https://www.linkedin.com/in/kunal-kumar-78094a258/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>

              <span className="separator">|</span>

              <a
                href="https://x.com/KK_8759"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link twitter"
                aria-label="X (Twitter)"
              >
                <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="card-content">
          <form onSubmit={handleSubmit} className="help-form">
            <div className="help-form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="help-form-input"
              />
            </div>

            <div className="help-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="help-form-input"
              />
            </div>

            <div className="help-form-group">
              <label htmlFor="description">Message</label>
              <textarea
                id="description"
                placeholder="Please describe your question, issue, or feedback in detail. The more information you provide, the better I can help you."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
                required
                className="help-form-textarea"
              />
            </div>

            <button type="submit" disabled={isSubmitting} className={`submit-button ${isSubmitting ? "loading" : ""}`}>
              {isSubmitting ? (
                <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>

            <div className="alert">
              <AlertCircle className="h-4 w-4" />
              <p>
                Your message will be sent directly to me via Discord, and I'll respond to your email as soon as
                possible.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default HelpCard
