import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

const app = express(); //Tạo sever
const PORT = process.env.PORT || 8080;
//config view engine
configViewEngine(app);

//init Web routes
initWebRoutes(app);



app.listen(PORT, () => {
    console.log(">>> JWT Backend is running on the port = " + PORT);
})