//since the default middleware for express is an html page
//now we want our errors to be js object that has an errro message and stack trace

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    //next is a call back to call the next piece of middleware
    res.status(404)
    next(error)
}


const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode ? res.statusCode : 500;
    let message = err.message;
    //with mongoose we have got specidic error called cast error
    //if you call a user id that does not exits inside the DB it will fireoff
    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404
        message = "Resource not found"
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    })
}


export { notFound, errorHandler }