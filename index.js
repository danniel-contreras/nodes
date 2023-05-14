const express = require('express');
const app = express();

app.get('/', (req, res) => {
  return res.send(req)
});

app.listen(2000)
