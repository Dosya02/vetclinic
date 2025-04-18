const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.gmail_user,
    pass: process.env.gmail_pass,
  },
});

exports.sendCode = async (email, code) => {
  await transporter.sendMail({
    from: `"Vet Clinic" <${process.env.gmail_user}>`,
    to: email,
    subject: 'Ваш код подтверждения',
    text: `Код подтверждения: ${code}`,
  });
};
