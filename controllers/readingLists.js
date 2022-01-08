const ReadingList = require("../models/readingList");
const {authorizedUser} = require("../util/middleware");
const router = require("express").Router();

router.post("/", async (req, res) => {
    const entry = await ReadingList.create({blogId: req.body.blogId, userId: req.body.userId});
    res.json(entry);
});

router.put("/:id", authorizedUser, async (req, res) => {
    const entry = await ReadingList.findByPk(req.params.id);
    if (!entry) throw Error("not found");
    if (entry.userId !== req.user.id) throw Error("unauthorized");
    entry.read = req.body.read;
    await entry.save();
    res.json(entry);
});

module.exports = router;