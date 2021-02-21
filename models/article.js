const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	},
	voteCount: {
		type: Number,
		required: true,
		default: 0
	},
	comments: {
		type: Array,
		required: true,
		default: null
	}
});

module.exports = mongoose.model('Article', articleSchema);
