const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint"});
};

const errorHandler = (error, req, res, next) => {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({error: error.errors.map(err => err.message)});
    }
    if (error.message) {
        return res.status(400).json({error: error.message});
    }
    next(error);
};


module.exports = {
    unknownEndpoint, errorHandler,
};