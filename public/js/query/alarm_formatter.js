function trFormat(data){
    var A_source = data['A_source'];
    var commonFields = data['resultModel']['hits'][0]['fields'],
        selfFields = data['data'];
    var typeNames = ['涉恐人员','涉稳人员','在逃人员','涉毒人员','前科人员','精神病人员','上访人员'];
    var pepoleTypes = commonFields['zdrXY_T_ZZRK_QGZDRYXX_ZDRYLBBJ'].substr(0,7).split('');
    var type = '';
    $(pepoleTypes).each(function(i,item){
        if(item == '1')
            type += typeNames[i] + '、';
    });
    if(type)
        type = type.substr(0,type.length-1);
    var values = [
        type,                                           //重点人员类标记
        commonFields['zdrXY_T_ZZRK_QGZDRYXX_XM'],       //姓名
        commonFields['zdrXY_T_ZZRK_QGZDRYXX_SFZH'],     //身份证号
        '',                                             //活动发送地点详地址
        // '469002100000',                                 //预警接受单位
        '',                                             //活动发送时间
        '',                                             //比中时间
        '',                                             //比中方案名称
        data['readStatus']                              //处理状态
    ];
    var types = {
            'A_db_QHQB_T_QHQB_TLDP': function(){
                var newValues = copyArr(values);
                newValues[3] = selfFields['QHQB_T_QHQB_TLDP_FROM_STATION_NAME'];
                newValues[4] = formatDate(selfFields['QHQB_T_QHQB_TLDP_TRAIN_DATE'] + selfFields['QHQB_T_QHQB_TLDP_START_TIME']);
                newValues[5] = formatDate(data['inserttime']);
                newValues[6] = '铁路订票比对';
                // newValues[7] = data['readStatus'];
                return newValues;
            },
            'A_db_QHQB_T_QHQB_HQJT_DZKPSJB': function(){
                var newValues = copyArr(values);
                newValues[3] = selfFields['QHQB_T_QHQB_HQJT_DZKPSJB_SSCZMC'];
                newValues[4] = formatDate(selfFields['QHQB_T_QHQB_HQJT_DZKPSJB_FCSJ']);
                newValues[5] = formatDate(data['inserttime']);
                newValues[6] = '海汽电子客票';
                // newValues[7] = data['readStatus'];
                return newValues;
            }
        }
    return types[A_source] ? types[A_source]() : values;
}
function copyArr(oldArr){
    var newArr = [];
    $(oldArr).each(function(i,item){
        newArr.push(item);
    });
    return newArr;
}
function add0(m) {
    return m < 10 ? '0' + m : m
}
//时间转换方法
function formatDate(shijianchuo) {
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