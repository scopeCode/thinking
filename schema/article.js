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
        type:{
            type:mysqlCient.Sequelize.INTEGER,
            field:"type"
        },
        created:{
            type:mysqlCient.Sequelize.DATE,
            defaultValue:common.dateFormat("yyyy-MM-dd HH:mm:ss",new Date()),
            field:"created",
            get: function()  {
                var created = this.getDataValue('created');
                return common.dateFormat("yyyy-MM-dd HH:mm:ss",created);
            }
        },
        delete:{
            type:mysqlCient.Sequelize.BOOLEAN,
            field:'delete',
            defaultValue:0
        }
    },
    {
        freezeTableName: true,
        timestamps:false,
        tableName:'article'
    }
);


exports.insert = function(title,desc,img,type,callback){
    Article.create({
        title:title,
        desc:desc,
        img:img,
        type:type
    }).then(function(a){
        callback(null,a);
    }).catch(function(err){
        callback(err,null);
    });
};


exports.getAll = function(offset,limit,callback){
    Article.findAll({
        offset: offset,
        limit: limit,
        order: 'created DESC'
    }).then(function(u){
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