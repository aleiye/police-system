/**
 * Created by yulucui on 17/3/10.
 */
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var config = require('../config/config');
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
                    ALEIYE_LOG.info('Error:' + err);
                    return ;
                }
                callBack(db);
            });
        });
    } else {
        mongoClient.connect(url,function (err,db) {
            if(err){
                ALEIYE_LOG.info('Error:' + err);
                return ;
            }
            callBack(db);
        });
    }
}
mongoConn(function(db){
    var reportCollection = db.collection('msg');
    var data = [];
    for(var i = 41;i<=60;i++){
        data.push({
            mark: '正常',
            name: '姓名',
            cardId: '12345678' + i,
            level: (i+1)%2,
            position: '活动发生地',
            police: '派出所地址',
            date: new Date('2017-1-1 00:00:00').getTime() + i * 1000 * 60 * 60 * 24,
            scheme: '方案名称',
            status: i%2
        });
    }
    reportCollection.insert(data,function(err,result) {
        if(err){
            console.info('Error:' + err);
            return ;
        }
        console.log(result.result.n);
        db.close();
    })
});
// mongoConn(function (db) {
//     var reportCollection = db.collection('msg');
//     for(var i = 2;i<=20;i++){
//         var param = {id: i};
//         reportCollection.update(param,{$set:{msg:'姓名'+i}},function(err,result) {
//             if(err){
//                 console.info('Error:' + err);
//                 return ;
//             }
//             console.log(result);
//             db.close();
//         })
//     }
// })
// mongoConn(function(db){
//     var reportCollection = db.collection('msg');
//     var param = {status:0};
//     // var param = {_id:ObjectID('58c2bbba365ffa12b347d370')};
//     reportCollection.remove(param,function(err,result) {
//         if(err){
//             console.info('Error:' + err);
//             return ;
//         }
//         console.log(result.result.n);
//         db.close();
//     })
// });
// mongoConn(function (db) {
//     var page = {skip: 0, limit: 10}
//     var params = {
//         'date': {$gte : 1484755200000}
//     }
//     mongoConn(function (db) {
//         var reportCollection = db.collection('msg');
//         reportCollection.find(params,{}).toArray(function (err,result) {
//             if(err){
//                 console.info('Error:' + err);
//                 return ;
//             }
//             console.log(result);
//             db.close();
//         });
//     })
// });