const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userModel = new Schema(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
		collection: 'Users',
	}
);

const Users = mongoose.model('Users', userModel);

module.exports = Users;
