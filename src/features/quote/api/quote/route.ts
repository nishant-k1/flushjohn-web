import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const deliveryDate = new Date(quoteData.deliveryDate);
    const longDeliveryDate = `${
      months[deliveryDate.getMonth()]
    } ${deliveryDate.getDate()}, ${deliveryDate.getFullYear()}`;

    const pickupDate = new Date(quoteData.pickupDate);
    const longPickupDate = `${
      months[pickupDate.getMonth()]
    } ${pickupDate.getDate()}, ${pickupDate.getFullYear()}`;

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

    await transporter.sendMail({
      from: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // Sender address
      to: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // Receiver address
      subject: "Flush John: Quote", // Subject of the email
      html: `
        <div>
          <h4>Requirements</h4>
          <p>Standard Portable Restroom: ${quoteData.SPR}</p>
          <p>Deluxe Flushable Restroom: ${quoteData.DFR}</p>
          <p>ADA Portable Restroom: ${quoteData.ACR}</p>
          <p>Hand Wash Station: ${quoteData.HWS}</p>
        </div>
        <div>
          <h4>Name:</h4><p>${quoteData.fName} ${quoteData.lName}</p>
          <h4>Company Name:</h4><p>${quoteData.cName}</p>
          <h4>Email:</h4><p>${quoteData.email}</p>
          <h4>Phone:</h4><p>${quoteData.phone}</p>
        </div>
        <div>
          <h4>Delivery Date:</h4><p>${longDeliveryDate}</p>
          <h4>Pickup Date:</h4><p>${longPickupDate}</p>
          <h4>Zip Code:</h4><p>${quoteData.zip}</p>
          <h4>Instructions:</h4><p>${quoteData.hint}</p>
        </div>
      `,
    });

    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to send quote" },
      { status: 500 }
    );
  }
}
