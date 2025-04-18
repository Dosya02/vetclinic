const nodemailer = require('nodemailer');
const { smtp } = require('../config/mailConfig');

const sendMail = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    });

    const mailOptions = {
      from: smtp.user,
      to: email,
      subject: 'Подтверждение регистрации',
      text: `Ваш код подтверждения: ${code}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', info.response);
  } catch (error) {
    console.log('Ошибка при отправке письма:', error);
  }
};

module.exports = sendMail;
