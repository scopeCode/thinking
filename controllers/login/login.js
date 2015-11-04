/**
 * Created by WG on 2015/11/4.
 */
var crypto = require('crypto');


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
    global.logger.info(req.body);

    var userName = req.body.userName;
    var userPwd  = req.body.userPwd;

    var md5 = crypto.createHash('md5');
    md5.update(userPwd);
    var md5Pwd = md5.digest('hex');  //MD5值是5f4dcc3b5aa765d61d8327deb882cf99

    
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

