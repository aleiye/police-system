var express = require('express');
var path = require('path');
var router = express.Router();
var server = require('../service/search/Searcher');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/index1.html'));
});
router.get('/search', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/search.html'));
});
router.get('/senior_search', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/senior_search.html'));
});
router.get('/news_overview', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../public/news.html'));
});
module.exports = router;
