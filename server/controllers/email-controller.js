var nodemailer = require('nodemailer');

sendEmail = (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Request'
    })
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abc.123@gmail.com',
      pass: ''
    }
  });
  var mailOptions = {
    from: body.to,
    to: body.from,
    subject: 'Address Validation from API Gateway',
    html: body.message
  };
  //text: JSON.stringify(body.message)
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: `Error while sending email: ${error}`
      })
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({
        success: true,
        message: `Email sent: ${info.response}`
      })
    }
  });

}


module.exports = { sendEmail }
