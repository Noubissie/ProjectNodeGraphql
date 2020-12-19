// const mysql = require("mysql")

// let db = mysql.createConnection(
    
//     {
//         host:"localhost",
//         user:"root",
//         port:3306,
//         password:"678201252",
//         database:"NOUBISSIE$school_database"
//     }
// )
// module.exports = db
const mysql = require("mysql")

// let db = mysql.createConnection(
    
//     {
//         host:"us-cdbr-east-05.cleardb.net",
//         user:"b6abb3cb56b0f5",
//         // port:3306,
//         password:"61485b8b",
//         database:"heroku_4d2c5e541db147a"
//     }
// )
let db = mysql.createConnection(
    
    {
        host:"localhost",
        user:"root",
        // port:3306,
        password:"678201252",
        database:"NOUBISSIE$school_database"
    }
)
module.exports = db