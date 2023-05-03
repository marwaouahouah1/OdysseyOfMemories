import nodemailer from 'nodemailer';

function sendEmail(postcardData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'votre_email@gmail.com',
      pass: 'votre_mot_de_passe'
    }
  });

  const mailOptions = {
    from: 'votre_email@gmail.com',
    to: postcardData.recipient,
    subject: 'Carte postale',
    text: `
      Expéditeur: ${postcardData.sender}
      Destinataire: ${postcardData.recipient}
      De: ${postcardData.location}
      Message: ${postcardData.message}
    `,
    attachments: [
      {
        filename: 'image.jpg',
        path: postcardData.image
      }
    ]
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email envoyé: ' + info.response);
    }
  });
}

export default sendEmail;
