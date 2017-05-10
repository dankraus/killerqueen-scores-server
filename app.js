//brew install imagemagick
//brew install graphicsmagick

appRoot = __dirname;

var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var router = require('./routes/index')(app);

app.listen(3000, function () {
  console.log('Killer Queen Scores - listening on port 3000!');
})