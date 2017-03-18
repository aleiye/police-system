/**
 * Created by yulucui on 17/3/10.
 */
$(function () {

    var skip = 0;

    function showTab(param) {
        $.get('datas/sign',param,function (data) {
            var msg = [];
            $(data).each(function (i,item) {
                var sign = item['status'] ? '已签收' : '未签收',
                    signColor = item['status'] ? 'green' : 'yellow',
                    level = item['level'] ? '正常' : '预警',
                    date = new Date(item["date"]).format('yyyy-MM-dd hh:mm:ss'),
                    _id = item['_id'];
                var html = '<tr>';
                html += '<td><input name="choose" type="checkbox" _id="'+ _id +'"></td>';
                html += '<td>'+ item["mark"] +'</td>';
                html += '<td>'+ item["name"] +'</td>';
                html += '<td>'+ item["cardId"] +'</td>';
                html += '<td>'+ level +'</td>';
                html += '<td>'+ item["position"] +'</td>';
                html += '<td>'+ item["police"] +'</td>';
                html += '<td>'+ date +'</td>';
                html += '<td>'+ item["scheme"] +'</td>';
                html += '<td class="'+ signColor +'">'+ sign +'</td>';
                html += '</tr>';
                msg.push(html);
            });
            $('#message_table')
                .find('tbody')
                .html(msg.join(''));
        });
    }

    //签收 点击事件
    $('#sign_btn').click(function(){
        var ids = [];
        $('[name=choose]:checked').each(function(i,item) {
            ids.push($(item).attr('_id'));
        });
        $.get('datas/dosign',{ids:ids},function (data) {
            console.log(data);
            if(data && data.result)
                showTab({page: {skip:skip,limit: 10}});
        });
    });

    //搜索 点击事件
    $('#search_btn').click(function () {
        var firstTime = new Date($('#firstTime').val()).getTime(),
            lastTime = new Date($('#lastTime').val()).getTime();
        var params = {
            date: {}
        };
        $('#name_input').val() && (params.name = $('#name_input').val());
        $('#id_input').val() && (params.cardId = $('#id_input').val());
        firstTime && (params.date['$gte'] = firstTime);
        lastTime && (params.date['$lte'] = lastTime);
        skip = 0;
        showTab({
            page: {
                skip: skip,
                limit: 10
            },
            params: params
        });
    });

    var pageTotal = 0;
    //获取总数
    $.get('datas/sign_count',function (data) {
        $('#result_message span').text(data.count);
        pageTotal = Math.ceil(data.count / 10);
        $('#pages').html(paging(1,Math.ceil(data.count / 10)));
        // fenye2('#pages2','showTab',data.count,1,10);
    });

    //展示列表(skip:开始条数,limit:限定条数)
    showTab({
        page: {
            skip: skip,
            limit: 10
        }
    });

    //分页相关代码 调用showTab函数,传递相关分页信息
    $('.page_num').die().live('click',function () {
        var nowPage = 1;
        if($(this).find('a').text() == '«'){
            nowPage = parseInt($('.page_num.active').find('a').text()) - 1;
        }else if($(this).find('a').text() == '»'){
            nowPage = parseInt($('.page_num.active').find('a').text()) + 1;
        }else{
            nowPage = parseInt($(this).find('a').text());
        }

        skip = nowPage * 10 - 10;
        showTab({
            page: {
                skip: skip,
                limit: 10
            }
        });
        $('#pages').html(paging(nowPage,pageTotal));
    });

    function paging(page, total) {

        if (total == 0) return '<div></div>';

        var arr = ['<li class="active page_num"><a>' + page + '</a></li>'];

        for (var i = 1; i <= 1; i++) {
            if (page - i > 1) {
                arr.unshift('<li class="page_num"><a>' + (page - i) + '</a></li>');
            }
            if (page + i < total) {
                arr.push('<li class="page_num"><a>' + (page + i) + '</a></li>');
            }
        }

        if (page - 4 > 1) {
            arr.unshift('<li class=""><a>...</a></li>');
        }

        if (page > 1) {
            arr.unshift('<li class="jp-next page prev page-click page_num"><a aria-label="Previous">«</a></li><li class="page_num"><a> 1</a></li>');
        } else {
            arr.unshift('<li class="jp-disabled page_num"><a aria-label="Previous">«</a></li>');
        }

        if (page + 4 < total) {
            arr.push('<li class=""><a>...</a></li>');
        }

        if (page < total) {
            arr.push('<li class="page_num"><a>' + total + ' </a></li><li class="jp-next page next page-click page_num"><a aria-label="Next">»</a></li>');
        } else {
            arr.push('<li class="jp-disabled page_num"><a aria-label="Next">»</a></li>');
        }

        return arr.join('');
    }
    // function fenye2(page, func, total, pageNum,pageSize) {
    //     var offset=pageNum*pageSize-pageSize;
    //     var lastoff = offset > pageSize ? offset - pageSize : 0;
    //     var nextoff = Math.floor(total / pageSize) + 1 == (Math.floor(offset / pageSize)) ? 0 : (offset + pageSize);
    //
    //     var page1 = {
    //         page:{
    //             skip:lastoff,
    //             limit:pageSize
    //         }
    //     };
    //     var page3 = {
    //         page:{
    //             skip:nextoff,
    //             limit:pageSize
    //         }
    //     };
    //
    //     $(page).html(['<li>'
    //         , '  <a onclick="', func, '(', page1, ')" aria-label="Previous">'
    //         , '    <span aria-hidden="true">&laquo;</span>'
    //         , '  </a>'
    //         , '</li>'
    //         , (function () {
    //             var htm = ''
    //             var allpages = Math.floor(total / pageSize) + 2;
    //             var currentpage = Math.floor(offset / pageSize) + 1;
    //             for (var i = 1; i < allpages; i++) {
    //                 if (allpages - 1 > pageSize) {
    //                     if ((currentpage > 5 && i == (currentpage - 2)) || i == (currentpage + 2)) {
    //                         htm += '<li><a>...</a></li>'
    //                     }
    //                     if ((i < (currentpage - 2) && i > 3) || (i > (currentpage + 2) && i < (allpages - 3))) {
    //                         continue;
    //                     }
    //                 }
    //                 if (Math.floor(offset / pageSize) + 1 == i) {
    //                     htm += '<li class="active"><a>' + i + '</a></li>'
    //                 } else {
    //                     var page2 = {
    //                         page:{
    //                             skip:(i - 1) * pageSize,
    //                             limit:pageSize
    //                         }
    //                     };
    //                     htm += '<li><a onclick="' + func + '(' + page2 + ')">' + i + '</a></li>'
    //                 }
    //             }
    //             return htm;
    //         })()
    //         , '<li>'
    //         , '  <a onclick="', func, '(', page3, ')" aria-label="Next">'
    //         , '    <span aria-hidden="true">&raquo;</span>'
    //         , '  </a>'
    //         , '</li>'].join(''))
    // }
});