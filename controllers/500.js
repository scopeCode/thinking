/**
 * Created by WG on 2015/11/5.
 */
/**
 * show 500 page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.show = function (req, res, next) {
    try{
        global.logger.info("controllers/500.js");
        res.render("errors/500");
    }catch(ex){
        next(ex);
    }
};