var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res) {
	res.render('index', {title: 'home'});
});

router.get('/reg', function(req, res) {
	res.render('reg', {title: 'register'});
});

router.post('/reg', function(req, res) {
	var password = req.body.password;
	var passwordRe = req.body.passwordRe;
	if (password != passwordRe) {
		req.flash('error', 'password and confirmed password not match');
		res.redirect('/reg');
	}

	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('hex');

	User.findOne({name: req.body.name}, function(err, user) {
		if (err) {
			req.flash ('reg_check_erro', err);
			res.redirect('/');
		}
		if (user) {
			req.flash('error', 'User Exist');
			res.redirect('/reg');
		}
	})

	new User({
		name: req.body.name,
		password: password,
		email: req.body.email
	}).save(function(err, user) {
		if (err) {
			req.flash('reg_error', 'Register Error Occur');
			res.redirect('/reg');
		}
		req.session.user = user;
		req.flash('reg_success', 'Register Success');
		res.redirect('/');
	});
});

router.get('/login', function(req, res) {
	res.render('login', {title: 'login'});
});

router.post('/login', function(req, res) {
	
});

router.get('/post', function(req, res) {
	res.render('post', {title: 'login'});
});

router.post('/post', function(req, res) {
	
});

router.get('/logout', function(req, res) {
	
});

module.exports = router;
