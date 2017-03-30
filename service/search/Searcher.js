/**
 * Created by yulucui on 16/8/25.
 */
var config = require('../../config/config');
var thrift = require('thrift');
var Long = require('long');
var TFramedTransport = require('thrift/lib/nodejs/lib/thrift/transport').TFramedTransport;
var TBinaryProtocol = require('thrift/lib/nodejs/lib/thrift/protocol').TBinaryProtocol;

var model = require('./gen-nodejs/ESmodel_types');
var SearchDataService = require('./gen-nodejs/SearchData');

var searcher = {
    query: function(qm,callback) {
        // var qm = new model.TQueryModel();
        // qm.queryString = 'A_source:A_db_yancao_SC_CIG_INFO';
        // qm.a_from = 1483200000000;
        // qm.a_to = 1488297600000;
        var connection = thrift.createConnection(
            config.thrift.host,
            config.thrift.port,
            {
                transport : TFramedTransport,
                protocol : TBinaryProtocol
            }
        );
        var multiplexer = new thrift.Multiplexer();
        var client =  multiplexer.createClient("com.aleiye.client.service.search.SearchData",SearchDataService,connection);
        if(!qm.queryString) return null;
        qm.isProcessTime = true;
        client.query(qm,function (err,res) {
            connection.end();
            if(err){
                console.log(err);
                return ;
            }
            res.count = Long.fromBits(res.count.buffer.readInt32BE(4, true), res.count.buffer.readInt32BE(0, true)).low;
            callback(res);
        });
    },
    queryReport: function(queryModel,callback) {

        var connection = thrift.createConnection(
            config.thrift.host,
            config.thrift.port,
            {
                transport : TFramedTransport,
                protocol : TBinaryProtocol
            }
        );
        var multiplexer = new thrift.Multiplexer();
        var client =  multiplexer.createClient("com.aleiye.client.service.search.SearchData",SearchDataService,connection);
        client.queryReport(queryModel,function (err,res) {
            connection.end();
            if(err){
                console.log(err);
                return ;
            }
            callback(res);
        });
    }
}

module.exports = searcher;