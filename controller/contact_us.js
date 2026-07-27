const Contact = require('../model/contact_us')
const nodemailer = require('nodemailer')

exports.addContact = async (req,res) => {
  const contact = new Contact(req.body)
  try{
    await contact.save()
    res.status(201).send(contact)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.getContact = async (req,res) => {
  try{
    const contact = await Contact.find({})
    res.status(200).send(contact)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.editContact = async (req,res) => {
  const contact = req.body
  try{
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, contact, {new: true})
    if(!updatedContact){
      return res.status(400).send(`Contact with id ${req.params.id} doesn't exist`)
    }

    await updatedContact.save()
    res.status(200).send(updatedContact)
  }catch(error){
    res.status(500).send(error.message)
  }
}

exports.deleteContact = async (req,res) => {
  try{
    const deleteContact = await Contact.findByIdAndDelete(req.params.id)
    if(!deleteContact){
      return res.status(400).send("Contact hasn't found")
    }
    res.status(200).send(deleteContact)
  }catch(error){
    res.status(500).send(error.message)
  }
}


exports.sendEmailTo21TV = async (req,res) => {  

  const {email,phone,firstName,lastName,text} = req.body
  let smtpTransport = require('nodemailer-smtp-transport');
  const handlebars = require('handlebars');
  const fs = require('fs');

  const readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
          callback(err); 
          throw err;
            
        }
        else {
          callback(null, html);
        }
    });
  };

  smtpTransport = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {        
      user: process.env.ZOHO_AUTH_USER,
      pass: process.env.ZOHO_AUTH_PASS
    }
  });
  readHTMLFile(__dirname + '/../emailTamplate/emailTamplate.html', function(err, html) {
    
    if(err){
      return res.send({msg: "Invalid path", error})
    }
    const template = handlebars.compile(html);
    const replacements = {
      lastName,
      firstName,
      email,
      phone,
      text
    };
    const htmlToSend = template(replacements);
    const mailOptions = {
      from: process.env.ZOHO_AUTH_USER,
      to: process.env.DAR21_EMAIL,
      subject: "Contact us",
      attachments: [
        {
          filename: 'email.png',
          path: __dirname +'/../public/email_img/email.png',
          cid: 'emailImg'
        },
        {
          filename: 'phone.png',
          path: __dirname +'/../public/email_img/phone.png',
          cid: 'phoneImg'
        },
      
        {
          filename: 'logo.png',
          path:  __dirname + '/../public/email_img/logo.png',
          cid: 'logoImg'
        }
      ],
      html: htmlToSend
    }; 
    
    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {        
        res.status(500).send({msg: "Email hasn't been sent", error: error.response})
      }else{
        res.status(200).send({msg: "Email has been sent", response: response.response});
      }
    }); 
  }); 

}
