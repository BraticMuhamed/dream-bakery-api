const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const rawMaterialSchema = new Schema(
	{
		_id: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		price: {
			type: String,
			required: true
		}
	},
	{
		timestamps: false,
		collection: 'RawMaterials',
	}
);

const RawMaterials = mongoose.model('RawMaterials', rawMaterialSchema);

module.exports = RawMaterials;
