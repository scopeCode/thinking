/**
 * Created by scj-mo on 2015/11/5.
 */

var mysqlCient   =   require("mo/mysql");
var common       =   require("../common/common");

var Article = mysqlCient.sequelize.define('article',
    {
        title:{
            type:mysqlCient.Sequelize.STRING,
            field:"title"
        },
        desc:{
            type:mysqlCient.Sequelize.STRING,
            field:"desc"
        },
        img:{
            type:mysqlCient.Sequelize.STRING,
            field:"img"
        },
        created:{
            type:mysqlCient.Sequelize.DATE,
            defaultValue:mysqlCient.Sequelize.NOW,
            field:"created"
        },

    },
    {
        freezeTableName: true,
        timestamps:false,
        tableName:'article'
    }
);


exports.insert = function(title,desc,img,callback){

    Article.create({
        title:title,
        desc:desc,
        img:img
    }).then(function(a){
        callback(null,a);
    }).catch(function(err){
        callback(err,null);
    });

};


exports.getAll = function(callback){
    Article.findAll().then(function(u){
        if(!u){
            callback(new Error("没有数据."),null);
        }else{
            callback(null,u);
        }
    }).catch(function(err){
        callback(err,null);
    });
};

exports.init = function(){
    Article.sync({force: true}).then(function(){});
};