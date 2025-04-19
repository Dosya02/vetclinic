const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendMail = async (email, code) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    console.log('Access Token:', accessToken?.token); // ✅ Добавь отладку
    console.log('OAuth user:', process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `"Vet Clinic" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Код подтверждения регистрации',
      html: `
        <div style="font-family: sans-serif; font-size: 16px;">
          <p>Здравствуйте!</p>
          <p>Ваш код подтверждения: <strong>${code}</strong></p>
          <p>Если вы не запрашивали код, просто проигнорируйте это письмо.</p>
          <br>
          <p>С уважением,<br>Команда Добрый Доктор Айболит</p>
        </div>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено! Ответ от сервера:', info.response);
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
  }
};

module.exports = sendMail;
