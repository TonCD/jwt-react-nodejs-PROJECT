import mysql from "mysql2"; //get client
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt'
  });
  
const handleHelloworld = (req, res) =>{
    return res.render("home.ejs");
}

const handleUserPage = (req, res) =>{
    //Model => get data from database

    return res.render("user.ejs");
}

const handleCreateNewUser = (req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    connection.query(
        'INSERT INTO users (email, password , username) VALUES (?, ?, ?)', [email, password, username],
        function(err, results, fields) {
            if(err){ console.log(err)}
        }
    );
    return res.send("Create");
}



module.exports = {
    handleHelloworld,
    handleUserPage,
    handleCreateNewUser
}