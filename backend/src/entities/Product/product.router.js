const router = require("express").Router();
const productController = require("./product.controller");

//Add New Product
router.post("/", productController.addNewProduct);

//Get all products
router.get("/", productController.getAllProducts);

//Get all products in a specific category
router.get("/:category", productController.getCategoryProducts);

//Get all products in a specific category & subcategory
router.get("/:category/:subcategory", productController.getSubcategoryProducts);

//Get one product
router.get("/:id", productController.getOneProduct);

//Add New size in a Product
router.post("/:id", productController.addNewSize);

//Update sizes  in a product
router.put("/:id", productController.updateSizes);

//delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
