const express = require('express');
const app = express();
const os = require('os');
const dns = require('dns');

const getLocalIp = (req, callback) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const localhost = '::1';

  if (ip === localhost) {
    return callback('127.0.0.1');
  }

  dns.reverse(ip, (err, hostnames) => {
    if (err) {
      return callback(null);
    }

    dns.lookup(hostnames[0], (err, address) => {
      if (err) {
        return callback(null);
      }

      callback(address);
    });
  });
};

app.get('/', (req, res) => {
  getLocalIp(req, (localIp) => {
    res.send(`Tu dirección IP local es: ${localIp}`);
  });
});

app.listen(2000)