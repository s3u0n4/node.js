const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>Node.js로 서버 만들기</h1>')
  res.end('<p> 3장 http 모듈 공부중입니다 </p>');
})

  .listen(8080, () => {
    console.log('8080 포트에서 서버 연결 중..');
  });