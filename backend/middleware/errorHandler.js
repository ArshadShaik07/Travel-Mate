const errorHandler = (err, req, res, next) => {
    if (!res.statusCode) res.status(500);
    res.json({
        error: err.message || "server error",
        stack: process.env.PROCESS == "production" ? null : err.stack,
    });
};

export { errorHandler };
