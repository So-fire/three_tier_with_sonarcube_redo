const dbcreds = require('./DbConfig');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
});

function addTransaction(amount, desc, callback) {
    const sql = "INSERT INTO `transactions` (`amount`, `description`) VALUES (?, ?)";
    con.query(sql, [amount, desc], function(err, result) {
        if (err) {
            console.error("Error inserting transaction:", err);
            return callback(err);
        }
        console.log("Transaction added successfully.");
        return callback(null, result);
    });
}

function getAllTransactions(callback){
    const mysql = "SELECT * FROM transactions";
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log("Getting all transactions...");
        return(callback(result));
    });
}

function findTransactionById(id,callback){
       const sql = "SELECT * FROM transactions WHERE id = ?";
       con.query(sql, [id], function(err, result) {
    // var mysql = `SELECT * FROM transactions WHERE id = ${id}`;   #block wit vulnerability spotted by sonarcube
    // con.query(mysql, function(err,result){                       #block wit vulnerability spotted by sonarcube
        if (err) throw err;
        console.log(`retrieving transactions with id ${id}`);
        return(callback(result));
    }) 
}

function deleteAllTransactions(callback){
    const mysql = "DELETE FROM transactions";
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log("Deleting all transactions...");
        return(callback(result));
    }) 
}

function deleteTransactionById(id, callback){
    const mysql = `DELETE FROM transactions WHERE id = ${id}`;
    con.query(mysql, function(err,result){
        if (err) throw err;
        console.log(`Deleting transactions with id ${id}`);
        return(callback(result));
    }) 
}


module.exports = {addTransaction ,getAllTransactions, deleteAllTransactions, findTransactionById, deleteTransactionById};







