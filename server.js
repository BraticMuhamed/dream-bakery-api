const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const User = require('./src/models/users.model');
const RawMaterial = require('./src/models/raw_materials.model');
const uri = 'mongodb://localhost:27017/DreamBakeryDB';

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(async () => {
	console.log('Connected to MongoDB');

	if (await User.estimatedDocumentCount() === 0) {
		try {
			new User({
				username: 'j.smith@dreambakery.com',
				password: 'Test1234$'
			}).save();
		}
		catch (error) {
			console.log(error);
		}
	}

	const rawMaterialsInit = [
		{
			"Id": "3e15b3ba-8606-4bff-aca8-18a3c4923ff6",
			"Name": "Flour Diet",
			"Price": "0,479"
		},
		{
			"Id": "748ed510-2917-4cd0-b73e-dc185c8ff136",
			"Name": "Flour T500",
			"Price": "0, 573"
		},
		{
			"Id": "850b3ba1-9072-435f-bc4b-e31df626a3f9",
			"Name": "Eggs",
			"Price": "0, 14"
		},
		{
			"Id": "57a998e9-b953-4fde-bc79-111b334f37c0",
			"Name": "Olive oil",
			"Price": "3, 333"
		},
		{
			"Id": "d3e56e90-ca6f-4a01-9415-ff13401ba217",
			"Name": "Salt",
			"Price": "0, 376"
		},
		{
			"Id": "79788e15-78b9-44c4-92b3-b2992edefl5f",
			"Name": "Sugar",
			"Price": "0, 923"
		},
		{
			"Id": "21869fce-443f-4699-a5b4-e652ab7d9682",
			"Name": "Fresh yeast",
			"Price": "1, 425"
		}
	]

	if (await RawMaterial.estimatedDocumentCount() === 0) {
		try {
			rawMaterialsInit.forEach(async (material) => {
				await new RawMaterial({
					_id: material.Id,
					name: material.Name,
					price: material.Price
				}).save();
			})
		}
		catch (error) {
			console.log(error);
		}
	}
}).catch((error) => {
	console.log(error);
	process.exit();
});

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

const usersRouter = require('./src/routes/users');
const recipesRouter = require('./src/routes/recipes');
const rawMaterials = require('./src/routes/raw_materials');

app.use('/api', [usersRouter, recipesRouter, rawMaterials]);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
