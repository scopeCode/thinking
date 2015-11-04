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
    var userPwd  = md5(req.body.userPwd);

    global.logger.info(userPwd + "的MD5值:" + md5(userPwd));

    var user={
        username:'1@163.com',
        password:md5('123456')
    };

    if(userName==user.username&&userPwd==user.password)
    {
        req.session.user = user;
        res.send(200,{result:1,data:{},msg:''});
    }else{
        res.send(200,{result:0,data:{},msg:'用户名或密码错误.'});
    }
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

function md5(content){
    var md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex');
}