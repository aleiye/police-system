/**
 *
 */
(function () {
    /*******************************************************************************************************************
     * Date.prototype
     ******************************************************************************************************************/
        // ---------------------------------------------------
        // 判断闰年
        // ---------------------------------------------------
    Date.prototype.isLeapYear = function () {
        return (0 == this.getYear() % 4 && ((this.getYear() % 100 != 0) || (this.getYear() % 400 == 0)));
    }

    // +---------------------------------------------------
    // | 日期计算
    // +---------------------------------------------------
    Date.prototype.dateAdd = function (strInterval, Number) {
        var dtTmp = this;
        switch (strInterval) {
            case 's':
                return new Date(Date.parse(dtTmp) + (1000 * Number));
            case 'm':
                return new Date(Date.parse(dtTmp) + (60000 * Number));
            case 'h':
                return new Date(Date.parse(dtTmp) + (3600000 * Number));
            case 'd':
                return new Date(Date.parse(dtTmp) + (86400000 * Number));
            case 'w':
                return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
            case 'q':
                return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case 'M':
                return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
            case 'y':
                return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        }
    }

    // +---------------------------------------------------
    // | 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串
    // +---------------------------------------------------
    Date.prototype.dateDiff = function (strInterval, dtEnd) {
        var dtStart = this;
        if (typeof dtEnd == 'string')// 如果是字符串转换为日期型
        {
            dtEnd = StringToDate(dtEnd);
        }
        switch (strInterval) {
            case 's':
                return parseInt((dtEnd - dtStart) / 1000);
            case 'n':
                return parseInt((dtEnd - dtStart) / 60000);
            case 'h':
                return parseInt((dtEnd - dtStart) / 3600000);
            case 'd':
                return parseInt((dtEnd - dtStart) / 86400000);
            case 'w':
                return parseInt((dtEnd - dtStart) / (86400000 * 7));
            case 'm':
                return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
            case 'y':
                return dtEnd.getFullYear() - dtStart.getFullYear();
        }
    }

    // +---------------------------------------------------
    // | 日期输出字符串，重载了系统的toString方法
    // +---------------------------------------------------
    Date.prototype.toShowWeekString = function (showWeek) {
        var myDate = this;
        var str = myDate.toLocaleDateString();
        if (showWeek) {
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            str += ' 星期' + Week[myDate.getDay()];
        }
        return str;
    }

    // +---------------------------------------------------
    // | 把日期分割成数组
    // +---------------------------------------------------
    Date.prototype.toArray = function () {
        var myDate = this;
        var myArray = Array();
        myArray[0] = myDate.getFullYear();
        myArray[1] = myDate.getMonth();
        myArray[2] = myDate.getDate();
        myArray[3] = myDate.getHours();
        myArray[4] = myDate.getMinutes();
        myArray[5] = myDate.getSeconds();
        return myArray;
    }

    // +---------------------------------------------------
    // | 取得日期数据信息
    // | 参数 interval 表示数据类型
    // | y 年 m月 d日 w星期 ww周 h时 n分 s秒
    // +---------------------------------------------------
    Date.prototype.datePart = function (interval) {
        var myDate = this;
        var partStr = '';
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        switch (interval) {
            case 'y':
                partStr = myDate.getFullYear();
                break;
            case 'm':
                partStr = myDate.getMonth() + 1;
                break;
            case 'd':
                partStr = myDate.getDate();
                break;
            case 'w':
                partStr = Week[myDate.getDay()];
                break;
            case 'ww':
                partStr = myDate.WeekNumOfYear();
                break;
            case 'h':
                partStr = myDate.getHours();
                break;
            case 'n':
                partStr = myDate.getMinutes();
                break;
            case 's':
                partStr = myDate.getSeconds();
                break;
        }
        return partStr;
    }

    // +---------------------------------------------------
    // | 取得当前日期所在月的最大天数
    // +---------------------------------------------------
    Date.prototype.maxDayOfDate = function () {
        var myDate = this;
        var ary = myDate.toArray();
        var date1 = (new Date(ary[0], ary[1] + 1, 1));
        var date2 = date1.dateAdd('m', 1);
        var result = dateDiff(date1.Format('yyyy-MM-dd'), date2.Format('yyyy-MM-dd'));
        return result;
    }

    // +---------------------------------------------------
    // | 取得当前日期所在周是一年中的第几周
    // +---------------------------------------------------
    Date.prototype.weekNumOfYear = function () {
        var myDate = this;
        var ary = myDate.toArray();
        var year = ary[0];
        var month = ary[1] + 1;
        var day = ary[2];
        document.write('< script language=VBScript\> \n');
        document.write("myDate = DateValue(''+month+'-'+day+'-'+year+'') \n");
        document.write("result = DatePart('ww', myDate) \n");
        document.write(' \n');
        return result;
    }

    // +---------------------------------------------------
    // | 取得当前日期所在天最小毫秒数
    // +---------------------------------------------------
    Date.prototype.toGTMDayMinString = function () {
        var myDate = this;
        var newDate = new Date(myDate);
        newDate.setHours(0); // 设置 Date 对象中的小时 (0 ~ 23)。
        newDate.setMinutes(0); // 设置 Date 对象中的分钟 (0 ~ 59)。
        newDate.setSeconds(0); // 设置 Date 对象中的秒钟 (0 ~ 59)。
        newDate.setMilliseconds(0);
        return newDate.getTime();
    }

    // +---------------------------------------------------
    // | 取得当前日期所在天最大毫秒数
    // +---------------------------------------------------
    Date.prototype.toGTMDayMaxString = function () {
        var myDate = this;
        var newDate = new Date(myDate);
        newDate.setHours(23); // 设置 Date 对象中的小时 (0 ~ 23)。
        newDate.setMinutes(59); // 设置 Date 对象中的分钟 (0 ~ 59)。
        newDate.setSeconds(59); // 设置 Date 对象中的秒钟 (0 ~ 59)。
        newDate.setMilliseconds(999);
        return newDate.getTime();
    }

    // 日期格式化方法
    Date.prototype.format = function (partten) {
        var format = partten || "yyyy-MM-dd hh:mm:ss";
        var o = {
            "M+": this.getMonth() + 1, // month
            "d+": this.getDate(), // day
            "h+": this.getHours(), // hour
            "m+": this.getMinutes(), // minute
            "s+": this.getSeconds(), // second
            "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
            "S": this.getMilliseconds()
            // millisecond
        }
        if (/(y+)/.test(format))
            format = format.toString().replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }

    /*******************************************************************************************************************
     * Date.
     ******************************************************************************************************************/

        // +---------------------------------------------------
        // | 求两个时间的天数差 日期格式为 YYYY-MM-dd
        // +---------------------------------------------------
    Date.daysBetween = function (DateOne, DateTwo) {
        var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'));
        var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1);
        var OneYear = DateOne.substring(0, DateOne.indexOf('-'));

        var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'));
        var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1);
        var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'));

        var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' + TwoYear)) / 86400000);
        return Math.abs(cha);
    }

    // +---------------------------------------------------
    // | 字符串转成日期类型
    // | 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd
    // +---------------------------------------------------
    Date.stringToDate = function StringToDate(DateStr) {
        var converted = Date.parse(DateStr);
        var myDate = new Date(converted);
        if (isNaN(myDate)) {
            // var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';
            var arys = DateStr.split('-');
            myDate = new Date(arys[0], --arys[1], arys[2]);
        }
        return myDate;
    }

    Date.formatSecond2Hms = function (second) {
        return [parseInt(second / 60 / 60), parseInt(second / 60) % 60, second % 60].join(":").replace(/\b(\d)\b/g, "0$1");
    }

    // +---------------------------------------------------
    // | 日期合法性验证
    // | 格式为：YYYY-MM-DD或YYYY/MM/DD
    // +---------------------------------------------------
    Date.isValidDate = function (dateStr) {
        var sDate = dateStr.replace(/(^\s+|\s+$)/g, ''); // 去两边空格;
        if (sDate == '')
            return true;
        // 如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
        // 数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
        var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '');
        if (s == '') // 说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
        {
            var t = new Date(sDate.replace(/\-/g, '/'));
            var ar = sDate.split(/[-/:]/);
            if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
                // alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
                return false;
            }
        } else {
            // alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
            return false;
        }
        return true;
    }

    // +---------------------------------------------------
    // | 日期时间检查
    // | 格式为：YYYY-MM-DD HH:MM:SS
    // +---------------------------------------------------
    Date.checkDateTime = function (str) {
        var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
        var r = str.match(reg);
        if (r == null)
            return false;
        r[2] = r[2] - 1;
        var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
        if (d.getFullYear() != r[1])
            return false;
        if (d.getMonth() != r[2])
            return false;
        if (d.getDate() != r[3])
            return false;
        if (d.getHours() != r[4])
            return false;
        if (d.getMinutes() != r[5])
            return false;
        if (d.getSeconds() != r[6])
            return false;
        return true;
    }

    Date.getYedySegment = function () {
        // 今天
        var today = new Date();
        // 开始时间
        var yedy = today.dateAdd("d", -1);
        return {
            st: yedy.toGTMDayMinString(),
            et: today.toGTMDayMaxString()
        };
    }

    // 格式化日期时间
    Date.format = function (d, p) {
        if (!d) {
            return d;
        }
        var dt = d;
        if (typeof dt == 'number')
            dt = new Date(d);
        else if (typeof dt == 'string')
            dt = new Date(Number(d));
        return dt.format(p);
    }

    Date.parseDate = function (d) {
        return new Date(d.replace('-', '/').replace('-', '/'));
    }

    //
    Date.aliasMap = {
        "s": "秒",
        "m": "分",
        "h": "小时",
        "d": "天",
        "M": "月",
        "y": "年",
        "w": "周",
        "q": "季"
    }

    Date.aliasMapping = function (k) {
        return this.aliasMap[k];
    }
})(window);