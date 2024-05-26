const errorMiddleware = (err, req, res, next) => { 
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 400: // Validation Error
            res.json({
                title: "Validation failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case 401: // Unauthorized
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case 403: // Forbidden
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case 500: // Server Error
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case 404: // Not Found
            res.json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            console.log("No Error all is good.");
            break;
    }
};

export default errorMiddleware;
