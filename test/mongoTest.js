/**
 * Created by yulucui on 17/3/10.
 */
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var config = require('../config/config');
function mongoConn(callBack) {
    var url = 'mongodb://10.0.1.81:27017/alarm',
        auth = true,
        username = 'aleiye',
        password = 'cdewsxzaq321';
    // var url = config.mongo.url,
    //     auth = config.mongo.auth,
    //     username = config.mongo.username,
    //     password = config.mongo.password;
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
mongoConn(function (db) {
        var reportCollection = db.collection('matchalarm');
        var reg = new RegExp(/李/);
        reportCollection.find({'data.QHQB_T_QHQB_TLDP_ID_NAME':reg}).toArray(function (err,result) {
            if(err){
                console.info('Error:' + err);
                return ;
            }
            console.log(result);
            db.close();
        });
        // reportCollection.count({status:0},function(err,count){
        //     console.log(count);
        // });
    })
// mongoConn(function(db){
//     var reportCollection = db.collection('matchalarm');
//     var data = [{
// 	"resultModel" : {
// 		"hits" : [
// 			{
// 				"auxiliaryFieldsSize" : 8,
// 				"fieldsSize" : 26,
// 				"setAuxiliaryFields" : true,
// 				"setFields" : true,
// 				"auxiliaryFields" : {
// 					"A_koffset" : "432453",
// 					"A_timestamp" : "1428220986000",
// 					"A_userId" : "1",
// 					"A_message" : "010020131138874768,张权民,zhang quan min ,1,19820327,156,430626198203278516,01,430626,430626,湖南省平江县向家镇仙龙村276号,平江县公安局向家派出所,430626570000,430626,湖南省平江县向家镇仙龙村276号,向家派出所,湖南省平江县公安局,430626000000,20131109040518,00010000000000000000000000000000,040100000000,1,20150405063453,20131109040518,20150405160306,20170227131015,",
// 					"A_ksendTime" : "1489238693180",
// 					"A_source" : "A_db_zdrXY_T_ZZRK_QGZDRYXX",
// 					"A_kpart" : "0",
// 					"A_processTime" : "1489246321331"
// 				},
// 				"fields" : {
// 					"zdrXY_T_ZZRK_QGZDRYXX_MZ" : "01",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLBGSJ" : "20150405063453",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDXZ" : "湖南省平江县向家镇仙龙村276号",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XM" : "张权民",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCSDM" : "430626570000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDXZ" : "湖南省平江县向家镇仙龙村276号",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JG" : "430626",
// 					"zdrXY_T_ZZRK_QGZDRYXX_YXX" : "1",
// 					"zdrXY_T_ZZRK_QGZDRYXX_RKSJ" : "20150405160306",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GXDW" : "湖南省平江县公安局",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCS" : "平江县公安局向家派出所",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYXL" : "040100000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CJSJ" : "20170227131015",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDQH" : "430626",
// 					"zdrXY_T_ZZRK_QGZDRYXX_BJZDRYBH" : "010020131138874768",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYLBBJ" : "00010000000000000000000000000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XMPY" : "zhang quan min ",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GXDWJGDM" : "430626000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_SFZH" : "430626198203278516",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLXZSJ" : "20131109040518",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDPCS" : "向家派出所",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GJ" : "156",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CSRQ" : "19820327",
// 					"zdrXY_T_ZZRK_QGZDRYXX_NRBJZDRYKSJ" : "20131109040518",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDQH" : "430626",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XB" : "1"
// 				},
// 				"setType" : true,
// 				"type" : "A_db_zdrXY_T_ZZRK_QGZDRYXX"
// 			}
// 		],
// 		"setTooktime" : true,
// 		"tooktime" : "39ms",
// 		"hitsSize" : 1,
// 		"count" : 1,
// 		"pageSize" : 100,
// 		"setHits" : true,
// 		"hitsIterator" : {
			
// 		},
// 		"setPageNum" : true,
// 		"pageNum" : 0,
// 		"setCount" : true,
// 		"setPageSize" : true
// 	},
// 	"readStatus" : 0,
// 	"data" : {
// 		"A_koffset" : 4027519,
// 		"QHQB_T_QHQB_TLDP_TRAIN_DATE" : "20170301",
// 		"A_timestamp" : 1488414301000,
// 		"A_userId" : "1",
// 		"A_ksendTime" : 1490254321722,
// 		"QHQB_T_QHQB_TLDP_BOARD_TRAIN_CODE" : "D7167",
// 		"A_kpart" : 0,
// 		"QHQB_T_QHQB_TLDP_ID_KIND" : "1",
// 		"QHQB_T_QHQB_TLDP_TICKET_NO" : "M031207",
// 		"QHQB_T_QHQB_TLDP_TO_STATION_NAME" : "琼海",
// 		"QHQB_T_QHQB_TLDP_ID_NO" : "430626198203278516",
// 		"QHQB_T_QHQB_TLDP_OFFICE_NO" : "5144431",
// 		"QHQB_T_QHQB_TLDP_COACH_NO" : "07",
// 		"A_message" : "5.7973205E7,2017/03/01 17:28:52,5144431,1,M031207,D7167,20170301,182000,07,006B,美兰,琼海,1,430626198203278516,张权民,20170302082501",
// 		"QHQB_T_QHQB_TLDP_ID_NAME" : "张权民",
// 		"QHQB_T_QHQB_TLDP_ID" : 57973205,
// 		"QHQB_T_QHQB_TLDP_START_TIME" : "182000",
// 		"A_source" : "A_db_QHQB_T_QHQB_TLDP",
// 		"QHQB_T_QHQB_TLDP_FROM_STATION_NAME" : "美兰",
// 		"QHQB_T_QHQB_TLDP_RKSJ" : "20170302082501",
// 		"QHQB_T_QHQB_TLDP_SEAT_NO" : "006B",
// 		"QHQB_T_QHQB_TLDP_SALE_TIME" : "2017/03/01 17:28:52",
// 		"A_processTime" : 1490254356590,
// 		"QHQB_T_QHQB_TLDP_WINDOW_NO" : "1"
// 	},
// 	"inserttime" : 1490254396145,
// 	"A_source" : "A_db_QHQB_T_QHQB_TLDP"
// },
// {
// 	"resultModel" : {
// 		"hits" : [
// 			{
// 				"auxiliaryFieldsSize" : 8,
// 				"fieldsSize" : 26,
// 				"setAuxiliaryFields" : true,
// 				"setFields" : true,
// 				"auxiliaryFields" : {
// 					"A_koffset" : "130649",
// 					"A_timestamp" : "1476862254000",
// 					"A_userId" : "1",
// 					"A_message" : "010020090905612538,林天贵,lin tian gui ,1,19830709,156,460003198307092415,01,469003,469003,下坊村二组032号,海南儋州市公安局新州派出所,466400009000,460000,儋州市新州镇西边村下坊村,海南省儋州市人民法院,460000000000,20160125163259,20090915000000,00010000000000000000000000000000,040200000000,1,20160923160344,20090916154803,20161019153054,20170227174419,",
// 					"A_ksendTime" : "1489236198036",
// 					"A_source" : "A_db_zdrXY_T_ZZRK_QGZDRYXX",
// 					"A_kpart" : "7",
// 					"A_processTime" : "1489240535669"
// 				},
// 				"fields" : {
// 					"zdrXY_T_ZZRK_QGZDRYXX_MZ" : "01",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLBGSJ" : "20160923160344",
// 					"zdrXY_T_ZZRK_QGZDRYXX_LADWJGDM" : "460000000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDXZ" : "下坊村二组032号",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XM" : "林天贵",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCSDM" : "466400009000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDXZ" : "儋州市新州镇西边村下坊村",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JG" : "469003",
// 					"zdrXY_T_ZZRK_QGZDRYXX_YXX" : "1",
// 					"zdrXY_T_ZZRK_QGZDRYXX_RKSJ" : "20161019153054",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZJLASJ" : "20160125163259",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCS" : "海南儋州市公安局新州派出所",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYXL" : "040200000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_LADW" : "海南省儋州市人民法院",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CJSJ" : "20170227174419",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDQH" : "460000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_BJZDRYBH" : "010020090905612538",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYLBBJ" : "00010000000000000000000000000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XMPY" : "lin tian gui ",
// 					"zdrXY_T_ZZRK_QGZDRYXX_SFZH" : "460003198307092415",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLXZSJ" : "20090916154803",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GJ" : "156",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CSRQ" : "19830709",
// 					"zdrXY_T_ZZRK_QGZDRYXX_NRBJZDRYKSJ" : "20090915000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDQH" : "469003",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XB" : "1"
// 				},
// 				"setType" : true,
// 				"type" : "A_db_zdrXY_T_ZZRK_QGZDRYXX"
// 			}
// 		],
// 		"setTooktime" : true,
// 		"tooktime" : "31ms",
// 		"hitsSize" : 1,
// 		"count" : 1,
// 		"pageSize" : 100,
// 		"setHits" : true,
// 		"hitsIterator" : {
			
// 		},
// 		"setPageNum" : true,
// 		"pageNum" : 0,
// 		"setCount" : true,
// 		"setPageSize" : true
// 	},
// 	"readStatus" : 0,
// 	"data" : {
// 		"A_koffset" : 4027467,
// 		"QHQB_T_QHQB_TLDP_TRAIN_DATE" : "20170301",
// 		"A_timestamp" : 1488414301000,
// 		"A_userId" : "1",
// 		"A_ksendTime" : 1490254321609,
// 		"QHQB_T_QHQB_TLDP_BOARD_TRAIN_CODE" : "D7160",
// 		"A_kpart" : 4,
// 		"QHQB_T_QHQB_TLDP_ID_KIND" : "1",
// 		"QHQB_T_QHQB_TLDP_TICKET_NO" : "U013214",
// 		"QHQB_T_QHQB_TLDP_TO_STATION_NAME" : "琼海",
// 		"QHQB_T_QHQB_TLDP_ID_NO" : "460003198307092415",
// 		"QHQB_T_QHQB_TLDP_OFFICE_NO" : "5166800",
// 		"QHQB_T_QHQB_TLDP_COACH_NO" : "01",
// 		"A_message" : "5.797033E7,2017/03/01 17:05:38,5166800,3,U013214,D7160,20170301,175800,01,012F,白马井,琼海,1,460003198307092415,林天贵,20170302082501",
// 		"QHQB_T_QHQB_TLDP_ID_NAME" : "林天贵",
// 		"QHQB_T_QHQB_TLDP_ID" : 57970330,
// 		"QHQB_T_QHQB_TLDP_START_TIME" : "175800",
// 		"A_source" : "A_db_QHQB_T_QHQB_TLDP",
// 		"QHQB_T_QHQB_TLDP_FROM_STATION_NAME" : "白马井",
// 		"QHQB_T_QHQB_TLDP_RKSJ" : "20170302082501",
// 		"QHQB_T_QHQB_TLDP_SEAT_NO" : "012F",
// 		"QHQB_T_QHQB_TLDP_SALE_TIME" : "2017/03/01 17:05:38",
// 		"A_processTime" : 1490254357657,
// 		"QHQB_T_QHQB_TLDP_WINDOW_NO" : "3"
// 	},
// 	"inserttime" : 1490254397432,
// 	"A_source" : "A_db_QHQB_T_QHQB_TLDP"
// },
// {
// 	"resultModel" : {
// 		"hits" : [
// 			{
// 				"auxiliaryFieldsSize" : 8,
// 				"fieldsSize" : 27,
// 				"setAuxiliaryFields" : true,
// 				"setFields" : true,
// 				"auxiliaryFields" : {
// 					"A_koffset" : "323975",
// 					"A_timestamp" : "1451114119000",
// 					"A_userId" : "1",
// 					"A_message" : "010020110934570817,张小红,zhang xiao gong ,2,19901212,156,460025199012123328,01,469021,469021,后山村026号,海南定安县公安局龙河派出所,466800004000,462500,海南省定安县后山村026号,海南省定安县公安局龙河派出所,海南省海口市公安局,460100000000,20120803033252,00010000000000000000000000000000,040100000000,1,20120802032824,20151226053844,20110930025815,20151226151519,20170227142021,",
// 					"A_ksendTime" : "1489237798654",
// 					"A_source" : "A_db_zdrXY_T_ZZRK_QGZDRYXX",
// 					"A_kpart" : "1",
// 					"A_processTime" : "1489243756033"
// 				},
// 				"fields" : {
// 					"zdrXY_T_ZZRK_QGZDRYXX_MZ" : "01",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLBGSJ" : "20151226053844",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDXZ" : "后山村026号",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XM" : "张小红",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCSDM" : "466800004000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDXZ" : "海南省定安县后山村026号",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JG" : "469021",
// 					"zdrXY_T_ZZRK_QGZDRYXX_YXX" : "1",
// 					"zdrXY_T_ZZRK_QGZDRYXX_RKSJ" : "20151226151519",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLCXSJ" : "20120802032824",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GXDW" : "海南省海口市公安局",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCS" : "海南定安县公安局龙河派出所",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYXL" : "040100000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CJSJ" : "20170227142021",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDQH" : "462500",
// 					"zdrXY_T_ZZRK_QGZDRYXX_BJZDRYBH" : "010020110934570817",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYLBBJ" : "00010000000000000000000000000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XMPY" : "zhang xiao gong ",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GXDWJGDM" : "460100000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_SFZH" : "460025199012123328",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLXZSJ" : "20110930025815",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDPCS" : "海南省定安县公安局龙河派出所",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GJ" : "156",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CSRQ" : "19901212",
// 					"zdrXY_T_ZZRK_QGZDRYXX_NRBJZDRYKSJ" : "20120803033252",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDQH" : "469021",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XB" : "2"
// 				},
// 				"setType" : true,
// 				"type" : "A_db_zdrXY_T_ZZRK_QGZDRYXX"
// 			}
// 		],
// 		"setTooktime" : true,
// 		"tooktime" : "6ms",
// 		"hitsSize" : 1,
// 		"count" : 1,
// 		"pageSize" : 100,
// 		"setHits" : true,
// 		"hitsIterator" : {
			
// 		},
// 		"setPageNum" : true,
// 		"pageNum" : 0,
// 		"setCount" : true,
// 		"setPageSize" : true
// 	},
// 	"readStatus" : 0,
// 	"data" : {
// 		"A_koffset" : 4027486,
// 		"QHQB_T_QHQB_TLDP_TRAIN_DATE" : "20170301",
// 		"A_timestamp" : 1488414301000,
// 		"A_userId" : "1",
// 		"A_ksendTime" : 1490254321660,
// 		"QHQB_T_QHQB_TLDP_BOARD_TRAIN_CODE" : "D7324",
// 		"A_kpart" : 4,
// 		"QHQB_T_QHQB_TLDP_ID_KIND" : "1",
// 		"QHQB_T_QHQB_TLDP_TICKET_NO" : "P063268",
// 		"QHQB_T_QHQB_TLDP_TO_STATION_NAME" : "文昌",
// 		"QHQB_T_QHQB_TLDP_ID_NO" : "460025199012123328",
// 		"QHQB_T_QHQB_TLDP_OFFICE_NO" : "5143831",
// 		"QHQB_T_QHQB_TLDP_COACH_NO" : "03",
// 		"A_message" : "5.7971548E7,2017/03/01 12:53:34,5143831,1,P063268,D7324,20170301,133600,03,3038,琼海,文昌,1,460025199012123328,张小红,20170302082501",
// 		"QHQB_T_QHQB_TLDP_ID_NAME" : "张小红",
// 		"QHQB_T_QHQB_TLDP_ID" : 57971548,
// 		"QHQB_T_QHQB_TLDP_START_TIME" : "133600",
// 		"A_source" : "A_db_QHQB_T_QHQB_TLDP",
// 		"QHQB_T_QHQB_TLDP_FROM_STATION_NAME" : "琼海",
// 		"QHQB_T_QHQB_TLDP_RKSJ" : "20170302082501",
// 		"QHQB_T_QHQB_TLDP_SEAT_NO" : "3038",
// 		"QHQB_T_QHQB_TLDP_SALE_TIME" : "2017/03/01 12:53:34",
// 		"A_processTime" : 1490254357657,
// 		"QHQB_T_QHQB_TLDP_WINDOW_NO" : "1"
// 	},
// 	"inserttime" : 1490254397692,
// 	"A_source" : "A_db_QHQB_T_QHQB_TLDP"
// },
// {
// 	"resultModel" : {
// 		"hits" : [
// 			{
// 				"auxiliaryFieldsSize" : 8,
// 				"fieldsSize" : 30,
// 				"setAuxiliaryFields" : true,
// 				"setFields" : true,
// 				"auxiliaryFields" : {
// 					"A_koffset" : "375873",
// 					"A_timestamp" : "1459511017000",
// 					"A_userId" : "1",
// 					"A_message" : "010020090907991735,李君培,li jun pei ,1,19850410,156,460002198504102217,01,469002,469002,阳西村12号,海南琼海市公安局阳江派出所,466300010000,466200,海南省琼海市阳江镇阳西村12号,海南省琼海市公安局阳江派出所,海南省三亚市公安局,460200000000,三亚市城郊人民法院,460000000000,20150827220010,20101015022247,00011000000000000000000000000000,040100000000,050102050100,1,20100613103831,20160401053707,20090916182225,20160401194337,20170227134010,",
// 					"A_ksendTime" : "1489238215655",
// 					"A_source" : "A_db_zdrXY_T_ZZRK_QGZDRYXX",
// 					"A_kpart" : "3",
// 					"A_processTime" : "1489244790179"
// 				},
// 				"fields" : {
// 					"zdrXY_T_ZZRK_QGZDRYXX_MZ" : "01",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLBGSJ" : "20160401053707",
// 					"zdrXY_T_ZZRK_QGZDRYXX_LADWJGDM" : "460000000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDXZ" : "阳西村12号",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XM" : "李君培",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCSDM" : "466300010000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDXZ" : "海南省琼海市阳江镇阳西村12号",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JG" : "469002",
// 					"zdrXY_T_ZZRK_QGZDRYXX_YXX" : "1",
// 					"zdrXY_T_ZZRK_QGZDRYXX_RKSJ" : "20160401194337",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLCXSJ" : "20100613103831",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GXDW" : "海南省三亚市公安局",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZJLASJ" : "20150827220010",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCS" : "海南琼海市公安局阳江派出所",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYXL" : "040100000000,050102050100",
// 					"zdrXY_T_ZZRK_QGZDRYXX_LADW" : "三亚市城郊人民法院",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CJSJ" : "20170227134010",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDQH" : "466200",
// 					"zdrXY_T_ZZRK_QGZDRYXX_BJZDRYBH" : "010020090907991735",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYLBBJ" : "00011000000000000000000000000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XMPY" : "li jun pei ",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GXDWJGDM" : "460200000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_SFZH" : "460002198504102217",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLXZSJ" : "20090916182225",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDPCS" : "海南省琼海市公安局阳江派出所",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GJ" : "156",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CSRQ" : "19850410",
// 					"zdrXY_T_ZZRK_QGZDRYXX_NRBJZDRYKSJ" : "20101015022247",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDQH" : "469002",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XB" : "1"
// 				},
// 				"setType" : true,
// 				"type" : "A_db_zdrXY_T_ZZRK_QGZDRYXX"
// 			}
// 		],
// 		"setTooktime" : true,
// 		"tooktime" : "8ms",
// 		"hitsSize" : 1,
// 		"count" : 1,
// 		"pageSize" : 100,
// 		"setHits" : true,
// 		"hitsIterator" : {
			
// 		},
// 		"setPageNum" : true,
// 		"pageNum" : 0,
// 		"setCount" : true,
// 		"setPageSize" : true
// 	},
// 	"readStatus" : 0,
// 	"data" : {
// 		"A_koffset" : 4027488,
// 		"QHQB_T_QHQB_TLDP_TRAIN_DATE" : "20170301",
// 		"A_timestamp" : 1488414301000,
// 		"A_userId" : "1",
// 		"A_ksendTime" : 1490254321666,
// 		"QHQB_T_QHQB_TLDP_BOARD_TRAIN_CODE" : "D7339",
// 		"A_kpart" : 4,
// 		"QHQB_T_QHQB_TLDP_ID_KIND" : "1",
// 		"QHQB_T_QHQB_TLDP_TICKET_NO" : "P063567",
// 		"QHQB_T_QHQB_TLDP_TO_STATION_NAME" : "陵水",
// 		"QHQB_T_QHQB_TLDP_ID_NO" : "460002198504102217",
// 		"QHQB_T_QHQB_TLDP_OFFICE_NO" : "5143831",
// 		"QHQB_T_QHQB_TLDP_COACH_NO" : "07",
// 		"A_message" : "5.7971648E7,2017/03/01 16:13:52,5143831,1,P063567,D7339,20170301,165500,07,015D,琼海,陵水,1,460002198504102217,李君培,20170302082501",
// 		"QHQB_T_QHQB_TLDP_ID_NAME" : "李君培",
// 		"QHQB_T_QHQB_TLDP_ID" : 57971648,
// 		"QHQB_T_QHQB_TLDP_START_TIME" : "165500",
// 		"A_source" : "A_db_QHQB_T_QHQB_TLDP",
// 		"QHQB_T_QHQB_TLDP_FROM_STATION_NAME" : "琼海",
// 		"QHQB_T_QHQB_TLDP_RKSJ" : "20170302082501",
// 		"QHQB_T_QHQB_TLDP_SEAT_NO" : "015D",
// 		"QHQB_T_QHQB_TLDP_SALE_TIME" : "2017/03/01 16:13:52",
// 		"A_processTime" : 1490254357657,
// 		"QHQB_T_QHQB_TLDP_WINDOW_NO" : "1"
// 	},
// 	"inserttime" : 1490254397725,
// 	"A_source" : "A_db_QHQB_T_QHQB_TLDP"
// },
// {
// 	"resultModel" : {
// 		"hits" : [
// 			{
// 				"auxiliaryFieldsSize" : 8,
// 				"fieldsSize" : 27,
// 				"setAuxiliaryFields" : true,
// 				"setFields" : true,
// 				"auxiliaryFields" : {
// 					"A_koffset" : "278215",
// 					"A_timestamp" : "1454671350000",
// 					"A_userId" : "1",
// 					"A_message" : "010020090900126437,李福元,li fu yuan ,1,19750718,156,360427197507182719,01,360427,360427,蛟塘镇西庙村窑林李124号附1号,星子县公安局蛟塘派出所,360427809000,360427,蛟塘西庙村窑林李124号附1号                                                                          ,星子县人民法院,360000000000,20160125163259,20160204150111,00001000000000000000000000000000,051101050200,1,20160125164351,20160204164009,20090916154803,20160205192230,20170227150341,",
// 					"A_ksendTime" : "1489237441071",
// 					"A_source" : "A_db_zdrXY_T_ZZRK_QGZDRYXX",
// 					"A_kpart" : "6",
// 					"A_processTime" : "1489242824397"
// 				},
// 				"fields" : {
// 					"zdrXY_T_ZZRK_QGZDRYXX_MZ" : "01",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLBGSJ" : "20160204164009",
// 					"zdrXY_T_ZZRK_QGZDRYXX_LADWJGDM" : "360000000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDXZ" : "蛟塘镇西庙村窑林李124号附1号",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XM" : "李福元",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCSDM" : "360427809000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDXZ" : "蛟塘西庙村窑林李124号附1号                                                                          ",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JG" : "360427",
// 					"zdrXY_T_ZZRK_QGZDRYXX_YXX" : "1",
// 					"zdrXY_T_ZZRK_QGZDRYXX_RKSJ" : "20160205192230",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLCXSJ" : "20160125164351",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZJLASJ" : "20160125163259",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDPCS" : "星子县公安局蛟塘派出所",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYXL" : "051101050200",
// 					"zdrXY_T_ZZRK_QGZDRYXX_LADW" : "星子县人民法院",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CJSJ" : "20170227150341",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XZDQH" : "360427",
// 					"zdrXY_T_ZZRK_QGZDRYXX_BJZDRYBH" : "010020090900126437",
// 					"zdrXY_T_ZZRK_QGZDRYXX_ZDRYLBBJ" : "00001000000000000000000000000000",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XMPY" : "li fu yuan ",
// 					"zdrXY_T_ZZRK_QGZDRYXX_SFZH" : "360427197507182719",
// 					"zdrXY_T_ZZRK_QGZDRYXX_JLXZSJ" : "20090916154803",
// 					"zdrXY_T_ZZRK_QGZDRYXX_GJ" : "156",
// 					"zdrXY_T_ZZRK_QGZDRYXX_CSRQ" : "19750718",
// 					"zdrXY_T_ZZRK_QGZDRYXX_NRBJZDRYKSJ" : "20160204150111",
// 					"zdrXY_T_ZZRK_QGZDRYXX_HJDQH" : "360427",
// 					"zdrXY_T_ZZRK_QGZDRYXX_XB" : "1"
// 				},
// 				"setType" : true,
// 				"type" : "A_db_zdrXY_T_ZZRK_QGZDRYXX"
// 			}
// 		],
// 		"setTooktime" : true,
// 		"tooktime" : "66ms",
// 		"hitsSize" : 1,
// 		"count" : 1,
// 		"pageSize" : 100,
// 		"setHits" : true,
// 		"hitsIterator" : {
			
// 		},
// 		"setPageNum" : true,
// 		"pageNum" : 0,
// 		"setCount" : true,
// 		"setPageSize" : true
// 	},
// 	"readStatus" : 0,
// 	"data" : {
// 		"A_koffset" : 4027476,
// 		"QHQB_T_QHQB_TLDP_TRAIN_DATE" : "20170301",
// 		"A_timestamp" : 1488414301000,
// 		"A_userId" : "1",
// 		"A_ksendTime" : 1490254321696,
// 		"QHQB_T_QHQB_TLDP_BOARD_TRAIN_CODE" : "D7357",
// 		"A_kpart" : 3,
// 		"QHQB_T_QHQB_TLDP_ID_KIND" : "1",
// 		"QHQB_T_QHQB_TLDP_TICKET_NO" : "L077259",
// 		"QHQB_T_QHQB_TLDP_TO_STATION_NAME" : "琼海",
// 		"QHQB_T_QHQB_TLDP_ID_NO" : "360427197507182719",
// 		"QHQB_T_QHQB_TLDP_OFFICE_NO" : "5145900",
// 		"QHQB_T_QHQB_TLDP_COACH_NO" : "06",
// 		"A_message" : "5.7972443E7,2017/03/01 17:51:45,5145900,6,L077259,D7357,20170301,211100,06,011B,海口,琼海,1,360427197507182719,李福元,20170302082501",
// 		"QHQB_T_QHQB_TLDP_ID_NAME" : "李福元",
// 		"QHQB_T_QHQB_TLDP_ID" : 57972443,
// 		"QHQB_T_QHQB_TLDP_START_TIME" : "211100",
// 		"A_source" : "A_db_QHQB_T_QHQB_TLDP",
// 		"QHQB_T_QHQB_TLDP_FROM_STATION_NAME" : "海口",
// 		"QHQB_T_QHQB_TLDP_RKSJ" : "20170302082501",
// 		"QHQB_T_QHQB_TLDP_SEAT_NO" : "011B",
// 		"QHQB_T_QHQB_TLDP_SALE_TIME" : "2017/03/01 17:51:45",
// 		"A_processTime" : 1490254362187,
// 		"QHQB_T_QHQB_TLDP_WINDOW_NO" : "6"
// 	},
// 	"inserttime" : 1490254411164,
// 	"A_source" : "A_db_QHQB_T_QHQB_TLDP"
// }];
    // for(var i = 41;i<=60;i++){
    //     data.push({
    //         mark: '正常',
    //         name: '姓名',
    //         cardId: '12345678' + i,
    //         level: (i+1)%2,
    //         position: '活动发生地',
    //         police: '派出所地址',
    //         date: new Date('2017-1-1 00:00:00').getTime() + i * 1000 * 60 * 60 * 24,
    //         scheme: '方案名称',
    //         status: i%2
    //     });
    // }
//     reportCollection.insert(data,function(err,result) {
//         if(err){
//             console.info('Error:' + err);
//             return ;
//         }
//         console.log(result.result.n);
//         db.close();
//     })
// });
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
//     var reportCollection = db.collection('matchalarm');
//     // var param = {status:0};
//     var param = {_id:ObjectID('58d3a6741693df3cc04fc528')};
//     reportCollection.remove(param,function(err,result) {
//         if(err){
//             console.info('Error:' + err);
//             return ;
//         }
//         console.log(result.result.n);
//         db.close();
//     })
// });