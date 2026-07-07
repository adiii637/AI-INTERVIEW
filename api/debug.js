module.exports = (req, res) => {
    const envCheck = {
        MONGO_URI: !!process.env.MONGO_URI,
        JWT_SECRET: !!process.env.JWT_SECRET,
        GOOGLE_GENAI_API_KEY: !!process.env.GOOGLE_GENAI_API_KEY,
        NODE_ENV: process.env.NODE_ENV || "not set",
        VERCEL: process.env.VERCEL || "not set",
    };

    let appLoadError = null;
    try {
        require("../backend/src/app");
    } catch (err) {
        appLoadError = {
            message: err.message,
            stack: err.stack
        };
    }

    res.status(200).json({
        status: "debug endpoint working",
        envCheck,
        appLoadError,
        nodeVersion: process.version
    });
};
