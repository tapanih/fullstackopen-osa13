const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Session = require("../models/session");
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

const extractToken = authorization => {
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7);
    }
    throw Error("token missing");
};

const decodeToken = token => {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        throw Error("token invalid");
    }
};

const authorizedUser = async (req, res, next) => {
    const authorization = req.get("authorization");
    const token = extractToken(authorization);
    const decodedToken = decodeToken(token);
    const session = await Session.findOne({
        where: {
            userId: decodedToken.id,
            token: token,
        },
    });
    req.user = await User.findByPk(decodedToken.id);
    if (!session || !req.user) throw Error("token invalid");
    if (req.user.disabled) {
        await Session.destroy({
            where: {
                userId: req.user.id,
            },
        });
        throw Error("account disabled");
    }
    next();
};

module.exports = {
    unknownEndpoint, errorHandler, authorizedUser,
};