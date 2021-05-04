const nodemailer = require("nodemailer");

export default async function quickQuoteHandler (req, res){

  const {
    query: { id, name },
    method,
  } = req

  if (method == 'POST') {
    try{
        const promptQuoteData = req.body
        const productsArray = promptQuoteData.products
        const products = productsArray.map(element => element.label)
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
          ` 
            <div><h4>From:</h4> <p>${promptQuoteData.fullName}</p></div>
            <div><h4>Email:</h4> <p>${promptQuoteData.email}</p></div>
            <div><h4>Phone:</h4> <p>${promptQuoteData.phone}</p></div>
            <div><h4>Zip Code:</h4> <p>${promptQuoteData.zip}</p></div>
            <div><h4>Products:</h4> <p>${products}</p></div>
            <div><h4>Delivery Date:</h4> <p>${promptQuoteData.deliveryDate}</p></div>
            <div><h4>Pickup Date:</h4> <p>${promptQuoteData.pickupDate}</p></div>
            <div><h4>Instructions:</h4> <p>${promptQuoteData.instructions}</p></div>
          `, // html body
          })
      await res.status(200).json({ status: 'Success' })
    }
    catch(err){
      res.send(err)
    }  

  }
}
