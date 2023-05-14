const express = require('express');
const app = express();
const os = require('os');
app.set('trust proxy', true);

const getClientIp = (req) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const localhost = '::1';
  
    if (ip === localhost) {
      return '127.0.0.1';
    }
  
    return ip;
  }
  
  const getLocalIp = () => {
    const interfaces = os.networkInterfaces();
    const addresses = [];
  
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          addresses.push(iface.address);
        }
      }
    }
  
    return addresses.length > 0 ? addresses[0] : null;
  }
  
  app.get('/', (req, res) => {
    const clientIp = getClientIp(req);
    const localIp = getLocalIp();
  
    res.send(`Tu dirección IP local es: ${localIp}, y tu dirección IP de cliente es: ${clientIp}`);
  });

app.get('/', function(req, res) {
  const clientIp = req.ip;
  res.send('Tu dirección IP es: ' + clientIp);
});

app.listen(2000)