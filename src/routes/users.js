const router = require('express').Router();
let Users = require('../models/users.model');

router.route('/login').post((req, res) => {
	Users.findOne({ username: req.body.username }).exec().then((user) => {
		if (!user || user.password !== req.body.password) {
			return res.status(404).send({ message: 'Invalid login!' });
		}

		res.status(200).send({
			username: user.username
		});
	}).catch((error) => {
		return res.status(500).send({ message: error });
	});
});

module.exports = router;
