const VerificationCode = require('../models/VerificationCode');
const sendMail = require('../services/mailService');

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString(); // 6-значный код

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email обязателен' });

  const code = generateCode();

  try {
    await VerificationCode.create({ email, code });
    await sendMail(email, code);
    res.json({ message: 'Код отправлен на вашу почту' });
  } catch (err) {
    console.error('Ошибка:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
