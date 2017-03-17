
$(document).ready(function() {
    var keyWord=$.url(window.location.href).param().keyWord;
    $("#search_input").val(keyWord);

    searchCount();

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
var tableDict=['A_db_orcl58_bd_handset_contactor_info',
    'A_db_orcl58_gj_handset_sms_info',
    'A_db_orcl58_xyr_main',
    'A_db_orcl58_phone_list',
    'A_db_orcl58_phone_thqd',
    'A_db_orcl58_Carinfotbl',
    'A_db_orcl58_Emsinfotbl',
    'A_db_orcl58_WORKERBASEINFO',
    'A_db_orcl58_RST_HOUSING_INFORMATIO',
    'A_db_orcl58_BMS_CROSSING_INFO',
    'A_db_orcl58_BMS_PLATE_ALARM',
    'A_db_orcl58_BMS_MAINTENANCE_LANEINFO',
    'A_db_orcl58_BMS_VEHICLE_PASS',
    'A_db_orcl58_BMS_VEHICLE_INTERVAL',
    'A_db_orcl58_BMS_VEHICLE_VIOLATION',
    'A_db_orcl58_BMS_VEHICLE_VIOLATION'
];

function searchCount(){
    // var queryString = 'A_source:"A_db_duo_SEC_USER_INFO" OR A_source:"A_db_duo_SEC_USER_SYNCINFO" | report count(A_source) over A_source';
    var tmpStr = [];
    $(tableDict).each(function (index,value) {
        if(index == 0)  {
            tmpStr.push('A_source:"'+value+'"')
        }else{
            tmpStr.push(' OR A_source:"'+value+'"');
        }
    });
    tmpStr.push(' | report count(A_source) over A_source');
    var queryString = tmpStr.join('');
    console.log('queryString='+queryString);

    $.get('datas/query',
        {
            queryString:queryString,
            a_from:new Date('2017-01-01 00:00:00').getTime(),
            a_to:new Date().getTime()
        },
        function(data){
            console.log(data);
            var datas = data.datas;
            $(".c").each(function (index,value) {
                //从返回数据中获取总数
                var count = datas[index][1];
                $(this).next("span").html(formatNumber(count));
            });

            //分别计算6个总数
            var sum1 = 0;
            $('#count1').parents('div:eq(0)').next('div').find('span').each(function(){
                sum1 += parseInt($(this).html());
            });
            console.log(sum1);
            $("#count1").html(formatNumber(sum1));
            var t1 = $('#count1').parents('div:eq(0)').next('div').find('.c').length;
            $("#t1").html(formatNumber(t1));

            var sum2 = 0;
            $('#count2').parents('div:eq(0)').next('div').find('span').each(function(){
                sum2 += parseInt($(this).html());
            });
            console.log(sum2);
            $("#count2").html(formatNumber(sum2));
            var t2 = $('#count2').parents('div:eq(0)').next('div').find('.c').length;
            $("#t2").html(formatNumber(t2));

            var sum3 = 0;
            $('#count3').parents('div:eq(0)').next('div').find('span').each(function(){
                sum3 += parseInt($(this).html());
            });
            console.log(sum3);
            $("#count3").html(formatNumber(sum3));
            var t3 = $('#count3').parents('div:eq(0)').next('div').find('.c').length;
            $("#t3").html(formatNumber(t3));

            var sum4 = 0;
            $('#count4').parents('div:eq(0)').next('div').find('span').each(function(){
                sum4 += parseInt($(this).html());
            });
            console.log(sum4);
            $("#count4").html(formatNumber(sum4));
            var t4 = $('#count4').parents('div:eq(0)').next('div').find('.c').length;
            $("#t4").html(formatNumber(t4));

            var sum5 = 0;
            $('#count5').parents('div:eq(0)').next('div').find('span').each(function(){
                sum5 += parseInt($(this).html());
            });
            console.log(sum5);
            $("#count5").html(formatNumber(sum5));
            var t5 = $('#count5').parents('div:eq(0)').next('div').find('.c').length;
            $("#t5").html(formatNumber(t5));

            var sum6 = 0;
            $('#count6').parents('div:eq(0)').next('div').find('span').each(function(){
                sum6 += parseInt($(this).html());
            });
            console.log(sum6);
            $("#count6").html(formatNumber(sum6));
            var t6 = $('#count6').parents('div:eq(0)').next('div').find('.c').length;
            $("#t6").html(formatNumber(t6));

            //最后计算最终结果总数
            var totalCount = sum1 + sum2 + sum3 + sum4 + sum5 + sum6;
            $("#totalCount").html(formatNumber(totalCount));
            var tt = t1 + t2 + t3 + t4 + t5 + t6;
            $("#tt").html(formatNumber(tt));
        })
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