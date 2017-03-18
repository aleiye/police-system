$(document).ready(function() {
    //主页全文搜索跳转
    $("#index_ft_search").click(function () {
        var keyWord = $("#index_search_input").val();
        window.location.href="search?keyWord="+keyWord;
    });
    //主页高级搜索跳转
    $("#index_g_search").click(function () {
        var keyWord = $("#index_search_input").val();
        window.location.href="senior_search?keyWord="+keyWord;
    });
    indexData();
    indexData2();
});
$("#index_search_input").keydown(function(event){  
    if(event.which == "13"){  
        var keyWord = $("#index_search_input").val();
        window.location.href="search?keyWord="+keyWord;
    } 
});  
//当前平台总数据量
function indexData(){
    $.get('datas/query',
        {
            queryString:'*:*',
            a_from:new Date('2005-01-01 00:00:00').getTime(),
            a_to:new Date().getTime()
            // pageSize:pageSize,
            // pageNum:pageNum
        },
        function(data){
            console.log(data);
            $("#totalDataSize").html(formatNumber(data.count));
            // $("#newDataSize").html(formatNumber(467498));
        })
}
// 今日平台新增数据量
function indexData2(){
    $.get('datas/query',
        {
            queryString:'*:*',
            a_from:new Date().getTime()-24*3600*1000,
            a_to:new Date().getTime(),
            isProcessTime: true
            // pageSize:pageSize,
            // pageNum:pageNum
        },
        function(data){
            console.log(data);
            // $("#totalDataSize").html(formatNumber(632861837));
            $("#newDataSize").html(formatNumber(data.count));
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
function add0(m) {
    return m < 10 ? '0' + m : m
}
function formatDate(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
