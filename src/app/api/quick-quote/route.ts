import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const quickQuoteData = await req.json(); // Parse the request body

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

    await transporter.sendMail({
      from: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // Sender address
      to: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // Receiver address
      subject: "Flush John: Quick Quote", // Email subject
      html: `
        <div>
          <div>
            <h4>From:</h4>
            <p>${quickQuoteData.fullName}</p>
          </div>
          <div>
            <h4>Email:</h4>
            <p>${quickQuoteData.email}</p>
          </div>
          <div>
            <h4>Phone:</h4>
            <p>${quickQuoteData.phone}</p>
          </div>
          <div>
            <h4>Zip Code:</h4>
            <p>${quickQuoteData.zip}</p>
          </div>
          <div>
            <h4>Products:</h4>
            <p>${quickQuoteData.portableUnits}</p>
          </div>
          <div>
            <h4>Delivery Date:</h4>
            <p>${quickQuoteData.deliveryDate}</p>
          </div>
          <div>
            <h4>Pickup Date:</h4>
            <p>${quickQuoteData.pickupDate}</p>
          </div>
          <div>
            <h4>Instructions:</h4>
            <p>${quickQuoteData.instructions}</p>
          </div>
        </div>
      `, // HTML email body
    });

    // Respond with a success message
    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (err) {
    console.error(err);
    // Respond with error message in case of failure
    return NextResponse.json(
      { error: "Failed to send quote" },
      { status: 500 }
    );
  }
}
