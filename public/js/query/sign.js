/**
 * Created by yulucui on 17/3/10.
 */
$(function () {

    var skip = 0;

    function showTab(param) {
        $.get('datas/sign',param,function (data) {
            $('#message_table').find('tbody').html('');
            $(data).each(function(i,item){
                var tds = trFormat(item).map(function(d,i){
                    if(i == 7)
                        return d ? '<td class="green">已签收</td>' : '<td class="yellow">未签收</td>';
                    return '<td>'+ d +'</td>';
                });
                var trHtml = '<tr>';
                trHtml += '<td><input name="choose" type="checkbox" _id="'+ item['_id'] +'"></td>';
                trHtml += tds.join('');
                trHtml += '</tr>';
                $('#message_table')
                    .find('tbody')
                    .append(trHtml);
            });
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
        if($('#firstTime').val() || $('#lastTime').val() || $('#name_input').val() || $('#id_input').val()){
            $('#pages').hide();
            $('#result_message').hide();
        } else {
            $('#pages').show();
            $('#result_message').show();
        }
        var firstTime = new Date($('#firstTime').val()).getTime(),
            lastTime = new Date($('#lastTime').val()).getTime();
        var params = {
            // data: {
            //     'QHQB_T_QHQB_TLDP_ID_NAME': $('#name_input').val()
            // },
            inserttime: {}
        };
        $('#name_input').val() && (params['data.QHQB_T_QHQB_TLDP_ID_NAME'] = $('#name_input').val());
        $('#id_input').val() && (params['data.QHQB_T_QHQB_TLDP_ID_NO'] = $('#id_input').val());
        // !$('#id_input').val() && (delete params.resultModel.hits[0].fields['zdrXY_T_ZZRK_QGZDRYXX_SFZH']);
        // !$('#name_input').val() && !$('#id_input').val() && (delete params.resultModel);
        firstTime && (params.inserttime['$gte'] = firstTime);
        lastTime && (params.inserttime['$lte'] = lastTime);
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
        if($('#pages li:first').next('li').hasClass('active'))
            $('#pages li:first').hide();
        if($('#pages li:last').prev().hasClass('active'))
            $('#pages li:last').hide();
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
        if($('#pages li:first').next('li').hasClass('active'))
            $('#pages li:first').hide();
        if($('#pages li:last').prev().hasClass('active'))
            $('#pages li:last').hide();
    });
    $('.go_btn').die().live('click',function jump(){
        var nowPage = $('#goTo').val();
        if(!nowPage || isNaN(nowPage)) return ;
        skip = nowPage * 10 - 10;
        showTab({
            page: {
                skip: skip,
                limit: 10
            }
        });
        $('#pages').html(paging(nowPage,pageTotal));
        if($('#pages li:first').next('li').hasClass('active'))
            $('#pages li:first').hide();
        if($('#pages li:last').prev().hasClass('active'))
            $('#pages li:last').hide();
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
        arr.push('<input id="goTo" type="number"><button class="go_btn">跳转</button>');
        return arr.join('');
    }
});