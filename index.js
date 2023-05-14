const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log(req)
  return res.send("Hola Mundo")
});

app.listen(2000)
