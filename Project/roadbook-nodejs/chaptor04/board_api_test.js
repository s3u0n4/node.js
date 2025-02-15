const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

app.set('port', 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/bord_api_test.html');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'));
});
