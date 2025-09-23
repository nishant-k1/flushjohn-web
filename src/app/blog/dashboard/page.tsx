import React from "react";
import type { Metadata } from "next";
import { websiteURL } from "@/constants";
import dynamic from "next/dynamic";

const SEOGuidelines = dynamic(() => import("@/components/Blog/SEOGuidelines"));
const ContentStrategy = dynamic(() => import("@/components/Blog/ContentStrategy"));

export const metadata: Metadata = {
  title: "Blog SEO Dashboard - FlushJohn",
  description: "Generate SEO-optimized blog posts and manage content strategy for maximum lead generation.",
  robots: "noindex, nofollow", // Internal dashboard
};

const BlogDashboard = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "30px", color: "#333" }}>
        Blog SEO Dashboard
      </h1>
      
      <div style={{ 
        background: "#e8f5e8", 
        padding: "20px", 
        borderRadius: "8px", 
        marginBottom: "30px" 
      }}>
        <h2 style={{ margin: "0 0 10px 0", color: "#28a745" }}>
          🚀 Blog SEO Strategy for Lead Generation
        </h2>
        <p style={{ margin: "0", color: "#555" }}>
          Use these guidelines when creating blog posts in your CRM to maximize SEO impact and lead generation. 
          Each blog post can generate 2-5 leads per month when properly optimized.
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          SEO Guidelines for CRM Blog Posts
        </h2>
        <SEOGuidelines />
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          Content Strategy & Ideas
        </h2>
        <ContentStrategy />
      </div>

      <div style={{ 
        background: "#f8f9fa", 
        padding: "30px", 
        borderRadius: "10px",
        marginBottom: "30px"
      }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          Blog SEO Best Practices
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "20px" 
        }}>
          <div style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "var(--primary-bg-color)" }}>
              Title Optimization
            </h3>
            <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "0.9em" }}>
              <li>Include primary keyword</li>
              <li>Keep under 60 characters</li>
              <li>Use power words (Guide, Tips, Complete)</li>
              <li>Include location if relevant</li>
              <li>Make it click-worthy</li>
            </ul>
          </div>

          <div style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "var(--primary-bg-color)" }}>
              Content Structure
            </h3>
            <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "0.9em" }}>
              <li>1000+ words minimum</li>
              <li>Use H2, H3 headings</li>
              <li>Include bullet points</li>
              <li>Add FAQ section</li>
              <li>Include local information</li>
            </ul>
          </div>

          <div style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "var(--primary-bg-color)" }}>
              Internal Linking
            </h3>
            <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "0.9em" }}>
              <li>Link to city pages</li>
              <li>Link to service pages</li>
              <li>Link to related posts</li>
              <li>Use descriptive anchor text</li>
              <li>Include 3-5 internal links</li>
            </ul>
          </div>

          <div style={{ 
            background: "white", 
            padding: "20px", 
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "var(--primary-bg-color)" }}>
              Call-to-Actions
            </h3>
            <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "0.9em" }}>
              <li>Include quote CTA</li>
              <li>Add phone number</li>
              <li>Link to contact page</li>
              <li>Use action words</li>
              <li>Place CTAs strategically</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ 
        background: "#d1ecf1", 
        padding: "30px", 
        borderRadius: "10px",
        marginBottom: "30px"
      }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          Content Calendar Template
        </h2>
        
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "15px" 
        }}>
          {[
            { month: "January", theme: "New Year Planning", focus: "Resolution events" },
            { month: "February", theme: "Valentine's Events", focus: "Wedding planning" },
            { month: "March", theme: "Spring Construction", focus: "Outdoor projects" },
            { month: "April", theme: "Easter Events", focus: "Religious celebrations" },
            { month: "May", theme: "Wedding Season", focus: "Wedding planning" },
            { month: "June", theme: "Summer Festivals", focus: "Outdoor events" },
            { month: "July", theme: "Independence Day", focus: "Patriotic events" },
            { month: "August", theme: "Back-to-School", focus: "School events" },
            { month: "September", theme: "Fall Construction", focus: "Construction projects" },
            { month: "October", theme: "Halloween Events", focus: "Spooky celebrations" },
            { month: "November", theme: "Thanksgiving", focus: "Family gatherings" },
            { month: "December", theme: "Holiday Parties", focus: "Christmas events" }
          ].map((month, index) => (
            <div
              key={index}
              style={{
                background: "white",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
            >
              <h4 style={{ 
                margin: "0 0 8px 0", 
                color: "var(--primary-bg-color)",
                fontSize: "1.1em"
              }}>
                {month.month}
              </h4>
              <p style={{ 
                margin: "0 0 5px 0", 
                fontSize: "0.9em", 
                fontWeight: "bold",
                color: "#333"
              }}>
                {month.theme}
              </p>
              <p style={{ 
                margin: "0", 
                fontSize: "0.8em", 
                color: "#666"
              }}>
                {month.focus}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        background: "#fff3cd", 
        padding: "30px", 
        borderRadius: "10px",
        textAlign: "center"
      }}>
        <h2 style={{ marginBottom: "15px", color: "#333" }}>
          Ready to Start Blogging?
        </h2>
        <p style={{ margin: "0 0 20px 0", color: "#555" }}>
          Use the blog post generator above to create your first SEO-optimized post, 
          or follow the content strategy to plan your monthly blog calendar.
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="/blog"
            style={{
              background: "var(--primary-bg-color)",
              color: "white",
              padding: "12px 25px",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold"
            }}
          >
            View All Blog Posts
          </a>
          <a
            href="/quote"
            style={{
              background: "#28a745",
              color: "white",
              padding: "12px 25px",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold"
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
