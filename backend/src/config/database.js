const mongoose = require("mongoose")

async function connectToDB() {
    if (mongoose.connection.readyState === 1) {
        // Already connected - reuse existing connection
        return
    }

    if (mongoose.connection.readyState === 2) {
        // Connection in progress - wait for it to complete
        await new Promise((resolve, reject) => {
            mongoose.connection.once("connected", resolve)
            mongoose.connection.once("error", reject)
        })
        return
    }

    await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
    })

    console.log("Connected to Database")
}

module.exports = connectToDB