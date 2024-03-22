const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// routes
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let perPage = 5;
        let page = req.query.page || 1;

        const data = await Post.aggregate([
            { $sort: { createdAt: -1 } },
            { $skip: perPage * page - perPage },
            { $limit: perPage }
        ]).exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/about", (req, res) => {
    res.render("about");
});

module.exports = router;
