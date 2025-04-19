const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

// Инициализация клиента OAuth2 с вашим refresh token
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN'; // Сохранённый refresh token

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

async function sendMail() {
  // Получаем новый access token
  const accessToken = await getAccessTokenUsingRefreshToken(REFRESH_TOKEN);
  
  // Создаём транспорт для отправки письма
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'your-email@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient@example.com',
    subject: 'Verification Code',
    text: 'Your verification code is: 123456',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено!');
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
  }
}

// Функция для получения access token с использованием refresh token
async function getAccessTokenUsingRefreshToken(refreshToken) {
  client.setCredentials({ refresh_token: refreshToken });
  const { token } = await client.getAccessToken();
  return token;
}

module.exports = { sendMail };
