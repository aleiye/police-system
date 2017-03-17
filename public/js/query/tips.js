$(document).ready(function() {
    $(".message_query").click(function () {
       window.location.href="news_overview"
    });
    tips_info();
    tips_info2();
    tips_info3();
});
//消息数
function tips_info(){
    $.get('datas/query',
        {
            queryString:'A_source:"A_db_b111_QHQB_HKDDC"',
            a_from:new Date('2017-01-01 00:00:00').getTime(),
            a_to:new Date().getTime()
        },
        function(data){
            console.log(data);
            $(".messageCount").html('消息('+0+')');
            // $(".tip1").html(0);
            // $(".tip2").html(0);
        })
}
// 在逃人员比重结果
function tips_info2(){
    $.get('datas/query',
        {
            queryString:'A_source:"A_db_b111_QHQB_HKDDC"',
            a_from:new Date('2017-01-01 00:00:00').getTime(),
            a_to:new Date().getTime()
        },
        function(data){
            console.log(data);
            // $(".messageCount").html('消息('+0+')');
            $(".tip1").html(0);
            // $(".tip2").html(0);
        })
}
//前科人员比重结果
function tips_info3(){
    $.get('datas/query',
        {
            queryString:'A_source:"A_db_b111_QHQB_HKDDC"',
            a_from:new Date('2017-01-01 00:00:00').getTime(),
            a_to:new Date().getTime()
        },
        function(data){
            console.log(data);
            // $(".messageCount").html('消息('+0+')');
            // $(".tip1").html(0);
            $(".tip2").html(0);
        })
}
