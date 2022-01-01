const jwt = require("jsonwebtoken");
const router = require("express").Router();

const {SECRET} = require("../util/config");
const User = require("../models/user");

router.post("/", async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username,
        },
    });

    if (!(user && req.body.password === "salainen")) throw Error("invalid username or password");

    const token = jwt.sign({
        username: user.username,
        id: user.id,
    }, SECRET);

    res.status(200).send({token, username: user.username, name: user.name});
});

module.exports = router;