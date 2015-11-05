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

exports.success = function(data){
    return {"result":1,"data":data,"msg":""};
};

exports.error = function(msg){
    return {"result":0,"data":{},"msg":msg};
};