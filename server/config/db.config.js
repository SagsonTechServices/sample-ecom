// required packages 
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// create a connection 
const connection = mysql.createConnection({
    user : process.env.USER , 
    host : process.env.HOSTNAME , 
    password : process.env.PASSWORD , 
    database : process.env.DB
})

// connect to db 
connection.connect((err) => {
    if(err){
        console.log('An error occured:' , err);
        return;
    }
    console.log('Connected successfully');
})

// export the connection 
module.exports = connection