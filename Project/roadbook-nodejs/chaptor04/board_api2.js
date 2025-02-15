const morgan = require('morgan');
const url  = require('url');
const uuidAPIkey = require('uuid-apikey');

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const key ={
  apiKey: 'PKQHG5T-YFYMZKY-MZK37NV-EGW2V4P',
  uuid: 'b4ef1817-f3fd-4fcf-a7e6-33d774382d92'
};

let boardList = [];
let numOfBoard = 0;

app.get('/', (req, res) => {
  res.send('This is API Server');
});

app.get('/board/:apikey/:type'  , (req, res) => {
  let {type, apikey} = req.params;
  const queryData = url.parse(req.url, true).query;

  if(uuidAPIkey.isAPIKey(apikey) && uuidAPIkey.check(apikey,key.uuid)) {
    if (type === 'search') {
      const keyword = queryData.keyword;
      const result = boardList.filter((e) => {
        return e.title.includes(keyword);
      })
      res.send(result);
    } else if (type === 'user') {
      const user_id = queryData.user_id;
      const result = boardList.filter((e) => {
        return e.user_id === user_id;
      });
      res.send(result);
    } else {
      res.send('Wrong URL')
    }
  }else{
    res.send('Wrong API Key')
  }
});

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'));
});