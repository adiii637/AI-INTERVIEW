const mongoose = require("mongoose")

// Disable query buffering so queries fail immediately if DB is not connected
mongoose.set('bufferCommands', false);

async function connectToDB() {
    if (mongoose.connection.readyState === 1) {
        console.log("Reusing existing Database connection")
        return
    }

    if (mongoose.connection.readyState === 2) {
        console.log("Database is connecting, waiting for connection...")
        await new Promise((resolve, reject) => {
            mongoose.connection.once("connected", resolve)
            mongoose.connection.once("error", reject)
        })
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // Timeout connection attempts after 5 seconds
        })

        console.log("Connected to Database")
    }
    catch (err) {
        console.error("Database connection error:", err.message)
        throw err
    }
}

module.exports = connectToDB