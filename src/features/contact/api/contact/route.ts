import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sanitizePlainText } from "@/utils/emailSanitizer";

export async function POST(req: NextRequest) {
  try {
    const emailData = await req.json();

    // Validate required fields
    if (!emailData.firstName || !emailData.lastName || !emailData.email || !emailData.phone || !emailData.message) {
      return NextResponse.json(
        { 
          success: false,
          error: "Validation failed",
          message: "Missing required fields: firstName, lastName, email, phone, message" 
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID, // generated ethereal user
        pass: process.env.FLUSH_JOHN_EMAIL_PASSWORD, // generated ethereal password
      },
      tls: { rejectUnauthorized: false },
    });

    // Sanitize all user input before including in email
    const sanitizedFirstName = sanitizePlainText(emailData.firstName);
    const sanitizedLastName = sanitizePlainText(emailData.lastName);
    const sanitizedEmail = sanitizePlainText(emailData.email);
    const sanitizedPhone = sanitizePlainText(emailData.phone);
    const sanitizedMessage = sanitizePlainText(emailData.message);

    await transporter.sendMail({
      from: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // sender address
      to: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // receiver address
      subject: "Flush John: Contact Message", // Subject line
      text: `
        From: ${sanitizedFirstName} ${sanitizedLastName}
        Email: ${sanitizedEmail}
        Phone: ${sanitizedPhone}
        Message: ${sanitizedMessage}`, // plain text body - sanitized
    });

    return NextResponse.json({ success: true, status: "Success" }, { status: 200 });
  } catch (err) {
    // Log error with details for debugging
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    const errorStack = err instanceof Error ? err.stack : undefined;
    
    console.error("Contact form email error:", {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        success: false,
        error: "Failed to send email",
        message: process.env.NODE_ENV === "development" ? errorMessage : "An error occurred while sending your message. Please try again later."
      },
      { status: 500 }
    );
  }
}
