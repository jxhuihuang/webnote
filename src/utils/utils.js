import React, { Component } from 'react'
import { message } from 'antd';
// import moment from 'moment';
const default_data = defaultData || {};
const httpsType = 'https:' == document.location.protocol ? "https://" : "http://";
let pageline = 10;
let isLogin = isLogined || false;  //是否登录
let isadmin = isBlogOwner || false;  //是否是博主
let blogId = currentBlogId || "";   //博客id
let blogApp = currentBlogApp || ""; //博客后缀
let currentUrl = window.location.href;  //获取当前url
let domainCtx = currentUrl.split(blogApp)[0] //域名部分   currentUrl.split(blogApp)[0]; 
let ctx = currentUrl.split(blogApp)[0] + blogApp;  //url 前面部分  https://www.cnblogs.com/bigweb     
let bolgdefaultAvatars = "https://images.cnblogs.com/cnblogs_com/webqiand/762723/o_timg.jpg"; //头像
let userdefaultAvatars = "https://images.cnblogs.com/cnblogs_com/webqiand/1381628/o_200909063356user_avatar5.png"; //用户默认头像 https://images.cnblogs.com/cnblogs_com/webqiand/1381628/o_uesravatars.png
let loginAvatars = "https://images.cnblogs.com/cnblogs_com/webqiand/1381628/o_login.png"; //未登录时头像
const colorChars = ['#036564', '#EB6841', '#3FB8AF', '#FE4365', '#FC9D9A', '#EDC951', '#C8C8A9', '#83AF9B', '#8A9B0F', '#3299BB', '#D8B303', '#00ABA9', '#567E95', '#B433FF', '#5CB85C', '#428BCA', '#4A4A4A', '#D9534F', "#d9534f", "#00abd0", "#5cb85c", "#b37333", "#428bca", "#ff6600", "#4a4a4a", "#567e95", "#52c41a", "#722ed1"]; //标签随机背景颜色
const sizeChart = ["9px", "10px", "11px", "12px", "13px", "14px", "15px", "16px", "17px", "18px", "19px", "20px", "21px", "22px", "23px", "24px"]
let variables = { currentUrl, ctx, domainCtx, pageline, isLogin, isadmin, blogId, blogApp, httpsType, colorChars, sizeChart, bolgdefaultAvatars, userdefaultAvatars, loginAvatars };
const BootCommons = Object.assign({}, variables, default_data)

/*判断是否是""或undefind null*/
function checkNull(val) {
    let typename = Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
    if (typename === "null" || typename === "undefined") {
        return true
    }
    return false;
}

//去除 undefind、 null 全部设为 "" 
function removeNull(val) {
    let typeName = Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
    if (typeName == "null" || typeName == "undefined") {
        return ""
    }
    return val;
}

function linkTo(url) {
    window.location.href = url;
}
//react 转html
function createMarkup(str) {
    return { __html: str };
}
//加零
function addzerro(str) {
    if (parseInt(str) < 10) {
        return "0" + parseInt(str);
    }
    else {
        return parseInt(str);
    }
}
//获取url参数
const geturl = (name) => {
    const reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return decodeURI(RegExp.$2.replace(/\+/g, " ")); return "";
};

//url去除http https
const removehttp = (url = "") => {
    if (url == "") {
        return "";
    }
    let links = url;
    if (url.indexOf("https://") != -1) {
        links = url.replace("https://", "");
    }
    if (url.indexOf("http://") != -1) {
        links = url.replace("http://", "");
    }

    return links;
}

//生成随机数   /*type:1 时生成数字 2字母 3数字加字母  为数组则是自定义*/
function random(n, type, isDeduplication) {
    isDeduplication = isDeduplication ? isDeduplication : false; //是否去除重复
    type = type || 3;
    var chars = [];
    var num = 0;
    chars =
        type == 1 ?
            ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']// 数字
            :
            type == 2 ?
                ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
                :
                type == 3 ?
                    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
                    :
                    Array.isArray(type) ?  //自定义数组
                        type
                        :
                        []
    //数字加字母  
    num = chars.length - 1;
    var res = "";
    var arrys = []
    for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * num);
        if (!isDeduplication) {
            arrys.push(chars[id])
        } else {
            n = n > num ? num : n;
            var randoms = chars[id];
            if (arrys.indexOf(randoms) == -1) {
                arrys.push(randoms)
            } else {
                i = i - 1;
            }
        }
    }
    var resString = arrys ? arrys.join("") : "";
    return resString;
}
//随机数时间戳  
function Timestamp() {
    var a = Math.random, b = parseInt;
    return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
}

//判断移动端还是电脑端
const isMobile = (function () {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        return true //手机端";
    }
    else {
        const clientWidth = document.documentElement.clientWidth;
        if (clientWidth <= 680) {
            return true  //手机端";
        } else {
            return false//pc端
        }
    }
})();
//格式化日期 DateFormat('yyyy-MM-dd hh:mm:ss:SS 星期w 第q季度') w 星期 小写为数字 大写为中文  
function DateFormat(format, date) {
    let newdate = date ? date.toString() : "";   //new Date()
    newdate = newdate ? newdate.replace(/-/g, "/") : "";
    newdate = newdate ? newdate.replace(/\./g, "/") : "";
    date = newdate ? new Date(newdate) : new Date();
    format = format || "yyyy-MM-dd";
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    var o = {
        "y+": date.getYear(), //year  
        "M+": date.getMonth() + 1, //month   
        "d+": date.getDate(), //day   
        "h+": date.getHours(), //hour   
        "H+": date.getHours(), //hour  
        "m+": date.getMinutes(), //minute   
        "s+": date.getSeconds(), //second   
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter   
        "S": date.getMilliseconds(), //millisecond   
        "w": date.getDay(),
        "W": Week[date.getDay()]
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
/*判断字符串长度 (汉字为两个字符)*/
function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
            len++;
        }
        else {
            len += 2;
        }
    }
    return len;
}

/*  截取字符串，多出的显示省略号   */
var cutstr = function (strings, len) {
    if (strings == "") {
        return "";
    }
    var restr = strings;
    var wlength = strings.replace(/[^\x00-\xff]/g, "**").length;
    if (wlength > len) {
        for (var k = len / 2; k < strings.length; k++) {
            if (strings.substr(0, k).replace(/[^\x00-\xff]/g, "**").length >= len) {
                restr = strings.substr(0, k) + "...";
                break;
            }
        }
    }
    return restr;
}
/**
 * 图标 
 * type:图标内容
 * className
 * color
 * fontSize
 */
const Icons = ({ type = "", className = "", color = "", size = "", right = "", left = "", style = {}, onClick = () => { } }) => {
    type = type != "" ? " " + type : "";
    className = className != "" ? " " + className : "";
    color != "" ? style.color = color : "";
    size != "" ? style.fontSize = size : "";
    right != "" ? style.marginRight = right : "";
    left != "" ? style.marginLeft = left : "";
    return (
        <i className={"iconfont " + type + " " + className} style={style} onClick={onClick}></i>
    )
}

const ajaxFa = function (returnData = {}, callback, ajaxUrl, {
    async = true,
    dataType = "json",
    types = "post",
    showErrorMsg = false,
    errors = () => { },
} = {},) {
    const $this = this;
    let Timestamps = "";
    Timestamps = Timestamp() + random(5);
    //var returnData=JSON.parse(JSON.stringify(s.returnData))
    let ajaxurls = ajaxUrl.indexOf("?") >= 0 ? ajaxUrl + "&v1=" + Timestamps : ajaxUrl + "?v1=" + Timestamps;
    switch (dataType) {
        case "json":
            $.ajax({
                url: ajaxurls,
                data: returnData,
                type: types,
                async: async,
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    callback.call($this, data);
                },
                error: function (error) {
                    showErrorMsg && message.info('抱歉！发生了错误！麻烦反馈至contact@cnblogs.com')
                    errors.call(error);
                }
            });
            break;
        case "jsonp":
            $.ajax({
                url: ajaxurls,
                data: returnData,
                type: types,
                dataType: 'jsonp',
                jsonp: 'callback',
                success: function (data) {
                    callback.call($this, data);
                },
                error: function (error) {
                    showErrorMsg && message.info('抱歉！发生了错误！麻烦反馈至contact@cnblogs.com')
                    errors.call(error);
                }
            });
            break;
        case "text":
            $.ajax({
                url: ajaxurls,
                data: returnData,
                type: types,
                // async: async,
                dataType: "text",
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    callback.call($this, data);
                },
                error: function (error) {
                    // console.log('error status:', error.status);
                    showErrorMsg && message.info('抱歉！发生了错误！麻烦反馈至contact@cnblogs.com')
                    errors.call(error);
                    // if(error.status > 0){
                    //     showErrorMsg && message.info('抱歉！发生了错误！麻烦反馈至contact@cnblogs.com')
                    //     errors.call(error);
                    // }
                }
            });
            break;
    }
}
/* 加载js  */
function addjs(url) {
    var script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    document.body.appendChild(script);
    document.querySelector('head').appendChild(script)
}
/* js中加载css */
function addCss(cssCode, box) {
    box = checkNull(box)
    var eStyle = document.createElement('style');
    eStyle.innerHTML = cssCode;
    box == "" ? document.querySelector('head').appendChild(eStyle) : $(box).appendChild(eStyle);
    //document.querySelector ('head').appendChild (eStyle);
}

/* js中加载css */
function addLinkCss(cssCode, box) {
    box = checkNull(box)
    var eStyle = document.createElement('link');
    eStyle.type = "text/css";
    eStyle.rel = "stylesheet"
    eStyle.href = cssCode;
    box == "" ? document.querySelector('head').appendChild(eStyle) : $(box).appendChild(eStyle);
    //document.querySelector ('head').appendChild (eStyle);
}


//转义html标签  
function HtmlEncode(text) {
    return text.replace(/<[^>]+>/g, '')
}
/**判断是否包含 */
function isContain(obj, strings) {
    var ishas = false;
    obj = obj || "";
    strings = strings || "";


    if (obj == "" || strings == "") {
        ishas = false;
    } else {
        var objType = (typeof (obj)).toLowerCase();
        var stringsType = (typeof (strings)).toLowerCase();
        if (objType === "string") {
            obj = obj.replace(/(^\s*)|(\s*$)/g, "")
        }
        if (stringsType != "string") {
            strings = strings.toString()
        }
        strings = strings.replace(/(^\s*)|(\s*$)/g, "");
        if (obj.indexOf(strings) == -1) {
            ishas = false;
        } else {
            ishas = true;
        }
    }
    return ishas;
}


/*  获取图片真实宽高   */
var getrealImg = function (src) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = src;
        var kuan;
        var gao;
        if (img.complete) {
            kuan = img.width || "";
            gao = img.height || "";
            let imgObjs = {
                widths: kuan,
                heights: gao,
                type: "complete",
            }
            resolve(imgObjs)
        } else {
            img.onload = function (s) {
                kuan = img.width || "";
                gao = img.height || "";
                img.onload = null;
                let imgObjs = {
                    widths: kuan,
                    heights: gao,
                    type: "onload",
                }
                resolve(imgObjs)
            };
            img.onerror = function (s) {
                resolve({})
            }
            img.src = src;
        };
    })
};
function stringToArry(strings) {
    if (checkNull(strings)) return [];
    strings = strings.toString();

    if (strings.indexOf(",") == -1) {
        var stringsArry = []
        stringsArry.push(strings)
        return stringsArry;
    }
    var stringsArry = []
    strings = strings.lastIndexOf(",") == strings.length - 1 ? strings.substring(0, strings.lastIndexOf(",")) : strings;
    for (var i = 0; i < strings.split(",").length; i++) {
        stringsArry.push(removeNull(strings.split(",")[i]))
    }
    var nerArry = [];
    stringsArry.map(function (obj) {
        if (nerArry.indexOf(obj) == "-1") {
            nerArry.push(obj)
        }
    })
    return nerArry
}
//跳转锚点
function linkmao(href = "") {
    if (href == "") {
        return false;
    }
    var scrollTops = $("[name='" + href + "']").offset().top;
    $('html,body').animate({ scrollTop: (scrollTops - 60) + 'px' }, 400);

}
/****获取当前网站url */
function getcurrentUrl(currentUrl) {
    currentUrl = currentUrl || "";
    if (currentUrl == "") {
        return "";
    }
    // currentUrl=currentUrl.indexOf("/index.html")?currentUrl.split("/index.html")[0]:currentUrl;
    currentUrl = currentUrl.indexOf("?") > 0 ? currentUrl.split("?")[0] : currentUrl;
    currentUrl = currentUrl.indexOf("#") > 0 ? currentUrl.split("#")[0] : currentUrl;
    currentUrl = currentUrl.lastIndexOf("/") == currentUrl.length - 1 ? currentUrl.substring(0, currentUrl.lastIndexOf("/")) : currentUrl;
    return currentUrl;
}
// 分离字符串
function stringSplit(value, key) {
    value = value || "";
    if (!value || value === "") {
        return "";
    }
    value = value.replace(/<[^>]+>/g, " ") //去除html标签
    var metaInfo = value.split(key);
    let splitArry = [];

    for (var i = 0; i < metaInfo.length; i++) {
        if (metaInfo[i].replace(/(^\s*)|(\s*$)/g, "") != "") {
            splitArry.push(metaInfo[i])
        }

    }
    return splitArry
}

/**
 * @param    获取内容最后括号中的值
 * text   要获取得数据
 * insNum 是否只取数字
 */
function getLastbrackval(text = "", insNum = true) {
    text = text && text !== "" ? text.replace(/(^\s*)|(\s*$)/g, "") : "";
    if (text == "") {
        return "";
    }
    let value = "";

    if (text.lastIndexOf(")") === text.length - 1) {
        let newvalue = text.substring(text.lastIndexOf("(") + 1, text.lastIndexOf(")")) || "";
        if (newvalue === "") {
            value = "";
        } else if (!insNum) {
            value = newvalue;
        } else {
            var reg = /^([1-9]\d*|[0]{1,1})$/;
            if (!reg.exec(newvalue)) {
                value = "";
            } else {
                value = newvalue;
            }
        }
    }
    return value;
}
// 去除最后的数字
/**
 * 
 * @param {*} text 
 * @param {*} insNum  是否只有括号内容为数字才去除
 */
function remLastbrackval(text, insNum = true) {
    text = text ? text.replace(/(^\s*)|(\s*$)/g, "") : "";
    if (text == "") {
        return text;
    }
    let value = text;
    let lastNums = getLastbrackval(text, insNum) //.replace(/(^\s*)|(\s*$)/g, "");
    if (lastNums != "") {
        value = text.substring(0, text.lastIndexOf("("))
    }
    return value;
}

// 获取列表序号
function listserialnum(text) {
    text = text ? text.replace(/(^\s*)|(\s*$)/g, "") : "";
    if (text == "") {
        return { title: "", num: "" };
    }
    var reg = /^[0-9]*[1-9][0-9]*\..*/
    if (!reg.exec(text)) {
        return { title: "", num: "" };
    }
    var reg1 = /^([0-9]*[1-9][0-9]*)\..*/
    let num = text.replace(/^([0-9]*[1-9][0-9]*)\..*/, "$1")
    let newtexts = text.replace(/^([0-9]*[1-9][0-9]*)\.(.*)/, "$2")
    return { title: newtexts, num: num }
}

// 移动端优化显示
function addEventListener() {
    if (isMobile) {
        $(document).find("meta[name=viewport]").attr("content", "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no")
        addjs("https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js")
        httpsType === "https://" ? addjs("https://blog-static.cnblogs.com/files/webqiand/mobiles.js?v=1.1") : addjs("http://www.webnotes.tk/public/mobiles.js?v=1.1")  //https://blog-static.cnblogs.com/files/webqiand/mobiles.js
        var script = document.createElement("script");
        script.innerHTML =
            `
            if ('addEventListener' in document) {
                document.addEventListener('DOMContentLoaded', function() {
                    FastClick.attach(document.body);
                }, false);
            }
            if(!window.Promise) {
                document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
            }
        `
        document.querySelector('head').appendChild(script);
    }
}
// 获取兄弟节点
function getNearEle(ele, type) {
    type = type == 1 ? "previousSibling" : "nextSibling";
    var nearEle = ele[type];
    while (nearEle) {
        if (nearEle.nodeType === 1) {
            return nearEle;
        }
        nearEle = nearEle[type];
        if (!nearEle) {
            break;
        }
    }
    return null;
}
function addkeys(datas, key = "key") {
    if (!datas) {
        return "";
    }
    const isArrays = Array.isArray(datas);

    if (isArrays === true) {
        let newDatas = [];
        datas.map((obj, i) => {
            let newObj = Object.assign({}, obj)
            if (newObj.id) {
                newObj[key] = key === "id" ? newObj.id : (newObj.id).toString();
                newDatas.push(newObj);
            } else {
                let j = i + 1
                newObj[key] = key === "id" ? j : j.toString();
                newDatas.push(newObj);
            }
        })
        return newDatas;
    } else {
        var type = (typeof (datas)).toLowerCase();
        if (type === "object" && !datas.key) {
            let newDatas = Object.assign({}, datas)
            newDatas[key] = key === "id" ? 1 : "1"
        }
        return newDatas;
    }
}
function removeobj(datas = [], value = "", key = "id") {
    const isArrays = Array.isArray(datas);
    if (!isArrays || datas.length <= 0 || value === "") {
        return datas;
    }
    let newDatas = [];
    datas.map((obj, i) => {
        let val = obj[key] || "";
        if (val !== value) {
            newDatas.push(obj)
        }
        return i;
    })
    return newDatas;
}
function sorts(data = [], key = "id") {
    let newData = data.sort(function (x, y) {
        if (!checkNull(x[key]) && !checkNull(y[key])) {
            if (parseInt(x[key]) === parseInt(y[key]) && x.id && y.id) {
                return (parseInt(x.id) > parseInt(y.id)) ? 1 : -1
            } else {
                return (parseInt(x[key]) > parseInt(y[key])) ? 1 : -1
            }
        }
    });
    return newData
}


/* --------   获取几周 几天前     --------------*/
function getDateDiff(dateTimeStamp = "") {

    dateTimeStamp = dateTimeStamp ? DateFormat("yyyy/MM/dd hh:mm", dateTimeStamp) : "";
    if (dateTimeStamp === "") {
        return "";
    }
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;

    var now = new Date().getTime();
    var diffValue = now - new Date(dateTimeStamp);

    if (diffValue < 0) {
        return DateFormat("yyyy-MM-dd hh:mm", dateTimeStamp);
    }
    var nowDate = DateFormat("yyyy/MM/dd", new Date()) + " 23:59";
    var dateTimeStampDate = DateFormat("yyyy/MM/dd", dateTimeStamp) + " 23:59";
    let datediffValue = new Date(nowDate) - new Date(dateTimeStampDate);
    var dayC = datediffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    if (dayC >= 2) {
        let year = DateFormat("yyyy", dateTimeStamp);
        let nowyear = DateFormat("yyyy");
        if (year === nowyear) {
            return DateFormat("MM-dd hh:mm", dateTimeStamp);
        } else {
            return DateFormat("yyyy-MM-dd hh:mm", dateTimeStamp);
        }
    } else if (dayC >= 1) {
        return "昨天 " + DateFormat("hh:mm", dateTimeStamp)
    } else if (hourC >= 1) {
        return parseInt(hourC) + '小时前';
    } else if (minC >= 1) {// 几分钟前
        return parseInt(minC) + '分钟前';
    } else {// 刚刚
        return '刚刚';
    }
}
export {
    BootCommons,
    checkNull,
    removeNull,
    linkTo,
    createMarkup,
    addzerro,
    geturl,
    random,
    Timestamp,
    isMobile,
    DateFormat,
    strlen,
    cutstr,
    Icons,
    ajaxFa,
    addjs,
    addCss,
    addLinkCss,

    removehttp,
    HtmlEncode,
    isContain,
    getrealImg,
    stringToArry,
    linkmao,
    getcurrentUrl,
    stringSplit,
    getLastbrackval,
    remLastbrackval,
    addEventListener,
    listserialnum,
    getNearEle,
    addkeys,
    removeobj,
    sorts,
    getDateDiff,
}