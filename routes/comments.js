const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/new', (req, res) => {
	res.render('comments/new', { article: new Article(), id: req.query.id });
});

router.post('/', async (req, res) => {
	const article = await Article.findOne({ "_id": req.body.id });

    article.comments.unshift([req.body.content, new Date().toLocaleDateString()]);

	await article.save();

	try {
		await article.save();
		res.redirect(`/articles/${req.body.id}`);
	} catch (err) {
		res.render('comments/new', { article: article });
	}
});

module.exports = router;
