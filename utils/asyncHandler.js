// this function use as a asynchronous wrapper to our controllers
// this utility function use to catche the express errors on the asynchronous routes
// this utility function ensure the errors properly caught within this function 
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err))
    }
}

export { asyncHandler } 