/**
 * Created by WG on 2015/11/4.
 */
var common = require("../common/common");
var userSchema = require("../schema/user");
/**
 * show login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.showLogin = function (req, res, next) {
    global.logger.info("controllers/login/login.js -- showLogin");
    res.render("login");
};

/**
 * show login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.signIn = function (req, res, next) {
    global.logger.info("controllers/login/login.js  -- signIn");

    var userName = req.body.userName;
    var userPwd  = common.md5(req.body.userPwd);

    userSchema.signIn(userName,userPwd,function(err,data){
        if(err){
            res.send(200,common.error(err.message));
        }else{
            var user = {userName:userName};
            req.session.user = user;
            res.send(200,common.success(user));
        }
    });
};

/**
 * authentication login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.authentication = function (req, res, next) {
    global.logger.info("controllers/login/login.js  -- authentication");
    if (!req.session.user) {
        req.session.error='请先登陆';
        return res.redirect('/login');
    }
    next();
};


/**
 * notAuthentication login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */
exports.notAuthentication = function (req, res, next) {
    global.logger.info("controllers/login/login.js  -- notAuthentication");
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
};