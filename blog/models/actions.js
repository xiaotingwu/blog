var mongoose = require('mongoose');
var User = mongoose.model('User');

var createItem = function(req, res) {
	new User({
		name: req.body.name,
		password: req.body.password,
		email: req.body.email
	}).save(function(err, user, count) {
		res.redirect("/");
	});
};
