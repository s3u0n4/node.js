const morgan = require('morgan');
const request = require('request');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/naver/news', (req, res) => {
  const client_id = 'iT5PsttDSmYaslWCVNmS';
  const client_secret = 'o2CHd40KiE';
  const api_url = 'http://openapi.naver.com/v1/search/news?query=' + encodeURI('코스피');

  const option = {
  };
  const options = {
    url:api_url,
    qs:option,
    headers: {
      'X-Naver-Client-Id': client_id,
      'X-Naver-Client-Secret': client_secret
    },
  };

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let newsItem = JSON.parse(body).items;

      const newsJson = {
        title:[],
        link:[],
        description:[],
        pubDate:[]
      }

      for (let i = 0; i < newsItem.items.length; i++){
        newsJson.title.push(newsItem[i].title.replace(/(<([^>]+)>)|&quot;/ig, ""));
        newsJson.link.push(newsItem[i].link);
        newsJson.description.push(newsItem[i].description.replace(/(<([^>]+)>)|&quot;/ig, ""));
        newsJson.pubDate.push(newsItem[i].pubDate);
      }
      res.json(newsJson);
    }else{
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);
    }
  });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행 중..')
});