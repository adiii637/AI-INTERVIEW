module.exports = (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Hello from Vercel Serverless!",
    env: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL
    }
  });
};
