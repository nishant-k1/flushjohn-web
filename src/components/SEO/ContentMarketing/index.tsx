"use client";
import React from "react";
import Link from "next/link";

interface ContentMarketingProps {
  city?: string;
  state?: string;
}

const ContentMarketing = ({ city, state }: ContentMarketingProps) => {
  const contentTopics = [
    {
      title: "Porta Potty Rental Guide for Construction Sites",
      description:
        "Everything you need to know about porta potty rentals for construction projects",
      url: "/blog/construction-porta-potty-guide",
      category: "Construction",
    },
    {
      title: "Wedding Porta Potty Planning: Complete Guide",
      description: "How to plan portable toilet rentals for your wedding day",
      url: "/blog/wedding-porta-potty-planning",
      category: "Events",
    },
    {
      title: "Event Sanitation: Porta Potty Best Practices",
      description:
        "Professional tips for event porta potty rental and management",
      url: "/blog/event-sanitation-best-practices",
      category: "Events",
    },
    {
      title: "Porta Potty Maintenance and Cleaning Tips",
      description: "Keep your portable toilets clean and functional",
      url: "/blog/porta-potty-maintenance-tips",
      category: "Maintenance",
    },
  ];

  const localContentTopics = city
    ? [
        {
          title: `Porta Potty Rentals for ${city} Events`,
          description: `Complete guide to portable toilet rentals for events in ${city}, ${state}`,
          url: `/blog/porta-potty-rentals-${city}-events`,
          category: "Local Events",
        },
        {
          title: `${city} Construction Site Porta Potty Solutions`,
          description: `Professional porta potty services for construction sites in ${city}`,
          url: `/blog/construction-porta-potty-${city}`,
          category: "Local Construction",
        },
        {
          title: `Best Porta Potty Rental Companies in ${city}`,
          description: `Compare porta potty rental services in ${city}, ${state}`,
          url: `/blog/best-porta-potty-rental-${city}`,
          category: "Local Guide",
        },
      ]
    : [];

  const allTopics = [...contentTopics, ...localContentTopics];

  return (
    <div
      style={{
        marginTop: "3rem",
        padding: "30px",
        background: "var(--bg-primary)",
        borderRadius: "0",
        border: "1px solid var(--border-color, rgba(255, 255, 255, 0.1))",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
        {city
          ? `Porta Potty Rental Resources for ${city}`
          : "Porta Potty Rental Resources"}
      </h2>
      <p style={{ marginBottom: "30px", color: "var(--text-secondary)" }}>
        Get expert insights and tips on porta potty rentals, event planning, and
        construction site sanitation.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {allTopics.map((topic, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              background: "var(--bg-secondary, rgba(255, 255, 255, 0.05))",
              borderRadius: "0",
              border: "1px solid var(--border-color, rgba(255, 255, 255, 0.1))",
              transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
              e.currentTarget.style.background = "var(--bg-secondary, rgba(255, 255, 255, 0.1))";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "var(--bg-secondary, rgba(255, 255, 255, 0.05))";
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "4px 8px",
                background: "var(--primary-bg-color)",
                color: "white",
                borderRadius: "4px",
                fontSize: "0.8em",
                marginBottom: "10px",
              }}
            >
              {topic.category}
            </div>
            <h3
              style={{
                margin: "0 0 10px 0",
                fontSize: "1.1em",
                color: "var(--text-primary)",
              }}
            >
              {topic.title}
            </h3>
            <p
              style={{
                margin: "0 0 15px 0",
                fontSize: "0.9em",
                color: "var(--text-secondary)",
              }}
            >
              {topic.description}
            </p>
            <Link
              href={topic.url}
              style={{
                color: "var(--primary-bg-color)",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "0.9em",
              }}
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          padding: "20px",
          background: "var(--bg-secondary, rgba(255, 255, 255, 0.05))",
          borderRadius: "0",
          border: "1px solid var(--border-color, rgba(255, 255, 255, 0.1))",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "var(--text-primary)" }}>
          Need Help Planning Your Event?
        </h3>
        <p style={{ margin: "0 0 20px 0", color: "var(--text-secondary)" }}>
          Our experts can help you choose the right porta potty solution for
          your needs.
        </p>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/quote"
            style={{
              background: "var(--primary-bg-color)",
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Get Free Quote
          </Link>
          <Link
            href="/contact"
            style={{
              background: "var(--primary)",
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentMarketing;
