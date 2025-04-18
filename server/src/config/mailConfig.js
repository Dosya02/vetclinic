module.exports = {
    smtp: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
  