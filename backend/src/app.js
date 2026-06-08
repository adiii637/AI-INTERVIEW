 // bcyrt- passsword hasing 
 // json web token - jwt token cretae ktne ke kaam
 // cokkie- token ko cookie me set krne ke liye cookie se token read kene ke liye

 // user jo create hua h uske loye token create krege 
 // jwt seceret key we have to geenrate 

 const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())

/* require all the routes here */
const authRouter = require("./routes/auth.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)



module.exports = app