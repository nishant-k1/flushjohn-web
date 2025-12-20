"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  comprehensiveFaqData,
  faqCategories,
} from "../../constants/comprehensiveFaq";

const Faq = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFAQs = comprehensiveFaqData.filter((faq) => {
    const matchesCategory =
      !selectedCategory || faq.category === selectedCategory;
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
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "2rem",
                color: "var(--text-primary)",
                opacity: 0.95,
                lineHeight: "1.8",
              }}
            >
              Find detailed answers to all your questions about porta potty
              rentals, pricing, delivery, maintenance, and more. We've compiled
              over 50 frequently asked questions to help you plan your event or
              construction project.
            </p>

            {/* Search Bar */}
            <div style={{ marginBottom: "2rem" }}>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
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
                  className={`${styles.categoryButton} ${
                    selectedCategory === null ? styles.categoryButtonActive : ""
                  }`}
                >
                  All Categories ({comprehensiveFaqData.length})
                </button>
                {faqCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`${styles.categoryButton} ${
                      selectedCategory === category
                        ? styles.categoryButtonActive
                        : ""
                    }`}
                  >
                    {category} (
                    {
                      comprehensiveFaqData.filter(
                        (f) => f.category === category
                      ).length
                    }
                    )
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Items */}
            <div>
              {selectedCategory && (
                <h2 style={{ marginBottom: "1.5rem" }}>{selectedCategory}</h2>
              )}

              {filteredFAQs.length === 0 && (
                <p
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "var(--text-primary)",
                    opacity: 0.8,
                  }}
                >
                  No FAQs found matching your search. Try different keywords or
                  browse all categories.
                </p>
              )}

              {filteredFAQs.map((faq, index) => (
                <div
                  key={faq.id}
                  className={styles.faqItem}
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <h3 itemProp="name">{faq.question}</h3>
                  <div
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                  {faq.keywords && faq.keywords.length > 0 && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <small>
                        <strong>Keywords:</strong> {faq.keywords.join(", ")}
                      </small>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Still Have Questions CTA */}
            <div className={styles.ctaBox}>
              <h3>Still Have Questions?</h3>
              <p>
                Can't find the answer you're looking for? Our team is here to
                help 24/7.
              </p>
              <div className={styles.ctaButtons}>
                <a
                  href="/quote"
                  className={styles.ctaLink}
                >
                  Get a Quote
                </a>
                <a
                  href="/contact"
                  className={styles.ctaLink}
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
