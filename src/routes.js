const express = require("express")
const routes = express()

routes.get("/", (req, res) => {
    return res.status(200).json({
        message: "Tudo okei"
    })
})

module.exports = routes