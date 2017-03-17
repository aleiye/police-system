var express = require('express');
var router = express.Router();
var server = require('../service/search/Searcher');
var model = require('../service/search/gen-nodejs/ESmodel_types');
var signDao = require('../service/mongo/SignDao');
/* GET users listing. */
router.get('/query', function(req, res, next) {
  var qm = new model.TQueryModel();
  qm.queryString = req.param('queryString');
  if(req.param('a_from') && req.param('a_to')){
    qm.a_from = parseInt(req.param('a_from'));
    qm.a_to = parseInt(req.param('a_to'));
  }
  qm.pageSize = req.param('pageSize');
  qm.pageNum = req.param('pageNum');
  if(qm.queryString.indexOf('|')<0){
    server.query(qm,function (data) {
      //排序
      if(data.hits){
        data.hits.sort(function (item1,item2) {
          var time1 = item1['auxiliaryFields']['A_processTime'] || 0;
          var time2 = item2['auxiliaryFields']['A_processTime'] || 0;
          return time2 - time1;
        });
      }
      res.send(data);
    });
  } else {
    server.queryReport(qm,function (data) {
      res.send(data);
    });
  }

});

router.get('/sign', function(req, res, next) {
  var page = req.param('page');
  var params = req.param('params');
  signDao.getAllSign(params,page,function(result) {
    res.send(result);
  })
});

router.get('/dosign', function(req, res, next) {
  var ids = req.param('ids') || [];
  signDao.doSign(ids,function(result) {
    res.send({result:result});
  })
});

router.get('/sign_count', function(req, res, next) {
  signDao.getAllSign({},{},function(result) {
    // res.send(callback);
    res.send({count:result.length});
  })
});
module.exports = router;
