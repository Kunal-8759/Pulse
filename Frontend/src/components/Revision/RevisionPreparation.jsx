"use client"

import { useState } from "react"
import RevisionModal from "./RevisionModal"

const RevisionUnderPreparation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            color: "var(--foreground)",
            marginBottom: "2rem",
            fontSize: "2.5rem",
          }}
        >
          Revision Section
        </h1>
        <p
          style={{
            color: "var(--muted-foreground)",
            marginBottom: "2rem",
            fontSize: "var(--text-lg)",
          }}
        >
          This section is currently under preparation
        </p>
        <button
          className="btn btn-primary"
          onClick={openModal}
          style={{ fontSize: "var(--text-base)", padding: "16px 32px" }}
        >
          Learn What's Coming Soon
        </button>
      </div>

      <RevisionModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default RevisionUnderPreparation;
