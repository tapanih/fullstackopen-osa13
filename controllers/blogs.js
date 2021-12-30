const router = require('express').Router();

const {Blog} = require('../models');

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs);
});

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (error) {
        res.status(400).json({error});
    }
});

router.put('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
        blog.likes = req.body.likes;
        await blog.save();
        res.json(blog);
    } else {
        res.status(404).end();
    }
});

router.delete('/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
        await blog.destroy();
        res.json(blog);
    } else {
        res.status(404).end();
    }
});

module.exports = router