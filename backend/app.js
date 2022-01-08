const express = require("express");
const app = express();
const router = require("express").Router()
const http = require("http")
const HTTP_PORT = 3002;
const bodyparser = require("body-parser")

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Accept, Authorization, authorization, id, Set-Cookie",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    })
    next()
})

const tempusopen = require("./tempusopen")
app.use("/api/tempus", tempusopen)

const competition = require("./competitions")
app.use("/api/competitions", competition)



http.createServer(app).listen(HTTP_PORT, () => console.log(`HTTP listening on port: ${HTTP_PORT}`));
