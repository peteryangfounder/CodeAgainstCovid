const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/new', (req, res) => {
	res.render('articles/new', { article: new Article() });
});

router.post('/', async (req, res) => {
	const article = new Article({
		title: req.body.title,
		content: req.body.content
	});
	try {
		const newArticle = await article.save();
		res.redirect('/');
	} catch (err) {
		res.render('articles/new', { article: article });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);
		if (!article) {
			res.redirect('/');
		} else {
			res.render('articles/show', { article: article });
		}
	} catch (err) {
		res.redirect('/');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);
		await article.deleteOne();
		res.redirect('/');
	} catch (err) {
		res.redirect('/');
	}
});

router.get('/edit/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);

		if (!article) {
			res.redirect('/');
		} else {
			res.render('articles/edit', { article: article });
		}
	} catch (err) {
		res.redirect('/');
	}
});

router.put('/:id', async (req, res) => {
	try {
		await Article.updateOne(
			{ _id: req.params.id },
			{
				title: req.body.title,
				content: req.body.content
			}
		);
		res.redirect('/');
	} catch (err) {
		res.redirect('articles/edit', {
			article: new Article({
				title: req.body.title,
				content: req.body.content
			})
		});
	}
});

module.exports = router;
