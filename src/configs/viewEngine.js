import express from "express";

/**
 * 
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
    app.use(express.static('./src/public'))
    app.set("view engine", "ejs"); // Dùng ejs để code HTML
    app.set("views", "./src/views");
}

export default configViewEngine;