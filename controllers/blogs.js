const User = require("../models/user");
const {authorizedUser} = require("../util/middleware");
const {Op} = require("sequelize");
const router = require("express").Router();

const {Blog} = require("../models");

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) throw Error("not found");
    next();
};

router.get("/", async (req, res) => {
    const where = {};

    if (req.query.search) {
        where[Op.or] = [
            {
                title: {[Op.iLike]: `%${req.query.search}%`},
            },
            {
                author: {[Op.iLike]: `%${req.query.search}%`},
            },
        ];
    }

    const blogs = await Blog.findAll({
        attributes: {exclude: ["userId"]},
        include: {
            model: User,
            attributes: ["name"],
        },
        where,
        order: [
            ["likes", "DESC"],
        ],
    });
    res.json(blogs);
});

router.post("/", authorizedUser, async (req, res) => {
    const blog = await Blog.create({...req.body, userId: req.user.id});
    res.json(blog);
});

router.put("/:id", blogFinder, async (req, res) => {
    if (!Number.isInteger(req.body.likes) || req.body.likes < 0) throw Error("invalid likes");
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
});

router.delete("/:id", blogFinder, authorizedUser, async (req, res) => {
    if (req.user.id !== req.blog.userId) throw Error("unauthorized");
    await req.blog.destroy();
    res.json(req.blog);
});

module.exports = router;