if (typeof global.DOMMatrix === "undefined") {
    global.DOMMatrix = class DOMMatrix {};
}

let app;
let startupError;

try {
    app = require("../backend/src/app");
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
