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
      const deliveryDate = new Date(`${req.body.deliveryDate}`);
      
      const longDeliveryDate = `${
        months[deliveryDate.getMonth()]
      } ${deliveryDate.getDate()}, ${deliveryDate.getFullYear()}`;

      const pickupDate = new Date(`${req.body.pickupDate}`);

      const longPickupDate = `${
        months[pickupDate.getMonth()]
      } ${pickupDate.getDate()}, ${pickupDate.getFullYear()}`;

      const quoteData = req.body;

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
        subject: "Reliable Portable: Quote", // Subject line
        text: ``, // plain text body
        html: ` <div>
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
            <h4>Zip Code:</h4> <p>${quoteData.zip}</p>
            <h4>Instructions:</h4><p>${quoteData.hint}</p>
          </div>
        `,
      });
      await res.status(200).json({ status: "Success" });
    } catch (err) {
      res.send(err);
    }
  }
}
