const axios = require('axios');
require('dotenv').config();

const getToken = async () => {
  const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');

  const res = await axios.get(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  return res.data.access_token;
};

const stkPush = async (phone, amount) => {
  const token = await getToken();
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);

  const password = Buffer.from(
    process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
  ).toString('base64');

  const response = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: 'Ref123',
      TransactionDesc: 'E-commerce Payment',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

module.exports = stkPush;
