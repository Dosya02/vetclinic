const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mailService = require('../services/mailService');
const generateCode = require('../utils/generateCode');

exports.register = async (req, res) => {
  const { email } = req.body;
  const emailCode = generateCode();
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ email, emailCode });
    await user.save();

    await mailService.sendCode(email, emailCode);

    res.status(201).json({ message: 'Verification code sent to email' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyCode = async (req, res) => {
  const { email, code, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.emailCode !== code) {
      return res.status(400).json({ message: 'Invalid code' });
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.emailVerified = true;
    user.emailCode = null;
    await user.save();

    res.status(200).json({ message: 'Email verified and password set' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.emailVerified) {
      return res.status(400).json({ message: 'User not found or not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
