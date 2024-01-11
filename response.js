const response = (res, message, data, statusCode = 200) => {
    res.status(statusCode).json([
        {
            payload: data,
            message
        }
    ])
}

module.exports = response