const router = require('express').Router();
const RawMaterials = require('../models/raw_materials.model');
let Recipes = require('../models/recipes.model');

router.route('/recipes').get((request, response) => {
	const responseObject = [];

	Recipes.find().where('isDeleted').equals(false).exec().then((recipes) => {
		RawMaterials.find().then((rawMaterials) => {
			recipes.forEach((recipe) => {
				const rawMaterial = rawMaterials.find((rawMaterial) => rawMaterial.id === recipe.rawMaterialId);

				responseObject.push({
					id: recipe._id,
					rawMaterialName: rawMaterial.name,
					quantity: recipe.quantity,
					unit: recipe.unit
				});
			})

			return response.json(responseObject);
		});
	}).catch((error) => response.status(400).json(`Error: ${error}`));
});

router.route('/recipes').post((request, response) => {
	const newRecipe = new Recipes({ ...request.body });

	newRecipe.save().then(() => response.json('Recipe added!')).catch((error) => response.status(400).json(`Error: ${error}`));
});

router.route('/recipes').put((request, response) => {
	Recipes.findByIdAndUpdate({ _id: request.body.id }, request.body)
		.then(() => response.json('Recipe edited!'))
		.catch((error) => response.status(500).json(`Error: ${error}`));
});

router.route('/recipes').delete((request, response) => {
	Recipes.findOne({ _id: request.body.id })
		.then((recipe) => {
			recipe.isDeleted = true;
			recipe.save().then(() => response.json('Recipe deleted!')).catch((error) => response.status(500).json(`Error: ${error}`));
		})
		.catch((error) => response.status(500).json(`Error: ${error}`));
});

module.exports = router;
