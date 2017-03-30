
$(document).ready(function() {
    var keyWord=$.url(window.location.href).param().keyWord;
    $("#search_input").val(keyWord);

    searchCount();
    tableCount();

    $("#senior_ft_search").click(function () {
        var checkedTable = [];
        $(".c:checked").each(function () {
            checkedTable.push($(this).index('.c'));
        });
        console.log('checkedTable='+checkedTable);
        var keyWord = $("#search_input").val();
        window.location.href="search?keyWord="+keyWord+'&checkedTable='+JSON.stringify(checkedTable);
    });

    $("#back_search").click(function () {
        var keyWord = $("#search_input").val();
        window.location.href="search?keyWord="+keyWord;
    });

});

//所有的表字典与搜索页的字典表一致
var tableDict = ['A_db_sis_V_BD_HANDSET_CONTACTOR_INFO',//机主通讯录信息--1.SIS情报分析系统
    'A_db_sis_V_GJ_HANDSET_SMS_INFO',//机主短信表
    'A_db_sis_V_XYR_MAIN',//机主表（SIM卡）
    'A_db_sis_V_PHONE_LIST',//话单机主信息表
    'A_db_sis_V_PHONE_THQD',//通话清单
    'A_db_QHSC_CARINFOTBL',//车辆信息登记表--2.本地社会资源数据
    'A_db_QHSC_EMSINFOTBL',//物流信息登记表
    'A_db_QHSC_WORKERBASEINFO',//行业工作人员
    'A_db_QHSC_RST_HOUSING_INFORMATIO',//小区住宅业主信息
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
    'A_net_WA_SOURCE_FJ_0001',//终端上下线信息--6.网警总队网综系统
    'A_net_WA_SOURCE_FJ_0002',//上网日志
    'A_net_WA_SOURCE_FJ_1001',//终端特征信息
    'A_net_WA_SOURCE_FJ_1002',//热点信息采集
    'A_net_WA_BASIC_FJ_1001',//终端特征移动采集设备轨迹
	'A_db_QHSJ_VIEW_COMPARERECORD_TO_QHSJ',//琼海检查站比对信息
	'A_db_QHQB_T_QHQB_TLDP'//铁路订票数据信息
];

function searchCount(){
    // var queryString = 'A_source:"A_db_duo_SEC_USER_INFO" OR A_source:"A_db_duo_SEC_USER_SYNCINFO" | report count(A_source) over A_source';
    var tmpStr = ['A_source:A_*'];
    // var tmpStr = [];
    // $(tableArray).each(function (index, value) {
    //     if (index == 0) {
    //         tmpStr.push('A_source:"' + value + '"')
    //     } else {
    //         tmpStr.push(' OR A_source:"' + value + '"');
    //     }
    // });
    var keyWord = $("#search_input").val();
    if (keyWord != '') {
        tmpStr.push(' AND ' + keyWord);
    }
    tmpStr.push(' | report count(A_source) over A_source');
    var queryString = tmpStr.join('');
    console.log('queryString='+queryString);

    $.get('datas/query',
        {
            queryString:queryString,
            a_from:new Date('2005-01-01 00:00:00').getTime(),
            a_to:new Date().getTime()
        },
        function(data){
            console.log(data);
            var datas = data.datas;
            $(".c").each(function (index,value) {
                //从返回数据中获取总数
                var nameTmp = $(this).attr('id');
                for (var i in datas){
                    if(datas[i][0] == nameTmp){
                        var count = datas[i][1];
                        if (count == null || count == 0) {
                            // $(this).hide();
                            // $(this).attr("name", "hide");
                            $(this).next("span").html('');
                        } else {
                            // $(this).show();
                            // $(this).attr("name", "show");
                            $(this).next("span").html('[' + count + ']');
                        }
                    }
                }
            });

            //分别计算7个总数
            var sum1 = 0;
            $('#count1').parents('div:eq(0)').next('div').find('span').each(function(){
                sum1 += (parseNumber($(this).html()) || 0);
            });
            console.log(sum1);
            $("#count1").html('['+formatNumber(sum1)+'条数据]');

            var sum2 = 0;
            $('#count2').parents('div:eq(0)').next('div').find('span').each(function(){
                sum2 += (parseNumber($(this).html()) || 0);
            });
            console.log(sum2);
            $("#count2").html('['+formatNumber(sum2)+'条数据]');

            var sum3 = 0;
            $('#count3').parents('div:eq(0)').next('div').find('span').each(function(){
                sum3 += (parseNumber($(this).html()) || 0);
            });
            console.log(sum3);
            $("#count3").html('['+formatNumber(sum3)+'条数据]');

            var sum4 = 0;
            $('#count4').parents('div:eq(0)').next('div').find('span').each(function(){
                sum4 += (parseNumber($(this).html()) || 0);
            });
            console.log(sum4);
            $("#count4").html('['+formatNumber(sum4)+'条数据]');

            var sum5 = 0;
            $('#count5').parents('div:eq(0)').next('div').find('span').each(function(){
                sum5 += (parseNumber($(this).html()) || 0);
            });
            console.log(sum5);
            $("#count5").html('['+formatNumber(sum5)+'条数据]');

            var sum6 = 0;
            $('#count6').parents('div:eq(0)').next('div').find('span').each(function(){
                sum6 += (parseNumber($(this).html()) || 0);
            });
            console.log(sum6);
            $("#count6").html('['+formatNumber(sum6)+'条数据]');

            var sum7 = 0;
            $('#count7').parents('div:eq(0)').next('div').find('span').each(function(){
                sum7 += (parseNumber($(this).html()) || 0);
            });
            console.log(sum7);
            $("#count7").html('['+formatNumber(sum7)+'条数据]');

            //最后计算最终结果总数
            var totalCount = sum1 + sum2 + sum3 + sum4 + sum5 + sum6 + sum7;
            $("#totalCount").html('[共'+formatNumber(totalCount)+'条数据]');

        })
}

function tableCount() {
    var t1 = $('#count1').parents('div:eq(0)').next('div').find('.c').length;
    $("#t1").html(formatNumber(t1));

    var t2 = $('#count2').parents('div:eq(0)').next('div').find('.c').length;
    $("#t2").html(formatNumber(t2));

    var t3 = $('#count3').parents('div:eq(0)').next('div').find('.c').length;
    $("#t3").html(formatNumber(t3));

    var t4 = $('#count4').parents('div:eq(0)').next('div').find('.c').length;
    $("#t4").html(formatNumber(t4));

    var t5 = $('#count5').parents('div:eq(0)').next('div').find('.c').length;
    $("#t5").html(formatNumber(t5));

    var t6 = $('#count6').parents('div:eq(0)').next('div').find('.c').length;
    $("#t6").html(formatNumber(t6));

    var t7 = $('#count7').parents('div:eq(0)').next('div').find('.c').length;
    $("#t7").html(formatNumber(t7));

    var tt = t1 + t2 + t3 + t4 + t5 + t6 + t7;
    $("#tt").html(formatNumber(tt));
}
function formatNumber(num, precision, separator) {
    var parts;
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
        num = Number(num);
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        parts = num.split('.');
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));
        return parts.join('.');
    }
    return NaN;
}
function parseNumber(numberStr){
    if(!numberStr || numberStr.length==0){return 0}

    var number = numberStr.slice(1,numberStr.length-1);
    if(number.length>0){
        var parts;
        if(number.indexOf(',')>0){
            parts = number.split(',');
            return parseInt(parts.join(''));
        }
        return parseInt(number);
    }
    return 0;
}