const Product = require("../models/product")

class ProductController {
	// Create product
	static async createProduct(req, res) {
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

	// Get all products
	static async getProducts(req, res) {
		try {
			const products = await Product.find()

			// check if no products are found
			if (products.length < 1) {
				return res.status(404).json({
					success: false,
					message: "No products found",
				})
			}

			res.json({
				success: true,
				products,
				message: "products found",
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}

	// Get a single product
	static async getProduct(req, res) {
		try {
			const product = await Product.findOne({ _id: req.params.id })

			res.json({
				success: true,
				product,
				message: "product found",
			})
		} catch (error) {
			res.status(404).json({
				success: false,
				message: "No product found",
			})
		}
	}

	// Update a product
	static async updateProduct(req, res) {
		try {
			await Product.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$set: {
						product_name: req.body.product_name,
						product_description: req.body.product_description,
						product_varieties: req.body.product_varieties,
						date_uploaded: req.body.date_uploaded,
						date_edited: new Date().toISOString(),
					},
				},
				{ upsert: true }
			)
			res.json({
				success: true,
				message: "product updated successfully",
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			})
		}
	}

	// Delete a product's variety
	static async deleteProductVariety(req, res) {
		try {
			// get the product
			const product = await Product.findOne({ _id: req.params.productId })
			if (!product) {
				return res.status(404).json({
					success: false,
					message: "Product does not exist",
				})
			}

			// delete product variety
			const productVariety = product.product_varieties
			const newProductVariety = productVariety.filter(
				variety => variety.id != req.params.varietyId
			)

			// update product
			await Product.findOneAndUpdate(
				{ _id: req.params.productId },
				{
					$set: {
						product_name: product.product_name,
						product_description: product.product_description,
						product_varieties: newProductVariety,
						date_uploaded: product.date_uploaded,
						date_edited: new Date().toISOString(),
					},
				},
				{ upsert: true }
			)

			res.json({
				success: true,
				message: "Product variety deleted successfuly",
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
