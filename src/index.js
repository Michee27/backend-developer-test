const express = require("express")
const routes = require("./routes")

const app = express()
app.use(express.json())

app.use(routes)

app.listen(3000, () => {
    console.log("API IS RUNNING ON PORT 3000");
})