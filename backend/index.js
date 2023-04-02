require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const connect = require('./config/db');
const authRouter = require('./routes/auth.router');
app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  return res.status(200).send({ message: 'Welcome to Cointab Backend' });
});
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`http://localhost:${8080}`);
  } catch (er) {
    console.log(`Error From ${er.message} `);
  }
});
