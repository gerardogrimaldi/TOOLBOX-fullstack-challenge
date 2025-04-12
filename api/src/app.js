
const express = require('express');
const cors = require('cors');
const filesRoutes = require('./routes/filesRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/files', filesRoutes);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;