/**
 * Created by WG on 2015/11/3.
 */

module.exports = function (app) {
    app.get("/", function(req, res, next) {
        try{
            res.render('index', { title: 'Express' });
        }catch(ex){
            next(err);
        }
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
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
    });
}