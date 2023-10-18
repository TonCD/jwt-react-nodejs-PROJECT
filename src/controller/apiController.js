const testApi = (req,res) => {
    return res.status(200).json({
        message: "Good",
        date: "test api"
    })
}
const handleRegister = (req, res) => {
    console.log("Check:", req.body);
}


module.exports = {
    testApi,
    handleRegister
}