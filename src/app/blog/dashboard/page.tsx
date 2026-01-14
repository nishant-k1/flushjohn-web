import React from "react";
import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";

const SEOGuidelines = dynamic(() =>
  import("@/features/blog/components").then((mod) => ({
    default: mod.SEOGuidelines,
  }))
);
const ContentStrategy = dynamic(() =>
  import("@/features/blog/components").then((mod) => ({
    default: mod.ContentStrategy,
  }))
);

export const metadata: Metadata = {
  title: "Blog SEO Dashboard - FlushJohn",
  description:
    "Generate SEO-optimized blog posts and manage content strategy for maximum lead generation.",
  robots: "noindex, nofollow", // Internal dashboard
};

const BlogDashboard = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "30px", color: "var(--text-primary)" }}>
        Blog SEO Dashboard
      </h1>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "20px",
          borderRadius: "0",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            margin: "0 0 10px 0",
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <TrendingUp size={24} />
          Blog SEO Strategy for Lead Generation
        </h2>
        <p style={{ margin: "0", color: "var(--text-primary)" }}>
          Use these guidelines when creating blog posts in your CRM to maximize
          SEO impact and lead generation. Each blog post can generate 2-5 leads
          per month when properly optimized.
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
          SEO Guidelines for CRM Blog Posts
        </h2>
        <SEOGuidelines />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
          Content Strategy & Ideas
        </h2>
        <ContentStrategy />
      </div>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          padding: "30px",
          borderRadius: "0",
          marginBottom: "30px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
          Blog SEO Best Practices
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              padding: "20px",
              borderRadius: "0",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "var(--text-primary)" }}>
              Title Optimization
            </h3>
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
              <li>Use power words (Guide, Tips, Complete)</li>
              <li>Include location if relevant</li>
              <li>Make it click-worthy</li>
            </ul>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              padding: "20px",
              borderRadius: "0",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "var(--text-primary)" }}>
              Content Structure
            </h3>
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
              <li>Include local information</li>
            </ul>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              padding: "20px",
              borderRadius: "0",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "var(--text-primary)" }}>
              Internal Linking
            </h3>
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
              <li>Include 3-5 internal links</li>
            </ul>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              padding: "20px",
              borderRadius: "0",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "var(--text-primary)" }}>
              Call-to-Actions
            </h3>
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
              <li>Place CTAs strategically</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          padding: "30px",
          borderRadius: "0",
          marginBottom: "30px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "var(--text-primary)" }}>
          Content Calendar Template
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
          }}
        >
          {[
            {
              month: "January",
              theme: "New Year Planning",
              focus: "Resolution events",
            },
            {
              month: "February",
              theme: "Valentine's Events",
              focus: "Wedding planning",
            },
            {
              month: "March",
              theme: "Spring Construction",
              focus: "Outdoor projects",
            },
            {
              month: "April",
              theme: "Easter Events",
              focus: "Religious celebrations",
            },
            {
              month: "May",
              theme: "Wedding Season",
              focus: "Wedding planning",
            },
            {
              month: "June",
              theme: "Summer Festivals",
              focus: "Outdoor events",
            },
            {
              month: "July",
              theme: "Independence Day",
              focus: "Patriotic events",
            },
            {
              month: "August",
              theme: "Back-to-School",
              focus: "School events",
            },
            {
              month: "September",
              theme: "Fall Construction",
              focus: "Construction projects",
            },
            {
              month: "October",
              theme: "Halloween Events",
              focus: "Spooky celebrations",
            },
            {
              month: "November",
              theme: "Thanksgiving",
              focus: "Family gatherings",
            },
            {
              month: "December",
              theme: "Holiday Parties",
              focus: "Christmas events",
            },
          ].map((month, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.95)",
              boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                padding: "15px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "0",
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

      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          padding: "30px",
          borderRadius: "0",
          textAlign: "center",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 style={{ marginBottom: "15px", color: "var(--text-primary)" }}>
          Ready to Start Blogging?
        </h2>
        <p style={{ margin: "0 0 20px 0", color: "var(--text-primary)" }}>
          Use the blog post generator above to create your first SEO-optimized
          post, or follow the content strategy to plan your monthly blog
          calendar.
        </p>
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/blog"
            style={{
              background: "var(--primary-bg-color)",
              color: "white",
              padding: "12px 25px",
              textDecoration: "none",
              borderRadius: "0",
              fontWeight: "bold",
            }}
          >
            View All Blog Posts
          </a>
          <a
            href="/quote"
            style={{
              background: "var(--primary)",
              color: "white",
              padding: "12px 25px",
              textDecoration: "none",
              borderRadius: "0",
              fontWeight: "bold",
            }}
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
