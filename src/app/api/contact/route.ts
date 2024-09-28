const nodemailer = require("nodemailer");
import type { NextApiRequest, NextApiResponse } from "next";

export default async function contactHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    method,
  } = req;
  if (method == "POST") {
    try {
      const emailData = req.body;
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
        to: `Reliable Portable<${process.env.EMAIL_ID}>`, // list of receivers
        subject: "Reliable Portable: Contact Message", // Subject line
        text: `
          From: ${emailData.firstName} ${emailData.lastName}
          Email: ${emailData.email}
          Phone: ${emailData.phone}
          Message: ${emailData.message}`, // plain text body
        // html: `<h1>${emailData.email}</h1>`, // html body
      });
      await res.status(200).json({ status: "Success" });
    } catch (err) {
      res.send(err);
    }
  }
}
