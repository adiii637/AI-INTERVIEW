const app = require("../backend/src/app")
const connectToDB = require("../backend/src/config/database")

connectToDB()

module.exports = app
