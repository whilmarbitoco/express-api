require("dotenv").config();
const express = require('express')
const app = express()
const morgan = require("morgan")
const path = require("path")
const db = require("./models")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")



const PORT = process.env.PORT || 3500;

// routes
const userRouter = require("./routes/userRoute")
const projectRouter = require("./routes/projectRoute")

// middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(fileUpload())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/user", userRouter)
app.use("/upload", projectRouter)


app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    try {
        await db.sequelize.authenticate()
        console.log("DB connected...")
    } catch (err) {
        console.log(err.toString())
    }
})
