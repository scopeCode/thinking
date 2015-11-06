/**
 * Created by WG on 2015/11/5.
 */
var crypto = require('crypto');

exports.md5 = function(content){
    var md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex');
};

exports.stringify = function(val){
    var stack = val.stack;
    if (stack) {
        return String(stack);
    }
    var str = String(val);
    return str === toString.call(val) ? inspect(val) : str;
};

exports.dateFormat = function (formatStr, date) {

    if(!this.isDate(date)){
        date = strToDate(date);
    }
    formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";

    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
    str = str.replace(/MM/, date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth());
    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
};

exports.isDate = function(d){
    return isObject(d) && objectToString(d) === '[object Date]';
};

exports.success = function(data){
    return {"result":1,"data":data,"msg":""};
};

exports.error = function(msg){
    return {"result":0,"data":{},"msg":msg};
};

function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
};

function objectToString(o) {
    return Object.prototype.toString.call(o);
};

function strToDate(dateStr) {
    var data = dateStr;
    var reCat = /(\d{1,4})/gm;
    var t = data.match(reCat);
    t[1] = t[1] - 1;
    eval('var d = new Date(' + t.join(',') + ');');
    return d;
};