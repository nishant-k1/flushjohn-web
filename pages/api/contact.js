const nodemailer = require("nodemailer");

export default async function contactHandler (req, res){
const {
    query: { id, name },
    method,
} = req
    if (method == 'POST') {
        try{
            const emailData = req.body
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
                
                let info = await transporter.sendMail({
                    from: `Rent A Porta<${process.env.EMAIL_ID}>`, // sender address
                    to: `Rent A Porta<${process.env.EMAIL_ID}>`, // list of receivers
                    subject: "Renta A Porta: Contact Message", // Subject line
                    text: `
                    From: ${emailData.firstName} ${emailData.lastName}
                    Email: ${emailData.email}
                    Phone: ${emailData.phone}
                    Message: ${emailData.message}`, // plain text body
                    // html: `<h1>${emailData.email}</h1>`, // html body
                })

            await res.status(200).json({ status: 'Success' })
        }
        catch(err){
            res.send(err)
        }  
    }
}