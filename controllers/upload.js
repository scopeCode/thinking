/**
 * Created by scj-mo on 2015/11/5.
 */
var qn = require("mo/qiniu");
var formidable = require('formidable');

exports.upload = function(req, res, next){
    try{
        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.keepExtensions = true;
        form.parse(req, function(err, fields, files) {
            var path = "";
            for(var key in files){
                path = files[key].path;
            }

            qn.putWithoutKey(path,null,function(ret){
                res.send(200,{key:ret.key,hash:ret.hash});
            },function(err){
                res.send(500,{err:err});
            });

        });
    }catch(ex){
        next(ex);
    }
};