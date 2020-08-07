// const upload = require("../middlewares/imageUploads")
// upload.single("profile_picture"),

const router = require("express").Router()
const productController = require("../controllers/product")

// Create a new product
router.post("/product/create", productController.create)

// Get all products
router.get("/product/get-all-products", productController.getProducts)

// Get a single product
router.get("/product/get-product/:id", productController.getProduct)

// // Update a product
// router.put("/product/update/:id", productController.update)

// // Delete a product
// router.delete("/product/delete/:id", productController.delete)

module.exports = router
