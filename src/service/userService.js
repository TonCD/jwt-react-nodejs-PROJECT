import bcrypt from "bcryptjs";
import mysql from "mysql2/promise"; //get client
import bluebird from "bluebird"; // get the promise implementation, we will use bluebird



const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    // connection.query(
    //     ' INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
    //     function(err, results, fields) {
    //         if(err){ console.log(err)}
    //     }
    // );
    const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);
}

const getUserList = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (error) {
        console.log("Error: ", error);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id = ? ', [id]);
        return rows;
    } catch (error) {
        console.log("Error: ", error);
    }
}

const getUserByID = async (id) =>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ? ', [id]);
        return rows;
    } catch (error) {
        console.log("Error: ", error);
    }
}

const updateUserInfor = async( email, username , id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        Promise: bluebird
    });
    try {
        const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ? ', [email, username, id]);
        return rows;
    } catch (error) {
        console.log("Error: ", error);
    }
}

module.exports = {
    createNewUser, getUserList , deleteUser, getUserByID, updateUserInfor
}