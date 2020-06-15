const mysql = require("mysql")

let db = mysql.createConnection(
    
    {
        host:"localhost",
        user:"root",
        port:3306,
        password:"678201252",
        database:"NOUBISSIE$school_database"
    }
)
module.exports = db