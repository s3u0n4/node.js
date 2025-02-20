const WebSocket = require('ws');

module.exports = (server) => {
  const wss = new WebSocket.Server({server});

  wss.on('connection', (ws, req) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('New client : ', ip);
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
    });
    ws.on('error', (err) => {
      console.log(err);
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clearInterval(ws.interval);
    });
    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send('Hello from server!');
      }
    }, 3000);
  });
};