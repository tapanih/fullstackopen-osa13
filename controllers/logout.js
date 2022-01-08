const router = require("express").Router();

const Session = require("../models/session");
const {authorizedUser} = require("../util/middleware");

router.delete("/", authorizedUser, async (req, res) => {
    await Session.destroy({
        where: {
            userId: req.user.id,
        },
    });

    res.status(200).send("ok");
});

module.exports = router;