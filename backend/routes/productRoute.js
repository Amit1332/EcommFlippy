const express = require('express');
const { get } = require('mongoose');
const { getAllProducts, createProduct , updateProduct,deleteProduct, getProductsDetails, createProductReviews, deleteReview, getProductReview} = require('../controller/productController');
const { isAuthenticatedUser ,authorizeRoles } = require('../middleware/auth');
const router = express.Router();

// All Product route
router.get("/products",getAllProducts);

// Create Product route -Admin
router.post("/admin/products/new", isAuthenticatedUser,authorizeRoles("admin"), createProduct);

// update Product route - Admin
router.route("/admin/products/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

// delete route can write like this below
// router.delete('/products/delete/:id',deleteProduct)


router.route("/products/:id").get(getProductsDetails)

router.route("/reviews").put(isAuthenticatedUser, createProductReviews)

router.route("/reviews").get(getProductReview).delete(isAuthenticatedUser,deleteReview)




module.exports = router