const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	kind: {
		type: String,
		required: true
	},
	sold: {
		type: Boolean,
		default: false
	}
});

const Plant = mongoose.model("Plant", PlantSchema);

module.exports = Plant;