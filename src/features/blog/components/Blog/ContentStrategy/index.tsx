"use client";
import React from "react";

interface ContentStrategyProps {
  city?: string;
  state?: string;
}

const ContentStrategy = ({ city, state }: ContentStrategyProps) => {
  const contentIdeas = [
    {
      category: "Local Events",
      ideas: [
        `Porta Potty Rental Guide for ${city} Weddings`,
        `Construction Site Sanitation in ${city}: Complete Guide`,
        `Best Porta Potty Rental Companies in ${city}`,
        `${city} Event Planning: Porta Potty Requirements`,
        `Porta Potty Rental Costs in ${city}: 2024 Guide`,
        `${city} Festival Season: Porta Potty Planning`,
        `Wedding Venues in ${city}: Porta Potty Considerations`,
        `${city} Corporate Events: Sanitation Solutions`,
      ],
    },
    {
      category: "Industry Insights",
      ideas: [
        "Porta Potty vs Portable Toilet: What's the Difference?",
        "Construction Site Porta Potty Requirements by State",
        "Event Sanitation: How Many Porta Potties Do You Need?",
        "Porta Potty Maintenance: Professional Tips",
        "ADA Compliant Porta Potties: Complete Guide",
        "Porta Potty Rental: Daily vs Weekly vs Monthly Rates",
        "Event Planning: Porta Potty Placement Best Practices",
        "Construction Safety: Porta Potty Requirements",
      ],
    },
    {
      category: "Seasonal Content",
      ideas: [
        "Summer Event Porta Potty Planning",
        "Winter Construction Site Sanitation",
        "Holiday Event Porta Potty Rental Guide",
        "Festival Season Porta Potty Planning",
        "Back-to-School Event Sanitation",
        "Holiday Party Porta Potty Solutions",
        "Summer Festival Porta Potty Guide",
        "Winter Construction Porta Potty Tips",
      ],
    },
    {
      category: "Problem-Solving",
      ideas: [
        "Porta Potty Rental: Common Mistakes to Avoid",
        "Event Sanitation: What to Do When Things Go Wrong",
        "Construction Site Porta Potty: Troubleshooting Guide",
        "Porta Potty Rental: How to Handle Emergencies",
        "Event Planning: Porta Potty Backup Plans",
        "Construction Safety: Porta Potty Emergency Procedures",
      ],
    },
  ];

  const keywordSuggestions = [
    {
      primary: `porta potty rental ${city}`,
      secondary: `portable toilet rental ${city}`,
      longTail: `construction porta potty rental ${city}`,
      local: `${city} event porta potty rental`,
    },
    {
      primary: "porta potty rental guide",
      secondary: "portable toilet rental tips",
      longTail: "construction site porta potty requirements",
      local: "event porta potty planning",
    },
    {
      primary: "porta potty rental costs",
      secondary: "portable toilet rental prices",
      longTail: "porta potty rental daily rates",
      local: "porta potty rental near me",
    },
  ];

  const contentCalendar = [
    {
      month: "January",
      theme: "New Year Event Planning",
      focus: "Resolution events, corporate planning",
    },
    {
      month: "February",
      theme: "Valentine's Day Events",
      focus: "Wedding planning, romantic events",
    },
    {
      month: "March",
      theme: "Spring Construction Season",
      focus: "Construction projects, outdoor events",
    },
    {
      month: "April",
      theme: "Easter & Spring Events",
      focus: "Religious events, spring festivals",
    },
    {
      month: "May",
      theme: "Wedding Season Prep",
      focus: "Wedding planning, graduation events",
    },
    {
      month: "June",
      theme: "Summer Festival Season",
      focus: "Outdoor festivals, summer events",
    },
    {
      month: "July",
      theme: "Independence Day Events",
      focus: "Patriotic events, summer celebrations",
    },
    {
      month: "August",
      theme: "Back-to-School Events",
      focus: "School events, fall preparation",
    },
    {
      month: "September",
      theme: "Fall Construction",
      focus: "Construction projects, fall events",
    },
    {
      month: "October",
      theme: "Halloween Events",
      focus: "Spooky events, fall festivals",
    },
    {
      month: "November",
      theme: "Thanksgiving Events",
      focus: "Family gatherings, fall celebrations",
    },
    {
      month: "December",
      theme: "Holiday Parties",
      focus: "Christmas events, year-end celebrations",
    },
  ];

  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        padding: "30px",
        borderRadius: "0",
        marginTop: "40px",
        border: "1px solid var(--white-alpha-15)",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          color: "var(--text-primary)",
          textAlign: "center",
        }}
      >
        Blog Content Strategy for Maximum SEO Impact
      </h2>

      {/* Content Ideas by Category */}
      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
          Content Ideas by Category
        </h3>
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
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                padding: "20px",
                borderRadius: "0",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 15px 0",
                  color: "var(--text-primary)",
                  fontSize: "1.2em",
                }}
              >
                {category.category}
              </h4>
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

      {/* Keyword Suggestions */}
      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
          Keyword Strategy
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "15px",
          }}
        >
          {keywordSuggestions.map((keywordSet, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                padding: "15px",
                borderRadius: "0",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "1em",
                  color: "var(--text-primary)",
                }}
              >
                Keyword Group {index + 1}
              </h4>
              <div style={{ fontSize: "0.9em", color: "var(--text-primary)" }}>
                <div style={{ marginBottom: "5px" }}>
                  <strong>Primary:</strong> {keywordSet.primary}
                </div>
                <div style={{ marginBottom: "5px" }}>
                  <strong>Secondary:</strong> {keywordSet.secondary}
                </div>
                <div style={{ marginBottom: "5px" }}>
                  <strong>Long-tail:</strong> {keywordSet.longTail}
                </div>
                <div>
                  <strong>Local:</strong> {keywordSet.local}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Calendar */}
      <div style={{ marginBottom: "40px" }}>
        <h3 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
          12-Month Content Calendar
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {contentCalendar.map((month, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                padding: "15px",
                borderRadius: "0",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <h4
                style={{
                  margin: "0 0 8px 0",
                  color: "var(--text-primary)",
                  fontSize: "1.1em",
                }}
              >
                {month.month}
              </h4>
              <p
                style={{
                  margin: "0 0 5px 0",
                  fontSize: "0.9em",
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                }}
              >
                {month.theme}
              </p>
              <p
                style={{
                  margin: "0",
                  fontSize: "0.8em",
                  color: "var(--text-primary)",
                }}
              >
                {month.focus}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SEO Best Practices */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          padding: "20px",
          borderRadius: "0",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "var(--text-primary)" }}>
          SEO Best Practices for Blog Posts
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
              style={{
                margin: "0 0 8px 0",
                fontSize: "1em",
                color: "var(--text-primary)",
              }}
            >
              Title Optimization
            </h4>
            <ul
              style={{
                margin: "0",
                paddingLeft: "20px",
                fontSize: "0.9em",
                color: "var(--text-primary)",
              }}
            >
              <li>Include primary keyword</li>
              <li>Keep under 60 characters</li>
              <li>Use power words</li>
              <li>Include location if relevant</li>
            </ul>
          </div>
          <div>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "1em",
                color: "var(--text-primary)",
              }}
            >
              Content Structure
            </h4>
            <ul
              style={{
                margin: "0",
                paddingLeft: "20px",
                fontSize: "0.9em",
                color: "var(--text-primary)",
              }}
            >
              <li>1000+ words minimum</li>
              <li>Use H2, H3 headings</li>
              <li>Include bullet points</li>
              <li>Add FAQ section</li>
            </ul>
          </div>
          <div>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "1em",
                color: "var(--text-primary)",
              }}
            >
              Internal Linking
            </h4>
            <ul
              style={{
                margin: "0",
                paddingLeft: "20px",
                fontSize: "0.9em",
                color: "var(--text-primary)",
              }}
            >
              <li>Link to city pages</li>
              <li>Link to service pages</li>
              <li>Link to related posts</li>
              <li>Use descriptive anchor text</li>
            </ul>
          </div>
          <div>
            <h4
              style={{
                margin: "0 0 8px 0",
                fontSize: "1em",
                color: "var(--text-primary)",
              }}
            >
              Call-to-Actions
            </h4>
            <ul
              style={{
                margin: "0",
                paddingLeft: "20px",
                fontSize: "0.9em",
                color: "var(--text-primary)",
              }}
            >
              <li>Include quote CTA</li>
              <li>Add phone number</li>
              <li>Link to contact page</li>
              <li>Use action words</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentStrategy;
