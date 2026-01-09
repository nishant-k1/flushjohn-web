import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { escapeHtml, sanitizeEmailData } from "@/utils/emailSanitizer";

export async function POST(req: NextRequest) {
  try {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const quoteData = await req.json();

    // Validate required fields
    if (!quoteData.deliveryDate || !quoteData.pickupDate) {
      return NextResponse.json(
        { 
          success: false,
          error: "Validation failed",
          message: "Missing required fields: deliveryDate, pickupDate" 
        },
        { status: 400 }
      );
    }

    // Validate and parse dates safely
    const deliveryDateObj = new Date(quoteData.deliveryDate);
    const pickupDateObj = new Date(quoteData.pickupDate);

    if (isNaN(deliveryDateObj.getTime()) || isNaN(pickupDateObj.getTime())) {
      return NextResponse.json(
        { 
          success: false,
          error: "Validation failed",
          message: "Invalid date format for deliveryDate or pickupDate" 
        },
        { status: 400 }
      );
    }

    const deliveryMonthIndex = deliveryDateObj.getMonth();
    const pickupMonthIndex = pickupDateObj.getMonth();

    if (deliveryMonthIndex < 0 || deliveryMonthIndex >= months.length || 
        pickupMonthIndex < 0 || pickupMonthIndex >= months.length) {
      return NextResponse.json(
        { 
          success: false,
          error: "Validation failed",
          message: "Invalid date values" 
        },
        { status: 400 }
      );
    }

    const longDeliveryDate = `${months[deliveryMonthIndex]} ${deliveryDateObj.getDate()}, ${deliveryDateObj.getFullYear()}`;
    const longPickupDate = `${months[pickupMonthIndex]} ${pickupDateObj.getDate()}, ${pickupDateObj.getFullYear()}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true, // true for port 465 (SSL)
      auth: {
        user: process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID, // Zoho email ID from environment variables
        pass: process.env.FLUSH_JOHN_EMAIL_PASSWORD, // Zoho email password from environment variables
      },
      tls: { rejectUnauthorized: false }, // Allows non-strict SSL certificates
    });

    // Sanitize all user input to prevent XSS
    const sanitized = sanitizeEmailData(quoteData);

    await transporter.sendMail({
      from: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // Sender address
      to: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // Receiver address
      subject: "Flush John: Quote", // Subject of the email
      html: `
        <div>
          <h4>Requirements</h4>
          <p>Standard Portable Restroom: ${sanitized.SPR || ""}</p>
          <p>Deluxe Flushable Restroom: ${sanitized.DFR || ""}</p>
          <p>ADA Portable Restroom: ${sanitized.ACR || ""}</p>
          <p>Hand Wash Station: ${sanitized.HWS || ""}</p>
        </div>
        <div>
          <h4>Name:</h4><p>${sanitized.fName || ""} ${sanitized.lName || ""}</p>
          <h4>Company Name:</h4><p>${sanitized.cName || ""}</p>
          <h4>Email:</h4><p>${sanitized.email || ""}</p>
          <h4>Phone:</h4><p>${sanitized.phone || ""}</p>
        </div>
        <div>
          <h4>Delivery Date:</h4><p>${escapeHtml(longDeliveryDate)}</p>
          <h4>Pickup Date:</h4><p>${escapeHtml(longPickupDate)}</p>
          <h4>Zip Code:</h4><p>${sanitized.zip || ""}</p>
          <h4>Instructions:</h4><p>${sanitized.hint || ""}</p>
        </div>
      `, // HTML email body - all values sanitized
    });

    return NextResponse.json({ success: true, status: "Success" }, { status: 200 });
  } catch (err) {
    // Log error with details for debugging
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    const errorStack = err instanceof Error ? err.stack : undefined;
    
    console.error("Quote email error:", {
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
