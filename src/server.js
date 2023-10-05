import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser"; //get body req
import connection from "./config/connectDB";

require("dotenv").config();



const app = express(); //Tạo sever
const PORT = process.env.PORT || 8080;
//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Test connection DB
//  connection();

//init Web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})