const SocketIO = require('socket.io');

module.exports = (server) =>{
  const io = SocketIO(server, {path: "/socket.io"});

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(
      `new client: ${ip},socket.id: ${socket.id}`
    );
    socket.on('disconnect', () => {
      console.log(`client out: ${ip}, socket.id : ${socket.id}`);
      clearInterval(socket.interval);
    });

    socket.on("from client", (data) => {
      console.log(data);
    });
    socket.interval = setInterval(() =>{
      socket.emit("from server", "Message From Server");
    },3000);
  });
};