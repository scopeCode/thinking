/**
 * Created by scj-mo on 2015/11/5.
 */
var common = require("../common/common");
var article = require("../schema/article");



/**
 * show create page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.show = function (req, res, next) {
    try{
        global.logger.info("controllers/create.js");
        res.render('create');
    }catch(ex){
        next(ex);
    }
};

/**
 * show insert post
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.insert = function (req, res, next) {
    try{
        var title = req.body.title,desc=req.body.desc,img=req.body.img,type=req.body.type;
        article.insert(title,desc,img,type,function(err,a){
            if(err){
                res.send(200,common.error(err.message));
            }else{
                res.send(200,common.success(a));
            }
        });
    }catch(ex){
        next(ex);
    }
};

/**
 * show getAll post
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.getAll = function (req, res, next) {
    try{
        var offset = req.body.offset|| 0,limit = req.body.limit || 10;

        article.getAll((offset*limit),limit,function(err,a){
            if(err){
                res.send(200,common.error(err.message));
            }else{
                res.send(200,common.success(a));
            }
        })
    }catch(ex){
        next(ex);
    }
};