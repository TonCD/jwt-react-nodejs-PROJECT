import bcrypt from "bcryptjs";
import mysql from "mysql2/promise"; //get client
import bluebird from "bluebird"; // get the promise implementation, we will use bluebird
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // const [rows, fields] = await connection.execute('INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);
    await db.User.create({
        username: username,
        email: email,
        password: hashPass
    })
}

const getUserList = async () => {

    let users = [];
    users = await db.User.findAll(); // find All --> [{}, {}, ...]
    return users;
    // create the connection, specify bluebird as Promise
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user');
    //     return rows;
    // } catch (error) {
    //     console.log("Error: ", error);
    // }
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id = ? ', [id]);
    //     return rows;
    // } catch (error) {
    //     console.log("Error: ", error);
    // }
}

const getUserByID = async (id) =>{
    let users = {};
    users = await db.User.findOne({
        where: {id: id}
    })
    return users.get({ plain: true });
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ? ', [id]);
    //     return rows;
    // } catch (error) {
    //     console.log("Error: ", error);
    // }
}

const updateUserInfor = async( email, username , id) => {
    
    await db.User.update(
        {email: email, username:username},
        {
            where: {id: id}
        }
    );
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'jwt',
    //     Promise: bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username = ? WHERE id = ? ', [email, username, id]);
    //     return rows;
    // } catch (error) {
    //     console.log("Error: ", error);
    // }
}

module.exports = {
    createNewUser, getUserList , deleteUser, getUserByID, updateUserInfor
}