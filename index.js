const express = require('express');
const app = express();
app.set('trust proxy', true);

app.get('/', function(req, res) {
  const clientIp = req.ip;
  res.send('Tu dirección IP es: ' + clientIp);
});

app.listen(2000)