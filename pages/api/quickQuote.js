<<<<<<< HEAD
const nodemailer = require("nodemailer");

export default async function quoteHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;

  if (method == "POST") {
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

      const quickQuoteData = req.body;
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
        subject: "Reliable Portable: Quick Quote", // Subject line
        text: ``, // plain text body
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
        `, // html body
      });
      await res.status(200).json({ status: "Success" });
    } catch (err) {
      res.send(err);
    }
  }
}
=======
const nodemailer = require("nodemailer");

export default async function quoteHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req;

  if (method == "POST") {
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

      const quickQuoteData = req.body;
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
        subject: "Reliable Portable: Quick Quote", // Subject line
        text: ``, // plain text body
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
        `, // html body
      });
      await res.status(200).json({ status: "Success" });
    } catch (err) {
      res.send(err);
    }
  }
}
>>>>>>> 0436cd482dfd2902c5e8d4bd0ab5e8b22d9c8b37
