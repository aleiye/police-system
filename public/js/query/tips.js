$(document).ready(function() {
    $(".message_query").click(function () {
       window.location.href="news_overview"
    });
    tips_info();
    tips_info2();
    // tips_info3();
});
//消息数
function tips_info(){
    // $.get('datas/sign_count',{param:{'readStatus':0}},
    $.get('datas/sign_count',{param:{'readStatus':0}},
        function(data){
            console.log(data);
            $(".messageCount").html('消息('+data.count+')');
            // $(".tip1").html(0);
            // $(".tip2").html(0);
        })
}
// 在逃人员比重结果
function tips_info2(){
    $.get('datas/sign_count',{param:{'readStatus':0}},
        function(data){
            console.log(data);
            // $(".messageCount").html('消息('+0+')');
            $(".tip1").html(data.count);
            if(data.count <= 0 && $('.message_query').length == 0)
                $(".bg_news1").hide();
            // $(".tip2").html(0);
        })
}
//前科人员比重结果
// function tips_info3(){
//     $.get('datas/sign_count',{param:{status:1}},
//         function(data){
//             console.log(data);
//             // $(".messageCount").html('消息('+0+')');
//             // $(".tip1").html(0);
//             $(".tip2").html(data.count);
//         })
// }
