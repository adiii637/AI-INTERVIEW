 // bcyrt- passsword hasing 
 // json web token - jwt token cretae ktne ke kaam
 // cokkie- token ko cookie me set krne ke liye cookie se token read kene ke liye

 // user jo create hua h uske loye token create krege 
 // jwt seceret key we have to geenrate 

 const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        if (
            !origin || 
            /^http:\/\/localhost(:\d+)?$/.test(origin) ||
            /\.vercel\.app$/.test(origin) ||
            origin === process.env.FRONTEND_URL
        ) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))

const connectToDB = require("./config/database")

app.use(async (req, res, next) => {
    try {
        await connectToDB()
        next()
    } catch (err) {
        res.status(500).json({
            error: "Database Connection Error",
            message: err.message
        })
    }
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app