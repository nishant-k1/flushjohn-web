"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import { comprehensiveFaqData, faqCategories } from "../../constants/comprehensiveFaq";

const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter FAQs based on category and search
  const filteredFAQs = comprehensiveFaqData.filter((faq) => {
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <React.Fragment>
      <div className={styles.faq}>
        <div className={styles.container}>
          <Breadcrumbs path={""} />

          {/* FAQ Section */}
          <div className={styles.faqWrapper}>
            <h1>Comprehensive Porta Potty Rental FAQs</h1>
            <p style={{ fontSize: "1.1rem", marginBottom: "2rem", color: "#666" }}>
              Find detailed answers to all your questions about porta potty rentals, pricing,
              delivery, maintenance, and more. We've compiled over 50 frequently asked questions
              to help you plan your event or construction project.
            </p>

            {/* Search Bar */}
            <div style={{ marginBottom: "2rem" }}>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  fontSize: "1rem",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                  outline: "none",
                }}
              />
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ marginBottom: "1rem" }}>Browse by Category:</h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => setSelectedCategory(null)}
                  style={{
                    padding: "8px 16px",
                    border: selectedCategory === null ? "2px solid var(--primary-bg-color)" : "1px solid #ddd",
                    borderRadius: "20px",
                    background: selectedCategory === null ? "var(--primary-bg-color)" : "white",
                    color: selectedCategory === null ? "white" : "#333",
                    cursor: "pointer",
                    fontWeight: selectedCategory === null ? "bold" : "normal",
                  }}
                >
                  All Categories ({comprehensiveFaqData.length})
                </button>
                {faqCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      padding: "8px 16px",
                      border: selectedCategory === category ? "2px solid var(--primary-bg-color)" : "1px solid #ddd",
                      borderRadius: "20px",
                      background: selectedCategory === category ? "var(--primary-bg-color)" : "white",
                      color: selectedCategory === category ? "white" : "#333",
                      cursor: "pointer",
                      fontWeight: selectedCategory === category ? "bold" : "normal",
                    }}
                  >
                    {category} ({comprehensiveFaqData.filter((f) => f.category === category).length})
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Items */}
            <div>
              {selectedCategory && (
                <h2 style={{ marginBottom: "1.5rem", color: "var(--primary-bg-color)" }}>
                  {selectedCategory}
                </h2>
              )}

              {filteredFAQs.length === 0 && (
                <p style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
                  No FAQs found matching your search. Try different keywords or browse all categories.
                </p>
              )}

              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={styles.faqItem}
                  itemScope
                  itemType="https://schema.org/Question"
                  style={{ marginBottom: "1.5rem" }}
                >
                  <h3 itemProp="name" style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>
                    {faq.question}
                  </h3>
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text" style={{ lineHeight: "1.6", color: "#555" }}>
                      {faq.answer}
                    </p>
                  </div>
                  {faq.keywords && faq.keywords.length > 0 && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <small style={{ color: "#888" }}>
                        <strong>Keywords:</strong> {faq.keywords.join(", ")}
                      </small>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still Have Questions CTA */}
            <div
              style={{
                marginTop: "3rem",
                padding: "2rem",
                background: "#f8f9fa",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <h3 style={{ marginBottom: "1rem" }}>Still Have Questions?</h3>
              <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
                Can't find the answer you're looking for? Our team is here to help 24/7.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="/quote"
                  style={{
                    padding: "12px 24px",
                    background: "var(--primary-bg-color)",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Get a Quote
                </a>
                <a
                  href="/contact"
                  style={{
                    padding: "12px 24px",
                    background: "#28a745",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faq;
