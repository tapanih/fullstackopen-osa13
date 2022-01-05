const Blog = require("../models/blog");
const ReadingList = require("../models/readingList");
const router = require("express").Router();
const {User} = require("../models");
const {isString} = require("../util/helpers");

router.get("/", async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: {exclude: ["userId"]},
        },
    });
    res.json(users);
});

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        attributes: ["name", "username"],
        include: [
            {
                model: Blog,
                as: "readings",
                attributes: {exclude: ["userId"]},
                through: {
                    attributes: ["read", "id"],
                    as: "readinglists",
                },
            }],
    });
    if (!user) throw Error("not found");
    res.json(user);
});

router.post("/", async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

router.put("/:username", async (req, res) => {
    const user = await User.findOne({where: {username: req.params.username}});
    if (!user) throw Error("not found");
    if (!isString(req.body.name)) throw Error("invalid name");
    user.name = req.body.name;
    await user.save();
    res.json(user);
});

module.exports = router;