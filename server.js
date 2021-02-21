if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const ejs = require('ejs');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// mongoose.connect(process.env.DATABASE_URL, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// });

mongoose.connect("mongodb://localhost:27017/verifmeDB");

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to Database...'));

// Home page route
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Start page
const startRouter = require('./routes/start');
app.use('/start', startRouter);

// Posts
const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

// Posts
const commentRouter = require('./routes/comments');
app.use('/comments', commentRouter);

app.listen(process.env.PORT || 3000, () => console.log('Server Started...'));
