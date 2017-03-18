/**
 * Created by yulucui on 17/3/7.
 */
var thrift = require('thrift');
var Exception = require('./gen-nodejs/Exception_types');
var model = require('./gen-nodejs/ESmodel_types');
var SearchDataService = require('./gen-nodejs/SearchData');



// var transport = thrift.TBufferedTransport();
// var protocol = thrift.TBinaryProtocol();
var TFramedTransport = require('thrift/lib/nodejs/lib/thrift/transport').TFramedTransport;
var TBinaryProtocol = require('thrift/lib/nodejs/lib/thrift/protocol').TBinaryProtocol;

var connection = thrift.createConnection(
    '10.0.1.81',
    6060,
    {
        transport : TFramedTransport,
        protocol : TBinaryProtocol
    }
);

// var serviceProtocol = thrift.createMultiplexServer(connection,RDictTableService);
var multiplexer = new thrift.Multiplexer();
var client =  multiplexer.createClient("com.aleiye.client.service.search.SearchData",SearchDataService,connection);
// var client = thrift.createClient(RDictTableService,connection);
var qm = new model.TQueryModel();
qm.queryString = 'A_source:A_db_yancao_SC_CIG_INFO';
qm.a_from = 1483200000000;
qm.a_to = 1488297600000;
client.query(qm,function (err,res) {
    console.log(res);
});
// client.getAll
// client.sayHello('yancao-cs','*:*','',function(err,result){
//     if(err){
//         console.log(err);
//         return ;
//     }
//     console.log(result);
// });

// var connection = thrift.createConnection("10.0.1.81", 6060, {
//     transport : TFramedTransport,
//     protocol : TJSONProtocol,
// });
//
// var client = thrift.createClient(RDictTableService,connection);
//
// client.getDictById(1,false,function(err,result){
//     if(err){
//         console.log(err);
//         return ;
//     }
//     console.log(result);
// });