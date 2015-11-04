/**
 * Created by WG on 2015/11/4.
 */


/**
 * show index page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.showIndex = function (req, res, next) {
    try{
        global.logger.info("controllers/index.js");
        res.render('index', { title: '网站首页' });
    }catch(ex){
        next(ex);
    }
};