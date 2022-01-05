const ReadingList = require("../models/readingList");
const router = require("express").Router();

router.post("/", async (req, res) => {
    const entry = await ReadingList.create({blogId: req.body.blogId, userId: req.body.userId});
    res.json(entry);
});

module.exports = router;