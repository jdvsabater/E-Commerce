const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');
// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./users.json');

router.get('/', function getIndexPage(req, res) {
	let viewModel = req.viewModel;
	res.render('login.pug',viewModel);
});
router.get('/home', function getIndexPage(req, res) {
	let viewModel = req.viewModel;
	res.render('homepage.pug',viewModel);
});

module.exports = router;