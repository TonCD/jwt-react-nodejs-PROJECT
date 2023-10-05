import bcrypt from "bcryptjs";
import mysql from "mysql2/promise"; //get client
import bluebird from "bluebird"; // get the promise implementation, we will use bluebird



const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) =>{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) =>{
    let hashPass = hashUserPassword(password);

    connection.query(
        ' INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function(err, results, fields) {
            if(err){ console.log(err)}
        }
    );
}

const getUserList = async () => {
    let users = [];
    
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host:'localhost', 
        user: 'root', 
        database: 'jwt', 
        Promise: bluebird
    });
    // connection.query(
    //     ' SELECT * FROM users ',
    //     function(err, results, fields) {
    //         if(err){ 
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         return users;
    //     }
    // );
    try{
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    }catch(error) {
        console.log("Error: " , error);
    }

}

module.exports = {
    createNewUser, getUserList
}