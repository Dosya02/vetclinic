require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Подключение к базе данных MongoDB Atlas успешно!');
  })
  .catch((error) => {
    console.error('Ошибка при подключении к базе данных:', error);
  });


app.use(cors({
  origin: 'http://localhost:5173', // Убедитесь, что ваш фронтенд здесь
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));


app.use(express.json());
app.use('/api/auth', authRoutes);

