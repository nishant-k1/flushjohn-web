const nodemailer = require("nodemailer");

export default async function quoteHandler (req, res){

  const {
    query: { id, name },
    method,
  } = req

  if (method == 'POST') {
    try{
        const quoteData = req.body
        const transporter = await nodemailer.createTransport({
          host: "smtp.zoho.in",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
          },
          tls:{rejectUnauthorized: false}
        });
            
      const info = await transporter.sendMail({
          from: `Rent A Porta<${process.env.EMAIL_ID}>`, // sender address
          to: `Rent A Porta<${process.env.EMAIL_ID}>`, // list of receivers
          subject: "Rent A Porta: Quick Quote", // Subject line
          text: ``, // plain text body
          html: 
          ` <div>
              <h4>Requirements</h4>
              <p>Standard Portable Restroom: ${quoteData.SPR}</p>
              <p>Deluxe Flushable Restroom: ${quoteData.DFR}</p>
              <p>ADA Portable Restroom: ${quoteData.ACR}</p>
              <p>Hand Wash Sink Station: ${quoteData.HWS}</p>
            </div>
            <div>
              <h4>Name:</h4><p>${quoteData.fName} ${quoteData.lName}</p>
              <h4>Company Name:</h4><p>${quoteData.cName}</p>
              <h4>Email:</h4><p>${quoteData.email}</p>
              <h4>Phone:</h4><p>${quoteData.phone}</p>
            </div>
            <div>
              <h4>Delivery Date:</h4><p>${quoteData.deliveryDate}</p>
              <h4>Pickup Date:</h4><p>${quoteData.pickupDate}</p>
              <h4>Street Address:</h4><p>${quoteData.city}</p>
              <h4>City:</h4> <p>${quoteData.zip}</p>
              <h4>State:</h4> <p>${quoteData.state}</p>
              <h4>Zip Code:</h4> <p>${quoteData.zip}</p>
            </div>
            <div>
              <h4>Instructions:</h4><p>${quoteData.hint}</p>
              <h4>Onsite Person Name:</h4><p>${quoteData.onsite}</p>
              <h4>Onsite Person Phone:</h4><p>${quoteData.onsitePhone}</p>
            </div>
          `
      })
      res.status(200).json({ status: 'Success' })
    }
    catch(err){
      res.send(err)
    }  

  }
}
