var express = require('express');
var router = express.Router();
var logger = require("mo/log/index").logger("index");
/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info("问为啥笑");
  res.render('index', { title: 'Express' });
});

module.exports = router;
