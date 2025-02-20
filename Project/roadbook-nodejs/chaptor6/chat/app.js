const http = require('http');
const express = require('express');
const app = express();

const server = http.Server(app);
const io = require('socket.io')(server);
let users = [];

server.listen(8080, ()=>{
  console.log("8080포트에서 서버 실행중");
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  let name = "";
  socket.on("has connected", (username)=>{
    name = username;
    users.push(name);
    io.emit("has connected", {username:username, userList: users});
  });
  socket.on("disconnect", () => {
    users.splice(users.indexOf(name), 1);
    io.emit("has connected", {username: name,userList: users});
  })

  socket.on("new message", (data)=>{
    io.emit("new message",  data);
  });
});