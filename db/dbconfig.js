const mysql2 = require("mysql2");

const dbConnection = mysql2.createConnection({
    // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", //path to mysql sock in MAMP
    user:process.env.user,
    database:process.env.database,
    host:" sql12.freemysqlhosting.net",
    password:process.env.password
   
   
  });
  module.exports=dbConnection.promise()