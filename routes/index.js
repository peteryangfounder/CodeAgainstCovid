const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', async (req, res) => {
	try {
		const articles = await Article.find().sort({
			createdAt: -1
		});
		res.render('articles/index', { articles: articles });
	} catch (err) {
		res.render('articles/error');
	}
});

module.exports = router;
