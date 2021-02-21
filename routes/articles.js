const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/all', async (req, res) => {
	try {
		const articles = await Article.find().sort({
			createdAt: -1
		});
		res.render('articles/all', { articles: articles });
	} catch (err) {
		res.render('articles/error');
	}
});

// Update vote counter
router.post('/all', async (req, res) => {
	try {

		// Get entry with articleID
		const article = await Article.findOne({ "_id": req.body.articleID });

		if (req.body.hasOwnProperty('thumbsUpButton')) {
			article.voteCount = article.voteCount + 1;
		} else {
			article.voteCount = article.voteCount - 1;
		}
		
		await article.save();

		// Retrieve articles from database
		const articles = await Article.find().sort({
			createdAt: -1
		});

		res.render('articles/all', { articles: articles, article: await Article.findOne({ "_id": req.body.articleID }).voteCount });
	} catch (err) {
		res.render('articles/error');
	}
});

router.get('/new', (req, res) => {
	res.render('articles/new', { article: new Article() });
});

router.post('/', async (req, res) => {
	const article = new Article({
		title: req.body.title,
		content: req.body.content
	});
	try {
		await article.save();
		res.redirect('/articles/all');
	} catch (err) {
		res.render('articles/new', { article: article });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);
		if (!article) {
			res.redirect('/articles/all');
		} else {
			res.render('articles/show', { article: article, id: req.params.id });
		}
	} catch (err) {
		res.redirect('/articles/all');
	}
});

module.exports = router;