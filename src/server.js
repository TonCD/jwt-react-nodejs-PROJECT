import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser"; //get body req
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();



const app = express(); //Tạo sever
const PORT = process.env.PORT || 8080;


configCors(app);

//config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Test connection DB
//  connection();

//init Web routes and Api routes 
initWebRoutes(app);
initApiRoutes(app);
app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})