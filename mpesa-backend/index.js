const express = require('express');
const cors = require('cors');
const stkPush = require('./stkPush');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/stkpush', async (req, res) => {
  const { phone, amount } = req.body;
  try {
    const response = await stkPush(phone, amount);
    res.json(response);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: 'STK Push failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`M-PESA backend running on port ${PORT}`);
});
