let app;
let startupError;

try {
    const connectToDB = require("../backend/src/config/database")
    connectToDB()
    app = require("../backend/src/app")
} catch (err) {
    startupError = err;
}

module.exports = (req, res) => {
    if (startupError) {
        return res.status(500).json({
            error: "Startup Crash",
            message: startupError.message,
            stack: startupError.stack
        });
    }
    return app(req, res);
};
