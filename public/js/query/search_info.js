$(document).ready(function () {
    $("h3,li").attr("name", "show");

    var keyWord = $.url(window.location.href).param().keyWord;
    $("#search_input").val(keyWord);

    var checkedTable = $.url(window.location.href).param().checkedTable;
    console.log("checkedTable=" + checkedTable);
    if (checkedTable) {
        checkedTable = JSON.parse(checkedTable);

        //先隐藏所有的li
        $("li").hide();
        $("li").attr("name", "hide");

        for (var index in checkedTable) {
            tableDictTmp.push(tableDict[checkedTable[index]]);
            //显示指定的li
            $("li:eq(" + checkedTable[index] + ")").show();
            $("li:eq(" + checkedTable[index] + ")").attr("name", "show");
        }
		tableCount();
    } else {
        tableDictTmp = tableDict;
    }

    //赋初值
    infoType = $("h3[name='show']:eq(0)").attr("id");
    subInfoType = $("li[name='show']:eq(0)").children("a").html();
    liArray = $("li[name='show']");

    searchCount();
    tableCount();

    $("li[name='show']:eq(0)").attr("class", "selected");

    queryInfo();

    $("#ft_search").click(function () {
        searchCount();
        tableCount();
        queryInfo();
    });

    var tmp = 1;//0闭合，1展开
    var tmpIndex = 1;//h3的索引
    $("h3[name='show']").click(function () {
        var index = $(this).index("h3[name='show']") + 1;
        var divClass = "menu" + index + " menu_tab";
        $(".content").children("div:eq(0)").attr("class", divClass);

        liArray = $(this).next("ul").children("li[name='show']");
        tableIndex = index - 1;

        infoType = $(this).attr("id");
        subInfoType = $(this).next("ul").children("li[name='show']:eq(0)").children("a").html();
        if (tmp == 0 && index == tmpIndex) {
            queryInfo();
            tmp = 1;
        } else {
            if (index == tmpIndex) {
                tmp = 0;
            } else {
                queryInfo();
                tmp = 1;
            }
        }
        tmpIndex = index;
    });

    $("li").click(function () {
        subInfoType = $(this).children('a').html();
        queryInfo();
    });

    //高级搜索
    $("#g_search").click(function () {
        var keyWord = $("#search_input").val();
        window.location.href = "senior_search?keyWord=" + keyWord;
    });
});
var tableDictTmp = [];
//所有的表
var tableDict = ['A_db_sis_V_BD_HANDSET_CONTACTOR_INFO',//机主通讯录信息--1.SIS情报分析系统
    'A_db_sis_V_GJ_HANDSET_SMS_INFO',//机主短信表
    'A_db_sis_V_XYR_MAIN',//机主表（SIM卡）
    'A_db_sis_V_PHONE_LIST',//话单机主信息表
    'A_db_sis_V_PHONE_THQD',//通话清单
    'A_db_sis_V_CARINFOTBl',//车辆信息登记表--2.本地社会资源数据
    'A_db_sis_V_EMSINFOTBl',//物流信息登记表
    'A_db_sis_V_WORKERBASEINFO',//行业工作人员
    'A_db_sis_V_RST_HOUSING_INFORMATIO',//小区住宅业主信息
    'A_db_hkvs_BMS_CROSSING_INFO',//路口信息表--3.卡口视频监控系统
    'A_db_hkvs_BMS_MAINTENANCE_LANEINFO',//运维车道过车数据统计
    'A_db_hkvs_BMS_PLATE_ALARM',//布控信息表
    'A_db_hkvs_BMS_VEHICLE_PASS',//所有过车信息表
    'A_db_hkvs_BMS_VEHICLE_VIOLATION',//违章过车表
    'A_db_sis_V_RL',//人脸比中结果信息--4.人脸识别
    'A_db_zdrXY_T_ZZRK_QGZDRYXX',//全国重点人员--5.省厅资源服务平台
    'A_db_QHQB_T_QHQB_ZXXZXSXX',//中小学校在校学生信息
    'A_db_QHQB_T_QHQB_YJSXX',//研究生信息
    'A_db_QHQB_T_QHQB_DBRYXX',//低保人员信息
    'A_db_QHQB_T_QHQB_CBRYXX',//参保人员信息
    'A_db_QHQB_T_QHQB_CBRYBGXX',//参保人员变更信息
    'A_db_QHQB_T_QHQB_PTZBKSXX',//普通专本科信息
    'A_db_QHQB_T_QHQB_RQYHSJ',//燃气用户信息
    'A_db_QHQB_T_QHQB_KJRXXK',//会计人员信息
    'A_db_QHQB_T_QHQB_GYRYXX',//财政供养人员信息
    'A_db_QHQB_T_QHQB_ZXSHMCSX',//在校生花名册市县信息
    'A_db_QHQB_T_QHQB_ZXSHMCZX',//在校生花名册省属信息
    'A_db_QHQB_T_QHQB_JSW_LDRKXX',//计生委流动人口信息
    'A_db_QHQB_T_QHQB_CRJ_XSXX',//常住境外人员学生信息
    'A_db_QHQB_T_QHQB_GSDJNSRXX',//国税登记纳税人信息表
    'A_db_QHQB_T_QHQB_CJZXSXX',//成教在校生信息
    'A_db_QHQB_T_QHQB_HYDJXX',//婚姻登记信息
    'A_db_QHQB_T_QHQB_CYRY',//道路运输从业人员信息
    'A_db_QHQB_T_',//工商登记信息表
    'A_db_QHQB_T_QHQB_GSNJXX',//工商年检信息表
    'A_db_QHQB_T_QHQB_GSBGXX',//工商变更信息表
    'A_db_QHQB_T_QHQB_GSDXXX',//工商吊销信息表
    'A_db_QHQB_T_QHQB_GSZXXX',//工商注销信息表
    'A_db_QHQB_T_QHQB_GSFZCHXX',//国税非正常户信息表
    'A_db_QHQB_T_QHQB_GSYHZ',//国税验换证信息表
    'A_db_QHQB_T_QHQB_GSZX',//国税注销登记信息表
    'A_db_QHQB_T_QHQB_DSFZCH',//地税非正常户信息表
    'A_db_QHQB_T_QHQB_DSYHZ',//地税验换证信息表
    'A_db_QHQB_T_QHQB_DSZX',//地税注销信息表
    'A_db_QHQB_T_QHQB_DSLSDJXX',//地税纳税登记信息
    'A_db_QHQB_T_QHQB_YXDSKF',//有线电视开户
    'A_db_QHQB_T_QHQB_YXDSTJJFWKT',//有线电视停机缴费未开通数据
    'A_db_QHQB_T_QHQB_YXDSSZSJ',//有线电视数字数据
    'A_db_QHQB_T_QHQB_YXDSMNSJ',//有线电视模拟数据
    'A_db_QHQB_T_QHQB_HKDDC',//海口电动车信息
    'A_db_QHQB_T_QHQB_HQJT_DZKPSJB',//海汽集团电子客票信息
    'A_db_sis_V_WA_SOURCE_FJ_0001',//终端上下线信息--6.网警总队网综系统
    'A_db_sis_V_WA_SOURCE_FJ_0002',//上网日志
    'A_db_sis_V_WA_SOURCE_FJ_1001',//终端特征信息
    'A_db_sis_V_WA_SOURCE_FJ_1002',//热点信息采集
    'A_db_sis_V_WA_BASIC_FJ_1001',//终端特征移动采集设备轨迹
	'A_db_QHSJ_VIEW_COMPARERECORD_TO_QHSJ'//琼海检查站比对信息
];

var infoType = '';
var subInfoType = '';
var liArray = $;
var tableIndex = 0;
//分页大小
var pageSize = 10;
var queryString='';
//主方法，查询内容
function queryInfo() {
    $('#pages').hide();
    $("#tab1").empty().append('<div class="loading-quick loading-40"></div>');
    var keyWord = $("#search_input").val();
    console.log(keyWord);
    console.log(infoType);
    console.log(subInfoType);

    switch (subInfoType) {
        case '机主通讯录信息': {
            queryString = 'A_source:"A_db_sis_V_BD_HANDSET_CONTACTOR_INFO"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo1();
            break;
        }
        case '机主短信表': {
            queryString = 'A_source:"A_db_sis_V_GJ_HANDSET_SMS_INFO"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo2();
            break;
        }
        case '机主表（SIM卡）': {
            queryString = 'A_source:"A_db_sis_V_XYR_MAIN"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo3();
            break;
        }
        case '话单机主信息表': {
            queryString = 'A_source:"A_db_sis_V_PHONE_LIST"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo4();
            break;
        }
        case '通话清单': {
            queryString = 'A_source:"A_db_sis_V_PHONE_THQD"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo5();
            break;
        }
        case '车辆信息登记表': {
            queryString = 'A_source:"A_db_sis_V_Carinfotbl"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo6();
            break;
        }
        case '物流信息登记表': {
            queryString = 'A_source:"A_db_sis_V_Emsinfotbl"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo7();
            break;
        }
        case '行业工作人员': {
            queryString = 'A_source:"A_db_sis_V_WORKERBASEINFO"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo8();
            break;
        }
        case '小区住宅业主信息': {
            queryString = 'A_source:"A_db_sis_V_RST_HOUSING_INFORMATIO"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo9();
            break;
        }
        case '路口信息表': {
            queryString = 'A_source:"A_db_hkvs_BMS_CROSSING_INFO"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo10();
            break;
        }
        case '运维车道过车数据统计': {
            queryString = 'A_source:"A_db_hkvs_BMS_MAINTENANCE_LANEINFO"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo11();
            break;
        }
        case '布控信息表': {
            queryString = 'A_source:"A_db_hkvs_BMS_PLATE_ALARM"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo12();
            break;
        }
        case '所有过车信息表': {
            queryString = 'A_source:"A_db_hkvs_BMS_VEHICLE_PASS"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo13();
            break;
        }
        case '违章过车表': {
            queryString = 'A_source:"A_db_hkvs_BMS_VEHICLE_VIOLATION"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo15();
            break;
        }
        case '人脸比中结果信息': {
            queryString = 'A_source:"A_db_sis_V_"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo16();
            break;
        }
        case '全国重点人员': {
            queryString = 'A_source:"A_db_zdrXY_T_ZZRK_QGZDRYXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo17();
            break;
        }
        case '中小学校在校学生信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_ZXXZXSXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo18();
            break;
        }
        case '研究生信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_YJSXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo19();
            break;
        }
        case '低保人员信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_DBRYXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo20();
            break;
        }
        case '参保人员信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_CBRYXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo21();
            break;
        }
        case '参保人员变更信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_CBRYBGXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo22();
            break;
        }
        case '普通专本科信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_PTZBKSXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo23();
            break;
        }
        case '燃气用户信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_RQYHSJ"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo24();
            break;
        }
        case '会计人员信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_KJRXXK"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo25();
            break;
        }
        case '财政供养人员信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_GYRYXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo26();
            break;
        }
        case '在校生花名册市县信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_ZXSHMCSX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo27();
            break;
        }
        case '计生委流动人口信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_JSW_LDRKXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo28();
            break;
        }
        case '常住境外人员学生信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_CRJ_XSXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo29();
            break;
        }
        case '国税登记纳税人信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_GSDJNSRXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo30();
            break;
        }
        case '成教在校生信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_CJZXSXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo31();
            break;
        }
        case '在校生花名册省属信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_ZXSHMCZX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo32();
            break;
        }
        case '海口电动车信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_HKDDC"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo33();
            break;
        }
        case '有线电视模拟数据': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_YXDSMNSJ"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo34();
            break;
        }
        case '有线电视数字数据': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_YXDSSZSJ"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo35();
            break;
        }
        case '有线电视停机缴费未开通数据': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_YXDSTJJFWKT"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo36();
            break;
        }
        case '有线电视开户': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_YXDSKF"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo37();
            break;
        }
        case '地税纳税登记信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_DSLSDJXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo38();
            break;
        }
        case '地税注销信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_DSZX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo39();
            break;
        }
        case '地税验换证信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_DSYHZ"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo40();
            break;
        }
        case '地税非正常户信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_DSFZCH"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo41();
            break;
        }
        case '国税注销登记信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_GSZX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo42();
            break;
        }
        case '国税验换证信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_GSYHZ"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo43();
            break;
        }
        case '国税非正常户信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_GSFZCHXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo44();
            break;
        }
        case '工商注销信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_GSZXXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo45();
            break;
        }
        case '工商吊销信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_GSDXXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo46();
            break;
        }
        case '工商变更信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_GSBGXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo47();
            break;
        }
        case '工商年检信息表': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_GSNJXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo48();
            break;
        }
        case '工商登记信息表': {
            queryString = 'A_source:"A_db_sis_V_"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo49();
            break;
        }
        case '道路运输从业人员信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_CYRY"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo50();
            break;
        }
        case '婚姻登记信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_HYDJXX"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo51();
            break;
        }
        case '终端特征信息': {
            queryString = 'A_source:"A_db_sis_V_WA_SOURCE_FJ_1001"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo52();
            break;
        }
        case '热点信息采集': {
            queryString = 'A_source:"A_db_sis_V_WA_SOURCE_FJ_1002"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo53();
            break;
        }
        case '终端上下线信息': {
            queryString = 'A_source:"A_db_sis_V_WA_SOURCE_FJ_0001"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo54();
            break;
        }
        case '上网日志': {
            queryString = 'A_source:"A_db_sis_V_WA_SOURCE_FJ_0002"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo55();
            break;
        }
        case '终端特征移动采集设备轨迹': {
            queryString = 'A_source:"A_db_sis_V_WA_BASIC_FJ_1001"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo56();
            break;
        }
        case '海汽集团电子客票信息': {
            queryString = 'A_source:"A_db_QHQB_T_QHQB_HQJT_DZKPSJB"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo57();
            break;
        }
        case '琼海检查站比对信息': {
            queryString = 'A_source:"A_db_QHSJ_VIEW_COMPARERECORD_TO_QHSJ"';
            if (keyWord != '') {
                queryString = queryString + ' AND ' + keyWord;
            }
            queryInfo58();
            break;
        }
    }

}
//查询每个表的数据量
function searchCount() {
    var tableArray = tableDictTmp;
    // queryString = 'A_source:"A_db_duo_SEC_USER_INFO" OR A_source:"A_db_duo_SEC_USER_SYNCINFO" | report count(A_source) over A_source';
    var tmpStr = [];
    $(tableArray).each(function (index, value) {
        if (index == 0) {
            tmpStr.push('A_source:"' + value + '"')
        } else {
            tmpStr.push(' OR A_source:"' + value + '"');
        }
    });
    tmpStr.push(' | report count(A_source) over A_source');
    var queryString = tmpStr.join('');
    var keyWord = $("#search_input").val();
    if (keyWord != '') {
        queryString = queryString + ' AND ' + keyWord;
    }
    console.log('queryString=' + queryString);

    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime()
        },
        function (data) {
            console.log(data);
            var datas = data.datas;
            if(!datas){
                $('li').children("span").html('');
                return false;
            }
            liArray.each(function (index, value) {
                var nameTmp = $(this).children('a').attr('id');
				var count = null;
                for (var i in datas){
                    if(datas[i][0] == nameTmp){
                        count = datas[i][1];
                        if (count == 0) {
                            $(this).hide();
                            $(this).attr("name", "hide");
                        } else {
                            $(this).show();
                            $(this).attr("name", "show");
                            $(this).children("span").html('[' + count + ']');
                        }
                    }
                }
				if(count == null){
					$(this).hide();
					$(this).attr("name", "hide");
				}
            });
        })
}
//统计每个大类下的表格数量
function tableCount() {
    $("h3").each(function () {
        var count = $(this).next("ul").children("li[name='show']").length;
        if(count == 0){
            $(this).hide();
			$(this).attr('name','hide');
        }else{
			$(this).show();
			$(this).attr('name','show');
			$(this).children("span").html("[" + count + "]");
        }
    });
}
//机主通讯录信息
function queryInfo1(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;

    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
            if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '联系人名称', '</th>'].join(''));
            typeList.push(['<th>', '源手机号码', '</th>'].join(''));
            typeList.push(['<th>', '创建时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_BD_HANDSET_CONTACTOR_INFO_CONTACTOR_NAME, '</td>');
                typeList.push('<td>', fields.sis_V_BD_HANDSET_CONTACTOR_INFO_CONTACTOR_HANDSET_NUM, '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_BD_HANDSET_CONTACTOR_INFO_CREATEDTIME)) || '--', '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").empty().append(typeList.join(''));

            if(total>pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo1', total, pageNum + 1, pageSize);
            }
        })
}
//机主短信表
function queryInfo2(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
            if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '主叫方', '</th>'].join(''));
            typeList.push(['<th>', '被叫方', '</th>'].join(''));
            typeList.push(['<th>', '信息内容', '</th>'].join(''));
            typeList.push(['<th>', '信息类型', '</th>'].join(''));
            typeList.push(['<th>', '信息来源', '</th>'].join(''));
            typeList.push(['<th>', '发送时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_GJ_HANDSET_SMS_INFO_FROM_NUM, '</td>');
                typeList.push('<td>', fields.sis_V_GJ_HANDSET_SMS_INFO_TO_NUM, '</td>');
                var detail = fields.sis_V_GJ_HANDSET_SMS_INFO_MESSAGE_DETAIL || '';
                typeList.push('<td title="'+ detail +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',detail , '</div></td>');
                var type1 = parseInt(fields.sis_V_GJ_HANDSET_SMS_INFO_MSG_TYPE);
                switch (type1){//，，，3，
                    case '0':{
                        type1='短信';
                        break;
                    }
                    case '1':{
                        type1='彩信';
                        break;
                    }
                    default:{
                        type1='其他';
                        break;
                    }
                }
                typeList.push('<td>', type1, '</td>');
                var type2 = parseInt(fields.sis_V_GJ_HANDSET_SMS_INFO_ACTIONTYPE);
                switch (type2){//，，，3，
                    case '0':{
                        type2='发件箱';
                        break;
                    }
                    case '1':{
                        type2='已发信息';
                        break;
                    }
                    case '2':{
                        type2='收件箱';
                        break;
                    }
                    case '3':{
                        type2='垃圾箱';
                        break;
                    }
                    case '4':{
                        type2='草稿箱';
                        break;
                    }
                    default:{
                        type2='其他';
                        break;
                    }
                }

                typeList.push('<td>',type2 , '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_GJ_HANDSET_SMS_INFO_SEND_TIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));

            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo2', total, pageNum + 1, pageSize);
            }
        })
}
//机主表（SIM卡）
function queryInfo3(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '电话', '</th>'].join(''));
            typeList.push(['<th>', '证件', '</th>'].join(''));
            typeList.push(['<th>', '人员类别', '</th>'].join(''));
            typeList.push(['<th>', '手机串号', '</th>'].join(''));
            typeList.push(['<th>', '采集时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_XYR_MAIN_XM, '</td>');
                typeList.push('<td>', fields.sis_V_XYR_MAIN_DHHM, '</td>');
                typeList.push('<td>', fields.sis_V_XYR_MAIN_ZJHM, '</td>');
                typeList.push('<td>', fields.sis_V_XYR_MAIN_RYLB, '</td>');
                typeList.push('<td>', fields.sis_V_XYR_MAIN_SJCH, '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_XYR_MAIN_CREATEDTIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));

            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo3', total-1, pageNum + 1, pageSize);
            }
        })
}
//话单机主信息表
function queryInfo4(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '机主姓名', '</th>'].join(''));
            typeList.push(['<th>', '机主区号', '</th>'].join(''));
            typeList.push(['<th>', '机主电话', '</th>'].join(''));
            typeList.push(['<th>', '采集时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_PHONE_LIST_JZXM, '</td>');
                typeList.push('<td>', fields.sis_V_PHONE_LIST_JZQH, '</td>');
                typeList.push('<td>', fields.sis_V_PHONE_LIST_JZHM, '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_PHONE_LIST_CJSJ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo4', total, pageNum + 1, pageSize);
            }
        })
}
//通话清单
function queryInfo5(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '通话类型', '</th>'].join(''));
            typeList.push(['<th>', '对方区号', '</th>'].join(''));
            typeList.push(['<th>', '对方电话', '</th>'].join(''));
            typeList.push(['<th>', '通话地点', '</th>'].join(''));
            typeList.push(['<th>', '主被叫类型', '</th>'].join(''));
            typeList.push(['<th>', '采集时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                var type1 = parseInt(fields.sis_V_PHONE_THQD_THLX);
                switch (type1){//
                    case '20001':{
                        type1='电话';
                        break;
                    }
                    case '20002':{
                        type1='短信';
                        break;
                    }
                    case '20003':{
                        type1='GPS';
                        break;
                    }
                    case '20004':{
                        type1='其他';
                        break;
                    }
                }
                typeList.push('<td>',type1 , '</td>');
                typeList.push('<td>', fields.sis_V_PHONE_THQD_DFQH, '</td>');
                typeList.push('<td>', fields.sis_V_PHONE_THQD_DFHM, '</td>');
                typeList.push('<td>', fields.sis_V_PHONE_THQD_THDD, '</td>');
                var type2 = parseInt(fields.sis_V_PHONE_THQD_ZBJLX);
                switch (type2){//
                    case '30001':{
                        type2='主叫';
                        break;
                    }
                    case '30002':{
                        type2='被叫';
                        break;
                    }
                    case '30003':{
                        type2='未知';
                        break;
                    }
                }
                typeList.push('<td>',type2 , '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_PHONE_THQD_CJSJ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo5', total, pageNum + 1, pageSize);
            }
        })
}
//车辆信息登记表
function queryInfo6(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '中文姓名', '</th>'].join(''));
            typeList.push(['<th>', '车牌号', '</th>'].join(''));
            typeList.push(['<th>', '品牌', '</th>'].join(''));
            typeList.push(['<th>', '车型', '</th>'].join(''));
            typeList.push(['<th>', '颜色', '</th>'].join(''));
            typeList.push(['<th>', '证件号码', '</th>'].join(''));
            typeList.push(['<th>', '电话号码', '</th>'].join(''));
            typeList.push(['<th>', '楼牌号(停车场所)', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_Carinfotbl_CHNNAME, '</td>');
                typeList.push('<td>', fields.sis_V_Carinfotbl_CARNUMBER, '</td>');
                typeList.push('<td>', fields.sis_V_Carinfotbl_CARBRAND, '</td>');
                typeList.push('<td>', fields.sis_V_Carinfotbl_CARTYPE, '</td>');
                typeList.push('<td>', fields.sis_V_Carinfotbl_CARCOLOR, '</td>');
                typeList.push('<td>', fields.sis_V_Carinfotbl_PASSNO, '</td>');
                typeList.push('<td>', fields.sis_V_Carinfotbl_TELEPHONE, '</td>');
                typeList.push('<td>', fields.sis_V_Carinfotbl_CARHOUSE, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo6', total, pageNum + 1, pageSize);
            }
        })
}
//物流信息登记表
function queryInfo7(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '收件人姓名', '</th>'].join(''));
            typeList.push(['<th>', '快递单号', '</th>'].join(''));
            typeList.push(['<th>', '收件人电话号码', '</th>'].join(''));
            typeList.push(['<th>', '收件人详细地址', '</th>'].join(''));
            typeList.push(['<th>', '寄件时间', '</th>'].join(''));
            typeList.push(['<th>', '采集/入库日期', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_Emsinfotbl_SNAME, '</td>');
                typeList.push('<td>', fields.sis_V_Emsinfotbl_EMSNUMBER, '</td>');
                typeList.push('<td>', fields.sis_V_Emsinfotbl_STELEPHONE, '</td>');
                var address = fields.sis_V_Emsinfotbl_SADDRESS || '';
                typeList.push('<td title="'+ address +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',address , '</div></td>');
                typeList.push('<td>', formatDate2((fields.sis_V_Emsinfotbl_JJDATE)), '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_Emsinfotbl_APPLDATE)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));

            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo7', total, pageNum + 1, pageSize);
            }
        })
}
//行业工作人员
function queryInfo8(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '身份证号码', '</th>'].join(''));
            typeList.push(['<th>', '籍贯', '</th>'].join(''));
            typeList.push(['<th>', '户籍地址', '</th>'].join(''));
            typeList.push(['<th>', '现住地址', '</th>'].join(''));
            typeList.push(['<th>', '文化程度', '</th>'].join(''));
            typeList.push(['<th>', '手机/电话号码', '</th>'].join(''));
            typeList.push(['<th>', '服务处所', '</th>'].join(''));
            typeList.push(['<th>', '创建时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_WORKERBASEINFO_NAME, '</td>');
                typeList.push('<td>', fields.sis_V_WORKERBASEINFO_IDCARD, '</td>');
                var content = fields.sis_V_WORKERBASEINFO_NATIVEPLACE || '';
                typeList.push('<td title="'+ content +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',content , '</div></td>');

                var content2 = fields.sis_V_WORKERBASEINFO_NATIVEADDRESS || '';
                typeList.push('<td title="'+ content2 +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',content2 , '</div></td>');

                var content3 = fields.sis_V_WORKERBASEINFO_ADDRESS || '';
                typeList.push('<td title="'+ content3 +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',content3 , '</div></td>');

                typeList.push('<td>', fields.sis_V_WORKERBASEINFO_EDUCATIONDEGREE, '</td>');
                typeList.push('<td>', fields.sis_V_WORKERBASEINFO_PHONE, '</td>');
                typeList.push('<td>', fields.sis_V_WORKERBASEINFO_SERVICEPLACE, '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_WORKERBASEINFO_CREATETIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo8', total, pageNum + 1, pageSize);
            }
        })
}
//小区住宅业主信息
function queryInfo9(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '身份证号', '</th>'].join(''));
            typeList.push(['<th>', '电话号码', '</th>'].join(''));
            typeList.push(['<th>', '户口所在地', '</th>'].join(''));
            typeList.push(['<th>', '居住单元', '</th>'].join(''));
            typeList.push(['<th>', '小区名称', '</th>'].join(''));
            typeList.push(['<th>', '创建时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_RST_HOUSING_INFORMATIO_NAME, '</td>');
                typeList.push('<td>', fields.sis_V_RST_HOUSING_INFORMATIO_ID_CARD, '</td>');
                typeList.push('<td>', fields.sis_V_RST_HOUSING_INFORMATIO_TEL, '</td>');
                var content = fields.sis_V_RST_HOUSING_INFORMATIO_NATIV_ADDRESS || '';
                typeList.push('<td title="'+ content +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',content , '</div></td>');

                typeList.push('<td>', fields.sis_V_RST_HOUSING_INFORMATIO_RESIDENTIAL_UN, '</td>');
                typeList.push('<td>', fields.sis_V_RST_HOUSING_INFORMATIO_DEPTNAME, '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_RST_HOUSING_INFORMATIO_CREATED)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo9', total, pageNum + 1, pageSize);
            }
        })
}
//路口信息表
function queryInfo10(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '路口编号', '</th>'].join(''));
            typeList.push(['<th>', '路口名称', '</th>'].join(''));
            typeList.push(['<th>', '卡口类型', '</th>'].join(''));
            typeList.push(['<th>', '车道数', '</th>'].join(''));
            typeList.push(['<th>', '纬度', '</th>'].join(''));
            typeList.push(['<th>', '经度', '</th>'].join(''));
            typeList.push(['<th>', '海拔', '</th>'].join(''));
            typeList.push(['<th>', '使用类型', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', parseInt(fields.hkvs_BMS_CROSSING_INFO_INTERNAL_CODE), '</td>');
                typeList.push('<td>', fields.hkvs_BMS_CROSSING_INFO_CROSSING_NAME, '</td>');
                var type1 = parseInt(fields.hkvs_BMS_CROSSING_INFO_INTERCITY);
				switch(type1){
					case '1':{
						type1 = '普通路口';
						break;
					}
                    case '2':{
                        type1 = '城际路口';
                        break;
                    }
				}
                typeList.push('<td>',type1 , '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_CROSSING_INFO_LANE_NUM), '</td>');
                typeList.push('<td>', fields.hkvs_BMS_CROSSING_INFO_LATITUDE, '</td>');
                typeList.push('<td>', fields.hkvs_BMS_CROSSING_INFO_LONGITUDE, '</td>');
                typeList.push('<td>', fields.hkvs_BMS_CROSSING_INFO_ALTITUDE, '</td>');
                typeList.push('<td>', '路口厂商', '</td>');
                // typeList.push('<td>', fields.hkvs_BMS_CROSSING_INFO_CROSSING_TYPE, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo10', total, pageNum + 1, pageSize);
            }
        })
}
//运维车道过车数据统计
function queryInfo11(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '车道序号', '</th>'].join(''));
            typeList.push(['<th>', '路口名称', '</th>'].join(''));
            typeList.push(['<th>', '昨日过车数', '</th>'].join(''));
            typeList.push(['<th>', '未识别过车数（前一小时）', '</th>'].join(''));
            typeList.push(['<th>', '今日过车', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', parseInt(fields.hkvs_BMS_MAINTENANCE_LANEINFO_LANE_NUMBER), '</td>');
                typeList.push('<td>', fields.hkvs_BMS_MAINTENANCE_LANEINFO_CROSSING_NAME, '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_MAINTENANCE_LANEINFO_YESTERDAY_VEHICLE_PASS), '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_MAINTENANCE_LANEINFO_UNRECOGNIZED_VEHICLE_PASS), '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_MAINTENANCE_LANEINFO_TODAY_VEHICLE_PASS), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo11', total, pageNum + 1, pageSize);
            }
        })
}
//布控信息表
function queryInfo12(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '告警第一次出现的时间', '</th>'].join(''));
            typeList.push(['<th>', '布控车牌号码', '</th>'].join(''));
            typeList.push(['<th>', '布控联系人信息', '</th>'].join(''));
            typeList.push(['<th>', '布控原因', '</th>'].join(''));
            typeList.push(['<th>', '布控开始时间', '</th>'].join(''));
            typeList.push(['<th>', '布控结束时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.hkvs_BMS_PLATE_ALARM_ALARM_START_PERIOD, '</td>');
                typeList.push('<td>', fields.hkvs_BMS_PLATE_ALARM_PLATE_INFO, '</td>');
                typeList.push('<td>', fields.hkvs_BMS_PLATE_ALARM_CONTECT_INFO, '</td>');
                var reason = fields.hkvs_BMS_PLATE_ALARM_REASON;
                switch(reason){
					case '1':{
						reason = '被盗车';
						break;
					}
                    case '2':{
                        reason = '被抢车';
                        break;
                    }
					case '3':{
                        reason = '嫌疑车';
                        break;
                    }
					case '4':{
                        reason = '交通违法车';
                        break;
                    }
					case '5':{
                        reason = '紧急查控车';
                        break;
                    }
				}
                typeList.push('<td>',reason , '</td>');
                typeList.push('<td>', formatDate2((fields.hkvs_BMS_PLATE_ALARM_ALARM_START_TIME)), '</td>');
                typeList.push('<td>', formatDate2((fields.hkvs_BMS_PLATE_ALARM_ALARM_STOP_TIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo12', total, pageNum + 1, pageSize);
            }
        })
}
//所有过车信息表
function queryInfo13(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '卡口ID', '</th>'].join(''));
            typeList.push(['<th>', '车牌号码', '</th>'].join(''));
            typeList.push(['<th>', '车身颜色', '</th>'].join(''));
            typeList.push(['<th>', '车辆速度', '</th>'].join(''));
            typeList.push(['<th>', '车辆类型', '</th>'].join(''));
            typeList.push(['<th>', '车标', '</th>'].join(''));
            typeList.push(['<th>', '过车时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_PASS_CROSSING_ID), '</td>');
                typeList.push('<td>', fields.hkvs_BMS_VEHICLE_PASS_PLATE_INFO, '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_PASS_VEHICLE_COLOR), '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_PASS_VEHICLE_SPEED), '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_PASS_VEHICLE_TYPE), '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_PASS_VEHICLE_LOGO), '</td>');
                typeList.push('<td>', formatDate2((fields.hkvs_BMS_VEHICLE_PASS_PASS_TIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo13', total, pageNum + 1, pageSize);
            }
        })
}
//违章过车表
function queryInfo15(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '卡口id', '</th>'].join(''));
            typeList.push(['<th>', '车道id', '</th>'].join(''));
            typeList.push(['<th>', '车牌号码', '</th>'].join(''));
            typeList.push(['<th>', '车速', '</th>'].join(''));
            typeList.push(['<th>', '车辆类型', '</th>'].join(''));
            typeList.push(['<th>', '车标', '</th>'].join(''));
            typeList.push(['<th>', '违章时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_VIOLATION_CROSSING_ID), '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_VIOLATION_LANE_ID), '</td>');
                typeList.push('<td>', fields.hkvs_BMS_VEHICLE_VIOLATION_PLATE_INFO, '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_VIOLATION_VEHICLE_SPEED), '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_VIOLATION_VEHICLE_TYPE), '</td>');
                typeList.push('<td>', parseInt(fields.hkvs_BMS_VEHICLE_VIOLATION_VEHICLE_LOGO), '</td>');
                typeList.push('<td>', formatDate2((fields.hkvs_BMS_VEHICLE_VIOLATION_ALARM_TIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo15', total, pageNum + 1, pageSize);
            }
        })
}

//人脸比中结果信息
function queryInfo16(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '身份证号', '</th>'].join(''));
            typeList.push(['<th>', '国籍', '</th>'].join(''));
            typeList.push(['<th>', '性别', '</th>'].join(''));
            typeList.push(['<th>', '年龄', '</th>'].join(''));
            typeList.push(['<th>', '拍摄地点', '</th>'].join(''));
            typeList.push(['<th>', '拍摄时间', '</th>'].join(''));
            typeList.push(['<th>', '对比得分', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.PLATE_INFO, '</td>');
                typeList.push('<td>', fields.VEHICLE_SPEED, '</td>');
                typeList.push('<td>', fields.VEHICLE_TYPE, '</td>');
                typeList.push('<td>', fields.VEHICLE_LOGO, '</td>');
                typeList.push('<td>', fields.CROSSING_ID, '</td>');
                typeList.push('<td>', fields.LANE_ID, '</td>');
                typeList.push('<td>', fields.ALARM_TIME, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo16', total, pageNum + 1, pageSize);
            }
        })
}
// 全国重点人员
function queryInfo17(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
            if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }

            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '部级重点人员编号', '</th>'].join(''));
            typeList.push(['<th>', '重点人员类别标记', '</th>'].join(''));
            typeList.push(['<th>', '公民身份号码', '</th>'].join(''));
            typeList.push(['<th>', '籍贯', '</th>'].join(''));
            typeList.push(['<th>', '户籍地详址', '</th>'].join(''));
            typeList.push(['<th>', '现住地详址', '</th>'].join(''));
            typeList.push(['<th>', '纳入部级重点人员库时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.zdrXY_T_ZZRK_QGZDRYXX_XM, '</td>');
                typeList.push('<td>', fields.zdrXY_T_ZZRK_QGZDRYXX_BJZDRYBH, '</td>');
                typeList.push('<td>', fields.zdrXY_T_ZZRK_QGZDRYXX_ZDRYLBBJ, '</td>');
                typeList.push('<td>', fields.zdrXY_T_ZZRK_QGZDRYXX_SFZH, '</td>');
                typeList.push('<td>', fields.zdrXY_T_ZZRK_QGZDRYXX_JG, '</td>');
                var content = fields.zdrXY_T_ZZRK_QGZDRYXX_HJDXZ || '';
                typeList.push('<td title="'+ content +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',content , '</div></td>');

                var content2 = fields.zdrXY_T_ZZRK_QGZDRYXX_XZDXZ || '';
                typeList.push('<td title="'+ content2 +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',content2 , '</div></td>');

                typeList.push('<td>', formatDate2(fields.zdrXY_T_ZZRK_QGZDRYXX_NRBJZDRYKSJ), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo17', total, pageNum + 1, pageSize);
            }
        })
}
//中小学校在校学生信息
function queryInfo18(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '性别', '</th>'].join(''));
            typeList.push(['<th>', '出生日期', '</th>'].join(''));
            typeList.push(['<th>', '民族', '</th>'].join(''));
            typeList.push(['<th>', '籍贯', '</th>'].join(''));
            typeList.push(['<th>', '户口所在地', '</th>'].join(''));
            typeList.push(['<th>', '现住址', '</th>'].join(''));
            typeList.push(['<th>', '联系电话', '</th>'].join(''));
            typeList.push(['<th>', '年级', '</th>'].join(''));
            typeList.push(['<th>', '班级', '</th>'].join(''));
            typeList.push(['<th>', '学籍号', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXXZXSXX_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXXZXSXX_XB, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_ZXXZXSXX_CSRQ)), '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXXZXSXX_MZ, '</td>');
                var content = fields.QHQB_T_QHQB_ZXXZXSXX_JG || '';
				if(content.length > 20){
					content = content.slice(0,20)+'……';
				}
                typeList.push('<td title="'+ content +'">',content , '</td>');

                var content2 = fields.QHQB_T_QHQB_ZXXZXSXX_HKSZD || '';
				if(content2.length > 20){
					content2 = content2.slice(0,20)+'……';
				}
                typeList.push('<td title="'+ content2 +'">',content2 , '</td>');

                var content3 = fields.QHQB_T_QHQB_ZXXZXSXX_XZZ || '';
				if(content3.length > 20){
					content3 = content3.slice(0,20)+'……';
				}
                typeList.push('<td title="'+ content3 +'">',content3 , '</td>');

                typeList.push('<td>', fields.QHQB_T_QHQB_ZXXZXSXX_LXDH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXXZXSXX_LJ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXXZXSXX_BJ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXXZXSXX_XJH, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo18', total, pageNum + 1, pageSize);
            }
        })
}
//研究生信息
function queryInfo19(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '性别', '</th>'].join(''));
            typeList.push(['<th>', '出生日期', '</th>'].join(''));
            typeList.push(['<th>', '身份证号', '</th>'].join(''));
            typeList.push(['<th>', '政治面貌', '</th>'].join(''));
            typeList.push(['<th>', '民族', '</th>'].join(''));
            typeList.push(['<th>', '学校名称', '</th>'].join(''));
            typeList.push(['<th>', '专业名称', '</th>'].join(''));
            typeList.push(['<th>', '教育程度', '</th>'].join(''));
            typeList.push(['<th>', '学制', '</th>'].join(''));
            typeList.push(['<th>', '学习方式', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_XB, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_YJSXX_CSRQ)), '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_SFZH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_ZZMM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_MZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_YXMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_ZYMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_CC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_XZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YJSXX_XXXS, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo19', total, pageNum + 1, pageSize);
            }
        })
}
//低保人员信息
function queryInfo20(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '身份证', '</th>'].join(''));
            typeList.push(['<th>', '与户主的关系', '</th>'].join(''));
            typeList.push(['<th>', '就业状况', '</th>'].join(''));
            typeList.push(['<th>', '保障金额', '</th>'].join(''));
            typeList.push(['<th>', '起始年月', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_DBRYXX_CAC002, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DBRYXX_CAC004, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DBRYXX_CAC015, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DBRYXX_CAC008, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DBRYXX_CBE077, '</td>');
                typeList.push('<td>', formateDate3(fields.QHQB_T_QHQB_DBRYXX_CBE071), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo20', total, pageNum + 1, pageSize);
            }
        })
}
//参保人员信息
function queryInfo21(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '个人编号', '</th>'].join(''));
            typeList.push(['<th>', '组织机构代码', '</th>'].join(''));
            typeList.push(['<th>', '单位名称', '</th>'].join(''));
            typeList.push(['<th>', '险种', '</th>'].join(''));
            typeList.push(['<th>', '参保状态', '</th>'].join(''));
            typeList.push(['<th>', '参保年月', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_CBRYXX_GRBH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CBRYXX_ZZJGDM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CBRYXX_DWMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CBRYXX_XZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CBRYXX_CBZT, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CBRYXX_CBNY, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo21', total, pageNum + 1, pageSize);
            }
        })
}
//参保人员变更信息
function queryInfo22(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '单位名称', '</th>'].join(''));
            typeList.push(['<th>', '变更类型', '</th>'].join(''));
            typeList.push(['<th>', '变更原因', '</th>'].join(''));
            typeList.push(['<th>', '处置时间', '</th>'].join(''));
            typeList.push(['<th>', '变更日期', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_CBRYBGXX_DWMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CBRYBGXX_BGLX, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CBRYBGXX_BGYY, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_CBRYBGXX_CZSJ)), '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_CBRYBGXX_BGRQ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo22', total, pageNum + 1, pageSize);
            }
        })
}
//普通专本科信息
function queryInfo23(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '性别', '</th>'].join(''));
            typeList.push(['<th>', '身份证号', '</th>'].join(''));
            typeList.push(['<th>', '民族', '</th>'].join(''));
            typeList.push(['<th>', '学校名称', '</th>'].join(''));
            typeList.push(['<th>', '专业名称', '</th>'].join(''));
            typeList.push(['<th>', '教育程度', '</th>'].join(''));
            typeList.push(['<th>', '学院', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_PTZBKSXX_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_PTZBKSXX_XB, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_PTZBKSXX_SFZH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_PTZBKSXX_MZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_PTZBKSXX_YXMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_PTZBKSXX_ZYMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_PTZBKSXX_CC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_PTZBKSXX_FY, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo23', total, pageNum + 1, pageSize);
            }
        })
}
//燃气用户信息
function queryInfo24(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '联系号码', '</th>'].join(''));
            typeList.push(['<th>', '身份证', '</th>'].join(''));
            typeList.push(['<th>', '状态', '</th>'].join(''));
            typeList.push(['<th>', '地址', '</th>'].join(''));
            typeList.push(['<th>', '开通时间', '</th>'].join(''));
            typeList.push(['<th>', '停止使用时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_RQYHSJ_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_RQYHSJ_LXHM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_RQYHSJ_SFZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_RQYHSJ_ZT, '</td>');

                var detail = fields.QHQB_T_QHQB_RQYHSJ_DZ || '';
                if(detail.length > 20){
                    detail=detail.slice(0,20)+'......';
                } 
                typeList.push('<td title="'+ detail +'">',detail , '</td>');

                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_RQYHSJ_KTSJ)), '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_RQYHSJ_TZSYSJ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo24', total, pageNum + 1, pageSize);
            }
        })
}
//会计人员信息
function queryInfo25(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '会计人ID', '</th>'].join(''));
            typeList.push(['<th>', '会计人名称', '</th>'].join(''));
            typeList.push(['<th>', '会计编号', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_KJRXXK_CZ_KJRID, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_KJRXXK_CZ_KJRMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_KJRXXK_CZ_KJBH, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo25', total, pageNum + 1, pageSize);
            }
        })
}
//财政供养人员信息
function queryInfo26(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '单位名称', '</th>'].join(''));
            typeList.push(['<th>', '身份证号码', '</th>'].join(''));
            typeList.push(['<th>', '人员类别', '</th>'].join(''));
            typeList.push(['<th>', '人员身份', '</th>'].join(''));
            typeList.push(['<th>', '职务（职称）', '</th>'].join(''));
            typeList.push(['<th>', '学历', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_GYRYXX_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GYRYXX_DWMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GYRYXX_SFZHM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GYRYXX_RYLX, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GYRYXX_RYSF, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GYRYXX_ZW, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GYRYXX_XL, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo26', total, pageNum + 1, pageSize);
            }
        })
}
//在校生花名册市县信息
function queryInfo27(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '性别', '</th>'].join(''));
            typeList.push(['<th>', '联系电话', '</th>'].join(''));
            typeList.push(['<th>', '身份证号码', '</th>'].join(''));
            typeList.push(['<th>', '户籍所在省', '</th>'].join(''));
            typeList.push(['<th>', '户籍所在市', '</th>'].join(''));
            typeList.push(['<th>', '学校名称', '</th>'].join(''));
            typeList.push(['<th>', '学习形式', '</th>'].join(''));
            typeList.push(['<th>', '入学年月', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCSX_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCSX_XB, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCSX_LXDHD, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCSX_SFZHM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCSX_FJSZC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCSX_FJSZS, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCSX_XXMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCSX_XXXS, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCSX_RXLY, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo27', total, pageNum + 1, pageSize);
            }
        })
}
//计生委流动人口信息
function queryInfo28(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '性别', '</th>'].join(''));
            typeList.push(['<th>', '民族', '</th>'].join(''));
            typeList.push(['<th>', '与户主关系', '</th>'].join(''));
            typeList.push(['<th>', '现居住地', '</th>'].join(''));
            typeList.push(['<th>', '村居小组', '</th>'].join(''));
            typeList.push(['<th>', '户口状况', '</th>'].join(''));
            typeList.push(['<th>', '身份证号码', '</th>'].join(''));
            typeList.push(['<th>', '婚姻状况', '</th>'].join(''));
            typeList.push(['<th>', '现住详址', '</th>'].join(''));
            typeList.push(['<th>', '户籍地地址', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_JSW_LDRKXX_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_JSW_LDRKXX_XB, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_JSW_LDRKXX_MZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_JSW_LDRKXX_YFZGX, '</td>');
				var detail3 = fields.QHQB_T_QHQB_JSW_LDRKXX_XJZD || '';
				if(detail3.length > 20){
					detail3 = detail3.slice(0,20)+'……';
				}
				typeList.push('<td title="'+ detail3 +'">',detail3 , '</td>');

                typeList.push('<td>', fields.QHQB_T_QHQB_JSW_LDRKXX_CJXZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_JSW_LDRKXX_HKZK, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_JSW_LDRKXX_SFZHM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_JSW_LDRKXX_HYZK, '</td>');
                var detail = fields.QHQB_T_QHQB_JSW_LDRKXX_XZXZ || '';
                if(detail.length > 20){
					detail = detail.slice(0,20)+'……';
				}
                typeList.push('<td title="'+ detail +'">',detail , '</td>');

                var detail2 = fields.QHQB_T_QHQB_JSW_LDRKXX_HJDDZ || '';
				if(detail2.length > 20){
					detail2 = detail2.slice(0,20)+'……';
				}
                typeList.push('<td title="'+ detail2 +'">',detail2 , '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo28', total, pageNum + 1, pageSize);
            }
        })
}
//常住境外人员学生信息
function queryInfo29(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '人员编号', '</th>'].join(''));
            typeList.push(['<th>', '学生证号', '</th>'].join(''));
            typeList.push(['<th>', '学校名称', '</th>'].join(''));
            typeList.push(['<th>', '所学专业', '</th>'].join(''));
            typeList.push(['<th>', '所学专业中文', '</th>'].join(''));
            typeList.push(['<th>', '入学时间', '</th>'].join(''));
            typeList.push(['<th>', '学习期限', '</th>'].join(''));
            typeList.push(['<th>', '预计离校时间', '</th>'].join(''));
            typeList.push(['<th>', '登记单位', '</th>'].join(''));
            typeList.push(['<th>', '登记日期', '</th>'].join(''));
            typeList.push(['<th>', '户籍地地址', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_CRJ_XSXX_SERIAL, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CRJ_XSXX_CERTIFNO, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CRJ_XSXX_SCHOOL, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CRJ_XSXX_SPECIALTY, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CRJ_XSXX_CSPECIALTY, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_CRJ_XSXX_BEGINDATE)), '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CRJ_XSXX_ENDDATE, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_CRJ_XSXX_LEAVEDATE)), '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CRJ_XSXX_APPLUNIT, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_CRJ_XSXX_APPLDATE)), '</td>');
                var detail = fields.QHQB_T_QHQB_CRJ_XSXX_HJDDZ || '';
                typeList.push('<td title="'+ detail +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',detail , '</div></td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo29', total, pageNum + 1, pageSize);
            }
        })
}
//国税登记纳税人信息表
function queryInfo30(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '法定代表人名称', '</th>'].join(''));
            typeList.push(['<th>', '纳税人名称', '</th>'].join(''));
            typeList.push(['<th>', '纳税人识别号', '</th>'].join(''));
            typeList.push(['<th>', '组织机构代码', '</th>'].join(''));
            typeList.push(['<th>', '生产经营地址', '</th>'].join(''));
            typeList.push(['<th>', '税务机关名称', '</th>'].join(''));
            typeList.push(['<th>', '电话号码', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_GSDJNSRXX_FDDBRMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSDJNSRXX_NSRMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSDJNSRXX_NSRSBH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSDJNSRXX_ZZJGDM, '</td>');
                var detail = fields.QHQB_T_QHQB_GSDJNSRXX_SCJYDZ || '';
                typeList.push('<td title="'+ detail +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',detail , '</div></td>');

                typeList.push('<td>', fields.QHQB_T_QHQB_GSDJNSRXX_SWJG_MC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSDJNSRXX_DHHM, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo30', total, pageNum + 1, pageSize);
            }
        })
}
//成教在校生信息
function queryInfo31(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '身份证号', '</th>'].join(''));
            typeList.push(['<th>', '学校名称', '</th>'].join(''));
            typeList.push(['<th>', '专业名称', '</th>'].join(''));
            typeList.push(['<th>', '学制', '</th>'].join(''));
            typeList.push(['<th>', '学习方式', '</th>'].join(''));
            typeList.push(['<th>', '入学日期', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_CJZXSXX_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CJZXSXX_SFZH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CJZXSXX_YXMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CJZXSXX_ZYMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CJZXSXX_XZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CJZXSXX_XXXS, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_CJZXSXX_RXRQ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo31', total, pageNum + 1, pageSize);
            }
        })
}
//在校生花名册省属信息
function queryInfo32(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '身份证号', '</th>'].join(''));
            typeList.push(['<th>', '户籍所在省', '</th>'].join(''));
            typeList.push(['<th>', '户籍所在市', '</th>'].join(''));
            typeList.push(['<th>', '学校名称', '</th>'].join(''));
            typeList.push(['<th>', '学制', '</th>'].join(''));
            typeList.push(['<th>', '入学年月', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCZX_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCZX_SFZH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCZX_FJSZS, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCZX_FJSZC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCZX_XXMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCZX_XZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_ZXSHMCZX_RXLY, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo32', total, pageNum + 1, pageSize);
            }
        })
}
//海口电动车信息
function queryInfo33(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '所有人', '</th>'].join(''));
            typeList.push(['<th>', '证件号码', '</th>'].join(''));
            typeList.push(['<th>', '登记地点', '</th>'].join(''));
            typeList.push(['<th>', '电机号', '</th>'].join(''));
            typeList.push(['<th>', '车架号', '</th>'].join(''));
            typeList.push(['<th>', '联系电话', '</th>'].join(''));
            typeList.push(['<th>', '手机号码', '</th>'].join(''));
            typeList.push(['<th>', '登记地址', '</th>'].join(''));
            typeList.push(['<th>', '经办人', '</th>'].join(''));
            typeList.push(['<th>', '品牌型号', '</th>'].join(''));
            typeList.push(['<th>', '状态', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_SYR, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_ZHHM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_DW, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_DJH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_CJH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_LXDH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_SJHM, '</td>');
                var detail = fields.QHQB_T_QHQB_HKDDC_XXDZ || '';
                typeList.push('<td title="'+ detail +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',detail , '</div></td>');

                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_BZY, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_CPPXH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HKDDC_CLZT, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo33', total, pageNum + 1, pageSize);
            }
        })
}
//有线电视模拟数据
function queryInfo34(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '客户姓名', '</th>'].join(''));
            typeList.push(['<th>', '区域', '</th>'].join(''));
            typeList.push(['<th>', '小区', '</th>'].join(''));
            typeList.push(['<th>', '地址', '</th>'].join(''));
            typeList.push(['<th>', '分公司', '</th>'].join(''));
            typeList.push(['<th>', '联系电话', '</th>'].join(''));
            typeList.push(['<th>', '用户状态', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSMNSJ_KHXM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSMNSJ_QY, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSMNSJ_XQ, '</td>');
                var detail = fields.QHQB_T_QHQB_YXDSMNSJ_DZ || '';
                typeList.push('<td title="'+ detail +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',detail , '</div></td>');

                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSMNSJ_FGS, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSMNSJ_LXDH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSMNSJ_YHZT, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo34', total, pageNum + 1, pageSize);
            }
        })
}
//有线电视数字数据
function queryInfo35(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '客户姓名', '</th>'].join(''));
            typeList.push(['<th>', '区域', '</th>'].join(''));
            typeList.push(['<th>', '小区', '</th>'].join(''));
            typeList.push(['<th>', '地址', '</th>'].join(''));
            typeList.push(['<th>', '分公司', '</th>'].join(''));
            typeList.push(['<th>', '联系电话', '</th>'].join(''));
            typeList.push(['<th>', '用户状态', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSSZSJ_KHXM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSSZSJ_QY, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSSZSJ_XQ, '</td>');
                var detail = fields.QHQB_T_QHQB_YXDSSZSJ_DZ || '';
                typeList.push('<td title="'+ detail +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',detail , '</div></td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSSZSJ_FGS, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSSZSJ_LXDH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSSZSJ_YHZT, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo35', total, pageNum + 1, pageSize);
            }
        })
}
//有线电视停机缴费未开通数据
function queryInfo36(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '分公司', '</th>'].join(''));
            typeList.push(['<th>', '产品名称', '</th>'].join(''));
            typeList.push(['<th>', '缴费金额', '</th>'].join(''));
            typeList.push(['<th>', '账户余额', '</th>'].join(''));
            typeList.push(['<th>', '最后一次停机时间', '</th>'].join(''));
            typeList.push(['<th>', '受理时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSTJJFWKT_FGS, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSTJJFWKT_CPMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSTJJFWKT_JFJE, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSTJJFWKT_ZHYE, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_YXDSTJJFWKT_ZHYCTJSJ)), '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_YXDSTJJFWKT_SLSJ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo36', total, pageNum + 1, pageSize);
            }
        })
}
//有线电视开户
function queryInfo37(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '客户姓名', '</th>'].join(''));
            typeList.push(['<th>', '身份证编号', '</th>'].join(''));
            typeList.push(['<th>', '身份证号码', '</th>'].join(''));
            typeList.push(['<th>', '电话', '</th>'].join(''));
            typeList.push(['<th>', '地区', '</th>'].join(''));
            typeList.push(['<th>', '地址', '</th>'].join(''));
            typeList.push(['<th>', '客户状态', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSKF_KFXM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSKF_SFZBM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSKF_SFZH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSKF_LXDH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSKF_DQ, '</td>');
                var detail = fields.QHQB_T_QHQB_YXDSKF_KFDZ || '';
                typeList.push('<td title="'+ detail +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',detail , '</div></td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_YXDSKF_DSKFZT, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo37', total, pageNum + 1, pageSize);
            }
        })
}
//地税纳税登记信息
function queryInfo38(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '纳税人名称', '</th>'].join(''));
            typeList.push(['<th>', '法定代表', '</th>'].join(''));
            typeList.push(['<th>', '纳税人申报号', '</th>'].join(''));
            typeList.push(['<th>', '组织机构代码', '</th>'].join(''));
            typeList.push(['<th>', '联系电话', '</th>'].join(''));
            typeList.push(['<th>', '企业注册号', '</th>'].join(''));
            typeList.push(['<th>', '企业标志', '</th>'].join(''));
            typeList.push(['<th>', '注册地址', '</th>'].join(''));
            typeList.push(['<th>', '税务登记机关', '</th>'].join(''));
            typeList.push(['<th>', '税务登记日期', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_DSLSDJXX_NSRMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSLSDJXX_FDDBR, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSLSDJXX_NSRSBH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSLSDJXX_ZZJGDM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSLSDJXX_LXDH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSLSDJXX_QYZCH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSLSDJXX_QY_BZ, '</td>');
                var detail = fields.QHQB_T_QHQB_DSLSDJXX_ZCDZ || '';
                typeList.push('<td title="'+ detail +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">',detail , '</div></td>');

                typeList.push('<td>', fields.QHQB_T_QHQB_DSLSDJXX_SWDJJG, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_DSLSDJXX_SWDJRQ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo38', total, pageNum + 1, pageSize);
            }
        })
}
//地税注销信息表
function queryInfo39(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '纳税人名称', '</th>'].join(''));
            typeList.push(['<th>', '纳税人识别号', '</th>'].join(''));
            typeList.push(['<th>', '注销机构', '</th>'].join(''));
            typeList.push(['<th>', '注销原因', '</th>'].join(''));
            typeList.push(['<th>', '注销日期', '</th>'].join(''));
            typeList.push(['<th>', '企业备注', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_DSZX_NSRMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSZX_NSRSBH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSZX_ZXJG, '</td>');
                var detail = fields.QHQB_T_QHQB_DSZX_ZXYY || '';
                if(detail.length > 20){
					detail = detail.slice(0,20)+'……';
                }
                typeList.push('<td title="'+ detail +'">,detail ,</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_DSZX_ZXRQ)), '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSZX_QY_BZ, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo39', total, pageNum + 1, pageSize);
            }
        })
}
/*地税验换证信息表*/
function queryInfo40(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '纳税人识别号', '</th>'].join(''));
            typeList.push(['<th>', '企业注册号', '</th>'].join(''));
            typeList.push(['<th>', '组织机构代码', '</th>'].join(''));
            typeList.push(['<th>', '纳税人名称', '</th>'].join(''));
            typeList.push(['<th>', '验换证日期', '</th>'].join(''));
            typeList.push(['<th>', '企业备注', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_DSYHZ_NSRSBH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSYHZ_QYZCH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSYHZ_ZZJGDM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSYHZ_NSRMC, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_DSYHZ_YHZRQ)), '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSYHZ_QY_BZ, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo40', total, pageNum + 1, pageSize);
            }
        })
}
/*地税非正常户信息表*/
function queryInfo41(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '纳税人识别号', '</th>'].join(''));
            typeList.push(['<th>', '企业注册号', '</th>'].join(''));
            typeList.push(['<th>', '组织机构代码', '</th>'].join(''));
            typeList.push(['<th>', '纳税人名称', '</th>'].join(''));
            typeList.push(['<th>', '非正常户认定日期', '</th>'].join(''));
            typeList.push(['<th>', '非正常户检查日期', '</th>'].join(''));
            typeList.push(['<th>', '企业备注', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_DSFZCH_NSRSBH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSFZCH_QYZCH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSFZCH_ZZJGDM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSFZCH_NSRMC, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_DSFZCH_FZCHRDRQ)), '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_DSFZCH_FZCHJCRQ)), '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_DSFZCH_QY_BZ, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo41', total, pageNum + 1, pageSize);
            }
        })
}
/*国税注销登记信息表*/
function queryInfo42(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '纳税人识别号', '</th>'].join(''));
            typeList.push(['<th>', '组织机构代码', '</th>'].join(''));
            typeList.push(['<th>', '纳税人名称', '</th>'].join(''));
            typeList.push(['<th>', '注销原因名称', '</th>'].join(''));
            typeList.push(['<th>', '税务机关名称', '</th>'].join(''));
            typeList.push(['<th>', '填报日期', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_GSZX_NSRSBH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSZX_ZZJGDM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSZX_NSRMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSZX_ZXYY_MC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSZX_SWJG_MC, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_GSZX_TBRQ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo42', total, pageNum + 1, pageSize);
            }
        })
}
/*国税验换证信息表*/
function queryInfo43(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '纳税人识别号', '</th>'].join(''));
            typeList.push(['<th>', '组织机构代码', '</th>'].join(''));
            typeList.push(['<th>', '纳税人名称', '</th>'].join(''));
            typeList.push(['<th>', '办理验换证日期', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_GSYHZ_NSRSBH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSYHZ_ZZJGDM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSYHZ_NSRMC, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_GSYHZ_BLYHZ_RQ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo43', total, pageNum + 1, pageSize);
            }
        })
}
/*国税非正常户信息表*/
function queryInfo44(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '纳税人识别号', '</th>'].join(''));
            typeList.push(['<th>', '组织机构代码', '</th>'].join(''));
            typeList.push(['<th>', '纳税人名称', '</th>'].join(''));
            typeList.push(['<th>', '认定日期', '</th>'].join(''));
            typeList.push(['<th>', '有限期至', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_GSFZCHXX_NSRSBH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSFZCHXX_ZZJGDM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSFZCHXX_NSRMC, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_GSFZCHXX_RDRQ)), '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_GSFZCHXX_YXQ_Z)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo44', total, pageNum + 1, pageSize);
            }
        })
}
/*工商注销信息表*/
function queryInfo45(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '注册编号', '</th>'].join(''));
            typeList.push(['<th>', '公司名称', '</th>'].join(''));
            typeList.push(['<th>', '审批时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_GSZXXX_REGISTERNO, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSZXXX_CORPNAME, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_GSZXXX_APPROVEDATE)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo45', total, pageNum + 1, pageSize);
            }
        })
}
/*工商吊销信息表*/
function queryInfo46(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '注册编号', '</th>'].join(''));
            typeList.push(['<th>', '公司名称', '</th>'].join(''));
            typeList.push(['<th>', '吊销原因', '</th>'].join(''));
            typeList.push(['<th>', '审批时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_GSDXXX_REGISTERNO, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSDXXX_CORPNAME, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSDXXX_CANCELOPINION, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_GSDXXX_APPROVEDATE)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo46', total, pageNum + 1, pageSize);
            }
        })
}
/*工商变更信息表*/
function queryInfo47(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '注册号', '</th>'].join(''));
            typeList.push(['<th>', '公司名称', '</th>'].join(''));
            typeList.push(['<th>', '变更字段', '</th>'].join(''));
            typeList.push(['<th>', '变更字段旧值', '</th>'].join(''));
            typeList.push(['<th>', '变更字段新值', '</th>'].join(''));
            typeList.push(['<th>', '审批时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_GSBGXX_REGISTERNO, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSBGXX_CORPNAME, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSBGXX_FIELDNAME, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSBGXX_OLDVALUE, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSBGXX_NEWVALUE, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_GSBGXX_APPROVEDATE)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo47', total, pageNum + 1, pageSize);
            }
        })
}
/*工商年检信息表*/
function queryInfo48(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '注册号', '</th>'].join(''));
            typeList.push(['<th>', '公司名称', '</th>'].join(''));
            typeList.push(['<th>', '检查年份', '</th>'].join(''));
            typeList.push(['<th>', '审批时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_GSNJXX_REGISTERNO, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSNJXX_CORPNAME, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_GSNJXX_CHECKYEAR, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_GSNJXX_APPROVEDATE)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo48', total, pageNum + 1, pageSize);
            }
        })
}
/*工商信息登记表没有表名*/
function queryInfo49(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '公司名称', '</th>'].join(''));
            typeList.push(['<th>', '注册人', '</th>'].join(''));
            typeList.push(['<th>', '地址', '</th>'].join(''));
            typeList.push(['<th>', '电话', '</th>'].join(''));
            typeList.push(['<th>', '经营范围', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.CORPNAME, '</td>');
                typeList.push('<td>', fields.PRINCIPAL, '</td>');
                typeList.push('<td>', fields.ADDRESS, '</td>');
                typeList.push('<td>', fields.TELEPHONE, '</td>');
                typeList.push('<td>', fields.BUSINESSSCOPE, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo49', total, pageNum + 1, pageSize);
            }
        })
}
/*道路运输从业人员信息*/
function queryInfo50(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '通讯地址', '</th>'].join(''));
            typeList.push(['<th>', '联系电话', '</th>'].join(''));
            typeList.push(['<th>', '身份证号', '</th>'].join(''));
            typeList.push(['<th>', '从业资格证号', '</th>'].join(''));
            typeList.push(['<th>', '发证机关', '</th>'].join(''));
            typeList.push(['<th>', '从业类别', '</th>'].join(''));
            typeList.push(['<th>', '从业地区', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_CYRY_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CYRY_TXDZ, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CYRY_LXDH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CYRY_SFZH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CYRY_ZGZH, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CYRY_FZJG, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CYRY_CYLB, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_CYRY_CYDQ, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo50', total, pageNum + 1, pageSize);
            }
        })
}
/*婚姻登记信息表*/
function queryInfo51(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '男姓名', '</th>'].join(''));
            typeList.push(['<th>', '男身份证件号码', '</th>'].join(''));
            typeList.push(['<th>', '男婚姻状况', '</th>'].join(''));
            typeList.push(['<th>', '女姓名', '</th>'].join(''));
            typeList.push(['<th>', '女身份证件号码', '</th>'].join(''));
            typeList.push(['<th>', '女婚姻状况', '</th>'].join(''));
            typeList.push(['<th>', '承办机构', '</th>'].join(''));
            typeList.push(['<th>', '结婚登记日期', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_HYDJXX_MNAME, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HYDJXX_MSFZJHM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HYDJXX_MHYZK, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HYDJXX_WNAME, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HYDJXX_WSFZJHM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HYDJXX_WHYZK, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HYDJXX_CBJGMC, '</td>');
                typeList.push('<td>', formatDate2((fields.QHQB_T_QHQB_HYDJXX_JHDJRQ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo51', total, pageNum + 1, pageSize);
            }
        })
}

//终端特征信息
function queryInfo52(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '身份类型', '</th>'].join(''));
            typeList.push(['<th>', '身份内容', '</th>'].join(''));
            typeList.push(['<th>', '采集时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_1001_IDENTIFICATION_TYPE, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_1001_CERTIFICATE_CODE, '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_WA_SOURCE_FJ_1001_CAPTURE_TIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo52', total, pageNum + 1, pageSize);
            }
        })
}
// 热点信息采集
function queryInfo53(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '热点MAC地址', '</th>'].join(''));
            typeList.push(['<th>', '热点SSID', '</th>'].join(''));
            typeList.push(['<th>', '采集设备经度', '</th>'].join(''));
            typeList.push(['<th>', '采集设备纬度', '</th>'].join(''));
            typeList.push(['<th>', '采集时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_1002_AP_MAC, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_1002_AP_SSID, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_1002_COLLECTION_EQUIPMENT_LONGITUDE, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_1002_COLLECTION_EQUIPMENT_LATITUDE, '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_WA_SOURCE_FJ_1002_CAPTURE_TIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo53', total, pageNum + 1, pageSize);
            }
        })
}
//终端上下线信息
function queryInfo54(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '上网人员姓名', '</th>'].join(''));
            typeList.push(['<th>', '身份证件类型', '</th>'].join(''));
            typeList.push(['<th>', '身份证件号码', '</th>'].join(''));
            typeList.push(['<th>', '上网服务场所编码', '</th>'].join(''));
            typeList.push(['<th>', '场所类型', '</th>'].join(''));
            typeList.push(['<th>', '终端IMSI码', '</th>'].join(''));
            typeList.push(['<th>', '终端品牌', '</th>'].join(''));
            typeList.push(['<th>', '终端型号', '</th>'].join(''));
            typeList.push(['<th>', '上线时间', '</th>'].join(''));
            typeList.push(['<th>', '下线时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0001_NAME, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0001_CERTIFICATE_TYPE, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0001_CERTIFICATE_CODE, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0001_NETBAR_WACODE, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0001_NETSITE_TYPE, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0001_IMSI, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0001_BRAND, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0001_MODEL, '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_WA_SOURCE_FJ_0001_START_TIME)), '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_WA_SOURCE_FJ_0001_END_TIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo54', total, pageNum + 1, pageSize);
            }
        })
}
//上网日志
function queryInfo55(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '上网服务场所编码', '</th>'].join(''));
            typeList.push(['<th>', '场所内网IP地址', '</th>'].join(''));
            typeList.push(['<th>', '源外网IPv4地址', '</th>'].join(''));
            typeList.push(['<th>', '终端MAC地址', '</th>'].join(''));
            typeList.push(['<th>', '日志记录时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0002_NETSERVERPORT_WACODE, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0002_IP_ADDRESS, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0002_SRC_IP, '</td>');
                typeList.push('<td>', fields.sis_V_WA_SOURCE_FJ_0002_MAC, '</td>');
                typeList.push('<td>', formatDate2((fields.sis_V_WA_SOURCE_FJ_0002_CAPTURE_TIME)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo55', total, pageNum + 1, pageSize);
            }
        })
}
//终端特征移动采集设备轨迹
function queryInfo56(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '采集设备编号', '</th>'].join(''));
            typeList.push(['<th>', '场所编号', '</th>'].join(''));
            typeList.push(['<th>', '采集设备经度', '</th>'].join(''));
            typeList.push(['<th>', '时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.sis_V_WA_BASIC_FJ_1001_COLLECTION_EQUIPMENT_ID, '</td>');
                typeList.push('<td>', fields.sis_V_WA_BASIC_FJ_1001_NETBAR_WACODE, '</td>');
                typeList.push('<td>', fields.sis_V_WA_BASIC_FJ_1001_COLLECTION_EQUIPMENT_LONGITUDE, '</td>');
                typeList.push('<td>', formatDate2(fields.sis_V_WA_BASIC_FJ_1001_TIME), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
				$('#pages').show();
                fenye('#pages', 'queryInfo56', total, pageNum + 1, pageSize);
            }
        })
}

//海汽集团电子客票信息
function queryInfo57(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
			if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '乘车人姓名', '</th>'].join(''));
            typeList.push(['<th>', '始发站名称', '</th>'].join(''));
            typeList.push(['<th>', '目的地名称', '</th>'].join(''));
            typeList.push(['<th>', '手机号码', '</th>'].join(''));
            typeList.push(['<th>', '证件号码', '</th>'].join(''));
            typeList.push(['<th>', '售票时间', '</th>'].join(''));
            typeList.push(['<th>', '发车时间', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHQB_T_QHQB_HQJT_DZKPSJB_XM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HQJT_DZKPSJB_SSCZMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HQJT_DZKPSJB_MDZMC, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HQJT_DZKPSJB_SJHM, '</td>');
                typeList.push('<td>', fields.QHQB_T_QHQB_HQJT_DZKPSJB_ZJHM, '</td>');
                typeList.push('<td>', formatDate((fields.QHQB_T_QHQB_HQJT_DZKPSJB_SPSJ)), '</td>');
                typeList.push('<td>', formatDate((fields.QHQB_T_QHQB_HQJT_DZKPSJB_FCSJ)), '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo57', total, pageNum + 1, pageSize);
            }
        })
}

//琼海检查站比对信息
function queryInfo58(offset) {
    console.log(queryString);
    offset = offset || 0;
    var pageNum = offset / pageSize;
    $.get('datas/query',
        {
            queryString: queryString,
            a_from: new Date('2005-01-01 00:00:00').getTime(),
            a_to: new Date().getTime(),
            pageSize: pageSize,
            pageNum: pageNum
        },
        function (data) {
            if(!data || data.hits == null || data.count == 0){
                $("#tab1").html('<h3 class="h3_null">暂无数据</h3>');
                return false;
            }
            var total = data.count;
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>', '姓名', '</th>'].join(''));
            typeList.push(['<th>', '身份证', '</th>'].join(''));
            typeList.push(['<th>', '性别', '</th>'].join(''));
            typeList.push(['<th>', '数据采集来源', '</th>'].join(''));
            typeList.push(['<th>', '数据采集客户端地点名称', '</th>'].join(''));
            typeList.push(['<th>', '进出岛人员所属城市', '</th>'].join(''));
            typeList.push(['<th>', '扫描时间', '</th>'].join(''));
            typeList.push(['<th>', '进出港类型', '</th>'].join(''));

            typeList.push('</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields = bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>', fields.QHSJ_VIEW_COMPARERECORD_TO_QHSJ_NAME, '</td>');
                typeList.push('<td>', fields.QHSJ_VIEW_COMPARERECORD_TO_QHSJ_IDCARD, '</td>');
                typeList.push('<td>', fields.QHSJ_VIEW_COMPARERECORD_TO_QHSJ_GENDER, '</td>');
                typeList.push('<td>', fields.QHSJ_VIEW_COMPARERECORD_TO_QHSJ_SOURCE_NAME, '</td>');
                typeList.push('<td>', fields.QHSJ_VIEW_COMPARERECORD_TO_QHSJ_CLIENT_PLACE, '</td>');
                typeList.push('<td>', fields.QHSJ_VIEW_COMPARERECORD_TO_QHSJ_CITY, '</td>');
                typeList.push('<td>', formatDate(fields.QHSJ_VIEW_COMPARERECORD_TO_QHSJ_SCAN_TIME), '</td>');
                typeList.push('<td>', fields.QHSJ_VIEW_COMPARERECORD_TO_QHSJ_FLIGHT_TYPE, '</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');
            $("#tab1").html(typeList.join(''));
            if(total > pageSize){
                $('#pages').show();
                fenye('#pages', 'queryInfo58', total, pageNum + 1, pageSize);
            }
        })
}

// 传入分页的节点,请求数据的方法,总页数 当前页
function fenye(page, func, total, pageNum, pageSize) {
    var offset = pageNum * pageSize - pageSize;
    var lastoff = offset > pageSize ? offset - pageSize : 0;
    var nextoff = Math.floor(total / pageSize) + 1 == (Math.floor(offset / pageSize)) ? 0 : (offset + pageSize);

    $(page).html(['<li>'
        , '  <a href="javascript:void(0);" onclick="', func, '(', lastoff, ')" aria-label="Previous">'
        , '    <span aria-hidden="true">&laquo;</span>'
        , '  </a>'
        , '</li>'
        , (function () {
            var htm = ''
            var allpages = Math.floor(total / pageSize) + 2;
            var currentpage = Math.floor(offset / pageSize) + 1;
            for (var i = 1; i < allpages; i++) {
                if (allpages - 1 > pageSize) {
                    if ((currentpage > 5 && i == (currentpage - 2)) || i == (currentpage + 2)) {
                        htm += '<li><a>...</a></li>'
                    }
                    if ((i < (currentpage - 2) && i > 3) || (i > (currentpage + 2) && i < (allpages - 3))) {
                        continue;
                    }
                }
                if (Math.floor(offset / pageSize) + 1 == i) {
                    htm += '<li class="active"><a>' + i + '</a></li>'
                } else {
                    htm += '<li><a href="javascript:void(0);" onclick="' + func + '(' + (i - 1) * pageSize + ')">' + i + '</a></li>'
                }
            }
            htm+='<input id="goTo" type="text" /><button class="go_btn" onClick="' + func + '(' +  'getInputvalue()'  + ')">跳转</button>';
            return htm;
        })()
        , '<li>'
        , '  <a href="javascript:void(0);" onclick="', func, '(', nextoff, ')" aria-label="Next">'
        , '    <span aria-hidden="true">&raquo;</span>'
        , '  </a>'
        , '</li>'].join(''))
}
function getInputvalue() {
    return ($('#goTo').val() - 1) * 10;
}
function add0(m) {
    return m < 10 ? '0' + m : m
}
function formatDate(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(parseInt(shijianchuo));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
//时间转换方法
function formatDate2(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    if(!shijianchuo){
       return '--'
    }
    if(shijianchuo.length > 13){
        var y = shijianchuo.substring(0,4),
            M = shijianchuo.substring(4,6),
            d = shijianchuo.substring(6,8),
            h = shijianchuo.substring(8,10),
            m = shijianchuo.substring(10,12),
            s = shijianchuo.substring(12,14);
        return y+'-'+M+'-'+d+' '+h+':'+m+':'+s;
    } else {
        shijianchuo = parseInt(shijianchuo);
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        return y + '-' + add0(m) + '-' + add0(d);
    }
}
//年月
function formateDate3(nianyue) {
    if(!nianyue){return '--'}

    var nian = nianyue.slice(0,4);
    var yue = nianyue.slice(4,nianyue.length);
    return nian + '年' + yue + '月';
}