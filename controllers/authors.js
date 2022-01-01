const sequelize = require("sequelize");
const Blog = require("../models/blog");
const router = require("express").Router();

router.get("/", async (req, res) => {
    const blogs = await Blog.findAll({
        attributes: [
            "author",
            [sequelize.fn("COUNT", sequelize.col("author")), "blogs"],
            [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
        ],
        group: [
            ["author"],
        ],
        order: [
            [sequelize.fn("SUM", sequelize.col("likes")), "DESC"],
        ],
    });
    res.json(blogs);
});

module.exports = router;