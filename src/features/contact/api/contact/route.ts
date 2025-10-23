
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const emailData = await req.json();

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

    await transporter.sendMail({
      from: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // sender address
      to: `Flush John<${process.env.NEXT_PUBLIC_FLUSH_JOHN_EMAIL_ID}>`, // receiver address
      subject: "Flush John: Contact Message", // Subject line
      text: `
        From: ${emailData.firstName} ${emailData.lastName}
        Email: ${emailData.email}
        Phone: ${emailData.phone}
        Message: ${emailData.message}`, // plain text body
    });

    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (err) {

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
