const VerificationCode = require('../models/VerificationCode');
const sendMail = require('../services/mailService');

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendVerificationCode = async (req, res) => {
  console.log('Получен запрос на отправку кода для:', req.body.email);

  
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email обязателен' });

  const code = generateCode();

  try {
    console.log('Создание записи в базе данных...');
    const verification = await VerificationCode.create({ email, code });
    console.log('Запись в базе данных:', verification);

    console.log('Отправка письма...');
    await sendMail(email, code);

    res.json({ message: 'Код отправлен на вашу почту' });
  } catch (err) {
    console.error('Ошибка при отправке кода:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
  
};
