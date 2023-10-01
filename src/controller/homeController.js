const handleHelloworld = (req, res) =>{
    return res.render("home.ejs");
}

const handleUserPage = (req, res) =>{
    //Model => get data from database

    return res.render("user.ejs");
}


module.exports = {
    handleHelloworld,
    handleUserPage
}