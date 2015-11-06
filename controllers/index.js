/**
 * Created by WG on 2015/11/4.
 */

var article = require("../schema/article");

/**
 * show index page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.show = function (req, res, next) {
    try{
        global.logger.info("controllers/index.js");

        article.getAll(function(err,a){
            if(!err){
                res.render('index',{data:a});
            }else{
                res.render('index',{err:err});
            }
        })

    }catch(ex){
        next(ex);
    }
};
