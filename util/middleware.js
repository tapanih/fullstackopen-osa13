const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, req, res, next) => {
    if (error.name === 'SequelizeValidationError' || error.message === 'invalid likes') {
        return res.status(400).json({error: 'invalid request'});
    }
    if (error.message === 'not found') {
        return res.status(404).json({error: 'not found'});
    }
    next(error)
}


module.exports = {
    unknownEndpoint, errorHandler
}