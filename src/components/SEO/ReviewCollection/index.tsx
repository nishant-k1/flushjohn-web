"use client";
import React, { useState } from "react";
import SuccessModal from "@/components/SuccessModal";
import ErrorModal from "@/components/ErrorModal";

interface ReviewCollectionProps {
  city?: string;
  state?: string;
}

const ReviewCollection = ({ city, state }: ReviewCollectionProps) => {
  const [showForm, setShowForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    review: "",
    city: city || "",
    state: state || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // API call will be implemented when backend endpoint is ready
      setShowSuccessModal(true);
      setFormData({
        name: "",
        email: "",
        rating: 5,
        review: "",
        city: city || "",
        state: state || "",
      });
      setShowForm(false);
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value,
    }));
  };

  return (
    <div
      style={{
        marginTop: "3rem",
        padding: "30px",
        background: "var(--bg-primary)",
        borderRadius: "0",
        border: "1px solid var(--white-alpha-10)",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
        Share Your Experience
      </h2>
      <p
        style={{
          marginBottom: "30px",
          color: "var(--text-primary)",
          opacity: 0.95,
        }}
      >
        {city
          ? `Help others in ${city}, ${state} by sharing your experience with FlushJohn porta potty rentals.`
          : "Help others by sharing your experience with FlushJohn porta potty rentals."}
      </p>

      {!showForm ? (
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: "var(--primary-bg-color)",
              color: "var(--text-inverse)",
              padding: "15px 30px",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1em",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "var(--primary-light)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "var(--primary-bg-color)";
            }}
          >
            Write a Review
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "var(--text-primary)",
              }}
            >
              Your Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid var(--white-alpha-20)",
                borderRadius: "5px",
                fontSize: "1em",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "var(--text-primary)",
              }}
            >
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid var(--white-alpha-20)",
                borderRadius: "5px",
                fontSize: "1em",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "var(--text-primary)",
              }}
            >
              Rating *
            </label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid var(--white-alpha-20)",
                borderRadius: "5px",
                fontSize: "1em",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            >
              <option value={5}>Excellent (5 stars)</option>
              <option value={4}>Very Good (4 stars)</option>
              <option value={3}>Good (3 stars)</option>
              <option value={2}>Fair (2 stars)</option>
              <option value={1}>Poor (1 star)</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
                color: "var(--text-primary)",
              }}
            >
              Your Review *
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Tell us about your experience with our porta potty rental service..."
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid var(--white-alpha-20)",
                borderRadius: "5px",
                fontSize: "1em",
                resize: "vertical",
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div
            style={{ display: "flex", gap: "15px", justifyContent: "center" }}
          >
            <button
              type="submit"
              style={{
                background: "var(--primary-bg-color)",
                color: "var(--text-inverse)",
                padding: "12px 25px",
                border: "none",
                borderRadius: "5px",
                fontSize: "1em",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Submit Review
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                background: "var(--neutral-500)",
                color: "var(--text-inverse)",
                padding: "12px 25px",
                border: "none",
                borderRadius: "5px",
                fontSize: "1em",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "var(--white-alpha-05)",
          borderRadius: "0",
          border: "1px solid var(--white-alpha-10)",
        }}
      >
        <h3 style={{ margin: "0 0 15px 0", color: "var(--text-primary)" }}>
          Why Reviews Matter
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          <div>
            <h4
              style={{ margin: "0 0 5px 0", color: "var(--text-primary)" }}
            >
              Help Others
            </h4>
            <p
              style={{
                margin: "0",
                fontSize: "0.9em",
                color: "var(--text-primary)",
                opacity: 0.9,
              }}
            >
              Your review helps other customers make informed decisions
            </p>
          </div>
          <div>
            <h4
              style={{ margin: "0 0 5px 0", color: "var(--text-primary)" }}
            >
              Improve Service
            </h4>
            <p
              style={{
                margin: "0",
                fontSize: "0.9em",
                color: "var(--text-primary)",
                opacity: 0.9,
              }}
            >
              We use feedback to continuously improve our services
            </p>
          </div>
          <div>
            <h4
              style={{ margin: "0 0 5px 0", color: "var(--text-primary)" }}
            >
              Build Trust
            </h4>
            <p
              style={{
                margin: "0",
                fontSize: "0.9em",
                color: "var(--text-primary)",
                opacity: 0.9,
              }}
            >
              Honest reviews build trust in our porta potty rental services
            </p>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Thank You!"
        message="Thank you for your review! We appreciate your feedback."
        submessage="Your review helps us improve our services."
      />
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Submission Failed"
        message="Failed to submit review. Please try again."
        submessage="If the problem persists, please contact our support team."
      />
    </div>
  );
};

export default ReviewCollection;
