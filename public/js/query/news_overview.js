$(document).ready(function() {
    queryMessageInfo();
});

//字段表
var fieldsMap={
    HJDPCS:'地址',
    BJZDRYBH:'身份证'
};

function queryMessageInfo(offset){
    if(!checkTime()){
        return false;
    }
    var offset = offset || 0;

    var name = $("#name_input").val();
    var idCard = $("#id_input").val();
    var firstTime = $("#firstTime").val();
    var lastTime = $("#lastTime").val();
    if(firstTime == '' && lastTime == ''){
        firstTime='2017-01-01 00:00:00';
        lastTime=new Date().toISOString().slice(0,10) + " 23:59:59";
    }

    console.log("name = " + name);
    console.log("idCard = " + idCard);
    console.log("firstTime = " + firstTime);
    console.log("lastTime = " + lastTime);

    var pageSize = 10;
    var pageNum = offset/pageSize + 1;

    var queryString = 'A_source:"A_db_b111_QHQB_HKDDC"';
    $.get('datas/query',
        {
            queryString:queryString,
            a_from:new Date(firstTime).getTime(),
            a_to:new Date(lastTime).getTime(),
            pageSize:pageSize,
            pageNum:pageNum-1
        },
        function(data){
            console.log(data);

            var total = data.count;
            $("#result_message").children("span").html(formatNumber(total));

            $("#message_table").html('');
            var jsonHits = data.hits;

            var ths=[];
            var ths2=[];
            for(var v in jsonHits[0].fields){
                if(fieldsMap[v]){
                    ths2.push(fieldsMap[v]);
                    ths.push(v);
                }
            }

            ths2.push('时间');

            var tables = [];
            tables.push('<thead><tr>');
            tables.push('<th>ID</th>');
            tables.push('<td><input type="checkbox" name="allChecked" id="allChecked" onclick="DoCheck()"/></td>');
            ths.map(function(s,i){
                tables.push(['<th key=',i,'>',s,'</th>'].join(''));
            });

            tables.push( '</tr> </thead> <tbody>');
            var c = 1;
            jsonHits.map(function (bean) {
                var fields =  bean.fields;

                tables.push('<tr>');
                tables.push('<td>',c++,'</td>');
                tables.push('<td><input name="choose" type="checkbox"></td>');
                ths.map(function (s) {
                    tables.push('<td>');
                    tables.push(fields[s]);
                    tables.push('</td>');
                });

                tables.push('<td>');
                tables.push(formatDate(parseInt(bean.auxiliaryFields.A_processTime)));
                tables.push('</td>');
                tables.push('<td class="yellow sign">未签收</td>');

                tables.push('</tr>');

            });
            tables.push('</tbody>');

            $("#message_table").append(tables.join(''));

            fenye('#pages','queryMessageInfo',total,pageNum,pageSize);
        })
}

function queryMessageInfo2(infoType,subInfoType){

    var keyWord=$("#search_input").val();
    console.log(keyWord);
    console.log(infoType);
    console.log(subInfoType);

    $.get('datas/query',
        {
            queryString:""
        },
        function(data){
            $("#tab1").html('');
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            //表头信息
            typeList.push(['<th>','id','</th>'].join(''));
            typeList.push(['<th>','姓名','</th>'].join(''));
            typeList.push(['<th>','性别','</th>'].join(''));

            typeList.push( '</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields =  bean.fields;

                typeList.push('<tr>');

                //每行的数据信息
                typeList.push('<td>',fields[0],'</td>');
                typeList.push('<td>',fields[1],'</td>');
                typeList.push('<td>',fields[2],'</td>');

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');

            $("#tab1").append(typeList.join(''));

        })
}

function sign_message() {
    var array = [];
    // $("td input[checked='checked']").map(function () {
    //     array.push($(this).parent("td").prev("td").html());
    // });
    $.ajax({
        url: "datas/query",
        type: "get",
        data: {
            array:array
        },
        dataType: "json",
        success: function (data) {
            alert("签收成功");
            queryMessageInfo();
        }
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
// 传入分页的节点,请求数据的方法,总页数 当前页
function fenye(page, func, total, pageNum,pageSize) {
    var offset=pageNum*pageSize-pageSize;
    var lastoff = offset > pageSize ? offset - pageSize : 0;
    var nextoff = Math.floor(total / pageSize) + 1 == (Math.floor(offset / pageSize)) ? 0 : (offset + pageSize);

    $(page).html(['<li>'
        , '  <a onclick="', func, '(', lastoff, ')" aria-label="Previous">'
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
                    htm += '<li><a onclick="' + func + '(' + (i - 1) * pageSize + ')">' + i + '</a></li>'
                }
            }
            return htm;
        })()
        , '<li>'
        , '  <a onclick="', func, '(', nextoff, ')" aria-label="Next">'
        , '    <span aria-hidden="true">&raquo;</span>'
        , '  </a>'
        , '</li>'].join(''))
}

function checkTime() {
    var firstt = $("#firstTime").val();
    var lastt = $("#lastTime").val();
    if(firstt!= null && firstt!="") {
        if(lastt == null || lastt=="") {
            alert("终止日期不能为空！");
            return false;
        } else {
            if (Date.parse(firstt) > Date.parse(lastt)) {
                alert("起始日期不能大于终止日期！");
                return false;
            }
        }
    } else {
        if(lastt != null && lastt!="") {
            alert("起始日期不能为空！");
            return false;
        }
    }
    return true;
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