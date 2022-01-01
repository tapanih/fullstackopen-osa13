const jwt = require("jsonwebtoken");
const {SECRET} = require("../util/config");

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: "unknown endpoint"});
};

const errorHandler = (error, req, res, next) => {
    if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({error: error.errors.map(err => err.message)});
    } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({error: "token invalid"});
    } else if (error.message) {
        return res.status(400).json({error: error.message});
    }
    next(error);
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
        } catch (error) {
            throw Error("token invalid");
        }
    } else {
        throw Error("token missing");
    }
    next();
};

module.exports = {
    unknownEndpoint, errorHandler, tokenExtractor,
};