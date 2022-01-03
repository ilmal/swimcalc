const express = require("express");
const app = express();
const router = require("express").Router()
const http = require("http")
const HTTP_PORT = 3002;

const tempusopen = require("./tempusopen")
router.use("/api/tempus", tempusopen)


http.createServer(app).listen(HTTP_PORT, () => console.log(`HTTP listening on port: ${HTTP_PORT}`));
