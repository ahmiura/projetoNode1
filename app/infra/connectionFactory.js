var mysql=require('mysql');

//console.log("1-Entrou no connectionFactory!");

var createDbConnection = function (){
   // console.log("3-Entrou no connectionFactory!");
   if (!process.env.NODE_ENV) {
       return mysql.createConnection({
            host : "localhost",
            user : "root",
            password : "12345678",
            database : "dbnprod"
        });
    } else if (process.env.NODE_ENV == 'test') {
        return mysql.createConnection({
            host : "localhost",
            user : "root",
            password : "12345678",
            database : "dbnteste"
        });
    };
};

//wrapper
module.exports = function(){
    //console.log("2-Entrou no connectionFactory!");
    return createDbConnection;
};
