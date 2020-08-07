const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema({
	product_name: { type: String, required: true },
	product_description: { type: String, required: true },
	product_varieties: { type: Array, required: true },
	date_uploaded: { type: Date, required: true },
	date_edited: { type: Date, required: true },
})

module.exports = mongoose.model("Product", ProductSchema)
