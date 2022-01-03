const router = require("express").Router()

router.post("/", (req, res) => {
    res.send("WORKING!!")
})

module.exports = router