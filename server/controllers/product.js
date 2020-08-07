const Product = require("../models/product")

class ProductController {
	// Create product
	static async create(req, res) {
		// TODO Validate user's input

		try {
			let newProduct = new Product()
			newProduct.product_name = req.body.product_name
			newProduct.product_description = req.body.product_description
			newProduct.product_varieties = req.body.product_varieties
			newProduct.date_uploaded = new Date().toISOString()
			newProduct.date_edited = new Date().toISOString()

			await newProduct.save()

			res.json({
				product: newProduct,
				success: true,
				message: "Product created successfully",
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}
}

module.exports = ProductController
