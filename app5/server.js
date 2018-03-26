

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

require('./db');  // start db connection with config from db.js file

// Logging
const logger = require('morgan');
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
§
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:['Origin','Access-Control-Allow-Origin','Content-Type', 'Authorization','X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};


const router = require('./router');
app.options('*', cors(corsOptions));
app.use('/api', cors(corsOptions), router);


app.listen(port);
console.log('Magic happens on port ' + port);