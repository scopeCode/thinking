/**
 * Created by WG on 2015/11/5.
 */
var mysqlCient   =   require("mo/mysql");
var common       =   require("../common/common");

var User = mysqlCient.sequelize.define('user',
        {
            userName:{
                type:mysqlCient.Sequelize.STRING,
                field:"userName"
            },
            userPwd:{
                type:mysqlCient.Sequelize.STRING,
                field:"userPwd"
            },

        },
        {
            freezeTableName: true,
            timestamps:false,
            tableName:'user'
        }
);

exports.signIn = function(userName,userPwd,callback){
    User.findOne({
        attributes:["id","userName","userPwd"],
        where: {
            userName: userName
        }
    }).then(function(u){
        if(!u){
            callback(new Error("不存在的用户."),null);
        }else if(u.userPwd != userPwd){
            callback(new Error("密码不正确."),null);
        }else{
            callback(null,u);
        }
    }).catch(function(err){
        callback(err,null);
    });
};

exports.init = function(){
    User.sync({force: true}).then(function () {
        return User.create({
            userName: 'admin@kfcode.cn',
            userPwd: 'e10adc3949ba59abbe56e057f20f883e'
        });
    });
};

//this.init();