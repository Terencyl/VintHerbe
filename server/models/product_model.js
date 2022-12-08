const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    text: { type: String, required: true },
    price: { type: Number, required: true },
    kind: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: Object, required: true },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
