const router = require('express').Router();

const {Blog} = require('../models');

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) throw Error('not found');
    next();
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body);
    res.json(blog);
});

router.put('/:id', blogFinder, async (req, res) => {
    if (!Number.isInteger(req.body.likes) || req.body.likes < 0) throw Error("invalid likes");
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
});

router.delete('/:id', blogFinder, async (req, res) => {
    await req.blog.destroy();
    res.json(req.blog);
});

module.exports = router;