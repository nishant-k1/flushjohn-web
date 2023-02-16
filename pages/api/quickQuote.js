const nodemailer = require("nodemailer");

export default async function quickQuoteHandler(req, res) {
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

      const promptQuoteData = req.body;

      const productsArray = promptQuoteData.products;
      const products = productsArray.map((element) => element.label);
      
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
          <div><h4>From:</h4> <p>${promptQuoteData.fullName}</p></div>
            <div><h4>Email:</h4> <p>${promptQuoteData.email}</p></div>
            <div><h4>Phone:</h4> <p>${promptQuoteData.phone}</p></div>
            <div><h4>Zip Code:</h4> <p>${promptQuoteData.zip}</p></div>
            <div><h4>Products:</h4> <p>${products}</p></div>
            <div><h4>Delivery Date:</h4><p>${longDeliveryDate}</p></div>
            <div><h4>Pickup Date:</h4><p>${longPickupDate}</p></div>
            <div><h4>Instructions:</h4> <p>${promptQuoteData.instructions}</p></div>
          `, // html body
      });
      await res.status(200).json({ status: "Success" });
    } catch (err) {
      res.send(err);
    }
  }
}
