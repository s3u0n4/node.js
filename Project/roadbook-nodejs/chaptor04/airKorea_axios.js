const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/airkorea',async(req,res)=>{
  const servicekey ="자신의 서비스키";
  const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";

  let params = encodeURI('serviceKey') + '=' + servicekey;
  params += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
  params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
  params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
  params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
  params += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
  params += '&' + encodeURI('returnType') + '=' + encodeURI('json');

  const url = airUrl+params;

  try{
    const result = await axios.get(url);
    res.json(result.data);
  }catch(error){
    console.log(error);
  }
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'),'번 포트에서 서버 실행중..')
});