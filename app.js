var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var app = express();

var routes = require('./routes');
var logger = require("mo/log/index");



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger.connectLogger);

app.use(errorHandler({log: function(err, str, req){
    logger.logger("dev-error").error(str);
}}));

routes(app);
module.exports = app;