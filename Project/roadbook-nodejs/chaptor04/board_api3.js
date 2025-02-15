const morgan = require('morgan');
const url = require('url');
const uuidAPIkey = require('uuid-apikey');
const cors = require('cors');

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());