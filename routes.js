/**
 * Created by WG on 2015/11/3.
 */
var errorHandler = require('errorhandler');

var login             = require("./controllers/login/login");
var index             = require("./controllers/index");

module.exports = function (app) {

    app.route("/").all(login.authentication).get(index.showIndex);
    app.route("/login").all(login.notAuthentication).get(login.showLogin).post();

    //404错误页面的处理
    app.use(function(req, res, next) {
        var err = new Error('Not Found');err.status = 404;next(err);
    });
    //其他错误的处理
    app.use(function(err, req, res, next) {
        var status = err.status || 500;
        res.status(status);
        if(404 == status){
            res.render('errors/404', {
                title:"404错误",
                message: err.message,
                error: {}
            });
        }
        if(500 == status){
            res.render('errors/500', {
                title:"500错误",
                message: err.message,
                error: {}
            });
        }
        next(err);
    });
    //错误处理接受处理
    app.use(errorHandler(
    {
        dumpExceptions: true,
        showStack: true ,
        log:function(err, str, req){
            global.logger.error(str);
        }
    }));
    //应用程序出错执行的处理
    process.on("uncaughtException", function (err) {
        global.logger.error(err);
    });
};