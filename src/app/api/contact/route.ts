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
        user: process.env.EMAIL_ID, // generated ethereal user
        pass: process.env.EMAIL_PASS, // generated ethereal password
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `Reliable Portable<${process.env.EMAIL_ID}>`, // sender address
      to: `Reliable Portable<${process.env.EMAIL_ID}>`, // receiver address
      subject: "Reliable Portable: Contact Message", // Subject line
      text: `
        From: ${emailData.firstName} ${emailData.lastName}
        Email: ${emailData.email}
        Phone: ${emailData.phone}
        Message: ${emailData.message}`, // plain text body
    });

    return NextResponse.json({ status: "Success" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
