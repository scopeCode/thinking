/**
 * Created by WG on 2015/11/3.
 */

var login             = require("./controllers/login/login");
var index             = require("./controllers/index");

module.exports = function (app) {


    app.route("/404").all(login.notAuthentication).get(function(req, res, next){
        res.render("errors/404");
    });
    app.route("/500").all(login.notAuthentication).get(function(req, res, next){
        res.render("errors/500");
    });
    app.route("/").all(login.authentication).get(index.showIndex);
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
            global.logger.error("[error]:"+stringify(err));
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

function stringify(val) {
    var stack = val.stack;
    if (stack) {
        return String(stack);
    }
    var str = String(val);
    return str === toString.call(val) ? inspect(val) : str;
}