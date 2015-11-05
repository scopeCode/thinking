/**
 * Created by WG on 2015/11/3.
 */
var common              = require("./common/common");
var login               = require("./controllers/login");
var index               = require("./controllers/index");
var index404            = require("./controllers/404");
var index500             = require("./controllers/500");

module.exports = function (app) {


    app.route("/404").all(login.notAuthentication).get(index404.show);
    app.route("/500").all(login.notAuthentication).get(index500.show);

    app.route("/").all(login.authentication).get(index.show);
    app.route("/login").all(login.notAuthentication).get(login.showLogin).post(login.signIn);

    //404错误页面的处理
    app.use(function(req, res, next) {
        var err = new Error('Not Found');err.status = 404;next(err);
    });
    //其他错误的处理
    app.use(function(err, req, res, next) {
        var status = err.status || 500;
        res.status(status);

        if(err){
            global.logger.error("[error]:"+common.stringify(err));
        }

        if(404 == status){
            req.session.error={
                title:"404错误",
                message: err.message,
                error: {}
            };
            return res.redirect('/404');
        }else if(500 == status){
            req.session.error={
                title:"500错误",
                message: err.message,
                error: {}
            };
            return res.redirect('/500');
        }
        next();
    });

    //应用程序出错执行的处理
    process.on("uncaughtException", function (err) {
        global.logger.error("[uncaughtException]:"+err);
    });
};