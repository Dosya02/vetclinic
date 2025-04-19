require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions = {
  from: process.env.SMTP_USER,
  to: 'vetclinic0diplom@gmail.com', // временно вставь свой e-mail
  subject: 'Тестовое письмо',
  text: 'Если ты читаешь это, SMTP работает!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Ошибка:', error);
  }
  console.log('Письмо отправлено:', info.response);
});
