const router = require("express").Router()
const axios = require("axios")
const fs = require("fs")

const folder = "./competitionJSON/"

router.use("/", async (req, res) => {
    let returnObject = {}

    fs.readdir(folder, (err, files) => {
        if (err) return console.log(err)
        files.forEach((fileName) => {
            const rawData = fs.readFileSync(folder + fileName)
            returnObject[fileName.split(".")[0]] = JSON.parse(rawData)
        })
        res.send(returnObject)
    })
})

module.exports = router