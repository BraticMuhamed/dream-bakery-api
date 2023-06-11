const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const recipesSchema = new Schema(
	{
		rawMaterialId: {
			type: String,
			required: true
		},
		quantity: {
			type: Number,
			required: true
		},
		unit: {
			type: String,
			required: true
		},
		isDeleted: {
			type: Boolean,
			required: false
		}
	},
	{
		timestamps: false,
		collection: 'Recipes',
		excludeIndexes: true,
	}
);

const Recipes = mongoose.model('Recipes', recipesSchema);

module.exports = Recipes;
