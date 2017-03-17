$(document).ready(function() {
    $("li").attr("name","show");

    var keyWord=$.url(window.location.href).param().keyWord;
    $("#search_input").val(keyWord);

    var checkedTable = $.url(window.location.href).param().checkedTable;
    console.log("checkedTable="+checkedTable);
    if (checkedTable) {
        checkedTable = JSON.parse(checkedTable);

        //先隐藏所有的li
        $("h3").next("ul").children("li").hide();
        $("h3").next("ul").children("li").attr("name","hide");

        for (var index in checkedTable){
            tableDictTmp.push(tableDict[checkedTable[index]]);
            //显示指定的li
            $("h3").next("ul").children("li:eq("+checkedTable[index]+")").show();
            $("h3").next("ul").children("li:eq("+checkedTable[index]+")").attr("name","show");
        }
    }else{
        tableDictTmp = tableDict;
    }
    console.log(tableDictTmp);
    $("li[name='show']:eq(0)").attr("class","selected");

    //统计每个大类下的表格数量
    $("h3").each(function () {
        var count = $(this).next("ul").children("li[name='show']").length;
        $(this).children("span").html("["+count+"]");
    });

    //赋初值
    infoType = $("h3:eq(0)").attr("id");
    subInfoType = $("h3:eq(0)").next("ul").children("li[name='show']:eq(0)").children("a").html();
    liArray = $("h3").next("ul").children("li[name='show']");

    searchCount();
    queryInfo();

    $("#ft_search").click(function () {
        searchCount();
        queryInfo();
    });

    var tmp = 1;//0闭合，1展开
    var tmpIndex = 1;//h3的索引
    $("h3").click(function () {
        var index = $(this).index("h3") + 1;
        var divClass = "menu"+index+" menu_tab";
        $(".content").children("div:eq(0)").attr("class",divClass);

        liArray = $(this).next("ul").children("li[name='show']");
        tableIndex = index-1;

        infoType =$(this).attr("id");
        subInfoType =$(this).next("ul").children("li[name='show']:eq(0)").children("a").html();
        if(tmp == 0 && index==tmpIndex){
            queryInfo();
            tmp = 1;
        }else{
            if(index==tmpIndex){
                tmp = 0;
            } else{
                queryInfo();
                tmp = 1;
            }
        }
        tmpIndex = index;
    });

    $(".subType").click(function () {
        subInfoType = $(this).html();
        queryInfo();
    });

    //高级搜索
    $("#g_search").click(function () {
        var keyWord = $("#search_input").val();
        window.location.href="senior_search?keyWord="+keyWord;
    });
});
var tableDictTmp= [];
//定义两个字典
//所有的表
var tableDict=['A_db_sis_V_BD_HANDSET_CONTACTOR_INFO',
    'A_db_sis_V_GJ_HANDSET_SMS_INFO',
    'A_db_sis_V_XYR_MAIN',
    'A_db_sis_V_PHONE_LIST',
    'A_db_sis_V_PHONE_THQD',
    'A_db_sis_V_Carinfotbl',
    'A_db_sis_V_Emsinfotbl',
    'A_db_sis_V_WORKERBASEINFO',
    'A_db_sis_V_RST_HOUSING_INFORMATIO',
    'A_db_sis_V_BMS_CROSSING_INFO',
    'A_db_sis_V_BMS_PLATE_ALARM',
    'A_db_sis_V_BMS_MAINTENANCE_LANEINFO',
    'A_db_sis_V_BMS_VEHICLE_PASS',
    'A_db_sis_V_BMS_VEHICLE_INTERVAL',
    'A_db_sis_V_BMS_VEHICLE_VIOLATION',
    'A_db_sis_V_BMS_VEHICLE_VIOLATION',
    'A_db_sis_V_WA_SOURCE_FJ_1001',
    'A_db_sis_V_WA_SOURCE_FJ_1002',
    'A_db_sis_V_WA_SOURCE_FJ_0001',
    'A_db_sis_V_WA_SOURCE_FJ_0002',
    'A_db_sis_V_WA_BASIC_FJ_1001'
];
var dict = {
    '机主通讯录信息':{
        queryString:'A_source:"A_db_sis_V_BD_HANDSET_CONTACTOR_INFO"',
        fieldsMap:{
            sis_V_BD_HANDSET_CONTACTOR_INFO_CONTACTOR_NAME:'联系人名称',
            sis_V_BD_HANDSET_CONTACTOR_INFO_CONTACTOR_HANDSET_NUM:'源手机号码',
            sis_V_BD_HANDSET_CONTACTOR_INFO_ADDRESS:'通讯地址',
            sis_V_BD_HANDSET_CONTACTOR_INFO_IM:'即时通信',
            sis_V_BD_HANDSET_CONTACTOR_INFO_CREATEDTIME:'创建时间',
            sis_V_BD_HANDSET_CONTACTOR_INFO_UPDATEDTIME:'修改时间',
            sis_V_BD_HANDSET_CONTACTOR_INFO_COLLECT_TIME:'采集时间'
        }
    },
    '机主短信表':{
        queryString:'A_source:"A_db_sis_V_GJ_HANDSET_SMS_INFO"',
        fieldsMap:{
            sis_V_GJ_HANDSET_SMS_INFO_CASE_ID:'案件ID',
            sis_V_GJ_HANDSET_SMS_INFO_FROM_NUM:'主叫方',
            sis_V_GJ_HANDSET_SMS_INFO_TO_NUM:'被叫方',
            sis_V_GJ_HANDSET_SMS_INFO_MESSAGE_DETAIL:'信息内容',
            sis_V_GJ_HANDSET_SMS_INFO_MSG_TYPE:'信息类型',
            sis_V_GJ_HANDSET_SMS_INFO_ACTIONTYPE:'信息来源',
            sis_V_GJ_HANDSET_SMS_INFO_SEND_TIME:'发送时间',
            sis_V_GJ_HANDSET_SMS_INFO_COLLECT_TIME:'采集时间'
        }
    },
    '机主表（SIM卡）':{
        queryString:'A_source:"A_db_sis_V_XYR_MAIN"',
        fieldsMap:{
            sis_V_XYR_MAIN_XM:'姓名',
            sis_V_XYR_MAIN_DHHM:'电话',
            sis_V_XYR_MAIN_ZJHM:'证件',
            sis_V_XYR_MAIN_RYLB:'人员类别',
            sis_V_XYR_MAIN_SJCH:'手机串号',
            sis_V_XYR_MAIN_CREATEDTIME:'采集时间'
        }
    },
    '话单机主信息表':{
        queryString:'A_source:"A_db_sis_V_PHONE_LIST"',
        fieldsMap:{
            sis_V_PHONE_LIST_jzxm:'机主姓名',
            sis_V_PHONE_LIST_jzqh:'机主区号',
            sis_V_PHONE_LIST_jzhm:'机主电话',
            sis_V_PHONE_LIST_maxtime:'最大时间',
            sis_V_PHONE_LIST_mintime:'最小时间',
            sis_V_PHONE_LIST_cjsj:'采集时间'
        }
    },
    '通话清单':{
        queryString:'A_source:"A_db_sis_V_PHONE_THQD"',
        fieldsMap:{
            sis_V_PHONE_THQD_dfqh:'对方区号',
            sis_V_PHONE_THQD_dfhm:'对方电话',
            sis_V_PHONE_THQD_thdd:'通话地点',
            sis_V_PHONE_THQD_zbjlx:'主被叫类型',
            sis_V_PHONE_THQD_cjsj:'采集时间'
        }
    },
    '车辆信息登记表':{
        queryString:'A_source:"A_db_sis_V_Carinfotbl"',
        fieldsMap:{
            sis_V_Carinfotbl_CARNUMBER:'车牌号',
            sis_V_Carinfotbl_CARBRAND:'品牌',
            sis_V_Carinfotbl_CARTYPE:'车型',
            sis_V_Carinfotbl_CARCOLOR:'颜色',
            sis_V_Carinfotbl_PASSNO:'证件号码',
            sis_V_Carinfotbl_TELEPHONE:'电话号码',
            sis_V_Carinfotbl_CARHOUSE:'楼牌号(停车场所)',
            sis_V_Carinfotbl_CHNNAME:'中文姓名'
        }
    },
    '物流信息登记表':{
        queryString:'A_source:"A_db_sis_V_Emsinfotbl"',
        fieldsMap:{
            sis_V_Emsinfotbl_EMSNUMBER:'快递单号',
            sis_V_Emsinfotbl_SNAME:'收件人姓名',
            sis_V_Emsinfotbl_STELEPHONE:'收件人电话号码',
            sis_V_Emsinfotbl_SADDRESS:'收件人详细地址',
            sis_V_Emsinfotbl_JJDATE:'寄件时间',
            sis_V_Emsinfotbl_APPLDATE:'采集/入库日期'
        }
    },
    '行业工作人员':{
        queryString:'A_source:"A_db_sis_V_WORKERBASEINFO"',
        fieldsMap:{
            sis_V_WORKERBASEINFO_NAME:'姓名',
            sis_V_WORKERBASEINFO_IDCARD:'身份证号码',
            sis_V_WORKERBASEINFO_NATIVEPLACE:'籍贯',
            sis_V_WORKERBASEINFO_NATIVEADDRESS:'户籍地址',
            sis_V_WORKERBASEINFO_ADDRESS:'现住地址',
            sis_V_WORKERBASEINFO_EDUCATIONDEGREE:'文化程度',
            sis_V_WORKERBASEINFO_PHONE:'手机/电话号码',
            sis_V_WORKERBASEINFO_SERVICEPLACE:'服务处所',
            sis_V_WORKERBASEINFO_CREATETIME:'创建时间'
        }
    },
    '小区住宅业主信息':{
        queryString:'A_source:"A_db_sis_V_RST_HOUSING_INFORMATIO"',
        fieldsMap:{
            sis_V_RST_HOUSING_INFORMATIO_NAME:'姓名',
            sis_V_RST_HOUSING_INFORMATIO_ID_CARD:'身份证号',
            sis_V_RST_HOUSING_INFORMATIO_TEL:'电话号码',
            sis_V_RST_HOUSING_INFORMATIO_NATIV_ADDRESS:'户口所在地',
            sis_V_RST_HOUSING_INFORMATIO_RESIDENTIAL_UN:'居住单元',
            sis_V_RST_HOUSING_INFORMATIO_DEPTNAME:'小区名称',
            sis_V_RST_HOUSING_INFORMATIO_SERVICEPLACE:'服务处所',
            sis_V_RST_HOUSING_INFORMATIO_CREATED:'创建时间'
            // sis_V_RST_HOUSING_INFORMATIO_CREATETIME:'创建时间'
        }
    },
    '路口信息表':{
        queryString:'A_source:"A_db_sis_V_BMS_CROSSING_INFO"',
        fieldsMap:{
            sis_V_BMS_CROSSING_INFO_CROSSING_INDEX_CODE:'路口编号',
            sis_V_BMS_CROSSING_INFO_CROSSING_NAME:'路口名称',
            sis_V_BMS_CROSSING_INFO_INTERCITY:'卡口类型',
            sis_V_BMS_CROSSING_INFO_LANE_NUM:'车道数',
            sis_V_BMS_CROSSING_INFO_LATITUDE:'纬度',
            sis_V_BMS_CROSSING_INFO_LONGITUDE:'经度',
            sis_V_BMS_CROSSING_INFO_ALTITUDE:'海拔',
            sis_V_BMS_CROSSING_INFO_USAGE_TYPE:'使用类型'
        }
    },
    '运维车道过车数据统计':{
        queryString:'A_source:"A_db_sis_V_BMS_MAINTENANCE_LANEINFO"',
        fieldsMap:{
            sis_V_BMS_MAINTENANCE_LANEINFO_LANE_NUMBER:'车道序号',
            sis_V_BMS_MAINTENANCE_LANEINFO_CROSSING_NAME:'路口名称',
            sis_V_BMS_MAINTENANCE_LANEINFO_YESTERDAY_VEHICLE_PASS:'昨日过车数',
            sis_V_BMS_MAINTENANCE_LANEINFO_UNRECOGNIZED_VEHICLE_PASS:'未识别过车数（前一小时）',
            sis_V_BMS_MAINTENANCE_LANEINFO_TODAY_VEHICLE_PASS:'今日过车'
        }
    },
    '布控信息表':{
        queryString:'A_source:"A_db_sis_V_BMS_PLATE_ALARM"',
        fieldsMap:{
            sis_V_BMS_PLATE_ALARM_ALARM_START_PERIOD:'告警第一次出现的时间',
            sis_V_BMS_PLATE_ALARM_PLATE_INFO:'布控车牌号码',
            sis_V_BMS_PLATE_ALARM_CONTECT_INFO:'布控联系人信息',
            sis_V_BMS_PLATE_ALARM_REASON:'布控原因',
            sis_V_BMS_PLATE_ALARM_ALTITUDE:'海拔',
            sis_V_BMS_PLATE_ALARM_USAGE_TYPE:'使用类型',
            sis_V_BMS_PLATE_ALARM_START_TIME:'布控开始时间',
            sis_V_BMS_PLATE_ALARM_END_TIME:'布控结束时间'
        }
    },
    '所有过车信息表':{
        queryString:'A_source:"A_db_sis_V_BMS_VEHICLE_PASS"',
        fieldsMap:{
            sis_V_BMS_VEHICLE_PASS_CROSSING_ID:'卡口ID',
            sis_V_BMS_VEHICLE_PASS_PASS_TIME:'过车时间',
            sis_V_BMS_VEHICLE_PASS_PLATE_INFO:'车牌号码',
            sis_V_BMS_VEHICLE_PASS_VEHICLE_COLOR:'车身颜色',
            sis_V_BMS_VEHICLE_PASS_VEHICLE_SPEED:'车辆速度',
            sis_V_BMS_VEHICLE_PASS_VEHICLE_TYPE:'车辆类型',
            sis_V_BMS_VEHICLE_PASS_VEHICLE_LOGO:'车标'
        }
    },
    '所有区间过车信息表':{
        queryString:'A_source:"A_db_sis_V_BMS_VEHICLE_INTERVAL"',
        fieldsMap:{
            sis_V_BMS_VEHICLE_INTERVAL_CROSSING_INTERVAL_ID:'卡口区间ID',
            sis_V_BMS_VEHICLE_INTERVAL_CROSSING_START:'起始卡口ID',
            sis_V_BMS_VEHICLE_INTERVAL_CROSSING_STOP:'结束卡口ID',
            sis_V_BMS_VEHICLE_INTERVAL_PASS_TIME:'中间时间',
            sis_V_BMS_VEHICLE_INTERVAL_PLATE_INFO:'车牌号码',
            sis_V_BMS_VEHICLE_INTERVAL_VEHICLE_SPEED:'车辆速度',
            sis_V_BMS_VEHICLE_INTERVAL_PASS_TIME_START:'起始时间',
            sis_V_BMS_VEHICLE_INTERVAL_PASS_TIME_STOP:'结束时间'
        }
    },
    '违章过车表':{
        queryString:'A_source:"A_db_sis_V_BMS_VEHICLE_VIOLATION"',
        fieldsMap:{
            sis_V_BMS_VEHICLE_VIOLATION_CROSSING_ID:'卡口id',
            sis_V_BMS_VEHICLE_VIOLATION_LANE_ID:'车道id',
            sis_V_BMS_VEHICLE_VIOLATION_PLATE_INFO:'车牌号码',
            sis_V_BMS_VEHICLE_VIOLATION_VEHICLE_SPEED:'车速',
            sis_V_BMS_VEHICLE_VIOLATION_VEHICLE_TYPE:'车辆类型',
            sis_V_BMS_VEHICLE_VIOLATION_VEHICLE_LOGO:'车标',
            sis_V_BMS_VEHICLE_VIOLATION_ALARM_TIME:'违章时间'
        }
    },
    '人脸比中结果信息':{
        queryString:'A_source:"A_db_sis_V_"',
        fieldsMap:{
            PLATE_INFO:'身份证号',
            VEHICLE_SPEED:'国籍',
            VEHICLE_TYPE:'性别',
            VEHICLE_LOGO:'年龄',
            CROSSING_ID:'拍摄地点',
            LANE_ID:'拍摄时间',
            ALARM_TIME:'对比得分'
        }
    },
    '全国重点人员':{
        queryString:'A_source:"A_db_zdrXY_T_ZZRK_QGZDRYXX"',
        fieldsMap:{
            SRC_HANDSET_NUM:'部级重点人员编号',
            XM:'姓名',
            SFZH:'公民身份号码',
            JG:'籍贯',
            HJDXZ:'户籍地详址',
            XZDXZ:'现住地详址',
            ZDRYLBBJ:'重点人员类别标记',
            NRBJZDRYKSJ:'纳入部级重点人员库时间'
        }
    },
    '中小学校在校学生信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_ZXXZXSXX"',
        fieldsMap:{
            XM:'姓名',
            XB:'性别',
            CSRQ:'出生日期',
            MZ:'民族',
            JG:'籍贯',
            HKSZD:'户口所在地',
            XZZ:'现住址',
            LXDH:'联系电话',
            LJ:'年级',
            BJ:'班级',
            XJH:'学籍号'
        }
    },
    '研究生信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_YJSXX"',
        fieldsMap:{
            XM:'姓名',
            XB:'性别',
            CSRQ:'出生日期',
            SFZH:'身份证号',
            ZZMM:'政治面貌',
            MZ:'民族',
            YXMC:'学校名称',
            ZYMC:'专业名称',
            CC:'教育程度',
            XZ:'学制',
            XXXS:'学习方式'
        }
    },
    '低保人员信息':{
        queryString:'A_source:"A_db_sis_V_"',
        fieldsMap:{
            cac002:'姓名',
            cac004:'身份证',
            cac015:'与户主的关系',
            cac008:'就业状况',
            cbe071:'起始年月',
            cbe077:'保障金额'
        }
    },
    '参保人员信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_CBRYXX"',
        fieldsMap:{
            GRBH:'个人编号',
            ZZJGDM:'组织机构代码',
            DWMC:'单位名称',
            XZ:'险种',
            CBZT:'参保状态',
            CBNY:'参保年月'
        }
    },
    '参保人员变更信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_CBRYBGXX"',
        fieldsMap:{
            DWMC:'单位名称',
            BGLX:'变更类型',
            BGYY:'变更原因',
            CZSJ:'处置时间',
            BGRQ:'变更日期'
        }
    },
    '普通专本科信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_PTZBKSXX"',
        fieldsMap:{
            XM:'姓名',
            XB:'性别',
            SFZH:'身份证号',
            MZ:'民族',
            YXMC:'学校名称',
            ZYMC:'专业名称',
            CC:'教育程度',
            FY:'学院'
        }
    },
    '燃气用户信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_RQYHSJ"',
        fieldsMap:{
            XM:'姓名',
            DZ:'地址',
            LXDH:'联系电话',
            LXHM:'联系号码',
            SFZ:'身份证',
            KTSJ:'开通时间',
            ZT:'状态',
            TZSYSJ:'停止使用时间'
        }
    },
    '会计人员信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_KJRXXK"',
        fieldsMap:{
            CZ_KJRID:'会计人ID',
            CZ_KJRMC:'会计人名称',
            CZ_KJBH:'会计编号'
        }
    },
    '财政供养人员信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_GYRYXX"',
        fieldsMap:{
            DWMC:'单位名称',
            SFZHM:'身份证号码',
            XM:'姓名',
            RYLX:'人员类别',
            RYSF:'人员身份',
            ZW:'职务（职称）',
            XL:'学历',
            LSCS:'隶属处（科）室',
            JBGZ:'基本工资(元/月)'
        }
    },
    '在校生花名册市县信息':{
        queryString:'A_source:"A_db_sis_V_"',
        fieldsMap:{
            XXMC:'学校名称',
            SFZHM:'身份证号码',
            XM:'姓名',
            XB:'性别',
            RXLY:'入学年月',
            FJSZS:'户籍所在省',
            FJSZC:'户籍所在市',
            XXXS:'学习形式',
            LXDHD:'联系电话'
        }
    },
    '计生委流动人口信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_JSW_LDRKXX"',
        fieldsMap:{
            XJZD:'现居住地',
            CJXZ:'村居小组',
            XM:'姓名',
            XB:'性别',
            YFZGX:'与户主关系',
            MZ:'民族',
            HKZK:'户口状况',
            SFZHM:'身份证号码',
            HYZK:'婚姻状况',
            XZXZ:'现住详址',
            HJDDZ:'户籍地地址'
        }
    },
    '常住境外人员学生信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_CRJ_XSXX"',
        fieldsMap:{
            SERIAL:'人员编号',
            CERTIFNO:'学生证号',
            SPECIALTY:'所学专业',
            BEGINDATE:'入学时间',
            CSPECIALTY:'所学专业中文',
            ENDDATE:'学习期限',
            LEAVEDATE:'预计离校时间',
            APPLUNIT:'登记单位',
            APPLDATE:'登记日期',
            SCHOOL:'学校名称',
            HJDDZ:'户籍地地址'
        }
    },
    '国税登记纳税人信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_GSDJNSRXX"',
        fieldsMap:{
            NSRSBH:'纳税人识别号',
            ZZJGDM:'组织机构代码',
            NSRMC:'纳税人名称',
            FDDBRMC:'法定代表人名称',
            SCJYDZ:'生产经营地址',
            SWJG_MC:'税务机关名称',
            DHHM:'电话号码'
        }
    },
    '成教在校生信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_CJZXSXX"',
        fieldsMap:{
            XM:'姓名',
            SFZH:'身份证号',
            YXMC:'学校名称',
            ZYMC:'专业名称',
            XZ:'学制',
            XXXS:'学习方式',
            RXRQ:'入学日期'
        }
    },
    '在校生花名册省属信息':{
        queryString:'A_source:"A_db_sis_V_"',
        fieldsMap:{
            XXMC:'学校名称',
            SFZH:'身份证号',
            XM:'姓名',
            RXLY:'入学年月',
            XZ:'学制',
            FJSZS:'户籍所在省',
            FJSZC:'户籍所在市'
        }
    },
    '海口电动车信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_HKDDC"',
        fieldsMap:{
            SYR:'所有人',
            DW:'登记地点',
            DJH:'电机号',
            CJH:'车架号',
            ZHHM:'证件号码',
            XXDZ:'登记地址',
            LXDH:'联系电话',
            SJHM:'手机号码',
            CLZT:'状态',
            BZY:'经办人',
            CPPXH:'品牌型号'
        }
    },
    '有线电视模拟数据':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_YXDSMNSJ"',
        fieldsMap:{
            FGS:'分公司    ',
            KHXM:'客户姓名',
            QY:'区域',
            XQ:'小区',
            DZ:'地址',
            LXDH:'联系电话',
            RWSJ:'入网时间',
            YHZT:'用户状态'
        }
    },
    '有线电视数字数据':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_YXDSSZSJ"',
        fieldsMap:{
            FGS:'分公司    ',
            KHXM:'客户姓名',
            QY:'区域',
            XQ:'小区',
            DZ:'地址',
            LXDH:'联系电话',
            RWSJ:'入网时间',
            YHZT:'用户状态'
        }
    },
    '有线电视停机缴费未开通数据':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_YXDSTJJFWKT"',
        fieldsMap:{
            FGS:'分公司    ',
            CPMC:'产品名称',
            JFJE:'缴费金额',
            ZHYE:'账户余额',
            ZHYCTJSJ:'最后一次停机时间',
            SLSJ:'受理时间'
        }
    },
    '有线电视开户':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_YXDSKF"',
        fieldsMap:{
            DQ:'地区',
            KFXM:'客户姓名',
            KFDZ:'地址',
            LXDH:'电话',
            SFZBM:'身份证编号',
            DSKFZT:'客户状态',
            SFZH:'身份证号码'
        }
    },
    '地税纳税登记信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_DSLSDJXX"',
        fieldsMap:{
            NSRSBH:'纳税人申报号',
            QYZCH:'企业注册号',
            ZZJGDM:'组织机构代码',
            NSRMC:'纳税人名称',
            FDDBR:'法定代表',
            ZCDZ:'注册地址',
            SWDJJG:'税务登记机关',
            LXDH:'联系电话',
            QY_BZ:'企业标志',
            SWDJRQ:'税务登记日期'
        }
    },
    '地税注销信息表':{
        queryString:'A_source:"QHQB_DSZX"',
        fieldsMap:{
            NSRSBH:'纳税人识别号',
            QYZCH:'企业注册号',
            ZZJGDM:'组织机构代码',
            NSRMC:'纳税人名称',
            ZXYY:'注销原因',
            ZXJG:'注销机构',
            ZXRQ:'注销日期',
            QY_BZ:'企业备注'
        }
    },
    '地税验换证信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_DSYHZ"',
        fieldsMap:{
            NSRSBH:'纳税人识别号',
            QYZCH:'企业注册号',
            ZZJGDM:'组织机构代码',
            NSRMC:'纳税人名称',
            YHZRQ:'验换证日期',
            QY_BZ:'企业备注'
        }
    },
    '地税非正常户信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_DSFZCH"',
        fieldsMap:{
            NSRSBH:'纳税人识别号',
            QYZCH:'企业注册号',
            ZZJGDM:'组织机构代码',
            NSRMC:'纳税人名称',
            FZCHRDRQ:'非正常户认定日期',
            FZCHJCRQ:'非正常户检查日期',
            QY_BZ:'企业备注'
        }
    },
    '国税注销登记信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_GSZX"',
        fieldsMap:{
            NSRSBH:'纳税人识别号',
            ZZJGDM:'组织机构代码',
            NSRMC:'纳税人名称',
            ZXYY_MC:'注销原因名称',
            SWJG_MC:'税务机关名称',
            TBRQ:'填报日期'
        }
    },
    '国税验换证信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_GSYHZ"',
        fieldsMap:{
            NSRSBH:'纳税人识别号',
            ZZJGDM:'组织机构代码',
            NSRMC:'纳税人名称',
            BLYHZ_RQ:'办理验换证日期'
        }
    },
    '国税非正常户信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_GSFZCHXX"',
        fieldsMap:{
            NSRSBH:'纳税人识别号',
            ZZJGDM:'组织机构代码',
            NSRMC:'纳税人名称',
            RDRQ:'认定日期',
            YXQ_Z:'有限期至'
        }
    },
    '工商注销信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_GSZXXX"',
        fieldsMap:{
            REGISTERNO:'注册编号',
            CORPNAME:'公司名称',
            APPROVEDATE:'审批时间'
        }
    },
    '工商吊销信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_GSDXXX"',
        fieldsMap:{
            REGISTERNO:'注册编号',
            CORPNAME:'公司名称',
            CANCELOPINION:'吊销原因',
            APPROVEDATE:'审批时间'
        }
    },
    '工商变更信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_GSBGXX"',
        fieldsMap:{
            REGISTERNO:'注册号',
            CORPNAME:'公司名称',
            FIELDNAME:'变更字段',
            OLDVALUE:'变更字段旧值',
            NEWVALUE:'变更字段新值',
            APPROVEDATE:'审批时间'
        }
    },
    '工商年检信息表':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_GSNJXX"',
        fieldsMap:{
            REGISTERNO:'注册号',
            CORPNAME:'公司名称',
            CHECKYEAR:'检查年份',
            APPROVEDATE:'审批时间'
        }
    },
    '工商登记信息表':{
        queryString:'A_source:"A_db_sis_V_"',
        fieldsMap:{
            CORPNAME:'公司名称',
            PRINCIPAL:'注册人',
            ADDRESS:'地址',
            TELEPHONE:'电话',
            BUSINESSSCOPE:'经营范围'
        }
    },
    '道路运输从业人员信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_CYRY"',
        fieldsMap:{
            XM:'姓名',
            TXDZ:'通讯地址',
            LXDH:'联系电话',
            SFZH:'身份证号',
            ZGZH:'从业资格证号',
            FZJG:'发证机关',
            CYLB:'从业类别',
            CYDQ:'从业地区'
        }
    },
    '婚姻登记信息':{
        queryString:'A_source:"A_db_QHQB_T_QHQB_HYDJXX"',
        fieldsMap:{
            MNAME:'男姓名',
            MSFZJHM:'男身份证件号码',
            MHYZK:'男婚姻状况',
            WNAME:'女姓名',
            WSFZJHM:'女身份证件号码',
            WHYZK:'女婚姻状况',
            CBJGMC:'承办机构',
            JHDJRQ:'结婚登记日期'
        }
    },
    '终端特征信息':{
        queryString:'A_source:"A_db_sis_V_WA_SOURCE_FJ_1001"',
        fieldsMap:{
            sis_V_WA_SOURCE_FJ_1001_IDENTIFICATION_TYPE:'身份类型',
            sis_V_WA_SOURCE_FJ_1001_CERTIFICATE_CODE:'身份内容',
            sis_V_WA_SOURCE_FJ_1001_CAPTURE_TIME:'采集时间'
        }
    },
    '热点信息采集': {
        queryString: 'A_source:"A_db_sis_V_WA_SOURCE_FJ_1002"',
        fieldsMap: {
            sis_V_WA_SOURCE_FJ_1002_AP_MAC: '热点MAC地址',
            sis_V_WA_SOURCE_FJ_1002_AP_SSID: '热点SSID',
            sis_V_WA_SOURCE_FJ_1002_COLLECTION_EQUIPMENT_LONGITUDE: '采集设备经度',
            sis_V_WA_SOURCE_FJ_1002_COLLECTION_EQUIPMENT_LATITUDE: '采集设备纬度',
            sis_V_WA_SOURCE_FJ_1002_CAPTURE_TIME: '采集时间'
        }
    },
    '终端上下线信息':{
        queryString:'A_source:"A_db_sis_V_WA_SOURCE_FJ_0001"',
        fieldsMap:{
            sis_V_WA_SOURCE_FJ_0001_NAME:'上网人员姓名',
            sis_V_WA_SOURCE_FJ_0001_CERTIFICATE_TYPE:'身份证件类型',
            sis_V_WA_SOURCE_FJ_0001_CERTIFICATE_CODE:'身份证件号码',
            sis_V_WA_SOURCE_FJ_0001_NETBAR_WACODE:'上网服务场所编码',
            sis_V_WA_SOURCE_FJ_0001_NETSITE_TYPE:'场所类型',
            sis_V_WA_SOURCE_FJ_0001_IMSI:'终端IMSI码',
            sis_V_WA_SOURCE_FJ_0001_BRAND:'终端品牌',
            sis_V_WA_SOURCE_FJ_0001_MODEL:'终端型号',
            sis_V_WA_SOURCE_FJ_0001_START_TIME:'上线时间',
            sis_V_WA_SOURCE_FJ_0001_END_TIME:'下线时间'
        }
    },
    '上网日志':{
        queryString:'A_source:"A_db_sis_V_WA_SOURCE_FJ_0002"',
        fieldsMap:{
            sis_V_WA_SOURCE_FJ_0002_NETSERVERPORT_WACODE:'上网服务场所编码',
            sis_V_WA_SOURCE_FJ_0002_IP_ADDRESS:'场所内网IP地址',
            sis_V_WA_SOURCE_FJ_0002_SRC_IP:'源外网IPv4地址',
            sis_V_WA_SOURCE_FJ_0002_MAC:'终端MAC地址',
            sis_V_WA_SOURCE_FJ_0002_CAPTURE_TIME:'日志记录时间'
        }
    },
    '终端特征移动采集设备轨迹':{
        queryString:'A_source:"A_db_sis_V_WA_BASIC_FJ_1001"',
        fieldsMap:{
            sis_V_WA_BASIC_FJ_1001_COLLECTION_EQUIPMENT_ID:'采集设备编号',
            sis_V_WA_BASIC_FJ_1001_NETBAR_WACODE:'场所编号',
            sis_V_WA_BASIC_FJ_1001_COLLECTION_EQUIPMENT_LONGITUDE:'采集设备经度',
            sis_V_WA_BASIC_FJ_1001_TIME:'时间'
        }
    }
};
// var timeDict=[];

var infoType ='';
var subInfoType='';
var liArray = $;
var tableIndex = 0;

function queryInfo(offset){
    var tableDict = dict[subInfoType];
    if(!tableDict) {
        console.log("字典中不存在该表名");
        return false;
    }
    var queryString = tableDict['queryString'];
    if(!queryString){
        console.log("queryString没有赋值");
        return false;
    }
    var fieldsMap = tableDict['fieldsMap'];

    var offset = offset || 0;

    var keyWord=$("#search_input").val();
    console.log(keyWord);
    console.log(infoType);
    console.log(subInfoType);

    var pageSize = 10;
    var pageNum = offset/pageSize;
    if(keyWord != ''){
        queryString = queryString + ' AND ' + keyWord;
    }
    $('#pages').show();
    $("#tab1").empty().append('<div class="loading-quick loading-40"></div>');
    $.get('datas/query',
        {
            // queryString:'A_source:"A_db_b111_QHQB_HKDDC"',
            queryString: queryString,
            a_from:new Date('2017-01-01 00:00:00').getTime(),
            a_to:new Date().getTime(),
            pageSize:pageSize,
            pageNum:pageNum
        },
        function(data){
            console.log(data);
            var total = data.count;

            $("#tab1").html('');

            var jsonHits = data.hits;

            if(!jsonHits){
                $("#tab1").append('<span>暂无数据</span>');
                return false;
            }

            var ths=[];
            var ths2=[];
            for(var v in jsonHits[0].fields){
                if(fieldsMap[v]){
                    ths2.push(fieldsMap[v]);
                    ths.push(v);
                }
            }

            var typeList = [];
            typeList.push('<table class="table table-striped table-bordered click_none"><thead><tr>');

            ths2.map(function(s,i){
                typeList.push(['<th key=',i,'>',s,'</th>'].join(''));
            });

            typeList.push( '</tr> </thead> <tbody>');

            jsonHits.map(function (bean) {
                var fields =  bean.fields;

                typeList.push('<tr>');

                ths.map(function (s) {
                    typeList.push('<td title="'+ fields[s] +'"><div style="width:300px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">');
                    if(fields[s].length == 13 &&
                        s.indexOf("TIME") >= 0 || s.indexOf("time") >= 0 ||
                        s.indexOf("SJ") >= 0 || s.indexOf("sj") >= 0){
                        typeList.push(formatDate(parseInt(fields[s])));
                    }else if(fields[s].length == 13 &&
                        s.indexOf("DATE") >= 0 || s.indexOf("date") >= 0 ||
                        s.indexOf("RQ") >= 0 || s.indexOf("YXQ_Z") >= 0){
                        typeList.push(formatDate2(parseInt(fields[s])));
                    }else{
                        // typeList.push(fields[s].slice(0,20)+'……');
                        typeList.push(fields[s]);
                    }
                    typeList.push('</div></td>');
                });

                typeList.push('</tr>');

            });
            typeList.push('</tbody></table>');

            $("#tab1").append(typeList.join(''));
            $('#pages').show();
            fenye('#pages','queryInfo',total,pageNum+1,pageSize);
        })
}

function searchCount(){
    var tableArray = tableDictTmp;
    // var queryString = 'A_source:"A_db_duo_SEC_USER_INFO" OR A_source:"A_db_duo_SEC_USER_SYNCINFO" | report count(A_source) over A_source';
    var tmpStr = [];
    $(tableArray).each(function (index,value) {
        if(index == 0)  {
            tmpStr.push('A_source:"'+value+'"')
        }else{
            tmpStr.push(' OR A_source:"'+value+'"');
        }
    });
    tmpStr.push(' | report count(A_source) over A_source');
    var queryString = tmpStr.join('');
    var keyWord=$("#search_input").val();
    if(keyWord != ''){
        queryString = queryString + ' AND ' + keyWord;
    }
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
            if(datas){
                liArray.each(function (index,value) {
                    $(this).children("span").html('['+datas[index][1]+']');
                });
            }else{
                liArray.each(function (index,value) {
                    $(this).children("span").html('');
                });
            }
        })
}

function queryInfo2(infoType,subInfoType){

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

function typeMenu(){
    $.get('datas/query',
        {
            queryString:''
        },
        function(data){
            $("#type_menu").html('');
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('');

            jsonHits.map(function (bean) {
                var fields =  bean.fields;

                typeList.push('<h3 id=\"',fields.type,'\">',fields.type,'<span>[',fields.subType.length,']</span></h3>');

                typeList.push('<ul class="ulmenu1">');

                fields.subType.map(function (st) {
                    typeList.push('<li>');
                    typeList.push('<a href="javascript:void(0);" onclick="queryInfo();">',st.name,'</a>');
                    typeList.push('<span>[',st.total,']</span>');
                    typeList.push('</li>');
                });

                typeList.push('</ul>');

            });
            $("#type_menu").append(typeList.join(''));

        })
}

function superTypeOnMenu(){
    console.log(obj);
    $.get('datas/query',
        {
            queryString:''
        },
        function(data){
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('');

            jsonHits.map(function (bean) {
                var fields =  bean.fields;

                typeList.push('<h3 id=\"',fields.type,'\">',fields.type,'<span>[',fields.subType.length,']</span></h3>');

            });
            $('#type_menu').append(typeList.join(''));
        })
}

function subTypeOnMenu(obj){
    console.log('subTypeOnMenu');
    $.get('datas/query',
        {
            queryString:'A_source:"A_db_b111_QHQB_HKDDC"',
            a_from:new Date('2017-01-01 00:00:00').getTime(),
            a_to:new Date().getTime()
        },
        function(data){
            console.log('subTypeOnMenu='+data);
            var jsonHits = data.hits;

            var typeList = [];
            typeList.push('');

            var ths=[];
            for(var v in jsonHits[0].fields){
                ths.push(v);
            }

            jsonHits.map(function (bean) {
                var fields =  bean.fields;

                typeList.push('<li>');
                typeList.push('<a href="javascript:void(0);" onclick="queryInfo();">',fields[0],'</a>');
                typeList.push('<span>[',fields[1],']</span>');
                typeList.push('</li>');

            });
            $(obj).next('ul').append(typeList.join(''));
        })
}

// 传入分页的节点,请求数据的方法,总页数 当前页
function fenye(page, func, total, pageNum,pageSize) {
    var offset=pageNum*pageSize-pageSize;
    var lastoff = offset > pageSize ? offset - pageSize : 0;
    var nextoff = Math.floor(total / pageSize) + 1 == (Math.floor(offset / pageSize)) ? 0 : (offset + pageSize);

    $(page).html(['<li>'
        , '  <a href="javascript:void(0);" onclick="', func, '(', lastoff, ')" aria-label="Previous">'
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
                    htm += '<li><a href="javascript:void(0);" onclick="' + func + '(' + (i - 1) * pageSize + ')">' + i + '</a></li>'
                }
            }
            htm+='<input id="goTo" type="text" /><button class="go_btn" onClick="' + func + '(' +  'getInputvalue()'  + ')">跳转</button>';
            return htm;
        })()
        , '<li>'
        , '  <a href="javascript:void(0);" onclick="', func, '(', nextoff, ')" aria-label="Next">'
        , '    <span aria-hidden="true">&raquo;</span>'
        , '  </a>'
        , '</li>'].join(''))
}
function getInputvalue(){
    return ($('#goTo').val()-1)*10;
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
function formatDate2(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '-' + add0(m) + '-' + add0(d);
}