import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { escapeHtml, sanitizeEmailData } from "@/utils/emailSanitizer";

export async function POST(req: NextRequest) {
  try {
    const quickQuoteData = await req.json(); // Parse the request body

    // Validate required fields
    if (!quickQuoteData.email || !quickQuoteData.phone) {
      return NextResponse.json(
        { 
          success: false,
          error: "Validation failed",
          message: "Missing required fields: email, phone" 
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID, // Email ID from environment variables
        pass: process.env.FLUSH_JOHN_EMAIL_PASSWORD, // Email password from environment variables
      },
      tls: { rejectUnauthorized: false }, // Allows non-strict SSL
    });

    // Sanitize all user input to prevent XSS
    const sanitized = sanitizeEmailData(quickQuoteData);

    await transporter.sendMail({
      from: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // Sender address
      to: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // Receiver address
      subject: "Flush John: Quick Quote", // Email subject
      html: `
        <div>
          <div>
            <h4>From:</h4>
            <p>${sanitized.fullName || ""}</p>
          </div>
          <div>
            <h4>Email:</h4>
            <p>${sanitized.email || ""}</p>
          </div>
          <div>
            <h4>Phone:</h4>
            <p>${sanitized.phone || ""}</p>
          </div>
          <div>
            <h4>Zip Code:</h4>
            <p>${sanitized.zip || ""}</p>
          </div>
          <div>
            <h4>Products:</h4>
            <p>${sanitized.portableUnits || ""}</p>
          </div>
          <div>
            <h4>Delivery Date:</h4>
            <p>${sanitized.deliveryDate || ""}</p>
          </div>
          <div>
            <h4>Pickup Date:</h4>
            <p>${sanitized.pickupDate || ""}</p>
          </div>
          <div>
            <h4>Instructions:</h4>
            <p>${sanitized.instructions || ""}</p>
          </div>
        </div>
      `, // HTML email body - all values sanitized
    });

    return NextResponse.json({ success: true, status: "Success" }, { status: 200 });
  } catch (err) {
    // Log error with details for debugging
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    const errorStack = err instanceof Error ? err.stack : undefined;
    
    console.error("Quick quote email error:", {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        success: false,
        error: "Failed to send quote",
        message: process.env.NODE_ENV === "development" ? errorMessage : "An error occurred while sending your quote request. Please try again later."
      },
      { status: 500 }
    );
  }
}
