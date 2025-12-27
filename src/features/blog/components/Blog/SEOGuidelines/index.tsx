"use client";
import React from "react";
import { Lightbulb } from "lucide-react";
import { phone } from "@/constants";

const SEOGuidelines = () => {
  const guidelines = [
    {
      category: "Title Optimization",
      items: [
        "Include primary keyword (e.g., 'porta potty rental Houston')",
        "Keep under 60 characters for better search display",
        "Use power words: Guide, Tips, Complete, Best, How to",
        "Include location if relevant (city, state)",
        "Make it click-worthy and compelling",
      ],
    },
    {
      category: "Meta Description",
      items: [
        "Write 150-160 characters with call-to-action",
        "Include primary keyword naturally",
        "Mention location if applicable",
        "Use action words: Get, Learn, Discover, Find",
        "Include phone number or quote offer",
      ],
    },
    {
      category: "Content Structure",
      items: [
        "Write 1000+ words for better SEO ranking",
        "Use H2 and H3 headings with keywords",
        "Include bullet points and numbered lists",
        "Add FAQ section with common questions",
        "Include local information and statistics",
      ],
    },
    {
      category: "Keywords Strategy",
      items: [
        "Primary: 'porta potty rental [city]'",
        "Secondary: 'portable toilet rental [city]'",
        "Long-tail: 'construction porta potty rental [city]'",
        "Local: '[city] event porta potty rental'",
        "Use keywords naturally throughout content",
      ],
    },
    {
      category: "Internal Linking",
      items: [
        "Link to city pages (/porta-potty-rental/[city])",
        "Link to service pages (/rental-products)",
        "Link to quote page (/quote)",
        "Link to contact page (/contact)",
        "Use descriptive anchor text",
      ],
    },
    {
      category: "Images & Media",
      items: [
        "Use descriptive alt text with keywords",
        "Optimize images for web (WebP format)",
        "Include location in image alt text",
        "Use relevant, high-quality images",
        "Add captions with keywords",
      ],
    },
  ];

  const contentIdeas = [
    {
      category: "Local Content Ideas",
      ideas: [
        "Porta Potty Rental Guide for [City] Weddings",
        "Construction Site Sanitation in [City]: Complete Guide",
        "Best Porta Potty Rental Companies in [City]",
        "[City] Event Planning: Porta Potty Requirements",
        "Porta Potty Rental Costs in [City]: 2024 Guide",
        "[City] Festival Season: Porta Potty Planning",
      ],
    },
    {
      category: "Industry Content Ideas",
      ideas: [
        "Porta Potty vs Portable Toilet: What's the Difference?",
        "Construction Site Porta Potty Requirements by State",
        "Event Sanitation: How Many Porta Potties Do You Need?",
        "Porta Potty Maintenance: Professional Tips",
        "ADA Compliant Porta Potties: Complete Guide",
        "Porta Potty Rental: Daily vs Weekly vs Monthly Rates",
      ],
    },
    {
      category: "Seasonal Content Ideas",
      ideas: [
        "Summer Event Porta Potty Planning",
        "Winter Construction Site Sanitation",
        "Holiday Event Porta Potty Rental Guide",
        "Festival Season Porta Potty Planning",
        "Back-to-School Event Sanitation",
        "Holiday Party Porta Potty Solutions",
      ],
    },
  ];

  const ctaExamples = [
    "Get your free porta potty rental quote today!",
    `Call ${phone.phone_number} for immediate assistance`,
    "Contact FlushJohn for professional porta potty services",
    "Request a quote for your event or construction site",
    "Get same-day delivery in [City] - call now!",
  ];

  return (
    <div
      style={{
        background: "var(--neutral-700)",
        padding: "30px",
        borderRadius: "0",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        marginBottom: "30px",
      }}
    >
      <h2 style={{ marginBottom: "30px", color: "var(--text-primary)", textAlign: "center" }}>
        SEO Guidelines for CRM Blog Posts
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {guidelines.map((category, index) => (
          <div
            key={index}
            style={{
              background: "var(--neutral-600)",
              padding: "20px",
              borderRadius: "0",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <h3
              style={{
                margin: "0 0 15px 0",
                color: "var(--text-primary)",
                fontSize: "1.2em",
              }}
            >
              {category.category}
            </h3>
            <ul style={{ margin: "0", paddingLeft: "20px" }}>
              {category.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  style={{
                    marginBottom: "8px",
                    fontSize: "0.9em",
                    color: "var(--text-primary)",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
          Content Ideas by Category
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {contentIdeas.map((category, index) => (
            <div
              key={index}
              style={{
                background: "var(--neutral-600)",
                padding: "20px",
                borderRadius: "0",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 15px 0",
                  color: "var(--text-primary)",
                  fontSize: "1.2em",
                }}
              >
                {category.category}
              </h3>
              <ul style={{ margin: "0", paddingLeft: "20px" }}>
                {category.ideas.map((idea, ideaIndex) => (
                  <li
                    key={ideaIndex}
                    style={{
                      marginBottom: "8px",
                      fontSize: "0.9em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {idea}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "var(--neutral-600)",
          padding: "20px",
          borderRadius: "0",
          marginBottom: "30px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <h3 style={{ margin: "0 0 15px 0", color: "var(--text-primary)" }}>
          Call-to-Action Examples
        </h3>
        <p style={{ margin: "0 0 15px 0", color: "var(--text-primary)" }}>
          Include these CTAs in your blog posts to drive conversions:
        </p>
        <ul style={{ margin: "0", paddingLeft: "20px" }}>
          {ctaExamples.map((cta, index) => (
            <li
              key={index}
              style={{
                marginBottom: "8px",
                fontSize: "0.9em",
                color: "var(--text-primary)",
              }}
            >
              "{cta}"
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          background: "var(--neutral-600)",
          padding: "20px",
          borderRadius: "0",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
          <Lightbulb size={20} />
          Pro Tip
        </h3>
        <p style={{ margin: "0", color: "var(--text-primary)" }}>
          When creating blog posts in your CRM, focus on local content for your
          25 target cities. Each city-specific post can generate 2-5 leads per
          month when properly optimized!
        </p>
      </div>
    </div>
  );
};

export default SEOGuidelines;
