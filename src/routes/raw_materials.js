const router = require('express').Router();
let RawMaterials = require('../models/raw_materials.model');

router.route('/raw-materials').get((request, response) => {
	RawMaterials.find().then((rawMaterials) => response.json(rawMaterials)).catch((error) => response.status(400).json(`Error: ${error}`));
})

router.route('/raw-materials/:_id').get((request, response) => {
	RawMaterials.distinct(request.params._id, { ...request.query }).then((rawMaterials) => response.json(rawMaterials)).catch((error) => response.status(400).json(`Error: ${error}`));
})

module.exports = router;
