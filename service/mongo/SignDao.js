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
        params = params || {};
        if(params.date && params.date['$gte'])
            params.date['$gte'] = parseInt(params.date['$gte']);
        if(params.date && params.date['$lte'])
            params.date['$lte'] = parseInt(params.date['$lte']);
        mongoConn(function (db) {
            var reportCollection = db.collection('msg');
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
    doSign: function (ids,callBack) {
        mongoConn(function (db) {
            var reportCollection = db.collection('msg');
            var cot = 0;
            for(var i in ids){
                var param = {_id: ObjectID(ids[i])};
                reportCollection.update(param,{$set:{status:1}},function(err,result) {
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