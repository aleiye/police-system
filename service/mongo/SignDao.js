/**
 * Created by yulucui on 17/3/10.
 */
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var config = require('../../config/config');
function mongoConn(callBack) {
    var url = config.mongo.url,
        auth = config.mongo.auth,
        username = config.mongo.username,
        password = config.mongo.password;
    if(auth){
        mongoClient.connect(url,function (err,db) {
            var adminDb = db.admin();
            adminDb.authenticate(username,password,function(err,result) {
                if(err){
                    console.info('Error:' + err);
                    return ;
                }
                callBack(db);
            });
        });
    } else {
        mongoClient.connect(url,function (err,db) {
            if(err){
                console.info('Error:' + err);
                return ;
            }
            callBack(db);
        });
    }
}

module.exports = {
    getAllSign: function (params,page,callBack) {
        if(page.skip && page.limit){
            page.skip = parseInt(page.skip);
            page.limit = parseInt(page.limit);
        }
        // page.sort = 'inserttime';
        page.sort = [['inserttime','desc']];
        params = params || {};
        if(params.inserttime && params.inserttime['$gte'])
            params.inserttime['$gte'] = parseInt(params.inserttime['$gte']);
        if(params.inserttime && params.inserttime['$lte'])
            params.inserttime['$lte'] = parseInt(params.inserttime['$lte']);
        if(params['data.QHQB_T_QHQB_TLDP_ID_NAME'])
            params['data.QHQB_T_QHQB_TLDP_ID_NAME'] = new RegExp(params['data.QHQB_T_QHQB_TLDP_ID_NAME']);
        if(params['data.QHQB_T_QHQB_TLDP_ID_NO'])
            params['data.QHQB_T_QHQB_TLDP_ID_NO'] = new RegExp(params['data.QHQB_T_QHQB_TLDP_ID_NO']);  
        mongoConn(function (db) {
            var reportCollection = db.collection('matchalarm');
            reportCollection.find(params,page).toArray(function (err,result) {
                if(err){
                    console.info('Error:' + err);
                    return ;
                }
                callBack(result);
                db.close();
            });
        })
    },
    getCount: function(params,callBack){
        if(params && params.readStatus != undefined)
            params.readStatus = parseInt(params.readStatus);
        mongoConn(function (db) {
            var reportCollection = db.collection('matchalarm');
            if(params.status) params.status = parseInt(params.status);
            reportCollection.count(params,function (err,result) {
                if(err){
                    console.info('Error:' + err);
                    return ;
                }
                callBack(result);
                db.close();
            });
        })
    },
    doSign: function (ids,callBack) {
        mongoConn(function (db) {
            var reportCollection = db.collection('matchalarm');
            var cot = 0;
            for(var i in ids){
                var param = {_id: ObjectID(ids[i])};
                reportCollection.update(param,{$set:{readStatus:1}},function(err,result) {
                    if(err){
                        console.info('Error:' + err);
                        return ;
                    }
                    cot ++;
                    if(cot == ids.length)
                        callBack(cot);
                })
            }
            db.close();
        })
    }
}