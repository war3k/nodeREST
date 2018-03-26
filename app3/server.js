

const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;

require('./db');  // start db connection with config from db.js file

const router = require('./router');
app.use('/api', router);


app.listen(port);
console.log('Magic happens on port ' + port);