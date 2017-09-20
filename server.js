const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// To check for available port depending on local/deployed environment and pass into listener at bottom
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// logger middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

// middleware to serve up an express static directory
app.use(express.static(__dirname + '/public'));

// helpers
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

// ==========
//   ROUTES
// ==========

// HOME
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to the Home Page!'
	});
});

// ABOUT
app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

// PORTFOLIO
app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Portfolio Page'
	});
});

app.get('/bad', (req, res) => {
	res.send ({
		errorMessage: 'Not able to fulfill this request'
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});